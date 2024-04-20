import React from 'react';
// import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';

const Header = () => {
    const {user} = useTelegram();

    return (
        <div className={'header'}>
            <h3>Colonochka Corporation</h3>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;
