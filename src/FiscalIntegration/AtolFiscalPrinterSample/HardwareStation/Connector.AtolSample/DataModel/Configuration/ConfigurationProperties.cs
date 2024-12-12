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
    namespace HardwareStation.Connector.AtolSample.DataModel.Configuration
    {
        using System.Collections.Generic;
        using System.Runtime.Serialization;
        using System.Xml.Serialization;

        /// <summary>
        /// Represents configuration properties.
        /// </summary>
        [DataContract]
        [XmlRoot("ConfigurationProperties")]
        public class ConfigurationProperties
        {
            /// <summary>
            /// Gets or sets configuration properties.
            /// </summary>
            [DataMember]
            [XmlElement("ConfigurationProperty")]
            public List<ConfigurationProperty> ConfigurationPropertyList { get; set; }
        }
    }
}
