import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,price, img, key} = props.product;
    const removeProduct = props.removeProduct;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <div>
                <img src={img} alt=""/>
            </div>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price: ${price}</small></p>
            <button onClick={() => removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;