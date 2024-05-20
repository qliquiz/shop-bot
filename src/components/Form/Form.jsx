import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postOffice, setPostOffice] = useState('');
    const [friendName, setFriendName] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            postOffice,
            friendName,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, city, postOffice, friendName, subject])

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
        if(!postOffice || !city || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, postOffice])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangePostOffice = (e) => {
        setPostOffice(e.target.value)
    }

    const onChangeFriendName = (e) => {
        setFriendName(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Страна*'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Город*'}
                value={city}
                onChange={onChangeCity}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Почтовое отделение*'}
                value={postOffice}
                onChange={onChangePostOffice}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Телеграм-логин пригласившего друга'}
                value={friendName}
                onChange={onChangeFriendName}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;
