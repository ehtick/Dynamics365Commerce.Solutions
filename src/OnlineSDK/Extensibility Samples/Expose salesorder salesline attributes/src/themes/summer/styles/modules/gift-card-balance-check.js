/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

// eslint-disable-next-line import/no-unassigned-import
import './gift-card-balance-check.scss';

// SIG // Begin signature block
// SIG // MIIoHAYJKoZIhvcNAQcCoIIoDTCCKAkCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // LlDblVxyUk+G+R/J14xCtSTQNNgrhVU3LZ+89Vt3aYWg
// SIG // gg2FMIIGAzCCA+ugAwIBAgITMwAABAO91ZVdDzsYrQAA
// SIG // AAAEAzANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTI0MDkxMjIwMTExM1oX
// SIG // DTI1MDkxMTIwMTExM1owdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // n3RnXcCDp20WFMoNNzt4s9fV12T5roRJlv+bshDfvJoM
// SIG // ZfhyRnixgUfGAbrRlS1St/EcXFXD2MhRkF3CnMYIoeMO
// SIG // MuMyYtxr2sC2B5bDRMUMM/r9I4GP2nowUthCWKFIS1RP
// SIG // lM0YoVfKKMaH7bJii29sW+waBUulAKN2c+Gn5znaiOxR
// SIG // qIu4OL8f9DCHYpME5+Teek3SL95sH5GQhZq7CqTdM0fB
// SIG // w/FmLLx98SpBu7v8XapoTz6jJpyNozhcP/59mi/Fu4tT
// SIG // 2rI2vD50Vx/0GlR9DNZ2py/iyPU7DG/3p1n1zluuRp3u
// SIG // XKjDfVKH7xDbXcMBJid22a3CPbuC2QJLowIDAQABo4IB
// SIG // gjCCAX4wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFOpuKgJKc+OuNYitoqxfHlrE
// SIG // gXAZMFQGA1UdEQRNMEukSTBHMS0wKwYDVQQLEyRNaWNy
// SIG // b3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQx
// SIG // FjAUBgNVBAUTDTIzMDAxMis1MDI5MjYwHwYDVR0jBBgw
// SIG // FoAUSG5k5VAF04KqFzc3IrVtqMp1ApUwVAYDVR0fBE0w
// SIG // SzBJoEegRYZDaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraW9wcy9jcmwvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNybDBhBggrBgEFBQcBAQRVMFMwUQYIKwYB
// SIG // BQUHMAKGRWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNydDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQBRaP+hOC1+dSKhbqCr1LIvNEMrRiOQ
// SIG // EkPc7D6QWtM+/IbrYiXesNeeCZHCMf3+6xASuDYQ+AyB
// SIG // TX0YlXSOxGnBLOzgEukBxezbfnhUTTk7YB2/TxMUcuBC
// SIG // P45zMM0CVTaJE8btloB6/3wbFrOhvQHCILx41jTd6kUq
// SIG // 4bIBHah3NG0Q1H/FCCwHRGTjAbyiwq5n/pCTxLz5XYCu
// SIG // 4RTvy/ZJnFXuuwZynowyju90muegCToTOwpHgE6yRcTv
// SIG // Ri16LKCr68Ab8p8QINfFvqWoEwJCXn853rlkpp4k7qzw
// SIG // lBNiZ71uw2pbzjQzrRtNbCFQAfmoTtsHFD2tmZvQIg1Q
// SIG // VkzM/V1KCjHL54ItqKm7Ay4WyvqWK0VIEaTbdMtbMWbF
// SIG // zq2hkRfJTNnFr7RJFeVC/k0DNaab+bpwx5FvCUvkJ3z2
// SIG // wfHWVUckZjEOGmP7cecefrF+rHpif/xW4nJUjMUiPsyD
// SIG // btY2Hq3VMLgovj+qe0pkJgpYQzPukPm7RNhbabFNFvq+
// SIG // kXWBX/z/pyuo9qLZfTb697Vi7vll5s/DBjPtfMpyfpWG
// SIG // 0phVnAI+0mM4gH09LCMJUERZMgu9bbCGVIQR7cT5YhlL
// SIG // t+tpSDtC6XtAzq4PJbKZxFjpB5wk+SRJ1gm87olbfEV9
// SIG // SFdO7iL3jWbjgVi1Qs1iYxBmvh4WhLWr48uouzCCB3ow
// SIG // ggVioAMCAQICCmEOkNIAAAAAAAMwDQYJKoZIhvcNAQEL
// SIG // BQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMT
// SIG // KU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhv
// SIG // cml0eSAyMDExMB4XDTExMDcwODIwNTkwOVoXDTI2MDcw
// SIG // ODIxMDkwOVowfjELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYG
// SIG // A1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0Eg
// SIG // MjAxMTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC
// SIG // ggIBAKvw+nIQHC6t2G6qghBNNLrytlghn0IbKmvpWlCq
// SIG // uAY4GgRJun/DDB7dN2vGEtgL8DjCmQawyDnVARQxQtOJ
// SIG // DXlkh36UYCRsr55JnOloXtLfm1OyCizDr9mpK656Ca/X
// SIG // llnKYBoF6WZ26DJSJhIv56sIUM+zRLdd2MQuA3WraPPL
// SIG // bfM6XKEW9Ea64DhkrG5kNXimoGMPLdNAk/jj3gcN1Vx5
// SIG // pUkp5w2+oBN3vpQ97/vjK1oQH01WKKJ6cuASOrdJXtjt
// SIG // 7UORg9l7snuGG9k+sYxd6IlPhBryoS9Z5JA7La4zWMW3
// SIG // Pv4y07MDPbGyr5I4ftKdgCz1TlaRITUlwzluZH9TupwP
// SIG // rRkjhMv0ugOGjfdf8NBSv4yUh7zAIXQlXxgotswnKDgl
// SIG // mDlKNs98sZKuHCOnqWbsYR9q4ShJnV+I4iVd0yFLPlLE
// SIG // tVc/JAPw0XpbL9Uj43BdD1FGd7P4AOG8rAKCX9vAFbO9
// SIG // G9RVS+c5oQ/pI0m8GLhEfEXkwcNyeuBy5yTfv0aZxe/C
// SIG // HFfbg43sTUkwp6uO3+xbn6/83bBm4sGXgXvt1u1L50kp
// SIG // pxMopqd9Z4DmimJ4X7IvhNdXnFy/dygo8e1twyiPLI9A
// SIG // N0/B4YVEicQJTMXUpUMvdJX3bvh4IFgsE11glZo+TzOE
// SIG // 2rCIF96eTvSWsLxGoGyY0uDWiIwLAgMBAAGjggHtMIIB
// SIG // 6TAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQUSG5k
// SIG // 5VAF04KqFzc3IrVtqMp1ApUwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAUci06AjGQQ7kUBU7h
// SIG // 6qfHMdEjiTQwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNy
// SIG // bDBeBggrBgEFBQcBAQRSMFAwTgYIKwYBBQUHMAKGQmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMv
// SIG // TWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNydDCB
// SIG // nwYDVR0gBIGXMIGUMIGRBgkrBgEEAYI3LgMwgYMwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvZG9jcy9wcmltYXJ5Y3BzLmh0bTBABggr
// SIG // BgEFBQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBwAG8AbABp
// SIG // AGMAeQBfAHMAdABhAHQAZQBtAGUAbgB0AC4gHTANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAZ/KGpZjgVHkaLtPYdGcimwuW
// SIG // EeFjkplCln3SeQyQwWVfLiw++MNy0W2D/r4/6ArKO79H
// SIG // qaPzadtjvyI1pZddZYSQfYtGUFXYDJJ80hpLHPM8QotS
// SIG // 0LD9a+M+By4pm+Y9G6XUtR13lDni6WTJRD14eiPzE32m
// SIG // kHSDjfTLJgJGKsKKELukqQUMm+1o+mgulaAqPyprWElj
// SIG // HwlpblqYluSD9MCP80Yr3vw70L01724lruWvJ+3Q3fMO
// SIG // r5kol5hNDj0L8giJ1h/DMhji8MUtzluetEk5CsYKwsat
// SIG // ruWy2dsViFFFWDgycScaf7H0J/jeLDogaZiyWYlobm+n
// SIG // t3TDQAUGpgEqKD6CPxNNZgvAs0314Y9/HG8VfUWnduVA
// SIG // KmWjw11SYobDHWM2l4bf2vP48hahmifhzaWX0O5dY0Hj
// SIG // Wwechz4GdwbRBrF1HxS+YWG18NzGGwS+30HHDiju3mUv
// SIG // 7Jf2oVyW2ADWoUa9WfOXpQlLSBCZgB/QACnFsZulP0V3
// SIG // HjXG0qKin3p6IvpIlR+r+0cjgPWe+L9rt0uX4ut1eBrs
// SIG // 6jeZeRhL/9azI2h15q/6/IvrC4DqaTuv/DDtBEyO3991
// SIG // bWORPdGdVk5Pv4BXIqF4ETIheu9BCrE/+6jMpF3BoYib
// SIG // V3FWTkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0x
// SIG // ghnvMIIZ6wIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAAEA73VlV0POxitAAAAAAQDMA0G
// SIG // CWCGSAFlAwQCAQUAoIGQMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMC8GCSqGSIb3DQEJBDEiBCBHRrCPVjeh
// SIG // PEWn67m4DK94h0Q/zKVvEfVnOdrHE+ZJijBCBgorBgEE
// SIG // AYI3AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHSh
// SIG // GoAYaHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqG
// SIG // SIb3DQEBAQUABIIBAAjLFF3XV21ZLE71+ZFqPJBNuCZa
// SIG // +rK4jlQP/QqcKK14XgBLhbWUxkRRqC6XXcmUA+h+gkHb
// SIG // zU4zgTfiA9zHYjt4dilRQEsNsHty4eKHl0LeFhrvQ2xr
// SIG // KB547DF9TXXr242FcfuGkzmtHr+ThiMPHPVmV/k8iSs1
// SIG // 0ALCzQj5GaBxjjJ0yo56BIC9a2ogzAzWlRAr1Yhgt5B4
// SIG // 4P0/Qq6F4pLbkRwsOhlRvNj9bxuJvA5bCTs1VDCLS2fx
// SIG // pm8yaIV2ndKRdCOcKhD5n5ggOATwHAx6Bwgq02N6Inr9
// SIG // jy1XP2k/PGdKE23TBOK2+SxJkhLLnEu8/g+XXCaj+mbQ
// SIG // adKfypShgheXMIIXkwYKKwYBBAGCNwMDATGCF4Mwghd/
// SIG // BgkqhkiG9w0BBwKgghdwMIIXbAIBAzEPMA0GCWCGSAFl
// SIG // AwQCAQUAMIIBUgYLKoZIhvcNAQkQAQSgggFBBIIBPTCC
// SIG // ATkCAQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEF
// SIG // AAQg1Oq6WSOQya1beE84pK9Whb7BBNdIxTCkM4sUnvrt
// SIG // u+oCBmffCbY9LxgTMjAyNTA0MDIxMDIzNTAuMjY5WjAE
// SIG // gAIB9KCB0aSBzjCByzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEl
// SIG // MCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0
// SIG // aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOjM3
// SIG // MDMtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNloIIR7TCCByAwggUIoAMC
// SIG // AQICEzMAAAIKR7IU2e6ysw8AAQAAAgowDQYJKoZIhvcN
// SIG // AQELBQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UE
// SIG // AxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAw
// SIG // HhcNMjUwMTMwMTk0MjU3WhcNMjYwNDIyMTk0MjU3WjCB
// SIG // yzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWlj
// SIG // cm9zb2Z0IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UE
// SIG // CxMeblNoaWVsZCBUU1MgRVNOOjM3MDMtMDVFMC1EOTQ3
// SIG // MSUwIwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBT
// SIG // ZXJ2aWNlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIIC
// SIG // CgKCAgEAsuzc8BKW+wacAJPSydNF6t9E3E43MDWfNE8Q
// SIG // LQG4UmidpMJyQNQLvw6Pf3xAYwB7+jJrbd35jw3iCZ0O
// SIG // 1QXiKvEXH43I62zyIN8AOb+TEH5TzUgTTr3F0T/n2ZwM
// SIG // tBCw835yR5wpGTbEFGexhey8VC0yjmGNmCcOE65nB6IZ
// SIG // GOg4wmcsYaphkMMHW46D1kW2Lv6MxXpv8nyT8o1Qapdd
// SIG // OvG3FYefAPHOQg+k1jfy97vjcvuzvPg73q+qgU+OBMu6
// SIG // Xz2TGdR4u8rwi7+Sxs0geqNjg+RiGcu8+JIfFGB3c45/
// SIG // VsfkGdtt90iUCrWYaSO7h396DE4NM2p0H8+5oLnXn5hg
// SIG // a0BINaMd5/t04s4dA/c1ZjUD/bBY7D0LTRmfSA/R/APp
// SIG // BSJ8eJq0sQNkshjDkHMZRjN9JLSCjN4qgrhRFPQh1TKT
// SIG // feP9X5eE+j6Jyfv6FiahZWrWLjCr9mfLoqa5xXAMQqTr
// SIG // AyFQTvStbx3gDIkEFJXBPQg+d+iNWC55jtqh2oDz5l4X
// SIG // Thqx1JwlLaKdtXpbpB4e+av+cx/jpzXpKebnaY0DWQr4
// SIG // mAGXR7C55FNDX1AK+q9VKg3Eqtcn+UYsIpgfEo7HZh5Z
// SIG // eID45qlYtP65pzNaABEJtz8lnE0EIm2C4rije2OIqOWy
// SIG // U1cJvr0UW6SeVC/w99wv/+6px23qFgUCAwEAAaOCAUkw
// SIG // ggFFMB0GA1UdDgQWBBQCrxdBBI+AMj32PFv6q7AL37Wc
// SIG // JDAfBgNVHSMEGDAWgBSfpxVdAF5iXYP05dJlpxtTNRnp
// SIG // cjBfBgNVHR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQl
// SIG // MjBUaW1lLVN0YW1wJTIwUENBJTIwMjAxMCgxKS5jcmww
// SIG // bAYIKwYBBQUHAQEEYDBeMFwGCCsGAQUFBzAChlBodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRz
// SIG // L01pY3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAy
// SIG // MDEwKDEpLmNydDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB
// SIG // /wQMMAoGCCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDAN
// SIG // BgkqhkiG9w0BAQsFAAOCAgEAsJNz1tAsozmqlwjDrrE3
// SIG // Xu3qdgsD/8VdSd6PSgIiknavGtlEeUQh2IZybHnpsHjF
// SIG // B9pDXn6ZwIdgZ/B9qKQ87QyZI/DmEXfykMrBNdjcGmNy
// SIG // jsAFvEYPDnV7+X1GSLDloKa5AkDNFaBR3V2BMZCTdxMw
// SIG // W1AlMN8m+IABTyuek/unD6SPDCSyQkFxzTILYtkGYV/S
// SIG // pH0QH3xWDBXKbGyPqM4guQa65N9+tXCRR4YBCUdCeNp6
// SIG // mUxkoFKQxh0mQERqjXAFeYfjkAy3hdqd1Ecfz+jHFINZ
// SIG // ydoDD2AbA/m8HfQdHP1yGfTLd7o5RCz6ZIo4wnUmcYc7
// SIG // tjN0mVia+e7mPhQvi7KbyDh9TqaH2p4dyRg6LDXABLvc
// SIG // lDFirBATJ4A+lVkEkGGel/RfNMwqHmcE6tIvQLo52M88
// SIG // eVtnxIGXo0buitRggEps7TZWCZQAo6mn1kaH06pCYVfy
// SIG // dr/e1967g736bjrkKFLVQMF6w7BtjTgbr1bKOSnVueIQ
// SIG // UrM/+PjkQeKi56uPxjbWo1B6KykShxjoBaPAymlxvlDQ
// SIG // DcIRjcR2yC0mufT8RMTIAowUT9/NvMhirKrkhM8yzVp8
// SIG // +Wn/WZnh+PNPX8CLbSONSZLomPV+oZjJi2L/DmN+L7zi
// SIG // vs8sZEvvQVC1QD+oLfsmh2gZa5Z/BouP3Qa9sukq6/+e
// SIG // oNAwggdxMIIFWaADAgECAhMzAAAAFcXna54Cm0mZAAAA
// SIG // AAAVMA0GCSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMTIwMAYDVQQDEylNaWNyb3NvZnQgUm9vdCBD
// SIG // ZXJ0aWZpY2F0ZSBBdXRob3JpdHkgMjAxMDAeFw0yMTA5
// SIG // MzAxODIyMjVaFw0zMDA5MzAxODMyMjVaMHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwMIICIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAg8AMIICCgKCAgEA5OGmTOe0ciELeaLL1yR5
// SIG // vQ7VgtP97pwHB9KpbE51yMo1V/YBf2xK4OK9uT4XYDP/
// SIG // XE/HZveVU3Fa4n5KWv64NmeFRiMMtY0Tz3cywBAY6GB9
// SIG // alKDRLemjkZrBxTzxXb1hlDcwUTIcVxRMTegCjhuje3X
// SIG // D9gmU3w5YQJ6xKr9cmmvHaus9ja+NSZk2pg7uhp7M62A
// SIG // W36MEBydUv626GIl3GoPz130/o5Tz9bshVZN7928jaTj
// SIG // kY+yOSxRnOlwaQ3KNi1wjjHINSi947SHJMPgyY9+tVSP
// SIG // 3PoFVZhtaDuaRr3tpK56KTesy+uDRedGbsoy1cCGMFxP
// SIG // LOJiss254o2I5JasAUq7vnGpF1tnYN74kpEeHT39IM9z
// SIG // fUGaRnXNxF803RKJ1v2lIH1+/NmeRd+2ci/bfV+Autuq
// SIG // fjbsNkz2K26oElHovwUDo9Fzpk03dJQcNIIP8BDyt0cY
// SIG // 7afomXw/TNuvXsLz1dhzPUNOwTM5TI4CvEJoLhDqhFFG
// SIG // 4tG9ahhaYQFzymeiXtcodgLiMxhy16cg8ML6EgrXY28M
// SIG // yTZki1ugpoMhXV8wdJGUlNi5UPkLiWHzNgY1GIRH29wb
// SIG // 0f2y1BzFa/ZcUlFdEtsluq9QBXpsxREdcu+N+VLEhReT
// SIG // wDwV2xo3xwgVGD94q0W29R6HXtqPnhZyacaue7e3Pmri
// SIG // Lq0CAwEAAaOCAd0wggHZMBIGCSsGAQQBgjcVAQQFAgMB
// SIG // AAEwIwYJKwYBBAGCNxUCBBYEFCqnUv5kxJq+gpE8RjUp
// SIG // zxD/LwTuMB0GA1UdDgQWBBSfpxVdAF5iXYP05dJlpxtT
// SIG // NRnpcjBcBgNVHSAEVTBTMFEGDCsGAQQBgjdMg30BATBB
// SIG // MD8GCCsGAQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpb3BzL0RvY3MvUmVwb3NpdG9yeS5odG0w
// SIG // EwYDVR0lBAwwCgYIKwYBBQUHAwgwGQYJKwYBBAGCNxQC
// SIG // BAweCgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1Ud
// SIG // EwEB/wQFMAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxi
// SIG // aNE9lJBb186aGMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0
// SIG // cDovL2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJv
// SIG // ZHVjdHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3Js
// SIG // MFoGCCsGAQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0
// SIG // cDovL3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9N
// SIG // aWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcnQwDQYJKoZI
// SIG // hvcNAQELBQADggIBAJ1VffwqreEsH2cBMSRb4Z5yS/yp
// SIG // b+pcFLY+TkdkeLEGk5c9MTO1OdfCcTY/2mRsfNB1OW27
// SIG // DzHkwo/7bNGhlBgi7ulmZzpTTd2YurYeeNg2LpypglYA
// SIG // A7AFvonoaeC6Ce5732pvvinLbtg/SHUB2RjebYIM9W0j
// SIG // VOR4U3UkV7ndn/OOPcbzaN9l9qRWqveVtihVJ9AkvUCg
// SIG // vxm2EhIRXT0n4ECWOKz3+SmJw7wXsFSFQrP8DJ6LGYnn
// SIG // 8AtqgcKBGUIZUnWKNsIdw2FzLixre24/LAl4FOmRsqlb
// SIG // 30mjdAy87JGA0j3mSj5mO0+7hvoyGtmW9I/2kQH2zsZ0
// SIG // /fZMcm8Qq3UwxTSwethQ/gpY3UA8x1RtnWN0SCyxTkct
// SIG // wRQEcb9k+SS+c23Kjgm9swFXSVRk2XPXfx5bRAGOWhmR
// SIG // aw2fpCjcZxkoJLo4S5pu+yFUa2pFEUep8beuyOiJXk+d
// SIG // 0tBMdrVXVAmxaQFEfnyhYWxz/gq77EFmPWn9y8FBSX5+
// SIG // k77L+DvktxW/tM4+pTFRhLy/AsGConsXHRWJjXD+57XQ
// SIG // KBqJC4822rpM+Zv/Cuk0+CQ1ZyvgDbjmjJnW4SLq8CdC
// SIG // PSWU5nR0W2rRnj7tfqAxM328y+l7vzhwRNGQ8cirOoo6
// SIG // CGJ/2XBjU02N7oJtpQUQwXEGahC0HVUzWLOhcGbyoYID
// SIG // UDCCAjgCAQEwgfmhgdGkgc4wgcsxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVyaWNh
// SIG // IE9wZXJhdGlvbnMxJzAlBgNVBAsTHm5TaGllbGQgVFNT
// SIG // IEVTTjozNzAzLTA1RTAtRDk0NzElMCMGA1UEAxMcTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEBMAcG
// SIG // BSsOAwIaAxUA0QDFSZQOmyqvd1Z7t1JCYJuR5WGggYMw
// SIG // gYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAN
// SIG // BgkqhkiG9w0BAQsFAAIFAOuXXxMwIhgPMjAyNTA0MDIw
// SIG // NzAwMzVaGA8yMDI1MDQwMzA3MDAzNVowdzA9BgorBgEE
// SIG // AYRZCgQBMS8wLTAKAgUA65dfEwIBADAKAgEAAgJEtgIB
// SIG // /zAHAgEAAgIW/jAKAgUA65iwkwIBADA2BgorBgEEAYRZ
// SIG // CgQCMSgwJjAMBgorBgEEAYRZCgMCoAowCAIBAAIDB6Eg
// SIG // oQowCAIBAAIDAYagMA0GCSqGSIb3DQEBCwUAA4IBAQAY
// SIG // PO9TCukI/dFZh720R2ZKPxbA3VMKqIg0EFTtLNHDp9b5
// SIG // aTT30imTnrRthye/MPo51/nyNtrsjF9CUjQz8+NC6Yfn
// SIG // X0M+S/rfZ9RKrLerF9oS5k6malv7jefGwJfA5+Ql2ZEh
// SIG // qg/84sTpoi0A7e2MdIxmlXJsRGZwIZMnL3PjTUqtKqdo
// SIG // oZeTPlrC/rQjHL77z1dMu1K6Ql+OUhmFRoAnzEn8uM2q
// SIG // N2aSHBcHXwxhoBsXLIPOe7OzbshXKFSHwUSvLL95D3Fg
// SIG // tEbLokPaV+60RMfk5WlNEd0ato6ws0h+P7lh/ci90HLY
// SIG // 4W0qAV+deEFJTtAKKwA9NZT/5guXiDx/MYIEDTCCBAkC
// SIG // AQEwgZMwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UE
// SIG // AxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAC
// SIG // EzMAAAIKR7IU2e6ysw8AAQAAAgowDQYJYIZIAWUDBAIB
// SIG // BQCgggFKMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRAB
// SIG // BDAvBgkqhkiG9w0BCQQxIgQgMbrAXuSHi4UwUEowgWSE
// SIG // wEDvVRpFDs9CLbuHocJk/PEwgfoGCyqGSIb3DQEJEAIv
// SIG // MYHqMIHnMIHkMIG9BCBNmsv8tHqSv192dNyk3JaKhPLv
// SIG // SF0bXTuzHsdIcPfkmjCBmDCBgKR+MHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwAhMzAAACCkeyFNnusrMPAAEA
// SIG // AAIKMCIEIMZ/GttO7ijjBnAOU+mIGvbWIUy6Q4VPqeag
// SIG // BrifmQCfMA0GCSqGSIb3DQEBCwUABIICAFkofoAS9V6H
// SIG // M1Z4Fgm557FkUl75k/+ZL+//w0+DG5V3v7VbbX5+9GZO
// SIG // cdCsXwRfiA2Z4mcQAbRMomUTUJgQvIQxTyJq3VCFA5Yd
// SIG // dXQ5eZnVZGNvjwALSoKhBF39sPfLng39cuwZRwVBrRuJ
// SIG // i9fBKwB7t/k/I4+8sKuIcGRD4Audki8uoXaodFz8hmwF
// SIG // EMLmVQkrgfzgg1WBWjHyl7KdZBuOTTYrbPEOp5TIotVq
// SIG // HltsurDmYbFYR9zDJc1NYsJM2UEmR0N4Ywy64hamsrr9
// SIG // BPG8haapAWPqItYnjsXmkqstIgJtC6qMK+Y4HzxE9f4d
// SIG // dl8Ud2SSTgKFXu5COERdCdWKtuI3a5lslChd6AqGDvgH
// SIG // qbSZxABr7ixXttqGQ+FsCR+RLvMmXNsFVKwRUJc2S2aI
// SIG // 9vPPf08/CUZnp/tnnjjzpnraqXZolC3Vyoaj8t2vhCJO
// SIG // drL1HWHAv3hcwjMT4nUZCOJwkxqZoh2xbQ7wDtuq7xRJ
// SIG // GTyR/6bKFjc7ucaB/EnoepgEn/Pb2ERU+PSVsEQxm6zI
// SIG // ciW4S9NwfL83Y6UIQB+qPwRzFSO8KRv12X1ApeE6I0Ra
// SIG // MjI1FFPY2bw9Or4CPBvHHtJzec9xKcl1uyTBZvNmbejX
// SIG // 73SmbGAJZwuuySpKyNlAe+9TwEFyIrARSwc1PfO4ff6i
// SIG // /7TtKJhUavLk
// SIG // End signature block
