import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}><img src={product.picture} alt={product.name} width={130} style={{ borderRadius: '10px' }}/></div>
            <div className={'title'}>{product.name}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                Стоимость: <span className='price-number'>{product.cost}</span>₽
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;
