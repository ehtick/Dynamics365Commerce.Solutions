/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

// eslint-disable-next-line import/no-unassigned-import
import './catalog-picker.scss';

// SIG // Begin signature block
// SIG // MIIoJgYJKoZIhvcNAQcCoIIoFzCCKBMCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // ai3dne2MUiNGMfNZSLtoJ7E8FLsQMs5AK/4TSKy8VnSg
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAABARsdAb/VysncgAA
// SIG // AAAEBDANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTI0MDkxMjIwMTExNFoX
// SIG // DTI1MDkxMTIwMTExNFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // tCg32mOdDA6rBBnZSMwxwXegqiDEUFlvQH9Sxww07hY3
// SIG // w7L52tJxLg0mCZjcszQddI6W4NJYb5E9QM319kyyE0l8
// SIG // EvA/pgcxgljDP8E6XIlgVf6W40ms286Cr0azaA1f7vaJ
// SIG // jjNhGsMqOSSSXTZDNnfKs5ENG0bkXeB2q5hrp0qLsm/T
// SIG // WO3oFjeROZVHN2tgETswHR3WKTm6QjnXgGNj+V6rSZJO
// SIG // /WkTqc8NesAo3Up/KjMwgc0e67x9llZLxRyyMWUBE9co
// SIG // T2+pUZqYAUDZ84nR1djnMY3PMDYiA84Gw5JpceeED38O
// SIG // 0cEIvKdX8uG8oQa047+evMfDRr94MG9EWwIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFPIboTWxEw1PmVpZS+AzTDwo
// SIG // oxFOMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDI5MjMwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQCI5g/S
// SIG // KUFb3wdUHob6Qhnu0Hk0JCkO4925gzI8EqhS+K4umnvS
// SIG // BU3acsJ+bJprUiMimA59/5x7WhJ9F9TQYy+aD9AYwMtb
// SIG // KsQ/rst+QflfML+Rq8YTAyT/JdkIy7R/1IJUkyIS6srf
// SIG // G1AKlX8n6YeAjjEb8MI07wobQp1F1wArgl2B1mpTqHND
// SIG // lNqBjfpjySCScWjUHNbIwbDGxiFr93JoEh5AhJqzL+8m
// SIG // onaXj7elfsjzIpPnl8NyH2eXjTojYC9a2c4EiX0571Ko
// SIG // mhENF3RtR25A7/X7+gk6upuE8tyMy4sBkl2MUSF08U+E
// SIG // 2LOVcR8trhYxV1lUi9CdgEU2CxODspdcFwxdT1+G8YNc
// SIG // gzHyjx3BNSI4nOZcdSnStUpGhCXbaOIXfvtOSfQX/UwJ
// SIG // oruhCugvTnub0Wna6CQiturglCOMyIy/6hu5rMFvqk9A
// SIG // ltIJ0fSR5FwljW6PHHDJNbCWrZkaEgIn24M2mG1M/Ppb
// SIG // /iF8uRhbgJi5zWxo2nAdyDBqWvpWxYIoee/3yIWpquVY
// SIG // cYGhJp/1I1sq/nD4gBVrk1SKX7Do2xAMMO+cFETTNSJq
// SIG // fTSSsntTtuBLKRB5mw5qglHKuzapDiiBuD1Zt4QwxA/1
// SIG // kKcyQ5L7uBayG78kxlVNNbyrIOFH3HYmdH0Pv1dIX/Mq
// SIG // 7avQpAfIiLpOWwcbjzCCB3owggVioAMCAQICCmEOkNIA
// SIG // AAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
// SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6q
// SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
// SIG // EtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
// SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
// SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
// SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
// SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
// SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
// SIG // gCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
// SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
// SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
// SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
// SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
// SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
// SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
// SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
// SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
// SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
// SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
// SIG // MFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
// SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
// SIG // BgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUHAgEWM2h0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
// SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBM
// SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
// SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
// SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
// SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
// SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
// SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
// SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
// SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
// SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
// SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
// SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
// SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
// SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
// SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
// SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
// SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTkhFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoIMIIaBAIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAE
// SIG // BGx0Bv9XKydyAAAAAAQEMA0GCWCGSAFlAwQCAQUAoIGQ
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMC8GCSqG
// SIG // SIb3DQEJBDEiBCCeqs1YLcip5f852JnK/lrgb3ft7iNl
// SIG // EtbFw/imU9YuWTBCBgorBgEEAYI3AgEMMTQwMqAUgBIA
// SIG // TQBpAGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAIqQ
// SIG // Nc4ZTCMEg1BwaSDPNxsTdWoMa28lAHPgutOtIz/9V9YM
// SIG // fqdy4qS8JRMo3TpMHCrja3T6tjMSfqWqwL4if8at9eiO
// SIG // mFbebmnqVHfpgkOeOiSxle9jRkFLRv5q11G0IznMkTLK
// SIG // 5oxdgJH7k7dGQeTeg5BXNHGbrDu6e89DeJhT776E9spK
// SIG // P61D35P2pt18xDw1YC9awm+VMe5u/psXLe1CN7MBLkp7
// SIG // Gd9xSSys/lSZdu5u+DQf4/mKTsfBLDbOb4NaGajwJZfA
// SIG // NqwkN4xrUBGmzTPRinKTWfUo7b/NJAoVHr6mtji1AvlG
// SIG // j0FlybODG8tt68FlUOMahf2FyK0NPbGhghewMIIXrAYK
// SIG // KwYBBAGCNwMDATGCF5wwgheYBgkqhkiG9w0BBwKggheJ
// SIG // MIIXhQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBWgYLKoZI
// SIG // hvcNAQkQAQSgggFJBIIBRTCCAUECAQEGCisGAQQBhFkK
// SIG // AwEwMTANBglghkgBZQMEAgEFAAQg1Deu+E6Xi1ZmWsfx
// SIG // o3Lwg264hzt6WmugW1aE2/Cl1YsCBme2M81eARgTMjAy
// SIG // NTA0MDUxMDIwMDAuMzg2WjAEgAIB9KCB2aSB1jCB0zEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWljcm9z
// SIG // b2Z0IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVkMScw
// SIG // JQYDVQQLEx5uU2hpZWxkIFRTUyBFU046NkIwNS0wNUUw
// SIG // LUQ5NDcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFNlcnZpY2WgghH+MIIHKDCCBRCgAwIBAgITMwAA
// SIG // AfaDLyZqVF0iwQABAAAB9jANBgkqhkiG9w0BAQsFADB8
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNy
// SIG // b3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAeFw0yNDA3
// SIG // MjUxODMxMDRaFw0yNTEwMjIxODMxMDRaMIHTMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMS0wKwYDVQQLEyRNaWNyb3NvZnQg
// SIG // SXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjo2QjA1LTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCC
// SIG // AgoCggIBANFCXizEfzfVjwWYbilRRfnliWevFro3Y+F+
// SIG // iUdOXMTuQnqTV6Ne61Ws8Fi5JuQI2lYdfWVYwwoR84ps
// SIG // bKGl8TbvCA4ICsKV76QACLb+FMedHvUtrlcHyr+e6fSS
// SIG // hvkO1TjUobo5dTQjJHIEqz3Znf/M3LJoc3DaGy6JqwgC
// SIG // DkWfCMIWMuLIlUJX9TSoZcgM5pFiQ9DfutCIqIBQc4N8
// SIG // iErL66DsdMdcUotj4kSEJU1xO+DIIGQyAyqh/4W/RU9p
// SIG // Cv51f2l47qPSzK60Zp+OKGGAA3v6zveRfkht7rroX/h+
// SIG // CK4l69IfabQOksByT0tlZmzVgo0FquRuGJK3KmzzGse7
// SIG // zV1MLu0+uRPHxT3dSLhPUbBuEzAFe15FwaKZjzX7y9IY
// SIG // 8YOOJKUJ9/OFeOqPs3UKsuSvXQ5Vpvyer2baecgNT8g9
// SIG // 8Ph2xrm0tJ4hENS+sBjqz38yJtBXTp/sRaOPBEZfhccP
// SIG // 9zr1zOQmNRKp8xM5z48yXOzicISVUd1UAx4wXBBUzr0v
// SIG // RNHYjbtXqHMPmQpM+D7v6EL/oKlPm38S/HuzxZLX0Q5T
// SIG // Ohcjs4z+M7iNuYA/LTvcyYOoOn0aWmXON/ZgG5Jd8wlc
// SIG // 0yw4HIb+ksUGoybb76EGmcUH9LUYj3G69h1nzKKqnfbo
// SIG // kNIU1BIRuOBQUk3lD2XhHp0QlmnQluBvAgMBAAGjggFJ
// SIG // MIIBRTAdBgNVHQ4EFgQUSMGbCbjnCX0nD1nF2bgQOAfP
// SIG // SvIwHwYDVR0jBBgwFoAUn6cVXQBeYl2D9OXSZacbUzUZ
// SIG // 6XIwXwYDVR0fBFgwVjBUoFKgUIZOaHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWljcm9zb2Z0
// SIG // JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAoMSkuY3Js
// SIG // MGwGCCsGAQUFBwEBBGAwXjBcBggrBgEFBQcwAoZQaHR0
// SIG // cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jZXJ0
// SIG // cy9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENBJTIw
// SIG // MjAxMCgxKS5jcnQwDAYDVR0TAQH/BAIwADAWBgNVHSUB
// SIG // Af8EDDAKBggrBgEFBQcDCDAOBgNVHQ8BAf8EBAMCB4Aw
// SIG // DQYJKoZIhvcNAQELBQADggIBANd5AYqx9XB7tVmEdcrI
// SIG // 9duaJhrUND2kJBM8Bm+9MbakqCPrL0IobIHU2MWj36di
// SIG // FRXYI2jGgYvNcAfP57vOuhXxSinYXad8JzGfdT6T+DqH
// SIG // uzXH+qiApIErsIHSHUL6hNIfFUOUFubA1eENCZ4+H+yh
// SIG // 2MeDYjPAuI08PEkLbLsVokx9h4pH90GAe9Wu3Qfc4Bzp
// SIG // FtIYFBHljvZodsFqmEv0OPAEozqmMP4WueKFTn39tlmq
// SIG // B/vx8XfTUxFP+L5b7ESDFk9I7JzSO9Y1QK0+EPQbelUo
// SIG // Vs8qq2hOkilKGaxMAaVbCNCzINl94Ti25Qtb8TN/sDMj
// SIG // ofe2hTrO7BZ7nprSNjH4/KoNegWUycV5aT7q1qxvjgY+
// SIG // AaEw5AvQMV2Ad8hLbsDLO6UVi8sSMcP8FfUxylBpvsfl
// SIG // RNDzi8JK0jII7pUl5KXxCx1loglbJSWxSCAf+AJb/o0C
// SIG // UigCbqPQhK25tqng5P84yWJWGlRjMirmGfrkkVSgdqpB
// SIG // D3BMxtXTvcyGtTKd9ifs81tz+7LiX48OtrN4Qzi5PupT
// SIG // EDkdOMftqNexty3Hi5JMSZuNRK3Yk4wJnQpXp/cpeh4D
// SIG // KRkuKJIxQiV/gqThV+4AQNz1cUFrm4rAEGy+R4ExQbUD
// SIG // RM3AnYdRmMP+p88zTbftBkJ56GwXXXzgIqpM7yLal47x
// SIG // sitUMIIHcTCCBVmgAwIBAgITMwAAABXF52ueAptJmQAA
// SIG // AAAAFTANBgkqhkiG9w0BAQsFADCBiDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJvb3Qg
// SIG // Q2VydGlmaWNhdGUgQXV0aG9yaXR5IDIwMTAwHhcNMjEw
// SIG // OTMwMTgyMjI1WhcNMzAwOTMwMTgzMjI1WjB8MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBQQ0EgMjAxMDCCAiIwDQYJKoZIhvcN
// SIG // AQEBBQADggIPADCCAgoCggIBAOThpkzntHIhC3miy9ck
// SIG // eb0O1YLT/e6cBwfSqWxOdcjKNVf2AX9sSuDivbk+F2Az
// SIG // /1xPx2b3lVNxWuJ+Slr+uDZnhUYjDLWNE893MsAQGOhg
// SIG // fWpSg0S3po5GawcU88V29YZQ3MFEyHFcUTE3oAo4bo3t
// SIG // 1w/YJlN8OWECesSq/XJprx2rrPY2vjUmZNqYO7oaezOt
// SIG // gFt+jBAcnVL+tuhiJdxqD89d9P6OU8/W7IVWTe/dvI2k
// SIG // 45GPsjksUZzpcGkNyjYtcI4xyDUoveO0hyTD4MmPfrVU
// SIG // j9z6BVWYbWg7mka97aSueik3rMvrg0XnRm7KMtXAhjBc
// SIG // TyziYrLNueKNiOSWrAFKu75xqRdbZ2De+JKRHh09/SDP
// SIG // c31BmkZ1zcRfNN0Sidb9pSB9fvzZnkXftnIv231fgLrb
// SIG // qn427DZM9ituqBJR6L8FA6PRc6ZNN3SUHDSCD/AQ8rdH
// SIG // GO2n6Jl8P0zbr17C89XYcz1DTsEzOUyOArxCaC4Q6oRR
// SIG // RuLRvWoYWmEBc8pnol7XKHYC4jMYctenIPDC+hIK12Nv
// SIG // DMk2ZItboKaDIV1fMHSRlJTYuVD5C4lh8zYGNRiER9vc
// SIG // G9H9stQcxWv2XFJRXRLbJbqvUAV6bMURHXLvjflSxIUX
// SIG // k8A8FdsaN8cIFRg/eKtFtvUeh17aj54WcmnGrnu3tz5q
// SIG // 4i6tAgMBAAGjggHdMIIB2TASBgkrBgEEAYI3FQEEBQID
// SIG // AQABMCMGCSsGAQQBgjcVAgQWBBQqp1L+ZMSavoKRPEY1
// SIG // Kc8Q/y8E7jAdBgNVHQ4EFgQUn6cVXQBeYl2D9OXSZacb
// SIG // UzUZ6XIwXAYDVR0gBFUwUzBRBgwrBgEEAYI3TIN9AQEw
// SIG // QTA/BggrBgEFBQcCARYzaHR0cDovL3d3dy5taWNyb3Nv
// SIG // ZnQuY29tL3BraW9wcy9Eb2NzL1JlcG9zaXRvcnkuaHRt
// SIG // MBMGA1UdJQQMMAoGCCsGAQUFBwMIMBkGCSsGAQQBgjcU
// SIG // AgQMHgoAUwB1AGIAQwBBMAsGA1UdDwQEAwIBhjAPBgNV
// SIG // HRMBAf8EBTADAQH/MB8GA1UdIwQYMBaAFNX2VsuP6KJc
// SIG // YmjRPZSQW9fOmhjEMFYGA1UdHwRPME0wS6BJoEeGRWh0
// SIG // dHA6Ly9jcmwubWljcm9zb2Z0LmNvbS9wa2kvY3JsL3By
// SIG // b2R1Y3RzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNy
// SIG // bDBaBggrBgEFBQcBAQROMEwwSgYIKwYBBQUHMAKGPmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMv
// SIG // TWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3J0MA0GCSqG
// SIG // SIb3DQEBCwUAA4ICAQCdVX38Kq3hLB9nATEkW+Geckv8
// SIG // qW/qXBS2Pk5HZHixBpOXPTEztTnXwnE2P9pkbHzQdTlt
// SIG // uw8x5MKP+2zRoZQYIu7pZmc6U03dmLq2HnjYNi6cqYJW
// SIG // AAOwBb6J6Gngugnue99qb74py27YP0h1AdkY3m2CDPVt
// SIG // I1TkeFN1JFe53Z/zjj3G82jfZfakVqr3lbYoVSfQJL1A
// SIG // oL8ZthISEV09J+BAljis9/kpicO8F7BUhUKz/AyeixmJ
// SIG // 5/ALaoHCgRlCGVJ1ijbCHcNhcy4sa3tuPywJeBTpkbKp
// SIG // W99Jo3QMvOyRgNI95ko+ZjtPu4b6MhrZlvSP9pEB9s7G
// SIG // dP32THJvEKt1MMU0sHrYUP4KWN1APMdUbZ1jdEgssU5H
// SIG // LcEUBHG/ZPkkvnNtyo4JvbMBV0lUZNlz138eW0QBjloZ
// SIG // kWsNn6Qo3GcZKCS6OEuabvshVGtqRRFHqfG3rsjoiV5P
// SIG // ndLQTHa1V1QJsWkBRH58oWFsc/4Ku+xBZj1p/cvBQUl+
// SIG // fpO+y/g75LcVv7TOPqUxUYS8vwLBgqJ7Fx0ViY1w/ue1
// SIG // 0CgaiQuPNtq6TPmb/wrpNPgkNWcr4A245oyZ1uEi6vAn
// SIG // Qj0llOZ0dFtq0Z4+7X6gMTN9vMvpe784cETRkPHIqzqK
// SIG // Oghif9lwY1NNje6CbaUFEMFxBmoQtB1VM1izoXBm8qGC
// SIG // A1kwggJBAgEBMIIBAaGB2aSB1jCB0zELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEtMCsGA1UECxMkTWljcm9zb2Z0IElyZWxh
// SIG // bmQgT3BlcmF0aW9ucyBMaW1pdGVkMScwJQYDVQQLEx5u
// SIG // U2hpZWxkIFRTUyBFU046NkIwNS0wNUUwLUQ5NDcxJTAj
// SIG // BgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZp
// SIG // Y2WiIwoBATAHBgUrDgMCGgMVABVPXkqXcbNGtOiRSLhh
// SIG // RyI/yPt+oIGDMIGApH4wfDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // UENBIDIwMTAwDQYJKoZIhvcNAQELBQACBQDrm1mJMCIY
// SIG // DzIwMjUwNDA1MDcyNjAxWhgPMjAyNTA0MDYwNzI2MDFa
// SIG // MHcwPQYKKwYBBAGEWQoEATEvMC0wCgIFAOubWYkCAQAw
// SIG // CgIBAAICEx4CAf8wBwIBAAICEvMwCgIFAOucqwkCAQAw
// SIG // NgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoDAqAK
// SIG // MAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkqhkiG9w0B
// SIG // AQsFAAOCAQEAlkAXK7WNAQaseTnG6HMVhHHk1GVYZCEl
// SIG // ZD+ol6lsaq8ODks5gxTz677BGdJRR69DzmehZjhyKTTq
// SIG // 7unK/uoeZARFZHtGQaUdQrRBNjpfZcbLbfM85trb9j/n
// SIG // QgDBpNFfP7gORSQRSNl6246xvZvROBomK/gFQvJ/lyRO
// SIG // 9KyluNxqdKjs8UD7udo56H6cPXolftKmjptNYkd44T7O
// SIG // 8aSq2Wqmn1UQfaalsE/ILNu3wuATrYlowWAZ4uwnMrCG
// SIG // C2A5dIaHiH+Ch0tJXjbx7F9Oxy0znTp1+ffloSpnBfN7
// SIG // xBT1d+elBQ4XIbKwZJxyD7Ejf4noHu+REx++U9jOWCk3
// SIG // ejGCBA0wggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1w
// SIG // IFBDQSAyMDEwAhMzAAAB9oMvJmpUXSLBAAEAAAH2MA0G
// SIG // CWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMxDQYL
// SIG // KoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIEIBEEn2x5
// SIG // UujWNoMMlT+9EATPWjzGyBwwLzq3GRZDiU7CMIH6Bgsq
// SIG // hkiG9w0BCRACLzGB6jCB5zCB5DCBvQQgK2FM8ZRepuVE
// SIG // i0uH/DVy//GqDRFXbAmUZhfi5UIxtqIwgZgwgYCkfjB8
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNy
// SIG // b3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAfaD
// SIG // LyZqVF0iwQABAAAB9jAiBCDFH6hahDOLzVTeYLJsWbSo
// SIG // 3BujjJgf97qNCGF37G3kczANBgkqhkiG9w0BAQsFAASC
// SIG // AgA4UzPBMwSUSePEHMx2rhpxFZLhGpxPW+KiGf3oKKiM
// SIG // 6wnrJ9tCLSjtyL6iueOd79wC0cP3ntVdLSOExIRN4fj4
// SIG // sVcFiweb+mo4u4tbqvg7JvDDpxB0h6+LqfP26WdeQXxb
// SIG // dTk1Kj9tHuTnc4oFt8SgGbt7Mjs/BRKEL4OrL1LEhbI6
// SIG // 0jhEI8ZqDcEebCWDJUV2rjfwq/ZNqlw0bZFjXvfpWquC
// SIG // 8fmhL7A1B/SXskk3kTbvXonWnfHDUOuoIB/y7OyU7CWh
// SIG // pJEdg+tClVmg9yWQdCtAGYzjuZd2BvEicEwuUPfPNPdN
// SIG // zRM/smjiem5Dh8Lc+5ghv/98kBuM8njOe0zH+TXAWRCZ
// SIG // B6jq5eq0XqZ1oEB12FXOCZIc6mVKrFoZj4wR9NY5uskY
// SIG // Dt/FxHPvEiebTddatGR2BQMRPbK3HCxuARr9tXRkTtzS
// SIG // ogj16EqwbCbaNkfsdy98h6otBt7MgcpxKbjNzu8xsEgN
// SIG // MPAqC4Y5K5dQqn+ewqnIfQGUIMPb6Y+opuf9loCLV6Nd
// SIG // 7wjSCFnLIZjM0OxjSMQPeqIoxhRg6GhI9aTfkGOpXBFP
// SIG // OMRygbOjT5XiTd46heXVgBYQLqy1gITsLMjbi2rHad05
// SIG // FFRFCOSe32V62txDLENy8fIOf2OMqUTNw5khr/l7so7d
// SIG // rwE6XHeZ8HxzDykpR31+vwsY+A==
// SIG // End signature block
