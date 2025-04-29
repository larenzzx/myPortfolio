"use client";
import { Observer } from "tailwindcss-intersect";
import { useEffect } from "react";

export const ObserverProvider = ({ children }) => {
    useEffect(() => {
        Observer.start();
    }, []);
    
    return <>{children}</>

}