import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createStore } from 'redux';

// Firebase
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export default function AuthRedux({ children }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState("");
    const defaultState = {
        isAuth,
        token
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
            case "RESET_EMAIL":
                editAccount(action.currentAdmin, action.currEdited);
                return state;
            default:
                return state;
        }
    }

    async function editAccount(currentAdmin, currEdited) {
        // Delete edited accaunt
        await signInWithEmailAndPassword(
            auth,
            currentAdmin.email,
            currentAdmin.password
        )
            .then((userCredential) => {
                userCredential.user
                    .delete()
            })

        // Register new accaunt
        await createUserWithEmailAndPassword(
            auth,
            currEdited.email,
            currEdited.password
        )
            .then((userCredential) => {
                setToken(userCredential.user.uid);
            })
    }
    const store = createStore(reduser);

    return (
        <Provider store={store}>{children}</Provider>
    )
}
