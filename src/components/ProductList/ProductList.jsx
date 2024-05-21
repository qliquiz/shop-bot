import React, {useState, useEffect, useCallback} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import products from '../../db/goods/goods.json';


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.cost;
    }, 0);
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = { message: 'Привет, сервер!' };

            fetch('http://localhost:3000/web-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            console.log('Ответ от сервера:', data);
            alert('Данные успешно отправлены на сервер!');
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных на сервер.');
        });
    }, [addedItems]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => tg.offEvent('mainButtonClicked', onSendData);
    }, [onSendData]);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) newItems = addedItems.filter(item => item.id !== product.id);
        else newItems = [...addedItems, product];

        setAddedItems(newItems);

        if(newItems.length === 0) tg.MainButton.hide();
        else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            });
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;