import {Dispatch, SetStateAction, createContext} from 'react'

export interface User {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    
}

export const initialUserValue: User = {
    name: " ",
    password: " ",
    setName: () => { },
    setPassword: () => { }
    
}

export const UserContext = createContext(initialUserValue);