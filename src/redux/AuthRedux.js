import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createStore } from 'redux';

export default function AuthRedux({ children }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const defaultState = {
        isAuth,
    };

    const reduser = (state = defaultState, action) => {
        switch (action.type) {
            case "LOG_IN":
                localStorage.setItem("ISAUTH", "true")
                setIsAuth(true);
                return state;
            case "LOG_OUT":
                localStorage.setItem("ISAUTH", "false")
                setIsAuth(false);
                navigate("..");
                return state;
            default:
                return state;
        }
    }
    const store = createStore(reduser);

    return (
        <Provider store={store}>{children}</Provider>
    )
}
