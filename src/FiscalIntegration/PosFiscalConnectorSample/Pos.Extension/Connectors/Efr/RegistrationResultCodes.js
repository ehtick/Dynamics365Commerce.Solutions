System.register([], function (exports_1, context_1) {
    "use strict";
    var RegistrationResultCodes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RegistrationResultCodes = (function () {
                function RegistrationResultCodes() {
                }
                RegistrationResultCodes.TransactionProcessedSuccessfully = "OK";
                RegistrationResultCodes.CouldNotProcessTransaction = "NO";
                RegistrationResultCodes.InvalidRequestData = "BAD";
                return RegistrationResultCodes;
            }());
            exports_1("RegistrationResultCodes", RegistrationResultCodes);
        }
    };
});
//# sourceMappingURL=D:/a/_work/r1/a/r/src/FiscalIntegration/PosFiscalConnectorSample/Pos.Extension/Connectors/Efr/RegistrationResultCodes.js.map