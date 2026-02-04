import {useContext,createContext, useState} from "react";

export const ThemeContext=createContext();

export const ThemeContextProvider = ({children}) => {
    const [backdrop,setBackdrop]=useState(false);

    const handleBackdropToggle=()=>{
        setBackdrop((prev)=>!prev);
    }

    return (
        <ThemeContext.Provider value={{backdrop,handleBackdropToggle}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme=()=>(useContext(ThemeContext))
