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
            case "RESET_EMAIL":
                editAccount(action.currentAdmin, action.currEdited);
            // return state;
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
                console.log(userCredential.user);
                userCredential.user
                    .delete()
                    .then(() => {
                        console.log("User account deleted successfully");
                    })
                    .catch((error) => {
                        console.error("Error deleting user account:", error);
                    });
            })
        // .catch(() => setError(true));

        // Register new accaunt
        await createUserWithEmailAndPassword(
            auth,
            currEdited.email,
            currEdited.password
        )
            .then((userCredential) => {
                currEdited.accessToken = userCredential.user.uid;
            })
        // .catch(() => setError(true));
    }
    const store = createStore(reduser);

    return (
        <Provider store={store}>{children}</Provider>
    )
}
