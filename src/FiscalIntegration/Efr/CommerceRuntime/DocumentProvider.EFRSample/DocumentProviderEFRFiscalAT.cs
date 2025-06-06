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
    namespace CommerceRuntime.DocumentProvider.EFRSample
    {
        using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Threading.Tasks;
        using Microsoft.Dynamics.Commerce.Runtime;
        using Microsoft.Dynamics.Commerce.Runtime.DataModel;
        using Microsoft.Dynamics.Commerce.Runtime.DataServices.Messages;
        using Microsoft.Dynamics.Commerce.Runtime.FiscalIntegration.DocumentProvider.Messages;
        using Microsoft.Dynamics.Commerce.Runtime.Handlers;
        using Microsoft.Dynamics.Commerce.Runtime.Messages;
        using Microsoft.Dynamics.Commerce.Runtime.Services.Messages;
        using Contoso.CommerceRuntime.DocumentProvider.DataModelEFR.Documents;
        using Contoso.CommerceRuntime.DocumentProvider.EFRSample.DocumentBuilders;
        using Contoso.CommerceRuntime.DocumentProvider.EFRSample.DocumentBuilders.Parameters;
        using Contoso.CommerceRuntime.DocumentProvider.EFRSample.Extensions;
        using Contoso.CommerceRuntime.DocumentProvider.EFRSample.Messages.Austria;
        using Contoso.CommerceRuntime.DocumentProvider.EFRSample.Serializers;

        /// <summary>
        /// The document provider for EFSTA (European Fiscal Standards Association) Fiscal Register (version 1.8.3) specific for Austria.
        /// </summary>
        public class DocumentProviderEFRFiscalAT : INamedRequestHandlerAsync
        {
            /// <summary>
            /// Gets the unique name for this request handler.
            /// </summary>
            public string HandlerName => "FiscalEFRSampleAUT";

            /// <summary>
            /// Gets the supported fiscal integration event type.
            /// </summary>
            public IEnumerable<int> SupportedRegistrableFiscalEventsId => new[]
            {
                (int)FiscalIntegrationEventType.Sale,
                (int)FiscalIntegrationEventType.CreateCustomerOrder,
                (int)FiscalIntegrationEventType.EditCustomerOrder,
            };

            /// <summary>
            /// Gets the supported non-fiscal integration event type.
            /// </summary>
            public IEnumerable<int> SupportedRegistrableNonFiscalEventsId => Enumerable.Empty<int>();

            /// <summary>
            /// Gets the collection of supported request types by this handler.
            /// </summary>
            public IEnumerable<Type> SupportedRequestTypes => new[]
            {
                typeof(GetFiscalDocumentDocumentProviderRequest),
                typeof(GetSupportedRegistrableEventsDocumentProviderRequest),
                typeof(GetFiscalRegisterResponseToSaveDocumentProviderRequest),
            };

            /// <summary>
            /// Executes the specified request using the specified request context and handler.
            /// </summary>
            /// <param name="request">The request to execute.</param>
            /// <returns>The response of the request from the request handler.</returns>
            public async Task<Response> Execute(Request request)
            {
                ThrowIf.Null(request, nameof(request));

                switch (request)
                {
                    case GetSupportedRegistrableEventsDocumentProviderRequest _:
                        return await GetSupportedRegistrableEventsAsync().ConfigureAwait(false);

                    case GetFiscalDocumentDocumentProviderRequest getFiscalDocumentDocumentProviderRequest:
                        return await GetFiscalDocumentResponseAsync(getFiscalDocumentDocumentProviderRequest);

                    case GetFiscalRegisterResponseToSaveDocumentProviderRequest getFiscalRegisterResponseToSaveDocumentProviderRequest:
                        return await GetFiscalRegisterResponseToSaveAsync(getFiscalRegisterResponseToSaveDocumentProviderRequest) ;

                    default:
                        throw new NotSupportedException(string.Format("Request '{0}' is not supported.", request.GetType()));
                }
            }

            /// <summary>
            /// Gets the supported registerable events document provider response.
            /// </summary>
            /// <returns>The supported registerable events document provider response.</returns>
            private Task<Response> GetSupportedRegistrableEventsAsync()
            {
                var response = new GetSupportedRegistrableEventsDocumentProviderResponse(this.SupportedRegistrableFiscalEventsId.ToList(), this.SupportedRegistrableNonFiscalEventsId.ToList());
                return Task.FromResult<Response>(response);
            }

            /// <summary>
            /// Gets the fiscal registration result.
            /// </summary>
            /// <param name="request">The request.</param>
            /// <returns>The response.</returns>
            private Task<Response> GetFiscalRegisterResponseToSaveAsync(GetFiscalRegisterResponseToSaveDocumentProviderRequest request)
            {
                Response response = null;

                if ((request.FiscalRegistrationResult.RegistrationStatus != FiscalIntegrationRegistrationStatus.Completed && string.IsNullOrWhiteSpace(request.FiscalRegistrationResult.Response))
                    || string.IsNullOrWhiteSpace(request.FiscalRegistrationResult.TransactionID))
                {
                    response = new GetFiscalRegisterResponseToSaveDocumentProviderResponse(String.Empty);
                }
                else
                {
                    response = new GetFiscalRegisterResponseToSaveDocumentProviderResponse(request.FiscalRegistrationResult.GetFiscalResponseStringAT());
                }

                return Task.FromResult(response);
            }

            /// <summary>
            /// Gets the fiscal document document provider response.
            /// </summary>
            /// <param name="request">The request.</param>
            /// <returns>The fiscal document document provider response.</returns>
            private async Task<Response> GetFiscalDocumentResponseAsync(GetFiscalDocumentDocumentProviderRequest request)
            {
                var documentBuilderData = DocumentBuilderData.FromRequest(request);
                GetAdjustedSalesOrderFiscalIntegrationServiceResponse adjustedSalesOrderResponse = null;
                IDocumentBuilder builder = null;

                switch (request.FiscalDocumentRetrievalCriteria.FiscalRegistrationEventType)
                {
                    case FiscalIntegrationEventType.CreateCustomerOrder:
                    case FiscalIntegrationEventType.EditCustomerOrder:
                    case FiscalIntegrationEventType.CancelCustomerOrder:
                    case FiscalIntegrationEventType.Sale:
                        FiscalIntegrationSalesOrderAdjustmentType adjustmentType = await GetSalesOrderAdjustmentType(request.RequestContext, request.SalesOrder).ConfigureAwait(false);
                        SalesOrder adjustedSalesOrder = null;

                        if (adjustmentType != FiscalIntegrationSalesOrderAdjustmentType.None)
                        {
                            adjustedSalesOrderResponse = await request.SalesOrder.GetAdjustedSalesOrderAsync(request.RequestContext, adjustmentType).ConfigureAwait(false);
                        }

                        adjustedSalesOrder = adjustedSalesOrderResponse == null ? request.SalesOrder : adjustedSalesOrderResponse.SalesOrder;

                        if (adjustedSalesOrder.ActiveSalesLines.Any())
                        {
                            documentBuilderData.SalesOrder = adjustedSalesOrder;
                            builder = new SalesTransactionBuilder(documentBuilderData);
                        }

                        break;
                    case FiscalIntegrationEventType.CustomerAccountDeposit:
                        builder = new CustomerAccountDepositTransactionBuilder(documentBuilderData);
                        break;

                    case FiscalIntegrationEventType.CloseShift:
                        builder = new ZReportBuilder(documentBuilderData);
                        break;

                    default:
                        throw new NotSupportedException(string.Format("Fiscal integration event type '{0}' is not supported.", request.FiscalDocumentRetrievalCriteria.FiscalRegistrationEventType));
                }

                IFiscalIntegrationDocument document = null;
                if (builder != null)
                {
                    document = await builder.BuildAsync().ConfigureAwait(false);
                }

                FiscalIntegrationDocument fiscalIntegrationDocument = document != null ?
                    new FiscalIntegrationDocument(FiscalDocumentSerializer.Serialize(document), FiscalIntegrationDocumentGenerationResultType.Succeeded) :
                    new FiscalIntegrationDocument(string.Empty, FiscalIntegrationDocumentGenerationResultType.NotRequired);

                return new GetFiscalDocumentDocumentProviderResponse(fiscalIntegrationDocument);
            }

            /// <summary>
            /// Gets sales order adjustment type.
            /// </summary>
            /// <param name="salesOrder">The sales order.</param>
            /// <returns>The sales order adjustment type.</returns>
            private static async Task<FiscalIntegrationSalesOrderAdjustmentType> GetSalesOrderAdjustmentType(RequestContext requestContext, SalesOrder salesOrder)
            {
                var request = new GetSalesOrderAdjustmentTypeRequest(salesOrder);
                return (await requestContext.ExecuteAsync<SingleEntityDataServiceResponse<FiscalIntegrationSalesOrderAdjustmentType>>(request).ConfigureAwait(false)).Entity;
            }
        }
    }
}
