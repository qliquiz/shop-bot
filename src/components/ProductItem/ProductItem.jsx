import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <img className={'img'} src='src/components/ProductItem/колонка1 (1).png'/>
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
