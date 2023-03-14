import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStore } from 'redux';

export default function AuthRedux({ children }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const defaultState = {
        isAuth,
    };

    const reducer = (state = defaultState, action) => {
        switch (action.type) {
            case 'LOG_IN':
                localStorage.setItem('ISAUTH', 'true');
                setIsAuth(true);
                return state;
            case 'LOG_OUT':
                localStorage.removeItem("TOKEN");
                localStorage.removeItem("lastRol");
                localStorage.removeItem("storeHistory");
                localStorage.setItem('ISAUTH', 'false');
                localStorage.removeItem("oziqOvqatChiqim");
                localStorage.removeItem("korxonaUchunChiqim");
                setIsAuth(false);
                navigate('..');
                return state;
            default:
                return state;
        }
    };
    const store = createStore(reducer);

    return <Provider store={store}>{children}</Provider>;
}
