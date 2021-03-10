import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    // const TotalPrice =cart.reduce((total, prd) => total + prd.price, 0);
    let TotalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        TotalPrice =TotalPrice + product.price;
    }

    let shipping = 0;
    if (TotalPrice > 35) {
        shipping = 0;
    }else if (TotalPrice > 15) {
        shipping = 4.99 ;
    }else if(TotalPrice > 0){
        shipping = 12.99;
    }

    const tex = TotalPrice / 10;
    const grandTotal = (TotalPrice + shipping + Number(tex)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h3>Order Summary</h3>
                <p>Items Ordered: {cart.length}</p>
                <p>Product Price: {formatNumber(TotalPrice)}</p>
                <p><small>Shipping Cost: {shipping}</small></p>
                <p><small>Tax + VAT: {formatNumber(tex)}</small></p>
                <p>Total Price : {grandTotal}</p>
        </div>
    );
};

export default Cart;