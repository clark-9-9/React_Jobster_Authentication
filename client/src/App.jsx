import React, { useState, Fragment, useEffect } from 'react'
import{ App_container } from "./App_container"
import { HooksContainer } from './hooks/hooks_container'
// "proxy": "http://localhost:8080",


export const Values = React.createContext() 

export default function App() {


    const[windowWith, setWindoWith] = useState(window.innerWidth)
    const[navMotion, setNavMotion] = useState
    ({ 
        paddingLeft: "0rem",
        marginLeft: "-20rem",
    })


    const[visibleMenu, setVisibleMenu] = useState({ visibility:'hidden', opacity:0 })
    const[logoutDisplay, setLogoutDisplay] = useState({ visibility: "hidden", opacity: 0 })
    const[logoutDisplay_Popup_Menu, setLogoutDisplay_Popup_Menu] =  useState({ visibility:"hidden", opacity:0 }) 
    const[AddJob_EditJob_Title_Text, setAddJob_EditJob_Titile_Text] = useState("ADD JOB")
    const[JobId_And_UserID, setJobId_And_UserID] = useState({ jobId:'', userId:'' })


  


    //* using window width in react instead of media query
    const handle_resize = () => setWindoWith(window.innerWidth) 
    useEffect(() => {
        window.addEventListener('resize', handle_resize)
        
        return () => {
            window.removeEventListener("resize", handle_resize)
        }

    }, [])
    



    return (
        <Fragment>
            <Values.Provider value=
            {{
                navMotion, setNavMotion, visibleMenu, setVisibleMenu,
                windowWith, setWindoWith, logoutDisplay, setLogoutDisplay,

                logoutDisplay_Popup_Menu, setLogoutDisplay_Popup_Menu,
                AddJob_EditJob_Title_Text, setAddJob_EditJob_Titile_Text,

                JobId_And_UserID, setJobId_And_UserID
            }}
            
            >
                <HooksContainer />
                {/* <App_container /> */}

            </Values.Provider>
        </Fragment>
    )
}














