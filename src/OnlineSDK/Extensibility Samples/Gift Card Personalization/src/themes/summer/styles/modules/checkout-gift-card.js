/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

// eslint-disable-next-line import/no-unassigned-import
import './checkout-gift-card.scss';

// SIG // Begin signature block
// SIG // MIIoCQYJKoZIhvcNAQcCoIIn+jCCJ/YCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // WQeYMCzkRj7IRcJnVgzFO1ZFoZO06NgdT2bREiHjDxeg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghnrMIIZ5wIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAE
// SIG // BGx0Bv9XKydyAAAAAAQEMA0GCWCGSAFlAwQCAQUAoIGQ
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMC8GCSqG
// SIG // SIb3DQEJBDEiBCD6p4apocBRw9GmdPmfhprFx5N8Q24v
// SIG // wxGoyWnjYxpvnjBCBgorBgEEAYI3AgEMMTQwMqAUgBIA
// SIG // TQBpAGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAFxO
// SIG // 8KphRcQnKunYoPUyFNgw+O3banklHBvSHefH5sBG1zs1
// SIG // 1u4HMQnZbE5k1zkBsPMMndsOkl7Zxi4BSOIvUS9F/NeF
// SIG // 7ogcu7DFXtqV1qou7nUY8GdPdLl5GYSekqdKaomDFsv6
// SIG // m24hgQ6LKzhA9aqOZpHGu9YAaKK24hvd9pn+dMLsoz9f
// SIG // Cjo6UrD+HVAFYpGbgnjucXjhNAYNiB4TuKBg17RlR2w2
// SIG // S5BOre8hrQd2w9gJTqPd0dNB/cGD55IjJ84aVcVDOEOD
// SIG // DvKw5uFqq+nfWQdOWDEEpK6Mboh3Q7SiWIHkqyXy0cwd
// SIG // y2qSraI9qArHJo0XpyMDJHKJbl6Yr2+hgheTMIIXjwYK
// SIG // KwYBBAGCNwMDATGCF38wghd7BgkqhkiG9w0BBwKgghds
// SIG // MIIXaAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUQYLKoZI
// SIG // hvcNAQkQAQSgggFABIIBPDCCATgCAQEGCisGAQQBhFkK
// SIG // AwEwMTANBglghkgBZQMEAgEFAAQgx+jqfltQqWQMmffQ
// SIG // m/T2mvYihQKsZ7lwPgHJqjum6gYCBmfcbbbxKxgSMjAy
// SIG // NTA0MDQxMDIxMjUuMThaMASAAgH0oIHRpIHOMIHLMQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSUwIwYDVQQLExxNaWNyb3Nv
// SIG // ZnQgQW1lcmljYSBPcGVyYXRpb25zMScwJQYDVQQLEx5u
// SIG // U2hpZWxkIFRTUyBFU046RTAwMi0wNUUwLUQ5NDcxJTAj
// SIG // BgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZp
// SIG // Y2WgghHqMIIHIDCCBQigAwIBAgITMwAAAgsRnVYpkvm/
// SIG // hQABAAACCzANBgkqhkiG9w0BAQsFADB8MQswCQYDVQQG
// SIG // EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
// SIG // BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBQQ0EgMjAxMDAeFw0yNTAxMzAxOTQyNTha
// SIG // Fw0yNjA0MjIxOTQyNThaMIHLMQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMSUwIwYDVQQLExxNaWNyb3NvZnQgQW1lcmljYSBP
// SIG // cGVyYXRpb25zMScwJQYDVQQLEx5uU2hpZWxkIFRTUyBF
// SIG // U046RTAwMi0wNUUwLUQ5NDcxJTAjBgNVBAMTHE1pY3Jv
// SIG // c29mdCBUaW1lLVN0YW1wIFNlcnZpY2UwggIiMA0GCSqG
// SIG // SIb3DQEBAQUAA4ICDwAwggIKAoICAQCqrPitRjAXqFh2
// SIG // IHzQYD3uykDPyJF+79e5CkY4aYsb93QVun4fZ3Ju/0WH
// SIG // rtAF3JswSiAVl7p1H2zFKrvyhaVuRYcSc7YuyP0GHEVq
// SIG // 7YVS5uF3YLlLeoyGOPKSXGs6agW60CqVBhPQ+2n49e6Y
// SIG // D9wGv6Y0HmBKmnQqY/AKJijgUiRulb1ovNEcTZmTNRu1
// SIG // mY+0JjiEus+eF66VNoBv1a2MW0JPYbFBhPzFHlddFXcj
// SIG // f2qIkb5BYWsFL7QlBjXApf2HmNrPzG36g1ybo/KnRjSg
// SIG // IRpHeYXxBIaCEGtR1EmpJ90OSFHxUu7eIjVfenqnVtag
// SIG // 0yAQY7zEWSXMN6+CHjv3SBNtm5ZIRyyCsUZG8454K+86
// SIG // 5bw7FwuH8vk5Q+07K5lFY02eBDw3UKzWjWvqTp2pK8MT
// SIG // a4kozvlKgrSGp5sh57GnkjlvNvt78NXbZTVIrwS7xcIG
// SIG // jbvS/2r5lRDT+Q3P2tT+g6KDPdLntlcbFdHuuzyJyx0W
// SIG // fCr8zHv8wGCB3qPObRXK4opAInSQ4j5iS28KATJGwQab
// SIG // RueZvhvd9Od0wcFYOb4orUv1dD5XwFyKlGDPMcTPOQr0
// SIG // gxmEQVrLiJEoLyyW8EV/aDFUXToxyhfzWZ6Dc0l9eeth
// SIG // 1Et2NQ3A/qBR5x33pjKdHJVJ5xpp2AI3ZzNYLDCqO1lt
// SIG // hz1GaSz+PQIDAQABo4IBSTCCAUUwHQYDVR0OBBYEFGZc
// SIG // LIjfr+l6WeMuhE9gsxe98j/+MB8GA1UdIwQYMBaAFJ+n
// SIG // FV0AXmJdg/Tl0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBS
// SIG // oFCGTmh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lv
// SIG // cHMvY3JsL01pY3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQ
// SIG // Q0ElMjAyMDEwKDEpLmNybDBsBggrBgEFBQcBAQRgMF4w
// SIG // XAYIKwYBBQUHMAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0
// SIG // LmNvbS9wa2lvcHMvY2VydHMvTWljcm9zb2Z0JTIwVGlt
// SIG // ZS1TdGFtcCUyMFBDQSUyMDIwMTAoMSkuY3J0MAwGA1Ud
// SIG // EwEB/wQCMAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgw
// SIG // DgYDVR0PAQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IC
// SIG // AQCaKPVn6GLcnkbPEdM0R9q4Zm0+7JfG05+pmqP6nA4S
// SIG // wT26k9HlJQjqw/+WkiQLD4owJxooIr9MDZbiZX6ypPhF
// SIG // +g1P5u8BOEXPYYkOWpzFGLRLtlZHvfxpqAIa7mjLGHDz
// SIG // Kr/102AXaD4mGydEwaLGhUn9DBGdMm5dhiisWAqb/LN4
// SIG // lm4OuX4YLqKcW/0yScHKgprGgLY+6pqv0zPU74j7eCr+
// SIG // PDTNYM8tFJ/btUnBNLyOE4WZwBIq4tnvXjd2cCOtgUno
// SIG // QjFU1ZY7ZWdny3BJbf3hBrb3NB2IU4nu622tVrb1fNkw
// SIG // dvT501WRUBMd9oFf4xifj2j2Clbv1XGljXmd6yJjvt+b
// SIG // BuvJLUuc9m+vMKOWyRwUdvOl/E5a8zV3MrjCnY6fIrLQ
// SIG // NzBOZ6klICPCi+2GqbViM0CI6CbZypei5Rr9hJbH8rZE
// SIG // zjaYWLnr/XPsU0wr2Tn6L9dJx2q/LAoK+oviAInj0aP4
// SIG // iRrMyUSO6KL2KwY6zJc6SDxbHkwYHdQRrPNP3SutMg6L
// SIG // gBSvtmfqwgaXIHkCoiUFEAz9cGIqvgjGpGppKTcTuoo3
// SIG // EEgp/zRd0wxW0QqmV3ygYGicen30KAWHrKFC8Sbwc6qC
// SIG // 4podVZYJZmirHBP/uo7sQne5H0xtdvDmXDUfy5gNjLlj
// SIG // QIUsJhQSyyXbSjSb2a5jhOUfxzCCB3EwggVZoAMCAQIC
// SIG // EzMAAAAVxedrngKbSZkAAAAAABUwDQYJKoZIhvcNAQEL
// SIG // BQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMT
// SIG // KU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhv
// SIG // cml0eSAyMDEwMB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkz
// SIG // MDE4MzIyNVowfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTAwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQDk4aZM57RyIQt5osvXJHm9DtWC0/3unAcH0qlsTnXI
// SIG // yjVX9gF/bErg4r25PhdgM/9cT8dm95VTcVrifkpa/rg2
// SIG // Z4VGIwy1jRPPdzLAEBjoYH1qUoNEt6aORmsHFPPFdvWG
// SIG // UNzBRMhxXFExN6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8d
// SIG // q6z2Nr41JmTamDu6GnszrYBbfowQHJ1S/rboYiXcag/P
// SIG // XfT+jlPP1uyFVk3v3byNpOORj7I5LFGc6XBpDco2LXCO
// SIG // Mcg1KL3jtIckw+DJj361VI/c+gVVmG1oO5pGve2krnop
// SIG // N6zL64NF50ZuyjLVwIYwXE8s4mKyzbnijYjklqwBSru+
// SIG // cakXW2dg3viSkR4dPf0gz3N9QZpGdc3EXzTdEonW/aUg
// SIG // fX782Z5F37ZyL9t9X4C626p+Nuw2TPYrbqgSUei/BQOj
// SIG // 0XOmTTd0lBw0gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9
// SIG // Q07BMzlMjgK8QmguEOqEUUbi0b1qGFphAXPKZ6Je1yh2
// SIG // AuIzGHLXpyDwwvoSCtdjbwzJNmSLW6CmgyFdXzB0kZSU
// SIG // 2LlQ+QuJYfM2BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6
// SIG // r1AFemzFER1y7435UsSFF5PAPBXbGjfHCBUYP3irRbb1
// SIG // Hode2o+eFnJpxq57t7c+auIurQIDAQABo4IB3TCCAdkw
// SIG // EgYJKwYBBAGCNxUBBAUCAwEAATAjBgkrBgEEAYI3FQIE
// SIG // FgQUKqdS/mTEmr6CkTxGNSnPEP8vBO4wHQYDVR0OBBYE
// SIG // FJ+nFV0AXmJdg/Tl0mWnG1M1GelyMFwGA1UdIARVMFMw
// SIG // UQYMKwYBBAGCN0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9j
// SIG // cy9SZXBvc2l0b3J5Lmh0bTATBgNVHSUEDDAKBggrBgEF
// SIG // BQcDCDAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTAL
// SIG // BgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNV
// SIG // HSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvXzpoYxDBWBgNV
// SIG // HR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29m
// SIG // dC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJB
// SIG // dXRfMjAxMC0wNi0yMy5jcmwwWgYIKwYBBQUHAQEETjBM
// SIG // MEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEw
// SIG // LTA2LTIzLmNydDANBgkqhkiG9w0BAQsFAAOCAgEAnVV9
// SIG // /Cqt4SwfZwExJFvhnnJL/Klv6lwUtj5OR2R4sQaTlz0x
// SIG // M7U518JxNj/aZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZn
// SIG // OlNN3Zi6th542DYunKmCVgADsAW+iehp4LoJ7nvfam++
// SIG // Kctu2D9IdQHZGN5tggz1bSNU5HhTdSRXud2f8449xvNo
// SIG // 32X2pFaq95W2KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5
// SIG // KYnDvBewVIVCs/wMnosZiefwC2qBwoEZQhlSdYo2wh3D
// SIG // YXMuLGt7bj8sCXgU6ZGyqVvfSaN0DLzskYDSPeZKPmY7
// SIG // T7uG+jIa2Zb0j/aRAfbOxnT99kxybxCrdTDFNLB62FD+
// SIG // CljdQDzHVG2dY3RILLFORy3BFARxv2T5JL5zbcqOCb2z
// SIG // AVdJVGTZc9d/HltEAY5aGZFrDZ+kKNxnGSgkujhLmm77
// SIG // IVRrakURR6nxt67I6IleT53S0Ex2tVdUCbFpAUR+fKFh
// SIG // bHP+CrvsQWY9af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGE
// SIG // vL8CwYKiexcdFYmNcP7ntdAoGokLjzbaukz5m/8K6TT4
// SIG // JDVnK+ANuOaMmdbhIurwJ0I9JZTmdHRbatGePu1+oDEz
// SIG // fbzL6Xu/OHBE0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDB
// SIG // cQZqELQdVTNYs6FwZvKhggNNMIICNQIBATCB+aGB0aSB
// SIG // zjCByzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjElMCMGA1UECxMc
// SIG // TWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUG
// SIG // A1UECxMeblNoaWVsZCBUU1MgRVNOOkUwMDItMDVFMC1E
// SIG // OTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFt
// SIG // cCBTZXJ2aWNloiMKAQEwBwYFKw4DAhoDFQCoQndUJN3P
// SIG // pq2xh8RhtsR35NCZwaCBgzCBgKR+MHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwMA0GCSqGSIb3DQEBCwUAAgUA
// SIG // 65oIijAiGA8yMDI1MDQwNDA3MjgxMFoYDzIwMjUwNDA1
// SIG // MDcyODEwWjB0MDoGCisGAQQBhFkKBAExLDAqMAoCBQDr
// SIG // mgiKAgEAMAcCAQACAgu+MAcCAQACAhIeMAoCBQDrm1oK
// SIG // AgEAMDYGCisGAQQBhFkKBAIxKDAmMAwGCisGAQQBhFkK
// SIG // AwKgCjAIAgEAAgMHoSChCjAIAgEAAgMBhqAwDQYJKoZI
// SIG // hvcNAQELBQADggEBAC2yZQ/5xefPvsGWGkdRN/MYVoKa
// SIG // 2QWxZNcQ0UF1fPSIyjwY5EkGzz2ogsezgTmad9Pv8fff
// SIG // oLsOSZgQCvNgvZLWfKcMMxXoLdDEA93Ewr7DZnSBBetD
// SIG // h/rEIvyFLSskfyw9w16ubYWaXA05NWQkZb9eW7xEKSCW
// SIG // jW/+/l/YG7caLVpuuywOK4T4Me8ylWxYFeCHU6BdOjDi
// SIG // JMMSB4kuxFxxWjVnW5tmTXyZDvW9vVU2kOcqOi0egPEx
// SIG // +3yXBHkxDSx3QEwlUwjAKU6CQQ5JqNqnNrGwA6dlk7zM
// SIG // y+QCVp0BUatqA+zBX524Nx/xp2766bnZoKKf+697E2dc
// SIG // xM/JTL4xggQNMIIECQIBATCBkzB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMAITMwAAAgsRnVYpkvm/hQABAAAC
// SIG // CzANBglghkgBZQMEAgEFAKCCAUowGgYJKoZIhvcNAQkD
// SIG // MQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCAE
// SIG // 03fw2hw2e459Gif8z2Kcr/B2TbW16Jws7rMpFQ2thzCB
// SIG // +gYLKoZIhvcNAQkQAi8xgeowgecwgeQwgb0EIDTVdKu6
// SIG // N77bh0wdOyF+ogRN8vKJcw5jnf2/EussYkozMIGYMIGA
// SIG // pH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMA
// SIG // AAILEZ1WKZL5v4UAAQAAAgswIgQgFIeBAD8U3SKQBb9O
// SIG // ibltuZgfPSxJyNqi1r8OAHb4I+gwDQYJKoZIhvcNAQEL
// SIG // BQAEggIACXLAdFJwLyFgOXYevoyN6+hBSN9ZANWbEoib
// SIG // sWUjLNA5peyGmz0PuWZqSKCajVQIo+H+dWLIs2TqXg3p
// SIG // J4P1FrgONklM4Ebl6StdxHHx3DGMMNZReLV4aJo0F6Ib
// SIG // i9sIZ+mswQSLm9i7Rl0Oxg5SSQlpMSQNqFDhDV0P/NTk
// SIG // XHBc050+OJHNJWAcVkWFlefpF0MuP58edNvdkMAxJw2m
// SIG // ol3FJiJvXajhzwy0tmiPdZloUODgQziLHB874hTrdqUG
// SIG // eG55U/M4J0ofQDqLsm0ugYc6+N32Q4XNLC/DtavcYBvd
// SIG // zFyTv0Hbk6xFhNaTioqDc3P3giuTTaemJMsdGgGhYD7D
// SIG // HgttgvBE3jIHjA8YACp1xm7IVqBSJzBLjRyNQL9mo567
// SIG // 5SxhViYUZo2EhU88A+PM7i53X0lbfhXINS1dbkd4FwHB
// SIG // sWGswjgIO3I68izUIWXhu8LaGMrh5PUwA30A28WRILur
// SIG // WPVCdzVajb0yrY2gHXyySBDuMupJcbQhzeYq+qQCbOKD
// SIG // V8bSuex4XXsD1LYNzKurX7iZVO2evMaSB+m6NJQpQBVA
// SIG // P8MChQy+WBPqT+RMH3g6IeOJZg6quBQp720XhP81F7Dq
// SIG // PT0sNHDgrRvnUFPSTG04/neEgjK6Y+QUvicL57o9NIlK
// SIG // 3EdAUJGeAZ/fuqrkGP//VqrEy2prFGg=
// SIG // End signature block
