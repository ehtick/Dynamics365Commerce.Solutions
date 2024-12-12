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
    namespace CommerceRuntime.DocumentProvider.AtolSample.DataModel.AtolTask
    {
        using System.Runtime.Serialization;

        /// <summary>
        /// Tax types supported by the device.
        /// </summary>
        [DataContract]
        public enum TaxType
        {
            /// <summary>
            /// Without VAT.
            /// </summary>
            [EnumMember(Value = "none")]
            None,

            /// <summary>
            /// VAT is not charged.
            /// </summary>
            [EnumMember(Value = "vat0")]
            Vat0,

            /// <summary>
            /// VAT 10%.
            /// </summary>
            [EnumMember(Value = "vat10")]
            Vat10,

            /// <summary>
            /// VAT 10/110.
            /// </summary>
            [EnumMember(Value = "vat110")]
            Vat110,

            /// <summary>
            /// VAT 20%.
            /// </summary>
            [EnumMember(Value = "vat20")]
            Vat20,

            /// <summary>
            /// VAT 20/120.
            /// </summary>
            [EnumMember(Value = "vat120")]
            Vat120,
        }
    }
}
