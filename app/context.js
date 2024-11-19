'use client'

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
 
export const MyProvider = ({children})=>{

    const [selectProduct,setSelectProduct] = useState()
    const [products,setProducts] = useState([])

    useEffect(()=>{
        if(selectProduct !== undefined)
            setProducts([
                ...products,
                selectProduct
            ])
    },[selectProduct])
    return (
        <AuthContext.Provider value={{selectProduct,setSelectProduct,products,setProducts}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;