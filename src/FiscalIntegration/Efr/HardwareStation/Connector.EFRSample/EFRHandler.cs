﻿/**
* SAMPLE CODE NOTICE
* 
* THIS SAMPLE CODE IS MADE AVAILABLE AS IS.  MICROSOFT MAKES NO WARRANTIES, WHETHER EXPRESS OR IMPLIED,
* OF FITNESS FOR A PARTICULAR PURPOSE, OF ACCURACY OR COMPLETENESS OF RESPONSES, OF RESULTS, OR CONDITIONS OF MERCHANTABILITY.
* THE ENTIRE RISK OF THE USE OR THE RESULTS FROM THE USE OF THIS SAMPLE CODE REMAINS WITH THE USER.
* NO TECHNICAL SUPPORT IS PROVIDED.  YOU MAY NOT DISTRIBUTE THIS CODE UNLESS YOU HAVE A LICENSE AGREEMENT WITH MICROSOFT THAT ALLOWS YOU TO DO SO.
*/

namespace Contoso
{
    namespace Commerce.HardwareStation.EFRSample
    {
        using System;
        using System.Collections.Generic;
        using System.Net.Http;
        using System.Threading;
        using Contoso.Commerce.HardwareStation.EFRSample.Constants;
        using Microsoft.Dynamics.Commerce.HardwareStation;
        using Microsoft.Dynamics.Commerce.HardwareStation.PeripheralRequests;
        using Microsoft.Dynamics.Commerce.HardwareStation.Peripherals.Entities;
        using Microsoft.Dynamics.Commerce.Runtime.Handlers;
        using Microsoft.Dynamics.Commerce.Runtime.Messages;

        /// <summary>
        /// Handler for EFSTA (European Fiscal Standards Association) Fiscal Register.
        /// </summary>
        public class EFRHandler : INamedRequestHandler
        {
            /// <summary>
            /// Gets name of the handler.
            /// </summary>
            public string HandlerName => "EFRSample";

            /// <summary>
            /// Gets supported types.
            /// </summary>
            public IEnumerable<Type> SupportedRequestTypes => new[]
            {
                typeof(InitializeFiscalDeviceRequest),
                typeof(SubmitDocumentFiscalDeviceRequest),
                typeof(IsReadyFiscalDeviceRequest)
            };

            /// <summary>
            /// Represents an enty point for the request handler.
            /// </summary>
            /// <param name="request">The request.</param>
            /// <returns>The response.</returns>
            public Response Execute(Request request)
            {
                ThrowIf.Null(request, nameof(request));

                if (request is InitializeFiscalDeviceRequest)
                {
                    return this.Initialize(request as InitializeFiscalDeviceRequest);
                }
                else if (request is SubmitDocumentFiscalDeviceRequest)
                {
                    return this.SubmitDocument(request as SubmitDocumentFiscalDeviceRequest);
                }
                else if (request is IsReadyFiscalDeviceRequest)
                {
                    return this.IsReady(request as IsReadyFiscalDeviceRequest);                    
                }
                else
                {
                    throw new NotSupportedException(string.Format("Request '{0}' is not supported.", request.GetType()));
                }
            }

            /// <summary>
            /// Initializes service.
            /// </summary>
            /// <param name="request">The request.</param>
            /// <returns>The response.</returns>
            private Response Initialize(InitializeFiscalDeviceRequest request)
            {
                ThrowIf.Null(request, nameof(request));

                InitializeFiscalDeviceResponse response;

                response = new InitializeFiscalDeviceResponse(string.Empty, FiscalPeripheralCommunicationResultType.None, new FiscalPeripheralFailureDetails(), string.Empty);

                return response;
            }

            /// <summary>
            /// Submits the document.
            /// </summary>
            /// <param name="request">The request.</param>
            /// <returns>The response.</returns>
            private Response SubmitDocument(SubmitDocumentFiscalDeviceRequest request)
            {
                ThrowIf.NullOrWhiteSpace(request.Document, nameof(request.Document));
                ThrowIf.Null(request.PeripheralInfo, nameof(request.PeripheralInfo));
                ThrowIf.Null(request.PeripheralInfo.DeviceName, nameof(request.PeripheralInfo.DeviceName));
                ThrowIf.Null(request.PeripheralInfo.DeviceProperties, nameof(request.PeripheralInfo.DeviceName));

                SubmitDocumentFiscalDeviceResponse response;

                try
                {
                    using (var timeoutCancellationTokenSource = new CancellationTokenSource())
                    {
                        var timeoutValue = ConfigurationController.GetTimeoutValue(request.PeripheralInfo.DeviceProperties);
                        var includeUserNotificationMessage = ConfigurationController.GetShowUserNotificationMessage(request.PeripheralInfo.DeviceProperties);

                        var task = TransactionRegistrationController.RegisterAsync(
                            request.Document,
                            ConfigurationController.GetEndpointAddress(request.PeripheralInfo.DeviceProperties), 
                            timeoutCancellationTokenSource.Token
                        );

                        if (task.Wait(timeoutValue > 0 ? timeoutValue : Timeout.Infinite))
                        {
                            string responseFromService = task.Result;
                            response = FiscalDeviceResponseParser.ParseSubmitDocumentFiscalDeviceResponse(responseFromService, includeUserNotificationMessage);
                        }
                        else
                        {
                            timeoutCancellationTokenSource.Cancel();
                            FiscalPeripheralFailureDetails failureDetails = new FiscalPeripheralFailureDetails
                            {
                                ErrorMessage = "The operation has timed out.",
                                IsRetryAllowed = true,
                                FailureType = FiscalPeripheralFailureType.Timeout
                            };
                            response = new SubmitDocumentFiscalDeviceResponse(string.Empty, FiscalPeripheralCommunicationResultType.Failed, failureDetails, string.Empty);
                        }
                    }
                }
                catch (HttpRequestException ex)
                {
                    FiscalPeripheralFailureDetails failureDetails = new FiscalPeripheralFailureDetails
                    {
                        ErrorMessage = ex.InnerException.Message,
                        IsRetryAllowed = true,
                        FailureType = FiscalPeripheralFailureType.NotAvailable
                    };
                    response = new SubmitDocumentFiscalDeviceResponse(string.Empty, FiscalPeripheralCommunicationResultType.Failed, failureDetails, string.Empty);
                }
                return response;
            }

            /// <summary>
            /// Checks if printer is available.
            /// </summary>
            /// <param name="request">The request.</param>
            /// <returns>The response.</returns>
            private Response IsReady(IsReadyFiscalDeviceRequest request)
            {
                ThrowIf.Null(request.PeripheralInfo, $"{nameof(request)}.{nameof(request.PeripheralInfo)}");
                ThrowIf.NullOrWhiteSpace(request.PeripheralInfo.DeviceName, $"{nameof(request)}.{nameof(request.PeripheralInfo)}.{nameof(request.PeripheralInfo.DeviceName)}");
                ThrowIf.NullOrWhiteSpace(request.PeripheralInfo.DeviceProperties, $"{nameof(request)}.{nameof(request.PeripheralInfo)}.{nameof(request.PeripheralInfo.DeviceProperties)}");

                var response = new IsReadyFiscalDeviceResponse(false);
                
                try
                {
                    var timeoutValue = ConfigurationController.GetTimeoutValue(request.PeripheralInfo.DeviceProperties);
                    var endpointAddress = ConfigurationController.GetEndpointAddress(request.PeripheralInfo.DeviceProperties);
                    var task = new HttpClient().GetAsync(endpointAddress + "/" + RequestConstants.State);
                    if (task.Wait(timeoutValue > 0 ? timeoutValue : Timeout.Infinite))
                    {
                        response = new IsReadyFiscalDeviceResponse(task.Result.StatusCode == System.Net.HttpStatusCode.OK);
                    }
                }
                catch (Exception ex)
                {
                }

                return response;
            }
        }
    }
}