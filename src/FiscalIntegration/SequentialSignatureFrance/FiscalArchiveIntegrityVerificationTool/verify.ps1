[CmdletBinding(PositionalBinding = $false)]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Archive,

    [Parameter(Mandatory = $false)]
    [string[]]$LegacyHashAlgorithms,

    [Parameter(Mandatory = $false)]
    [switch]$SaveTransformedXml
)

Add-Type -AssemblyName System.IO
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.Security

#region Main

<#
.DESCRIPTION
    The main function.
#>
function main {
    param()

    try {
        Initialize-Labels

        if (-not $(Test-Path $Archive)) {
            Write-Host ($Labels.FileNotFound -f $Archive)
            return
        }

        $private:archiveItem = Get-Item $Archive
        $script:CertificatesLocation = $private:archiveItem.DirectoryName
        $private:reportBytes, $private:signatureBytes = Get-ReportAndSignatureBytes $private:archiveItem
        $private:reportStream = New-Object System.IO.MemoryStream $private:reportBytes, $false
        $private:xml = New-Object System.Xml.XmlDocument
        $private:xml.Load($private:reportStream)
        $private:archivePeriod = $private:xml.ArchivePeriod

        Validate-ArchiveFile `
            $private:reportBytes `
            $private:signatureBytes `
            $private:archivePeriod.PeriodGrandTotal.HashAlgorithm `
            $private:archivePeriod.PeriodGrandTotal.CertificateThumbprint

        $private:xml = Apply-Transformations $private:reportStream

        $private:nodes = $private:xml.SelectNodes("//*[
            self::PeriodGrandTotal or
            self::Shift or
            self::Receipt or
            self::ReceiptCopy or
            self::AuditEvent]"
        )

        $private:nodes | Validate-DataIntegrity -totalCount $private:nodes.Count
        Write-Host
    }
    catch {
        Write-Host $_ -ForegroundColor "Red"
        exit -1
    }
}

<#
.DESCRIPTION
    Gets byte arrays for the report file and the signature.
#>
function Get-ReportAndSignatureBytes {
    param (
        $archiveItem
    )
    try {
        $mode = [System.IO.FileMode]::Open
        $access = [System.IO.FileAccess]::Read
        $sharing = [IO.FileShare]::Read
        [System.IO.MemoryStream]$reportMemoryStream = New-Object System.IO.MemoryStream
        [Byte[]]$reportBytes = [System.Byte[]]::CreateInstance([System.Byte], 0)
        [Byte[]]$signatureBytes = [System.Byte[]]::CreateInstance([System.Byte], 0)

        if ($archiveItem.Extension -eq ".xml") {
            $reportFileStream = New-Object System.IO.FileStream $archiveItem.FullName, $mode, $access, $sharing
            $reportFileStream.CopyTo($reportMemoryStream)
            $reportBytes = $reportMemoryStream.ToArray()

            $signatureFilePath = Join-Path -Path $archiveItem.Directory "$($archiveItem.BaseName).sign"
            if (Test-Path $signatureFilePath) {
                $signatureFileStream = New-Object System.IO.FileStream $signatureFilePath, $mode, $access, $sharing
                $signatureStreamReader = New-Object System.IO.StreamReader $signatureFileStream
                $signatureText = $signatureStreamReader.ReadToEnd()
                $signatureBytes = [System.Text.Encoding]::ASCII.GetBytes($signatureText)
            }
            else {
                $reason = $Labels.SignatureFileNotFound -f $signatureFilePath
                Write-Warning ($Labels.UnableValidateArchive -f $reason)
            }
        }
        else {
            throw ($Labels.UnsupportedFileType -f $archiveItem)
        }

        @($reportBytes, $signatureBytes)
    }
    finally {
        if ($reportFileStream) { $reportFileStream.Close() }
        if ($signatureFileStream) { $signatureFileStream.Close() }
    }
}

<#
.DESCRIPTION
    Applies the required XSL transformations and returns the transformed XML document.
#>
function Apply-Transformations {
    param (
        [System.IO.Stream]$originalReportStream
    )

    try {
        Write-Progress -Activity $Labels.Initialization
        if ($originalReportStream.CanSeek) {
            $originalReportStream.Position = 0;
        }

        $originalReportStreamXmlReader = [System.Xml.XmlReader]::Create($originalReportStream)
        $transformedReportStream = New-Object System.IO.MemoryStream
        $transformedReportStreamXmlWriter = [System.Xml.XmlWriter]::Create($transformedReportStream)
        $xslInputElement = New-Object System.Xml.Xsl.XslCompiledTransform
        $xslInputElement.Load((Join-Path $PSScriptRoot "sort.xsl"))
        $xslInputElement.Transform($originalReportStreamXmlReader, $transformedReportStreamXmlWriter)
        $transformedReportStream.Position = 0
        $transformedXml = New-Object System.Xml.XmlDocument
        $transformedXml.Load($transformedReportStream)
        if ($SaveTransformedXml) {
            $transformedXmlFileName = [System.IO.Path]::Combine(
                [System.IO.Path]::GetDirectoryName($Archive),
                [System.IO.Path]::GetFileNameWithoutExtension($Archive) + "_transformed.xml")
            $transformedXml.Save($transformedXmlFileName)
            Write-Verbose $transformedXmlFileName
        }
        $transformedXml
    }
    finally {
        Write-Progress -Activity $Labels.Initialization -Completed
        if ($transformedReportStream) { $transformedReportStream.Close() };
    }
}

<#
.DESCRIPTION
    Validates the archive file.
#>
function Validate-ArchiveFile {
    param (
        [System.Byte[]]$reportBytes,
        [System.Byte[]]$signatureBytes,
        [string]$hashAlgorithm,
        [string]$thumbprint
    )
    Write-Verbose $Labels.ValidatingArchive
    try {
        if (-not $reportBytes.Length) {
            Write-Verbose $Labels.ReportEmpty
            return
        }
        if (-not $signatureBytes.Length) {
            Write-Verbose $Labels.SignatureFileEmpty
            return
        }
        [System.Security.Cryptography.X509Certificates.X509Certificate2]$certificate = Find-X509Certificate $thumbprint
        if ($null -eq $certificate) {
            throw ($Labels.CertificateNotFound -f $thumbprint)
        }
        $signature = [System.Text.Encoding]::UTF8.GetString($signatureBytes)
        $valid = Verify-Data $reportBytes $signature $hashAlgorithm $thumbprint
        if ($valid) {
            Write-Host $Labels.ArchiveValidationPassed -ForegroundColor "Green"
        }
        else {
            Write-Host $Labels.ArchiveValidationFailed -ForegroundColor "Red"
        }
    }
    catch {
        Write-Warning ($Labels.UnableValidateArchive -f $_)
    }
}

<#
.DESCRIPTION
    Validates the data integrity of a node.
#>
function Validate-DataIntegrity {
    [CmdletBinding()]
    param (
        [Parameter(ValueFromPipeline)]
        [System.Xml.XmlElement]$node,

        [Parameter()]
        [int]$totalCount
    )

    begin {
        $i = 0
        $percentComplete = 0
        $validCount = 0
        $activity = $Labels.ValidationActivity
    }

    process {
        $valid = $false
        try {
            $nodeName = $node.Name
            $idProperty = $node.Attributes.Item(0).Name
            $idValue = $node.Attributes.Item(0).Value
            $registerNumber = $node.RegisterNumber
            $nodeHeader = "$nodeName $idProperty=$idValue"
            if ($registerNumber) {
                $nodeHeader += ", RegisterNumber=$registerNumber"
            }

            Write-Verbose ($Labels.ValidatingNode -f $nodeHeader)
            $recalculatedDataToSign = Calculate-DataToSign $node
            $recalculatedDataToSignBytes = [System.Text.Encoding]::UTF8.GetBytes($recalculatedDataToSign)
            if ($recalculatedDataToSign -eq $node.DataToSign) {
                $hashAlgorithms = @($node.HashAlgorithm)
                $legacy = -not $node.DataToSignFormatVersion
                if ($legacy) {
                    $valid = $false
                    if (-not $hashAlgorithms -and $LegacyHashAlgorithms) {
                        $hashAlgorithms = $LegacyHashAlgorithms
                    }
                }

                foreach ($hashAlgorithm in $hashAlgorithms) {
                    $signature = ConvertFrom-LegacyBase64UrlString ($node.Signature)
                    $valid = Verify-Data `
                        $recalculatedDataToSignBytes `
                        $signature `
                        $hashAlgorithm `
                        $node.CertificateThumbprint
                    if ($valid) {
                        break
                    }
                }
            }
            if ($valid) {
                Write-Verbose ($Labels.NodeValidationPassed -f $nodeHeader)
            }
            else {
                if ($recalculatedDataToSign -eq $node.DataToSign) {
                    $reason = $Labels.SignatureInvalid
                }
                else {
                    $reason = $Labels.DataIntegrityViolated
                }
                Write-Host  ($Labels.NodeValidationFailed -f $nodeHeader, $reason) -ForegroundColor "Red"
                if ($recalculatedDataToSign -ne $node.DataToSign) {
                    $originalMetadata = ConvertTo-Metadata $node $node.DataToSign
                    $recalculatedMetadata = ConvertTo-Metadata $node $recalculatedDataToSign
                    $diffHashTables = Compare-HashTable -Expected $originalMetadata -Actual $recalculatedMetadata
                    if ($diffHashTables) {
                        Write-Host $Labels.SeeExpectedAndActual
                        $diffHashTables | `
                            ForEach-Object { [PSCustomObject]$_ } | `
                            Format-Table -Property $Labels.AttributeHeader, $Labels.ExpectedValueHeader, $Labels.ActualValueHeader | `
                            Out-String
                    }
                }
            }
        }
        catch {
            Write-Warning ($Labels.UnableToValidateNode -f $nodeHeader, $_)
        }
        finally {
            if ($valid) {
                $validCount++
            }
            $i++
            $percentComplete = [int]($i / $totalCount * 100)
            Write-Progress -Activity $activity -Status ($Labels.PercentComplete -f $percentComplete) -PercentComplete $percentComplete
        }
    }

    end {
        Write-Progress -Activity $activity -Completed
        $invalidCount = $totalCount - $validCount
        $percentIncorrect = if ($totalCount) { [int]($invalidCount / $totalCount * 100) } else { 0 }
        Write-Host ($Labels.ValidationCompleted -f $invalidCount, $totalCount, $percentIncorrect)
    }
}

#endregion

<#
.DESCRIPTION
    Searches for an X.509 certificate in the specified path with the given thumbprint.
#>
function Find-X509Certificate {
    param (
        [string]$thumbprint
    )

    if (-not $script:CertificatesCache) {
        [hashtable]$script:CertificatesCache = @{}
    }

    if ($script:CertificatesCache.ContainsKey($thumbprint)) {
        $script:CertificatesCache[$thumbprint]
        return
    }

    Write-Verbose ($Labels.SearchingCertificate -f $thumbprint, $script:CertificatesLocation)
    $certificateItems = Get-ChildItem -Path "$script:CertificatesLocation\*" -Include *.cer, *.crt, *.pem, *.pfx
    foreach ($certificateItem in $certificateItems) {
        $certificate = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2 $certificateItem.FullName
        if ($certificate.Thumbprint -eq $thumbprint) {
            Write-Verbose ($Labels.CertificateFound -f $certificate.GetName())
            $script:CertificatesCache[$thumbprint] = $certificate
            $certificate
            break
        }
    }
}

<#
.DESCRIPTION
    Validates the data against the specified signature.
#>
function Verify-Data {
    param (
        [byte[]]$bytes,
        [string]$signature,
        [string]$hashAlgorithm,
        [string]$thumbprint
    )

    if (-not $hashAlgorithm -or -not $thumbprint) {
        throw $Labels.HashOrThumbprintMissing
    }

    $certificate = Find-X509Certificate $thumbprint
    if ($null -eq $certificate) {
        throw ($Labels.CertificateNotFound -f $thumbprint)
    }

    $signatureBytes = ConvertFrom-Base64UrlString $signature
    [System.Security.Cryptography.RSA]$rsa = [System.Security.Cryptography.X509Certificates.RSACertificateExtensions]::GetRSAPublicKey($certificate)
    $rsaSignaturePadding = [System.Security.Cryptography.RSASignaturePadding]::Pss
    $rsa.VerifyData($bytes, $signatureBytes, $hashAlgorithm.ToUpper(), $rsaSignaturePadding)
}

<#
.DESCRIPTION
    Converts the specified base64url string into a byte array.
#>
function ConvertFrom-Base64UrlString {
    param (
        [string]$base64url
    )
    $base64 = $base64url
    if ($base64url.Length % 4 -ne 0) {
        $numberOfPadingCharachers = 4 - ($base64url.Length % 4)
        $lengthWithPadding = $base64url.Length + $numberOfPadingCharachers
        $base64 = $base64url.PadRight($lengthWithPadding, '=')
    }
    $base64 = $base64.Replace('_', '/').Replace('-', '+')
    $bytes = [System.Convert]::FromBase64String($base64)
    $bytes
}

<#
.DESCRIPTION
    Converts a legacy base64Url string to a base64 string.
#>
function ConvertFrom-LegacyBase64UrlString {
    param (
        [string]$legacyBase64UrlString
    )

    if (-not $legacyBase64UrlString) {
        return $legacyBase64UrlString
    }

    if ($legacyBase64UrlString.Length -lt 2) {
        return $legacyBase64UrlString
    }

    [int] $numPadChars = [int][char]$legacyBase64UrlString[$legacyBase64UrlString.Length - 1] - [int][char]'0';

    if ($numPadChars -lt 0 -or $numPadChars -gt 10) {
        return $legacyBase64UrlString
    }

    $suffix = New-Object string('=', $numPadChars)

    $signature = $legacyBase64UrlString.Remove($legacyBase64UrlString.Length - 1);

    $signature = $signature + $suffix

    $signature
}

<#
.DESCRIPTION
    Compares two hash tables and produces an object containing properties that are different.
#>
function Compare-HashTable {
    param (
        [alias('Expected')][hashtable]$expectedTable,
        [alias('Actual')][hashtable]$actualTable
    )

    <# Ensures a string is no longer than the allowed max length. #>
    function FitString ([string]$string) {
        $maxLength = 30
        if ($string.Length -gt $maxLength) {
            $string.Substring(0, $maxLength / 2) + "..." + $string.Substring($string.Length - $maxLength / 2)
        }
        else {
            $string
        }
    }

    foreach ($key in $expectedTable.Keys) {
        $expected = FitString $expectedTable[$key]
        $actual = FitString $actualTable[$key]
        if ($expected -ne $actual) {
            @{ $Labels.AttributeHeader = $key; $Labels.ExpectedValueHeader = $expected; $Labels.ActualValueHeader = $actual }
        }
    }
}

<#
.DESCRIPTION
    Calculates the data to sign for a node.
#>
function Calculate-DataToSign {
    param (
        [System.Xml.XmlElement]$node
    )


    $invalidFormatMessage = ($Labels.DataToSignFormatVersionInvalid -f $node.DataToSignFormatVersion)

    switch ($node.Name) {
        "PeriodGrandTotal" {
            if (-not $node.DataToSignFormatVersion) {
                throw $Labels.DataToSignFormatVersionMissing
            }
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { Calculate-PeriodGrandTotalDataToSign-2140 $node }
                default { throw $invalidFormatMessage }
            }
        }

        "Shift" {
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { Calculate-ShiftDataToSign-2140 $node }
                "" { Calculate-ShiftDataToSign-Legacy $node }
                default { throw $invalidFormatMessage }
            }
        }

        "Receipt" {
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { Calculate-ReceiptDataToSign-2140 $node }
                "" { Calculate-ReceiptDataToSign-Legacy $node }
                default { throw $invalidFormatMessage }
            }
        }

        "ReceiptCopy" {
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { Calculate-ReceiptCopyDataToSign-2140 $node }
                "" { Calculate-ReceiptCopyDataToSign-Legacy $node }
                default { throw $invalidFormatMessage }
            }
        }

        "AuditEvent" {
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { Calculate-AuditEventDataToSign-2140 $node }
                "" { Calculate-AuditEventDataToSign-Legacy $node }
                default { throw $invalidFormatMessage }
            }
        }

        default {
            throw ($Labels.NonSupportedNode -f $node.Name)
        }
    }
}

<#
.DESCRIPTION
    Converts the specified data to sign to a metadata object
    based on the node type and the data to sign format version.
#>
function ConvertTo-Metadata {
    param (
        [System.Xml.XmlElement]$node,
        [string]$dataToSign
    )

    $invalidFormatMessage = ($Labels.DataToSignFormatVersionInvalid -f $node.DataToSignFormatVersion)

    switch ($node.Name) {
        "PeriodGrandTotal" {
            if (-not $node.DataToSignFormatVersion) {
                throw $Labels.DataToSignFormatVersionMissing
            }

            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { ConvertTo-PeriodGrandTotalMetadata-2140 $dataToSign }
                default { throw $invalidFormatMessage }
            }
        }

        "Shift" {
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { ConvertTo-ShiftMetadata-2140 $dataToSign }
                "" { ConvertTo-ShiftMetadata-Legacy $dataToSign }
                default { throw $invalidFormatMessage }
            }
        }

        "Receipt" {
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { ConvertTo-ReceiptMetadata-2140 $dataToSign }
                "" { ConvertTo-ReceiptMetadata-Legacy $dataToSign }
                default { throw $invalidFormatMessage }
            }
        }

        "ReceiptCopy" {
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { ConvertTo-ReceiptCopyMetadata-2140 $dataToSign }
                "" { ConvertTo-ReceiptCopyMetadata-Legacy $dataToSign }
                default { throw $invalidFormatMessage }
            }
        }

        "AuditEvent" {
            switch ($node.DataToSignFormatVersion) {
                "2.1_4.0" { ConvertTo-AuditEventMetadata-2140 $dataToSign }
                "" { ConvertTo-AuditEventMetadata-Legacy $dataToSign }
                default { throw $invalidFormatMessage }
            }
        }

        default {
            throw ($Labels.NonSupportedNode -f $node.Name)
        }
    }
}

#region PeriodGrandTotal

<#
.DESCRIPTION
    Calculates the data to sign for the PeriodGrandTotal node.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function Calculate-PeriodGrandTotalDataToSign-2140 {
    param (
        [System.Xml.XmlElement]$periodGrandTotal
    )
    $metadata = ConvertTo-PeriodGrandTotalMetadata-2140 $periodGrandTotal.DataToSign
    $part1 = ConvertTo-PeriodGrandTotalTotalAmountsByTaxRateString-2140 $periodGrandTotal.SelectSingleNode('PeriodGrandTotalLines')
    $part2 = $periodGrandTotal.GrandTotal
    $part3 = $periodGrandTotal.PerpetualGrandTotalAbsoluteValue
    $part4 = $metadata.SignDateTime
    $part5 = [System.String]::Join("|", $periodGrandTotal.FromDate, $periodGrandTotal.ToDate)
    $part6 = $periodGrandTotal.SequentialNumber
    $part7 = $metadata.IsFirstSigned
    $part8 = $metadata.PreviousSignature
    $result = [System.String]::Join(",", $part1, $part2, $part3, $part4, $part5, $part6, $part7)
    if ($part8) {
        $result += "," + $part8
    }
    $result
}

<#
.DESCRIPTION
    Converts PeriodGrandTotalLine elements into the string representation of the total amounts by VAT rate breakdown.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function ConvertTo-PeriodGrandTotalTotalAmountsByTaxRateString-2140 {
    param (
        [System.Xml.XmlElement]$periodGrandTotalLines
    )
    if ($null -eq $periodGrandTotalLines -or $periodGrandTotalLines.ChildNodes.Count -eq 0) {
        "0:0"
        return
    }
    $items = $periodGrandTotalLines.ChildNodes | ForEach-Object { "$($_.TaxRate):$($_.TotalInclTax)" }
    $result = [System.String]::Join("|", $items)
    $result
}

<#
.DESCRIPTION
    Converts the DataToSign element of the PeriodGrandTotal node into a metadata object.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function ConvertTo-PeriodGrandTotalMetadata-2140 {
    param (
        [string]$dataToSign
    )
    $values = $dataToSign.Split(",")
    @{
        PeriodGrandTotalLines            = $values[0]
        GrandTotal                       = $values[1]
        PerpetualGrandTotalAbsoluteValue = $values[2]
        SignDateTime                     = $values[3]
        Period                           = $values[4]
        SequentialNumber                 = $values[5]
        IsFirstSigned                    = $values[6]
        PreviousSignature                = $values[7]
    }
}

#endregion

#region Shift

<#
.DESCRIPTION
    Calculates the data to sign for the Shift node.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function Calculate-ShiftDataToSign-2140 {
    param (
        [System.Xml.XmlElement]$shift
    )
    $metadata = ConvertTo-ShiftMetadata-2140 $shift.DataToSign
    $previousShift = $shift.PreviousSibling
    $perviousSignature = if ($previousShift) {
        $previousShift.Signature
    }
    else {
        $metadata.PreviousSignature
    }

    $part1 = ConvertTo-ShiftTotalAmountsByTaxRateString-2140 $shift.SelectSingleNode('ShiftLines')
    $part2 = $shift.GrandTotal
    $part3 = $shift.PerpetualGrandTotalAbsoluteValue
    $part4 = $shift.Date
    $part5 = $shift.Date.Substring(0, 8)
    $part6 = $shift.SequentialNumber
    $part7 = if ($shift.SequentialNumber -eq "1") { "Y" } else { "N" }
    $part8 = if ($part7 -eq "N") { $perviousSignature } else { "" }
    $result = [System.String]::Join(",", $part1, $part2, $part3, $part4, $part5, $part6, $part7, $part8)
    $result
}

<#
.DESCRIPTION
    Converts ShiftLine elements into the string representation of the total amounts by VAT rate breakdown.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function ConvertTo-ShiftTotalAmountsByTaxRateString-2140 {
    param (
        [System.Xml.XmlElement]$shiftLines
    )
    if ($null -eq $shiftLines -or $shiftLines.ChildNodes.Count -eq 0) {
        "0:0"
        return
    }
    $items = $shiftLines.ChildNodes | ForEach-Object { "$($_.TaxRate):$($_.TotalInclTax)" }
    $result = [System.String]::Join("|", $items)
    $result
}

<#
.DESCRIPTION
    Converts the DataToSign element of the Shift node into a metadata object.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function ConvertTo-ShiftMetadata-2140 {
    param (
        [string]$dataToSign
    )
    $values = $dataToSign.Split(",")
    @{
        ShiftLines                       = $values[0]
        GrandTotal                       = $values[1]
        PerpetualGrandTotalAbsoluteValue = $values[2]
        RegistrationTime                 = $values[3]
        Period                           = $values[4]
        SequentialNumber                 = $values[5]
        IsFirstSigned                    = $values[6]
        PreviousSignature                = $values[7]
    }
}

<#
.DESCRIPTION
    Calculates the data to sign for the Shift node.

.NOTES
    The old version of receipt copy.
#>
function Calculate-ShiftDataToSign-Legacy {
    param (
        [System.Xml.XmlElement]$shift
    )
    $metadata = ConvertTo-ShiftMetadata-Legacy $shift.DataToSign
    $previousShift = $shift.PreviousSibling
    $perviousSignature = if ($previousShift) {
        $previousShift.Signature
    }
    else {
        $metadata.PreviousSignature
    }

    $perviousSignature = if ($metadata.IsFirstSigned -eq "N") { $perviousSignature } else { "" }
    $result = [System.String]::Join(",", $metadata.ShiftData, $metadata.IsFirstSigned, $perviousSignature)
    $result
}

<#
.DESCRIPTION
    Converts the DataToSign element of the Shift node into a metadata object.

.NOTES
    The old version of receipt copy.
#>
function ConvertTo-ShiftMetadata-Legacy {
    param (
        [string]$dataToSign
    )

    $values = $dataToSign.Split(",")
    $shiftData = [string]::Join(",", ($values |  Select-Object -First ($values.Count - 2)))
    @{
        ShiftData         = $shiftData
        IsFirstSigned     = $values[$values.Count - 2]
        PreviousSignature = $values[$values.Count - 1]
    }
}

#endregion

#region Receipt

<#
.DESCRIPTION
    Calculates the data to sign for the Receipt node.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function Calculate-ReceiptDataToSign-2140 {
    param (
        [System.Xml.XmlElement]$receipt
    )
    $metadata = ConvertTo-ReceiptMetadata-2140 $receipt.DataToSign
    $previousReceipt = $receipt.PreviousSibling
    $perviousSignature = if ($previousReceipt) {
        $previousReceipt.Signature
    }
    else {
        $metadata.PreviousSignature
    }

    $part1 = ConvertTo-ReceiptTotalAmountsByTaxRateString-2140 $receipt.SelectSingleNode('FooterLines')
    $part2 = $receipt.Total.InclTax
    $part3 = $receipt.Date
    $part4 = $receipt.RegisterNumber
    $part5 = $receipt.SequentialNumber
    $part6 = $metadata.TransactionType
    $part7 = if ($receipt.SequentialNumber -eq "1") { "Y" } else { "N" }
    $part8 = if ($part7 -eq "N") { $perviousSignature } else { "" }
    $result = [System.String]::Join(",", $part1, $part2, $part3, $part4, $part5, $part6, $part7, $part8)
    $result
}

<#
.DESCRIPTION
    Converts ReceiptLine elements into the string representation of the total amounts by tax rate breakdown.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function ConvertTo-ReceiptTotalAmountsByTaxRateString-2140 {
    param (
        [System.Xml.XmlElement]$footerLines
    )
    if ($null -eq $footerLines -or $footerLines.ChildNodes.Count -eq 0) {
        "0:0"
        return
    }
    $items = $footerLines.ChildNodes | ForEach-Object { "$($_.TaxRate):$($_.TotalInclTax)" }
    $result = [System.String]::Join("|", $items)
    $result
}

<#
.DESCRIPTION
    Converts the DataToSign element of the Receipt node into a metadata object.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function ConvertTo-ReceiptMetadata-2140 {
    param (
        [string]$dataToSign
    )
    $values = $dataToSign.Split(",")
    @{
        TotalAmountsByTaxRate = $values[0]
        TotalAmount           = $values[1]
        RegistrationTime      = $values[2]
        RegisterNumber        = $values[3]
        SequentialNumber      = $values[4]
        TransactionType       = $values[5]
        IsFirstSigned         = $values[6]
        PreviousSignature     = $values[7]
    }
}

<#
.DESCRIPTION
    Calculates the data to sign for the Receipt node.

.NOTES
    The old version of receipt copy.
#>
function Calculate-ReceiptDataToSign-Legacy {
    param (
        [System.Xml.XmlElement]$receipt
    )
    $metadata = ConvertTo-ReceiptMetadata-Legacy $receipt.DataToSign
    $previousReceipt = $receipt.PreviousSibling
    $perviousSignature = if ($previousReceipt) {
        $previousReceipt.Signature
    }
    else {
        $metadata.PreviousSignature
    }

    $part1 = $metadata.TotalAmountsByTaxRate
    $part2 = $metadata.TotalAmount
    $part3 = $metadata.RegistrationTime
    $part4 = $metadata.RegisterNumber
    $part5 = $metadata.SequentialNumber
    $part6 = $metadata.TransactionType
    $part7 = $metadata.IsFirstSigned
    $part8 = if ($part7 -eq "N") { $perviousSignature } else { "" }
    $part9 = $metadata.LineCount
    $result = [System.String]::Join(",", $part1, $part2, $part3, $part4, $part5, $part6, $part7, $part8, $part9)
    $result
}

<#
.DESCRIPTION
    Converts the DataToSign element of the Receipt node into a metadata object.

.NOTES
    The old version of receipt copy.
#>
function ConvertTo-ReceiptMetadata-Legacy {
    param (
        [string]$dataToSign
    )
    $values = $dataToSign.Split(",")
    @{
        TotalAmountsByTaxRate = $values[0]
        TotalAmount           = $values[1]
        RegistrationTime      = $values[2]
        RegisterNumber        = $values[3]
        SequentialNumber      = $values[4]
        TransactionType       = $values[5]
        IsFirstSigned         = $values[6]
        PreviousSignature     = $values[7]
        LineCount             = $values[8]
    }
}

#endregion

#region ReceiptCopy

<#
.DESCRIPTION
    Calculates the data to sign for the ReceiptCopy node.

.NOTES
    The old version of receipt copy.
#>
function Calculate-ReceiptCopyDataToSign-Legacy {
    param (
        [System.Xml.XmlElement]$receiptCopy
    )
    $metadata = ConvertTo-ReceiptCopyMetadata-Legacy $receiptCopy.DataToSign
    $previousReceiptCopy = $receiptCopy.PreviousSibling
    $perviousSignature = if ($previousReceiptCopy) {
        $previousReceiptCopy.Signature
    }
    else {
        $metadata.PreviousSignature
    }
    $part1 = $metadata.ReceiptId
    $part2 = $metadata.TransactionType
    $part3 = $metadata.CopyNumber
    $part4 = $metadata.OperatorCode
    $part5 = $metadata.RegistrationTime
    $part6 = $metadata.SequentialNumber
    $part7 = $metadata.IsFirstSigned
    $part8 = if ($part7 -eq "N") { $perviousSignature } else { "" }
    $result = [System.String]::Join(",", $part1, $part2, $part3, $part4, $part5, $part6, $part7, $part8)
    $result
}

<#
.DESCRIPTION
    Converts the DataToSign element of the ReceiptCopy node into a metadata object.

.NOTES
    The old version of receipt copy.
#>
function ConvertTo-ReceiptCopyMetadata-Legacy {
    param (
        [string]$dataToSign
    )
    $values = $dataToSign.Split(",")
    @{
        ReceiptId         = $values[0]
        TransactionType   = $values[1]
        CopyNumber        = $values[2]
        OperatorCode      = $values[3]
        RegistrationTime  = $values[4]
        SequentialNumber  = $values[5]
        IsFirstSigned     = $values[6]
        PreviousSignature = $values[7]
    }
}

<#
.DESCRIPTION
    Calculates the data to sign for the ReceiptCopy node.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function Calculate-ReceiptCopyDataToSign-2140 {
    param (
        [System.Xml.XmlElement]$receiptCopy
    )
    $metadata = ConvertTo-ReceiptCopyMetadata-2140 $receiptCopy.DataToSign
    $previousReceiptCopy = $receiptCopy.PreviousSibling
    $perviousSignature = if ($previousReceiptCopy) {
        $previousReceiptCopy.Signature
    }
    else {
        $metadata.PreviousSignature
    }
    $part1 = $receiptCopy.RegisterNumber
    $part2 = $metadata.SequentialNumber
    $part3 = $metadata.TransactionType
    $part4 = $receiptCopy.CopyNumber
    $part5 = $receiptCopy.OperatorCode
    $part6 = $receiptCopy.Date
    $part7 = $metadata.RefRegisterNumber
    $part8 = $metadata.RefSequentialNumber
    $part9 = if ($receiptCopy.SequentialNumber -eq "1") { "Y" } else { "N" }
    $part10 = if ($part9 -eq "N") { $perviousSignature } else { "" }
    $result = [System.String]::Join(",", $part1, $part2, $part3, $part4, $part5, $part6, $part7, $part8, $part9, $part10)
    $result
}

<#
.DESCRIPTION
    Converts the DataToSign element of the ReceiptCopy node into a metadata object.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function ConvertTo-ReceiptCopyMetadata-2140 {
    param (
        [string]$dataToSign
    )
    $values = $dataToSign.Split(",")
    @{
        RegisterNumber      = $values[0]
        SequentialNumber    = $values[1]
        TransactionType     = $values[2]
        CopyNumber          = $values[3]
        OperatorCode        = $values[4]
        RegistrationTime    = $values[5]
        RefRegisterNumber   = $values[6]
        RefSequentialNumber = $values[7]
        IsFirstSigned       = $values[8]
        PreviousSignature   = $values[9]
    }
}

#endregion

#region AuditEvent

<#
.DESCRIPTION
    Converts the DataToSign element of the AuditEvent node into a metadata object.

.NOTES
    Old version of audit event
#>
function ConvertTo-AuditEventMetadata-Legacy {
    param (
        [string]$dataToSign
    )
    $values = $dataToSign.Split(",")
    @{
        SequentialNumber  = $values[0]
        Code              = $values[1]
        Message           = $values[2]
        RegistrationTime  = $values[3]
        OperatorCode      = $values[4]
        RegisterNumber    = $values[5]
        IsFirstSigned     = $values[6]
        PreviousSignature = $values[7]
    }
}

<#
.DESCRIPTION
    Calculates the data to sign for the AuditEvent node.

.NOTES
    The old version of audit event
#>
function Calculate-AuditEventDataToSign-Legacy {
    param (
        [System.Xml.XmlElement]$auditEvent
    )
    $previousAuditEvent = $auditEvent.PreviousSibling
    $metadata = ConvertTo-AuditEventMetadata-Legacy $auditEvent.DataToSign
    $perviousSignature = if ($previousAuditEvent) {
        $previousAuditEvent.Signature
    }
    else {
        $metadata.PreviousSignature
    }
    $part1 = $metadata.SequentialNumber
    $part2 = $metadata.Code
    $part3 = $metadata.Message
    $part4 = $metadata.RegistrationTime
    $part5 = $metadata.OperatorCode
    $part6 = $auditEvent.RegisterNumber
    $part7 = $metadata.IsFirstSigned
    $part8 = if ($part7 -eq "N") { $perviousSignature } else { "" }
    $result = [System.String]::Join(",", $part1, $part2, $part3, $part4, $part5, $part6, $part7, $part8)
    $result
}


<#
.DESCRIPTION
    Calculates the data to sign for the AuditEvent node.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function Calculate-AuditEventDataToSign-2140 {
    param (
        [System.Xml.XmlElement]$auditEvent
    )
    $previousAuditEvent = $auditEvent.PreviousSibling
    $metadata = ConvertTo-AuditEventMetadata-2140 $auditEvent.DataToSign
    $perviousSignature = if ($previousAuditEvent) {
        $previousAuditEvent.Signature
    }
    else {
        $metadata.PreviousSignature
    }
    $part1 = $auditEvent.SequentialNumber
    $part2 = $auditEvent.Code
    $part3 = $metadata.Message
    $part4 = $auditEvent.Date
    $part5 = $auditEvent.OperatorCode
    $part6 = $auditEvent.RegisterNumber
    $part7 = if ($auditEvent.SequentialNumber -eq "1") { "Y" } else { "N" }
    $part8 = if ($part7 -eq "N") { $perviousSignature } else { "" }
    $result = [System.String]::Join(",", $part1, $part2, $part3, $part4, $part5, $part6, $part7, $part8)
    $result
}

<#
.DESCRIPTION
    Converts the DataToSign element of the AuditEvent node into a metadata object.

.NOTES
    NF525 V2.1. Data dictionaries R13 and R19 V4.0.
#>
function ConvertTo-AuditEventMetadata-2140 {
    param (
        [string]$dataToSign
    )
    $values = $dataToSign.Split(",")
    @{
        SequentialNumber  = $values[0]
        Code              = $values[1]
        Message           = $values[2]
        RegistrationTime  = $values[3]
        OperatorCode      = $values[4]
        RegisterNumber    = $values[5]
        IsFirstSigned     = $values[6]
        PreviousSignature = $values[7]
    }
}

#endregion

#region Labels

<#
.DESCRIPTION
    Initializes the labels object from the resource file which corresponds to the current culture.
#>
function Initialize-Labels {
    $resourcesDirectoryName = "resources"
    $resourcesFileName = "resources.resjson"
    $defaultCultureName = "en-US"
    $script:Labels = @{}
    $currentCultureName = (Get-Culture).Name
    $labelsPath = [IO.Path]::Combine($PSScriptRoot, $resourcesDirectoryName, $currentCultureName, $resourcesFileName)
    if (-not (Test-Path $labelsPath)) {
        $labelsPath = [IO.Path]::Combine($PSScriptRoot, $resourcesDirectoryName, $defaultCultureName, $resourcesFileName)
    }
    $script:Labels = Get-Content $labelsPath | ConvertFrom-Json
}

#endregion

main

# SIG # Begin signature block
# MIIoLAYJKoZIhvcNAQcCoIIoHTCCKBkCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCChUjriZqzREy58
# qjbD/WbXDVjtxt+xAhAVks0YJaADT6CCDXYwggX0MIID3KADAgECAhMzAAAEBGx0
# Bv9XKydyAAAAAAQEMA0GCSqGSIb3DQEBCwUAMH4xCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25p
# bmcgUENBIDIwMTEwHhcNMjQwOTEyMjAxMTE0WhcNMjUwOTExMjAxMTE0WjB0MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMR4wHAYDVQQDExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
# AQC0KDfaY50MDqsEGdlIzDHBd6CqIMRQWW9Af1LHDDTuFjfDsvna0nEuDSYJmNyz
# NB10jpbg0lhvkT1AzfX2TLITSXwS8D+mBzGCWMM/wTpciWBV/pbjSazbzoKvRrNo
# DV/u9omOM2Eawyo5JJJdNkM2d8qzkQ0bRuRd4HarmGunSouyb9NY7egWN5E5lUc3
# a2AROzAdHdYpObpCOdeAY2P5XqtJkk79aROpzw16wCjdSn8qMzCBzR7rvH2WVkvF
# HLIxZQET1yhPb6lRmpgBQNnzidHV2Ocxjc8wNiIDzgbDkmlx54QPfw7RwQi8p1fy
# 4byhBrTjv568x8NGv3gwb0RbAgMBAAGjggFzMIIBbzAfBgNVHSUEGDAWBgorBgEE
# AYI3TAgBBggrBgEFBQcDAzAdBgNVHQ4EFgQU8huhNbETDU+ZWllL4DNMPCijEU4w
# RQYDVR0RBD4wPKQ6MDgxHjAcBgNVBAsTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEW
# MBQGA1UEBRMNMjMwMDEyKzUwMjkyMzAfBgNVHSMEGDAWgBRIbmTlUAXTgqoXNzci
# tW2oynUClTBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
# b20vcGtpb3BzL2NybC9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDctMDguY3JsMGEG
# CCsGAQUFBwEBBFUwUzBRBggrBgEFBQcwAoZFaHR0cDovL3d3dy5taWNyb3NvZnQu
# Y29tL3BraW9wcy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDctMDguY3J0
# MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQELBQADggIBAIjmD9IpQVvfB1QehvpC
# Ge7QeTQkKQ7j3bmDMjwSqFL4ri6ae9IFTdpywn5smmtSIyKYDn3/nHtaEn0X1NBj
# L5oP0BjAy1sqxD+uy35B+V8wv5GrxhMDJP8l2QjLtH/UglSTIhLqyt8bUAqVfyfp
# h4COMRvwwjTvChtCnUXXACuCXYHWalOoc0OU2oGN+mPJIJJxaNQc1sjBsMbGIWv3
# cmgSHkCEmrMv7yaidpePt6V+yPMik+eXw3IfZ5eNOiNgL1rZzgSJfTnvUqiaEQ0X
# dG1HbkDv9fv6CTq6m4Ty3IzLiwGSXYxRIXTxT4TYs5VxHy2uFjFXWVSL0J2ARTYL
# E4Oyl1wXDF1PX4bxg1yDMfKPHcE1Ijic5lx1KdK1SkaEJdto4hd++05J9Bf9TAmi
# u6EK6C9Oe5vRadroJCK26uCUI4zIjL/qG7mswW+qT0CW0gnR9JHkXCWNbo8ccMk1
# sJatmRoSAifbgzaYbUz8+lv+IXy5GFuAmLnNbGjacB3IMGpa+lbFgih57/fIhamq
# 5VhxgaEmn/UjWyr+cPiAFWuTVIpfsOjbEAww75wURNM1Imp9NJKye1O24EspEHmb
# DmqCUcq7NqkOKIG4PVm3hDDED/WQpzJDkvu4FrIbvyTGVU01vKsg4UfcdiZ0fQ+/
# V0hf8yrtq9CkB8iIuk5bBxuPMIIHejCCBWKgAwIBAgIKYQ6Q0gAAAAAAAzANBgkq
# hkiG9w0BAQsFADCBiDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
# EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
# bjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
# IDIwMTEwHhcNMTEwNzA4MjA1OTA5WhcNMjYwNzA4MjEwOTA5WjB+MQswCQYDVQQG
# EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
# A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQg
# Q29kZSBTaWduaW5nIFBDQSAyMDExMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIIC
# CgKCAgEAq/D6chAcLq3YbqqCEE00uvK2WCGfQhsqa+laUKq4BjgaBEm6f8MMHt03
# a8YS2AvwOMKZBrDIOdUBFDFC04kNeWSHfpRgJGyvnkmc6Whe0t+bU7IKLMOv2akr
# rnoJr9eWWcpgGgXpZnboMlImEi/nqwhQz7NEt13YxC4Ddato88tt8zpcoRb0Rrrg
# OGSsbmQ1eKagYw8t00CT+OPeBw3VXHmlSSnnDb6gE3e+lD3v++MrWhAfTVYoonpy
# 4BI6t0le2O3tQ5GD2Xuye4Yb2T6xjF3oiU+EGvKhL1nkkDstrjNYxbc+/jLTswM9
# sbKvkjh+0p2ALPVOVpEhNSXDOW5kf1O6nA+tGSOEy/S6A4aN91/w0FK/jJSHvMAh
# dCVfGCi2zCcoOCWYOUo2z3yxkq4cI6epZuxhH2rhKEmdX4jiJV3TIUs+UsS1Vz8k
# A/DRelsv1SPjcF0PUUZ3s/gA4bysAoJf28AVs70b1FVL5zmhD+kjSbwYuER8ReTB
# w3J64HLnJN+/RpnF78IcV9uDjexNSTCnq47f7Fufr/zdsGbiwZeBe+3W7UvnSSmn
# Eyimp31ngOaKYnhfsi+E11ecXL93KCjx7W3DKI8sj0A3T8HhhUSJxAlMxdSlQy90
# lfdu+HggWCwTXWCVmj5PM4TasIgX3p5O9JawvEagbJjS4NaIjAsCAwEAAaOCAe0w
# ggHpMBAGCSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBRIbmTlUAXTgqoXNzcitW2o
# ynUClTAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYD
# VR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBRyLToCMZBDuRQFTuHqp8cx0SOJNDBa
# BgNVHR8EUzBRME+gTaBLhklodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
# bC9wcm9kdWN0cy9NaWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3JsMF4GCCsG
# AQUFBwEBBFIwUDBOBggrBgEFBQcwAoZCaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
# L3BraS9jZXJ0cy9NaWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3J0MIGfBgNV
# HSAEgZcwgZQwgZEGCSsGAQQBgjcuAzCBgzA/BggrBgEFBQcCARYzaHR0cDovL3d3
# dy5taWNyb3NvZnQuY29tL3BraW9wcy9kb2NzL3ByaW1hcnljcHMuaHRtMEAGCCsG
# AQUFBwICMDQeMiAdAEwAZQBnAGEAbABfAHAAbwBsAGkAYwB5AF8AcwB0AGEAdABl
# AG0AZQBuAHQALiAdMA0GCSqGSIb3DQEBCwUAA4ICAQBn8oalmOBUeRou09h0ZyKb
# C5YR4WOSmUKWfdJ5DJDBZV8uLD74w3LRbYP+vj/oCso7v0epo/Np22O/IjWll11l
# hJB9i0ZQVdgMknzSGksc8zxCi1LQsP1r4z4HLimb5j0bpdS1HXeUOeLpZMlEPXh6
# I/MTfaaQdION9MsmAkYqwooQu6SpBQyb7Wj6aC6VoCo/KmtYSWMfCWluWpiW5IP0
# wI/zRive/DvQvTXvbiWu5a8n7dDd8w6vmSiXmE0OPQvyCInWH8MyGOLwxS3OW560
# STkKxgrCxq2u5bLZ2xWIUUVYODJxJxp/sfQn+N4sOiBpmLJZiWhub6e3dMNABQam
# ASooPoI/E01mC8CzTfXhj38cbxV9Rad25UAqZaPDXVJihsMdYzaXht/a8/jyFqGa
# J+HNpZfQ7l1jQeNbB5yHPgZ3BtEGsXUfFL5hYbXw3MYbBL7fQccOKO7eZS/sl/ah
# XJbYANahRr1Z85elCUtIEJmAH9AAKcWxm6U/RXceNcbSoqKfenoi+kiVH6v7RyOA
# 9Z74v2u3S5fi63V4GuzqN5l5GEv/1rMjaHXmr/r8i+sLgOppO6/8MO0ETI7f33Vt
# Y5E90Z1WTk+/gFcioXgRMiF670EKsT/7qMykXcGhiJtXcVZOSEXAQsmbdlsKgEhr
# /Xmfwb1tbWrJUnMTDXpQzTGCGgwwghoIAgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMw
# EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
# aWNyb3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNp
# Z25pbmcgUENBIDIwMTECEzMAAAQEbHQG/1crJ3IAAAAABAQwDQYJYIZIAWUDBAIB
# BQCgga4wGQYJKoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGCNwIBCzEO
# MAwGCisGAQQBgjcCARUwLwYJKoZIhvcNAQkEMSIEICYOcUbyYg4rbdUK5Useds6X
# VVCeAtUzIJ4GWmi3dlu+MEIGCisGAQQBgjcCAQwxNDAyoBSAEgBNAGkAYwByAG8A
# cwBvAGYAdKEagBhodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEB
# BQAEggEAawZMHna7JcnngiWCjUdcI/+ALDK4gPycDXAQYX+f3P16s4+E33DX+yjb
# 9/No5jJpDcpBYhbXyEL9Jhz/Lno/B7bwvpYChFgMDLYVz7ytxayKXVWz6wgrJNXO
# bwKldVXyKQKN4dkpNM4LiQhLty5vm+jF/76zcePYG92JR3mNVBzAYj3ThiC+0iE+
# 8qztLEUz7KTUxvQZtMx03vqdF50efz2YNnl8YfOp4Fiw2whOv0x0uDUE4R/reik4
# h823W3fEU/4/sVcwjs6bFxEIVyPFg4VF28FP2X80am3zijv+4zFOorw1fp61yWg+
# cwg5WtpO0agDN/2KN8twoKimi7xNRaGCF5YwgheSBgorBgEEAYI3AwMBMYIXgjCC
# F34GCSqGSIb3DQEHAqCCF28wghdrAgEDMQ8wDQYJYIZIAWUDBAIBBQAwggFRBgsq
# hkiG9w0BCRABBKCCAUAEggE8MIIBOAIBAQYKKwYBBAGEWQoDATAxMA0GCWCGSAFl
# AwQCAQUABCBKRrh5RiTMMGytBfeYbODHt2YZNfR0221nWUBCVP27UgIGZ98F1Gmd
# GBIyMDI1MDMyNjEwMTczMi42NlowBIACAfSggdGkgc4wgcsxCzAJBgNVBAYTAlVT
# MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
# ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVy
# aWNhIE9wZXJhdGlvbnMxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVTTjpEQzAwLTA1
# RTAtRDk0NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaCC
# Ee0wggcgMIIFCKADAgECAhMzAAACA7seXAA4bHTKAAEAAAIDMA0GCSqGSIb3DQEB
# CwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
# EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
# BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwMB4XDTI1MDEzMDE5NDI0
# NloXDTI2MDQyMjE5NDI0NlowgcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
# aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
# cG9yYXRpb24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMx
# JzAlBgNVBAsTHm5TaGllbGQgVFNTIEVTTjpEQzAwLTA1RTAtRDk0NzElMCMGA1UE
# AxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZTCCAiIwDQYJKoZIhvcNAQEB
# BQADggIPADCCAgoCggIBAKGXQwfnACc7HxSHxG2J0XQnTJoUMclgdOk+9FHXpfUr
# EYNh9Pw+twaMIsKJo67crUOZQhThFzmiWd2Nqmk246DPBSiPjdVtsnHk8VNj9rVn
# zS2mpU/Q6gomVSR8M9IEsWBdaPpWBrJEIg20uxRqzLTDmDKwPsgs9m6JCNpx7krE
# BKMp/YxVfWp8TNgFtMY0SKNJAIrDDJzR5q+vgWjdf/6wK64C2RNaKyxTriTysrrS
# OwZECmIRJ1+4evTJYCZzuNM4814YDHooIvaS2mcZ6AsN3UiUToG7oFLAAgUevvM7
# AiUWrJC4J7RJAAsJsmGxP3L2LLrVEkBexTS7RMLlhiZNJsQjuDXR1jHxSP6+H0ic
# ugpgLkOkpvfXVthV3RvK1vOV9NGyVFMmCi2d8IAgYwuoSqT3/ZVEa72SUmLWP2dV
# +rJgdisw84FdytBhbSOYo2M4vjsJoQCs3OEMGJrXBd0kA0qoy8nylB7abz9yJvIM
# z7UFVmq40Ci/03i0kXgAK2NfSONc0NQy1JmhUVAf4WRZ189bHW4EiRz3tH7FEu4+
# NTKkdnkDcAAtKR7hNpEG9u9MFjJbYd6c5PudgspM7iPDlCrpzDdn3NMpI9DoPmXK
# Jil6zlFHYx0y8lLh8Jw8kV5pU6+5YVJD8Qa1UFKGGYsH7l7DMXN2l/VS4ma45BNP
# AgMBAAGjggFJMIIBRTAdBgNVHQ4EFgQUsilZQH4R55Db2xZ7RV3PFZAYkn0wHwYD
# VR0jBBgwFoAUn6cVXQBeYl2D9OXSZacbUzUZ6XIwXwYDVR0fBFgwVjBUoFKgUIZO
# aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWljcm9zb2Z0JTIw
# VGltZS1TdGFtcCUyMFBDQSUyMDIwMTAoMSkuY3JsMGwGCCsGAQUFBwEBBGAwXjBc
# BggrBgEFBQcwAoZQaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jZXJ0
# cy9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENBJTIwMjAxMCgxKS5jcnQwDAYD
# VR0TAQH/BAIwADAWBgNVHSUBAf8EDDAKBggrBgEFBQcDCDAOBgNVHQ8BAf8EBAMC
# B4AwDQYJKoZIhvcNAQELBQADggIBAJAQxt6wPpMLTxHShgJ1ILjnYBCsZ/87z0ZD
# ngK2ASxvHPAYNVRyaNcVydolJM150EpVeQGBrBGic/UuDEfhvPNWPZ5Y2bMYjA7U
# WWGV0A84cDMsEQdGhJnil10W1pDGhptT83W9bIgKI3rQi3zmCcXkkPgwxfJ3qlLx
# 4AMiLpO2N+Ao+i6ZZrQEVD9oTONSt883Wvtysr6qSYvO3D8Q1LvN6Z/LHiQZGDBj
# VYF8Wqb+cWUkM9AGJyp5Td06n2GPtaoPRFz7/hVnrBCN6wjIKS/m6FQ3LYuE0OLa
# V5i0CIgWmaN82TgaeAu8LZOP0is4y/bRKvKbkn8WHvJYCI94azfIDdBqmNlO1+vs
# 1/OkEglDjFP+JzhYZaqEaVGVUEjm7o6PDdnFJkIuDe9ELgpjKmSHwV0hagqKuOJ0
# QaVew06j5Q/9gbkqF5uK51MHEZ5x8kK65Sykh1GFK0cBCyO/90CpYEuWGiurY4Jo
# /7AWETdY+CefHml+W+W6Ohw+Cw3bj7510euXc7UUVptbybRSQMdIoKHxBPBORg7C
# 732ITEFVaVthlHPao4gGMv+jMSG0IHRq4qF9Mst640YFRoHP6hln5f1QAQKgyGQR
# ONvph81ojVPu9UBqK6EGhX8kI5BP5FhmuDKTI+nOmbAw0UEPW91b/b2r2eRNagSF
# wQ47Qv03MIIHcTCCBVmgAwIBAgITMwAAABXF52ueAptJmQAAAAAAFTANBgkqhkiG
# 9w0BAQsFADCBiDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
# BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEy
# MDAGA1UEAxMpTWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IDIw
# MTAwHhcNMjEwOTMwMTgyMjI1WhcNMzAwOTMwMTgzMjI1WjB8MQswCQYDVQQGEwJV
# UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
# ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGlt
# ZS1TdGFtcCBQQ0EgMjAxMDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIB
# AOThpkzntHIhC3miy9ckeb0O1YLT/e6cBwfSqWxOdcjKNVf2AX9sSuDivbk+F2Az
# /1xPx2b3lVNxWuJ+Slr+uDZnhUYjDLWNE893MsAQGOhgfWpSg0S3po5GawcU88V2
# 9YZQ3MFEyHFcUTE3oAo4bo3t1w/YJlN8OWECesSq/XJprx2rrPY2vjUmZNqYO7oa
# ezOtgFt+jBAcnVL+tuhiJdxqD89d9P6OU8/W7IVWTe/dvI2k45GPsjksUZzpcGkN
# yjYtcI4xyDUoveO0hyTD4MmPfrVUj9z6BVWYbWg7mka97aSueik3rMvrg0XnRm7K
# MtXAhjBcTyziYrLNueKNiOSWrAFKu75xqRdbZ2De+JKRHh09/SDPc31BmkZ1zcRf
# NN0Sidb9pSB9fvzZnkXftnIv231fgLrbqn427DZM9ituqBJR6L8FA6PRc6ZNN3SU
# HDSCD/AQ8rdHGO2n6Jl8P0zbr17C89XYcz1DTsEzOUyOArxCaC4Q6oRRRuLRvWoY
# WmEBc8pnol7XKHYC4jMYctenIPDC+hIK12NvDMk2ZItboKaDIV1fMHSRlJTYuVD5
# C4lh8zYGNRiER9vcG9H9stQcxWv2XFJRXRLbJbqvUAV6bMURHXLvjflSxIUXk8A8
# FdsaN8cIFRg/eKtFtvUeh17aj54WcmnGrnu3tz5q4i6tAgMBAAGjggHdMIIB2TAS
# BgkrBgEEAYI3FQEEBQIDAQABMCMGCSsGAQQBgjcVAgQWBBQqp1L+ZMSavoKRPEY1
# Kc8Q/y8E7jAdBgNVHQ4EFgQUn6cVXQBeYl2D9OXSZacbUzUZ6XIwXAYDVR0gBFUw
# UzBRBgwrBgEEAYI3TIN9AQEwQTA/BggrBgEFBQcCARYzaHR0cDovL3d3dy5taWNy
# b3NvZnQuY29tL3BraW9wcy9Eb2NzL1JlcG9zaXRvcnkuaHRtMBMGA1UdJQQMMAoG
# CCsGAQUFBwMIMBkGCSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBBMAsGA1UdDwQEAwIB
# hjAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQYMBaAFNX2VsuP6KJcYmjRPZSQW9fO
# mhjEMFYGA1UdHwRPME0wS6BJoEeGRWh0dHA6Ly9jcmwubWljcm9zb2Z0LmNvbS9w
# a2kvY3JsL3Byb2R1Y3RzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNybDBaBggr
# BgEFBQcBAQROMEwwSgYIKwYBBQUHMAKGPmh0dHA6Ly93d3cubWljcm9zb2Z0LmNv
# bS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3J0MA0GCSqGSIb3
# DQEBCwUAA4ICAQCdVX38Kq3hLB9nATEkW+Geckv8qW/qXBS2Pk5HZHixBpOXPTEz
# tTnXwnE2P9pkbHzQdTltuw8x5MKP+2zRoZQYIu7pZmc6U03dmLq2HnjYNi6cqYJW
# AAOwBb6J6Gngugnue99qb74py27YP0h1AdkY3m2CDPVtI1TkeFN1JFe53Z/zjj3G
# 82jfZfakVqr3lbYoVSfQJL1AoL8ZthISEV09J+BAljis9/kpicO8F7BUhUKz/Aye
# ixmJ5/ALaoHCgRlCGVJ1ijbCHcNhcy4sa3tuPywJeBTpkbKpW99Jo3QMvOyRgNI9
# 5ko+ZjtPu4b6MhrZlvSP9pEB9s7GdP32THJvEKt1MMU0sHrYUP4KWN1APMdUbZ1j
# dEgssU5HLcEUBHG/ZPkkvnNtyo4JvbMBV0lUZNlz138eW0QBjloZkWsNn6Qo3GcZ
# KCS6OEuabvshVGtqRRFHqfG3rsjoiV5PndLQTHa1V1QJsWkBRH58oWFsc/4Ku+xB
# Zj1p/cvBQUl+fpO+y/g75LcVv7TOPqUxUYS8vwLBgqJ7Fx0ViY1w/ue10CgaiQuP
# Ntq6TPmb/wrpNPgkNWcr4A245oyZ1uEi6vAnQj0llOZ0dFtq0Z4+7X6gMTN9vMvp
# e784cETRkPHIqzqKOghif9lwY1NNje6CbaUFEMFxBmoQtB1VM1izoXBm8qGCA1Aw
# ggI4AgEBMIH5oYHRpIHOMIHLMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
# Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
# cmF0aW9uMSUwIwYDVQQLExxNaWNyb3NvZnQgQW1lcmljYSBPcGVyYXRpb25zMScw
# JQYDVQQLEx5uU2hpZWxkIFRTUyBFU046REMwMC0wNUUwLUQ5NDcxJTAjBgNVBAMT
# HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2WiIwoBATAHBgUrDgMCGgMVAM2v
# FFf+LPqyzWUEJcbw/UsXEPR7oIGDMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNV
# BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
# c29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAg
# UENBIDIwMTAwDQYJKoZIhvcNAQELBQACBQDrjiFKMCIYDzIwMjUwMzI2MDY0NjM0
# WhgPMjAyNTAzMjcwNjQ2MzRaMHcwPQYKKwYBBAGEWQoEATEvMC0wCgIFAOuOIUoC
# AQAwCgIBAAICEpECAf8wBwIBAAICE0EwCgIFAOuPcsoCAQAwNgYKKwYBBAGEWQoE
# AjEoMCYwDAYKKwYBBAGEWQoDAqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkq
# hkiG9w0BAQsFAAOCAQEAK01/j59CT74HzpGGTU7et7sLqmF86XQKWNcHPiLDcc/N
# UCIkpxRZyU/PGVg0G5bs+pbRKLU1zWggPez9q67AChKL0u8B/gEcx6yXp4iCzVzD
# efgWB9pdSxgsMj8lJVPRHTLCCoKMiS28p/y3vYmWFmKG+/arWrpiufcaEi6YXK6Y
# W/9Cy70aqDL5dszDg6jq6GizJHYpxQUk8BHzjUYlpnc6iYL8H6zYCxJg5PZ1Gjnn
# QSr68NMrrMXJHj41lfIFOLEC5tMByjVYpinq5KhS3RqobCHgkW7dI8ls5fK+Yn3k
# lrAO5OED8cuhZqsL/zK8lpGbxnAa3U7IHhUZXPvl9jGCBA0wggQJAgEBMIGTMHwx
# CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
# b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
# Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAACA7seXAA4bHTKAAEAAAID
# MA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMxDQYLKoZIhvcNAQkQAQQw
# LwYJKoZIhvcNAQkEMSIEIAxYIYzSV9q519v+7z4QtgImQ8J2aswnWg+Pz4rxhSE4
# MIH6BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCBvQQgSwPdG3GW9pPEU5lmelDDQOSw
# +ZV26jlLIr2H3D76Ey0wgZgwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
# V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
# IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0Eg
# MjAxMAITMwAAAgO7HlwAOGx0ygABAAACAzAiBCCmiIs1vNQo11iaD5raf3++xgWz
# iz4O3zR1g1aIV0dFrzANBgkqhkiG9w0BAQsFAASCAgBV5cax9GkcCW/F16BcKq3G
# 62caO8Y6TRBTuo5ExJ48k91eAqUQXipK5i4ABnhtBnW9lP5YYKP80j8D7MlVMrEv
# X6ABfpI1JyzXx/hwZ09scTNTd8QdeEy4CmIsSCC8TnspNilEoXkJXPGgrH1CJ8hz
# lwbIRziY57WIevpeLmrayAZLpXOfM8jImR25qk9lvtqXrMWjkVXEbMWEJ7e/RoPx
# Hf3RRkWzidLSSJ8U52oJtItH1lCp7kZZL7ZG2/zlhJjrqJmX9CNLuQB3WM9DymzA
# OJjxQiXAClqKKVeoND56MCwupuMb3hxK42j3qti2RMBs77bkMZT8rl4fwXMNFMIR
# wiDjeep+0p8yjkkCVeI626WKQeyv46JsWyskXbxGGFir6wgNocXsX6R52ekwnHEB
# I96aPe10cyfDuALsrrwC+qgcesZ/04m0EMOn3uwM4UIaChyYklm5wQuOr2t6VRsg
# DE9Ybg86vw21RGoZNB50iLTKOtMCw/HRD1hjHLBtIFNJ7jsit56m/nEmGXZgsH1R
# prbkb7+G89c/o1R8IFzESXRXv9BB6oZ9dmq+PZqvIpIunMHMPNjUlIzFy8Ti1r3a
# AS5r4+36WnXFv0DOpCHfq7nqaNyxSvzEo+ohIBnEgya7ihuMNJofK79Qs3uv/3I8
# OW5zd67ADy+LjS/S+Yogeg==
# SIG # End signature block
