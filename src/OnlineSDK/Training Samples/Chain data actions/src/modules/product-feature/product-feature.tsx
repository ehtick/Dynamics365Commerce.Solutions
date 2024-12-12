/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

import * as React from 'react';

import { IProductFeatureData } from './product-feature.data';
import { imageAlignment, IProductFeatureProps } from './product-feature.props.autogenerated';
import { getProductWithVariantPriceAction, SimpleProductWithPrice } from '../../actions/get-product-with-variant-price.action';
import { ProductInput } from '../../actions/get-product.action';

export interface IProductFeatureViewProps extends IProductFeatureProps<IProductFeatureData> {
    productVariantDetail: SimpleProductWithPrice;
    productName: string;
    productInfo: string;
    productImageUrl: string;
    productPrice: string;
    buttonInfo: string;
    alignment: imageAlignment;
}

export interface IProductFeatureState {
    products?: SimpleProductWithPrice;
}
/**
 *
 * ProductFeature component
 * @extends {React.PureComponent<IProductFeatureProps<IProductFeatureData>>}
 */
class ProductFeature extends React.PureComponent<IProductFeatureProps<IProductFeatureData>, IProductFeatureState> {
    public constructor(props: IProductFeatureProps<IProductFeatureData>) {
        super(props);
        this.state = {};
    }
    public async componentDidMount(): Promise<void> {
        const productDetail = await getProductWithVariantPriceAction(
            new ProductInput(this.props.config.recordId || 0),
            this.props.context.actionContext
        );
        this.setState({
            products: productDetail
        });
    }
    public render(): JSX.Element | null {
        const { config } = this.props;

        // set default product info values
        const ProductName = config.productTitle ? config.productTitle : 'No product name defined';
        const ProductInfo = config.productDetails ? config.productDetails.toString() : 'No product details defined';
        const ProductImageUrl = config.productImage ? config.productImage.src : '';
        const ButtonInfo = config.buttonText ? config.buttonText : 'No button text defined';
        const ProductPrice = '$129';

        const ProductFeatureViewProps = {
            ...this.props,
            productVariantDetail: this.state.products,
            productName: ProductName,
            productInfo: ProductInfo,
            productImageUrl: ProductImageUrl,
            productPrice: ProductPrice,
            buttonInfo: ButtonInfo,
            alignment: config.imageAlignment
        };

        return this.props.renderView(ProductFeatureViewProps);
    }
}

export default ProductFeature;
