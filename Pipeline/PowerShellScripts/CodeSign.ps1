param(
    [string]$TenantId,
    [string]$ApplicationId,
    [string]$ApplicationSecretValue,
    [string]$AzureKeyVaultURI,
    [string]$CertificateName,
    [string]$Timestamp,
    [string]$Files,
    [string]$TimestampDigest = "sha256"
)

AzureSignTool.exe sign -kvu "$AzureKeyVaultURI" -kvt "$TenantId" -kvi "$ApplicationId" -kvs "$ApplicationSecretValue" -kvc "$CertificateName" -tr "$Timestamp" -td "$TimestampDigest" (-split $Files)
# SIG # Begin signature block
# MIIoJQYJKoZIhvcNAQcCoIIoFjCCKBICAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCD2oy9+KgyA+R8v
# vcfvZtVbt8UZYU7T7+tMLBcIgoL2j6CCDXYwggX0MIID3KADAgECAhMzAAAEBGx0
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
# /Xmfwb1tbWrJUnMTDXpQzTGCGgUwghoBAgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMw
# EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
# aWNyb3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNp
# Z25pbmcgUENBIDIwMTECEzMAAAQEbHQG/1crJ3IAAAAABAQwDQYJYIZIAWUDBAIB
# BQCggZAwGQYJKoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwLwYJKoZIhvcNAQkEMSIE
# IPopWCrcLYgT021cCqQMQChNg8FVGHsgF/8DwTUnq5RWMEIGCisGAQQBgjcCAQwx
# NDAyoBSAEgBNAGkAYwByAG8AcwBvAGYAdKEagBhodHRwOi8vd3d3Lm1pY3Jvc29m
# dC5jb20wDQYJKoZIhvcNAQEBBQAEggEAKyGUc5YqPA7diuN0gIAzitaZnj825ETp
# ffpx3Z6YbCDn1xkE0xnhofVd+syrbzFf8c7sJ7+5m4qLFDHiA0bt7ZfhR0yvJyGI
# PTRZYWbkpScZyXG2+sJ3rNcdcyJ32fGHDDpopQMYE5cnMuWEEB0ZfIsPk1i4jvHr
# hRZzHCXuMD9zFBmllJq6A7D6Cv4TwQUw9qopMTme09r04OZTbY+V68XbG0HBHWcu
# KbHSj3y1D4GuxtnUAP4IsiH3jF1RIFH5eDAwNDpmOZwN41LK7Z5cJGD+xV8oZMF6
# UlghsAfw9kLRq1J9CqFL9jICiVrrc8dY0xi84GwDrUSvd5qwBqgdvaGCF60wghep
# BgorBgEEAYI3AwMBMYIXmTCCF5UGCSqGSIb3DQEHAqCCF4YwgheCAgEDMQ8wDQYJ
# YIZIAWUDBAIBBQAwggFaBgsqhkiG9w0BCRABBKCCAUkEggFFMIIBQQIBAQYKKwYB
# BAGEWQoDATAxMA0GCWCGSAFlAwQCAQUABCDWKTorXfNf7U/5wcujxt95Xgo28iZl
# CLPEbJZ8FevwMgIGZ7Yu9DoGGBMyMDI1MDMzMDEwMjE1Mi4zNTNaMASAAgH0oIHZ
# pIHWMIHTMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
# BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYD
# VQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQxJzAlBgNV
# BAsTHm5TaGllbGQgVFNTIEVTTjozMjFBLTA1RTAtRDk0NzElMCMGA1UEAxMcTWlj
# cm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCEfswggcoMIIFEKADAgECAhMzAAAB
# +KOhJgwMQEj+AAEAAAH4MA0GCSqGSIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMw
# EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
# aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
# YW1wIFBDQSAyMDEwMB4XDTI0MDcyNTE4MzEwOFoXDTI1MTAyMjE4MzEwOFowgdMx
# CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
# b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsTJE1p
# Y3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEnMCUGA1UECxMeblNo
# aWVsZCBUU1MgRVNOOjMyMUEtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQg
# VGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKC
# AgEAxR23pXYnD2BuODdeXs2Cu/T5kKI+bAw8cbtN50Cm/FArjXyL4RTqMe6laQ/C
# qeMTxgckvZr1JrW0Mi4F15rx/VveGhKBmob45DmOcV5xyx7h9Tk59NAl5PNMAWKA
# IWf270SWAAWxQbpVIhhPWCnVV3otVvahEad8pMmoSXrT5Z7Nk1RnB70A2bq9Hk8w
# IeC3vBuxEX2E8X50IgAHsyaR9roFq3ErzUEHlS8YnSq33ui5uBcrFOcFOCZILuVF
# VTgEqSrX4UiX0etqi7jUtKypgIflaZcV5cI5XI/eCxY8wDNmBprhYMNlYxdmQ9aL
# RDcTKWtddWpnJtyl5e3gHuYoj8xuDQ0XZNy7ESRwJIK03+rTZqfaYyM4XSK1s0aa
# +mO69vo/NmJ4R/f1+KucBPJ4yUdbqJWM3xMvBwLYycvigI/WK4kgPog0UBNczaQw
# DVXpcU+TMcOvWP8HBWmWJQImTZInAFivXqUaBbo3wAfPNbsQpvNNGu/12pg0F8O/
# CdRfgPHfOhIWQ0D8ALCY+LsiwbzcejbrVl4N9fn2wOg2sDa8RfNoD614I0pFjy/l
# q1NsBo9V4GZBikzX7ZjWCRgd1FCBXGpfpDikHjQ05YOkAakdWDT2bGSaUZJGVYte
# pIpPTAs1gd/vUogcdiL51o7shuHIlB6QSUiQ24XYhRbbQCECAwEAAaOCAUkwggFF
# MB0GA1UdDgQWBBS9zsZzz57QlT5nrt/oitLv1OQ7tjAfBgNVHSMEGDAWgBSfpxVd
# AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1p
# Y3Jvc29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIw
# UENBJTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwGCCsGAQUFBzAChlBo
# dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUy
# MFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMBAf8EAjAAMBYG
# A1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDANBgkqhkiG9w0B
# AQsFAAOCAgEAYfk8GzzpEVnGl7y6oXoytCb42Hx6TOA0+dkaBI36ftDE9tLubUa/
# xMbHB5rcNiRhFHZ93RefdPpc4+FF0DAl5lP8xKAO+293RWPKDFOFIxgtZY08t8D9
# cSQpgGUzyw3lETZebNLEA17A/CTpA2F9uh8j84KygeEbj+bidWDiEfayoH2A5/5y
# wJJxIuLzFVHacvWxSCKoF9hlSrZSG5fXWS3namf4tt690UT6AGyWLFWe895coFPx
# m/m0UIMjjp9VRFH7nb3Ng2Q4gPS9E5ZTMZ6nAlmUicDj0NXAs2wQuQrnYnbRAJ/D
# QW35qLo7Daw9AsItqjFhbMcG68gDc4j74L2KYe/2goBHLwzSn5UDftS1HZI0ZRsq
# mNHI0TZvvUWX9ajm6SfLBTEtoTo6gLOX0UD/9rrhGjdkiCw4SwU5osClgqgiNMK5
# ndk2gxFlDXHCyLp5qB6BoPpc82RhO0yCzoP9gv7zv2EocAWEsqE5+0Wmu5uarmfv
# cziLfU1SY240OZW8ld4sS8fnybn/jDMmFAhazV1zH0QERWEsfLSpwkOXaImWNFJ5
# lmcnf1VTm6cmfasScYtElpjqZ9GooCmk1XFApORPs/PO43IcFmPRwagt00iQSw+r
# BeIH00KQq+FJT/62SB70g9g/R8TS6k6b/wt2UWhqrW+Q8lw6Xzgex/YwggdxMIIF
# WaADAgECAhMzAAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUAMIGIMQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylNaWNy
# b3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkgMjAxMDAeFw0yMTA5MzAx
# ODIyMjVaFw0zMDA5MzAxODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
# YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
# Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
# MDEwMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA5OGmTOe0ciELeaLL
# 1yR5vQ7VgtP97pwHB9KpbE51yMo1V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5K
# Wv64NmeFRiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDcwUTIcVxRMTeg
# Cjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus9ja+NSZk2pg7uhp7M62AW36MEBydUv62
# 6GIl3GoPz130/o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHINSi947SH
# JMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTesy+uDRedGbsoy1cCGMFxPLOJiss25
# 4o2I5JasAUq7vnGpF1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+/Nme
# Rd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fzpk03dJQcNIIP8BDyt0cY7afo
# mXw/TNuvXsLz1dhzPUNOwTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLi
# Mxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5UPkLiWHzNgY1GIRH29wb
# 0f2y1BzFa/ZcUlFdEtsluq9QBXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W2
# 9R6HXtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIGCSsGAQQBgjcVAQQF
# AgMBAAEwIwYJKwYBBAGCNxUCBBYEFCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1Ud
# DgQWBBSfpxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEGDCsGAQQBgjdM
# g30BATBBMD8GCCsGAQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
# b3BzL0RvY3MvUmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUHAwgwGQYJ
# KwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQF
# MAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0fBE8w
# TTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
# dHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
# BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9N
# aWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1V
# ffwqreEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1OdfCcTY/2mRsfNB1
# OW27DzHkwo/7bNGhlBgi7ulmZzpTTd2YurYeeNg2LpypglYAA7AFvonoaeC6Ce57
# 32pvvinLbtg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l9qRWqveVtihV
# J9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJw7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZ
# UnWKNsIdw2FzLixre24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7hvoyGtmW
# 9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY3UA8x1RtnWN0SCyxTkctwRQEcb9k
# +SS+c23Kjgm9swFXSVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFUa2pF
# EUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz/gq77EFmPWn9y8FBSX5+k77L
# +DvktxW/tM4+pTFRhLy/AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1
# ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328y+l7vzhwRNGQ8cirOoo6
# CGJ/2XBjU02N7oJtpQUQwXEGahC0HVUzWLOhcGbyoYIDVjCCAj4CAQEwggEBoYHZ
# pIHWMIHTMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
# BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYD
# VQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQxJzAlBgNV
# BAsTHm5TaGllbGQgVFNTIEVTTjozMjFBLTA1RTAtRDk0NzElMCMGA1UEAxMcTWlj
# cm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEBMAcGBSsOAwIaAxUAtkQt/ebW
# SQ5DnG+aKRzPELCFE9GggYMwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
# V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
# IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0Eg
# MjAxMDANBgkqhkiG9w0BAQsFAAIFAOuTbBcwIhgPMjAyNTAzMzAwNzA3MDNaGA8y
# MDI1MDMzMTA3MDcwM1owdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA65NsFwIBADAH
# AgEAAgIbQTAHAgEAAgIT3TAKAgUA65S9lwIBADA2BgorBgEEAYRZCgQCMSgwJjAM
# BgorBgEEAYRZCgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3DQEB
# CwUAA4IBAQCO/n0BBYTDWUmfH9EZqZCGbPcjmvIVu+JolDzFTii3NPPHXDxM+Ovv
# x5efyEWdwEjGdtTmSrGNvG1keQManKvqnBv1flyrAXuBGl+7hhCBBHH5J3Razn55
# Z+RYKnVBsUyAtR0aQMQARUdKRdkiU56PaNsZZoxO7qXMtS+sGqrOLKzoqLzqOKpD
# nA5RnPY9AOlwCS838bp9VwQmoZZ/NNVPB5OVbHda4yPx3/2HXGMIVVbAu6xdrLqt
# CewL/n7iKlrx9y3pWKkEHzmJ5nrze3abd8IKAzqTNkLQSQGr5DyKnJubBNes6sB7
# 2zlLxedOdwR+ggGoeEugimlp5c/v8zurMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UE
# BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
# BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0
# IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAAH4o6EmDAxASP4AAQAAAfgwDQYJYIZI
# AWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAvBgkqhkiG
# 9w0BCQQxIgQgYvwRh3LzrER6hBwpKEAY+qnqUiFLbWuqeleN1/Z068kwgfoGCyqG
# SIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDvzDPyXw1UkAUFYt8bR4UdjM90Qv5xnVai
# KD3I0Zz3WjCBmDCBgKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
# dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
# YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
# AAAB+KOhJgwMQEj+AAEAAAH4MCIEII0nseaEgM+JRHzpFWMzFV0E/viudApcg8i+
# nT2U1tPmMA0GCSqGSIb3DQEBCwUABIICAKVwI37CB63VLAgqO94aMS8p0BW9Md/e
# sdkinQvm0Pk1XQrgnEpfKNeBXd5XelAY8DEM5FGa0BerBWxVgQA89tsxy8W1kNf9
# vc0GxCigA6krXy4vgXhXPvSD27XGjRFvL3+l9P1zzQLSr6LAvbnwBazI8e16qyjK
# qS1gLiGTgEz9hmlBpy9uKB00d5VtjAgCp3o1FA0ygfeZ8Km/d+d3bpRhVGGvf5jv
# 6X2k6KmEulPh+k4OjVyv9FAVxxVcNRzDw/FvvXWJMdBcbhDEX5D3yLmYpzBvYgiO
# 9ZS5xdz+2bxgAQ5DCXahNcOzCuwi0QILZv87/IClfjWjOCeVKGAUmJLW1ipGOjAR
# gvO42C6H69lXabPAo6l/+yLeCPZBgzuyIrAo0xtA4bAV8OAbXA2TogGn7QLboMca
# QmeiNZyMCp61Bzp3bYKQM5E2Hb4Nan16iTNOW2cDQnUi4ignHX8uM7bTt6yJki55
# q3Ihvv2Y0UZ/pfGX7vyUAOQqJdy0wGUwFdAYE/OyMcKRkygcHtAAwSpOIoS6XPKN
# K/62RBBnT4xuTA8PBCa3xZRPVBpNdVmlo+4dbjH24pFHJiwA64oHzqd0j5AEotOy
# 3ryAgu2ATsz3Kza32Jrzs7RXm8miphkEvAGhKx1tOBww++W4Pu9EEsjEhJHHN3kA
# cKJgj2T4IXaK
# SIG # End signature block
