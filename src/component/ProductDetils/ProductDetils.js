import React from 'react';
import { useParams } from 'react-router';
import Product from '../Porduct/Product';
import fakeData from './../../fakeData'

const ProductDetils = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product)
    return (
        <div>
            <h1>Your product details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetils;