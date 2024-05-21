import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from '../../hooks/useTelegram';

const Form = () => {
    const [phone_number, setPhoneNumber] = useState('');
    const [post_index, setPostIndex] = useState('');
    const [friend_username, setFriendUsername] = useState('');
    const [customer_type, setCustomerType] = useState('Физ. лицо');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            phone_number,
            post_index,
            friend_username,
            customer_type
        }
        tg.sendData(JSON.stringify(data));
    }, [phone_number, post_index, friend_username, customer_type])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!post_index || !phone_number) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [phone_number, post_index])

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const onChangePostIndex = (e) => {
        setPostIndex(e.target.value)
    }

    const onChangeFriendUsername = (e) => {
        setFriendUsername(e.target.value)
    }

    const onChangeCustomerType = (e) => {
        setCustomerType(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type='text'
                placeholder={'Номер телефона*'}
                value={phone_number}
                onChange={onChangePhoneNumber}
            />
            <input
                className={'input'}
                type='text'
                placeholder={'Почтовый индекс*'}
                value={post_index}
                onChange={onChangePostIndex}
            />
            <input
                className={'input'}
                type='text'
                placeholder={'@tg_username пригласившего друга'}
                value={friend_username}
                onChange={onChangeFriendUsername}
            />
            <select value={customer_type} onChange={onChangeCustomerType} className={'select'}>
                <option value={'Физ. лицо'}>Физ. лицо</option>
                <option value={'Юр. лицо'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;
