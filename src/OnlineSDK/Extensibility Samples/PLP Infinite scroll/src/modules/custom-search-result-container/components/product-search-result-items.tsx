/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { IPriceComponentResources, ProductComponent } from '@msdyn365-commerce/components';
import { ICoreContext, IImageSettings } from '@msdyn365-commerce/core';
import { ProductSearchResult } from '@msdyn365-commerce/retail-proxy';
import { ArrayExtensions } from '@msdyn365-commerce-modules/retail-actions';
import { ITelemetryContent } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import { ICustomSearchResultContainerResources } from '../custom-search-result-container.props.autogenerated';

interface IProductSearchResultItems {
    products: ProductSearchResult[];
    context: ICoreContext;
    resources: ICustomSearchResultContainerResources;
    imageSettings?: IImageSettings;
    moduleType: string;
    moduleId: string;
    allowBackNavigation?: boolean;
    telemetryContent: ITelemetryContent;
    quickviewSlot?: {} | null | undefined;
    channelInventoryConfigurationId?: number;
    isPriceMinMaxEnabled?: boolean;
}

/**
 * Returns the product inventory label.
 * @param  channelInventoryConfigurationId - The channel configuration Id.
 * @param  product - The product.
 * @returns The inventory label.
 */
function getInventoryLabel(channelInventoryConfigurationId: number | undefined, product: ProductSearchResult): string | undefined {
    if (!channelInventoryConfigurationId || !ArrayExtensions.hasElements(product.AttributeValues)) {
        return undefined;
    }
    const inventoryAttribute = product.AttributeValues.find(attribute => attribute.RecordId === channelInventoryConfigurationId);
    if (inventoryAttribute) {
        return inventoryAttribute.TextValue;
    }
    return undefined;
}

export const ProductSearchResultItems: React.FC<IProductSearchResultItems> = ({
    products,
    context,
    imageSettings,
    resources,
    moduleType,
    moduleId,
    allowBackNavigation,
    telemetryContent,
    quickviewSlot,
    channelInventoryConfigurationId,
    isPriceMinMaxEnabled
}) => {
    const priceResources: IPriceComponentResources = {
        priceRangeSeparator: resources.priceRangeSeparator
    };
    return (
        <ul className='list-unstyled'>
            {products.map((product: ProductSearchResult, index: number) => (
                <li className='ms-product-search-result__item' key={index}>
                    <ProductComponent
                        context={context}
                        telemetryContent={telemetryContent}
                        imageSettings={imageSettings}
                        freePriceText={resources.priceFree}
                        originalPriceText={resources.originalPriceText}
                        currentPriceText={resources.currentPriceText}
                        ratingAriaLabel={resources.ratingAriaLabel}
                        allowBack={allowBackNavigation}
                        id={moduleId}
                        typeName={moduleType}
                        data={{ product }}
                        quickViewButton={quickviewSlot}
                        inventoryLabel={getInventoryLabel(channelInventoryConfigurationId, product)}
                        isPriceMinMaxEnabled={isPriceMinMaxEnabled}
                        priceResources={priceResources}
                    />
                </li>
            ))}
        </ul>
    );
};
