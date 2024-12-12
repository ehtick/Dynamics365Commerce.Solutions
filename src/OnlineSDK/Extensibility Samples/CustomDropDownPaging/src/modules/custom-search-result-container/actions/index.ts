/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { ProductSearchResult, SortColumn } from '@msdyn365-commerce/retail-proxy';
import getCollectionProducts, {
    GetFullProductsByCollectionInput,
    ProductListInventoryFilteringOptions
} from './get-full-products-by-collection';
import getMappedSearchConfiguration, { MappedSearchInput, sortOptions } from './get-mapped-search-configuration';
import getCollectionRefinersAction, { RefinersByCollectionInput } from './get-refiners-for-collection';

export * from './base-collection-action';
export * from './url-utils';

interface IFullProductsSearchResultsWithCount {
    products: ProductSearchResult[];
    count: number;
    channelInventoryConfigurationId?: number;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface MappedSearchConfiguration {
    key: string;
    sortColumn: SortColumn;
}

export {
    getCollectionProducts,
    getCollectionRefinersAction,
    GetFullProductsByCollectionInput,
    getMappedSearchConfiguration,
    IFullProductsSearchResultsWithCount,
    MappedSearchConfiguration,
    MappedSearchInput,
    ProductListInventoryFilteringOptions,
    RefinersByCollectionInput,
    sortOptions
};
