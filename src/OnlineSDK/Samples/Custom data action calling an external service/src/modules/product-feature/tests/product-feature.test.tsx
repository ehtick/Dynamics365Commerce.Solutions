/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import { buildMockModuleProps } from '@msdyn365-commerce/core-internal';
/// <reference types="jest" />

import * as React from 'react';
import * as renderer from 'react-test-renderer';

import ProductFeature from '../product-feature';
import { IProductFeatureData } from '../product-feature.data';
import { imageAlignment, IProductFeatureConfig, IProductFeatureProps } from '../product-feature.props.autogenerated';

const productReviewsMockData : any = {}
const mockData: IProductFeatureData = {
    productReviews: productReviewsMockData
};

const mockConfig: IProductFeatureConfig = {
    imageAlignment: imageAlignment.left,
    productTitle: 'Retro Horn Rimmed Keyhole Nose Bridge Round Sunglasses',
    productDetails:
        'High-quality and pioneered with the perfect blend of timeless classic and modern technology with hint of old school glamor.',
    productImage: {
        src: 'https://bit.ly/33cMGxr',
        altText: 'Retro Horn Rimmed Keyhole Nose Bridge Round Sunglasses'
    },
    buttonText: 'Buy Now'
};

const mockActions = {};

describe('ProductFeature', () => {
    let moduleProps: IProductFeatureProps<IProductFeatureData>;
    beforeAll(() => {
        moduleProps = buildMockModuleProps(mockData, mockActions, mockConfig) as IProductFeatureProps<IProductFeatureData>;
    });
    it('renders correctly', () => {
        const component: renderer.ReactTestRenderer = renderer.create(<ProductFeature {...moduleProps} />);
        const tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
