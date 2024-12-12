/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

/* eslint-disable no-duplicate-imports */
import { ICheckoutState } from '@msdyn365-commerce/global-state';
import {
    Address,
    AddressPurpose,
    AsyncResult,
    ChannelDeliveryOptionConfiguration,
    CountryRegionInfo,
    FeatureState,
    StateProvinceInfo
} from '@msdyn365-commerce/retail-proxy';
import { IStoreSelectorStateManager } from '@msdyn365-commerce-modules/bopis-utilities';

export interface ICustomCheckoutBillingAddressData {
    storeSelectorStateManager: AsyncResult<IStoreSelectorStateManager>;
    checkout: AsyncResult<ICheckoutState>;
    countryRegions: AsyncResult<CountryRegionInfo[]>;
    address: AsyncResult<Address[]>;
    countryStates: AsyncResult<StateProvinceInfo[]>;
    addressPurposes: AsyncResult<AddressPurpose[]>;
    channelDeliveryOptionConfig: AsyncResult<ChannelDeliveryOptionConfiguration>;
    featureState: AsyncResult<FeatureState[]>;
}
