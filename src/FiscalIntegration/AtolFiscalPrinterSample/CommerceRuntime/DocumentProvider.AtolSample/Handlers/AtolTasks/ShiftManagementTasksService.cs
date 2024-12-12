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
    namespace CommerceRuntime.DocumentProvider.AtolSample.Handlers
    {
        using System;
        using System.Collections.Generic;
        using System.Threading.Tasks;
        using Contoso.CommerceRuntime.DocumentProvider.AtolSample.DataModel.AtolTask;
        using Contoso.CommerceRuntime.DocumentProvider.AtolSample.Messages;
        using Microsoft.Dynamics.Commerce.Runtime;
        using Microsoft.Dynamics.Commerce.Runtime.DataModel;
        using Microsoft.Dynamics.Commerce.Runtime.Framework.Serialization;
        using Microsoft.Dynamics.Commerce.Runtime.Messages;

        /// <summary>
        /// Represents an entry point for requests related to printer shift management tasks.
        /// </summary>
        public class ShiftManagementTasksService : IRequestHandlerAsync
        {
            /// <summary>
            /// Gets supported requests.
            /// </summary>
            public IEnumerable<Type> SupportedRequestTypes => new[]
            {
                typeof(GetCloseShiftTaskDocumentProviderAtolRequest),
            };

            /// <summary>
            /// Represents an enty point for the request handler.
            /// </summary>
            /// <param name="request">Th request.</param>
            /// <returns>The response.</returns>
            public Task<Response> Execute(Request request)
            {
                ThrowIf.Null(request, nameof(request));

                switch (request)
                {
                    case GetCloseShiftTaskDocumentProviderAtolRequest getCloseShiftTaskDocumentProviderAtolRequest:
                        return GetCloseShiftTaskAsync(getCloseShiftTaskDocumentProviderAtolRequest);
                    default:
                        throw new NotSupportedException(string.Format("Request '{0}' is not supported.", request.GetType()));
                }
            }

            /// <summary>
            /// Gets close shift task for the printer.
            /// </summary>
            /// <param name="request">The request.</param>
            /// <returns>The response.</returns>
            private async Task<Response> GetCloseShiftTaskAsync(GetCloseShiftTaskDocumentProviderAtolRequest request)
            {
                var connectorProfile = await request.RequestContext.ExecuteAsync<DeserializeDocumentProviderSettingsDocumentProviderAtolResponse>(new DeserializeDocumentProviderSettingsDocumentProviderAtolRequest(request.FiscalIntegrationFunctionalityProfile)).ConfigureAwait(false);
                var closeShiftTask = new AtolCloseShiftTask()
                {
                    ElectronicForm = connectorProfile.DocumentProviderSettings.GenerateCloseShiftReportElectronically,
                };
                SerializeToAtolCommandRequest serializeToAtolCommandRequest = new SerializeToAtolCommandRequest(closeShiftTask);
                var serializeToAtolCommandResponse = await request.RequestContext.ExecuteAsync<SerializeToAtolCommandResponse>(serializeToAtolCommandRequest).ConfigureAwait(false);
                string taskJson = serializeToAtolCommandResponse.SerializedCommand;
                var fiscalIntegrationDocument = new FiscalIntegrationDocument(taskJson, FiscalIntegrationDocumentGenerationResultType.Succeeded);
                return new GetCloseShiftTaskDocumentProviderAtolResponse(fiscalIntegrationDocument);
            }
        }
    }
}
