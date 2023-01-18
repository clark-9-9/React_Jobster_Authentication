import { useContext, useEffect, useRef } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { SideBarContainer } from "./side_bar_container"
import { Values } from "../App"
import { SideBar } from "./side_bar"
import { useState } from "react"




const svg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="31.509" height="30.802" viewBox="0 0 31.509 30.802">
        <g id="Icon_ionic-logo-xing" data-name="Icon ionic-logo-xing" transform="matrix(0.999, -0.035, 0.035, 0.999, -21.959, -11.745)">
            <path id="Path_1" data-name="Path 1" d="M22.064,20.568,32.977,2.25H25.664L14.723,20.562a.088.088,0,0,0,0,.115l6.954,11.709c.028.047.056.047.112.047h7.249l-6.982-11.77A.113.113,0,0,1,22.064,20.568Z" transform="translate(18.997 11.317)" fill="#edf1fd"/>
            <path id="Path_2" data-name="Path 2" d="M15.6,15.2,11.461,7.945a.137.137,0,0,0-.141-.07H4.57l4.141,7.341a.079.079,0,0,1,.007.056l-5.7,9.478H9.83a.109.109,0,0,0,.113-.063l5.66-9.4A.171.171,0,0,0,15.6,15.2Z" transform="translate(18.092 16.692)" fill="#edf1fd"/>
        </g>
    </svg>
)



export function Menu() {

    const{ 
        visibleMenu, setVisibleMenu ,windowWith ,
        logoutDisplay_Popup_Menu, setLogoutDisplay_Popup_Menu
    
    } = useContext(Values)

    const{ pathname } = useLocation()


    useEffect(() => {
        if(windowWith >= 1000) {
            setVisibleMenu({ visibility:"hidden", opacity:0 })
            setLogoutDisplay_Popup_Menu({ visibility:"hidden", opacity:0 })
        }
    }, [windowWith])

  
    return (
        <main className="menu_header_page_parent">

            <MenuBox 
                visibleMenu={visibleMenu}
                setVisibleMenu={setVisibleMenu}
                logoutDisplay_Popup_Menu={logoutDisplay_Popup_Menu}
                setLogoutDisplay_Popup_Menu={setLogoutDisplay_Popup_Menu}
            />

            <section className="menu_header_page">
                
                <ion-icon 
                    name="menu-outline" 
                    className="menu_ic" 
                    onClick={() =>setVisibleMenu({ visibility:'visible', opacity:1 }) }
                >
                </ion-icon>

                {
                      pathname === "/main-page/all-jobs" ? <p id="head_line">All Jobs</p>
                    : pathname === "/main-page/add-jobs" ? <p id="head_line">Add Jobs</p> 
                    : pathname === "/main-page/profile" ? <p id="head_line">Profile</p> : ""
                }

                { svg }

            </section>

        </main>
    )
 
}




export function MenuBox({ logoutDisplay_Popup_Menu, setLogoutDisplay_Popup_Menu }) {


    const{ 
        visibleMenu, setVisibleMenu,
        

    } = useContext(Values)



    const userData = JSON.parse(localStorage.getItem("userData")) 
    const NavigateTo = useNavigate()

    const handle_logout_display = () => {

        logoutDisplay_Popup_Menu["visibility"] === "hidden"
        ?
            setLogoutDisplay_Popup_Menu({ 
                visibility:'visible', 
                opacity:1 
            })
        :
        setLogoutDisplay_Popup_Menu({ 
                visibility:'hidden', 
                opacity:0 
            })
        ;
    } 


    const handle_user_logout = () => {
        localStorage.removeItem("userData")
        NavigateTo("/")
        setVisibleMenu({ visibility:'hidden', opacity:0 })
        setLogoutDisplay_Popup_Menu({ visibility:'hidden', opacity:0 })
    }

    return (
        <section 
            className="menu_box"
            style={{
                visibility: visibleMenu["visibility"],
                opacity:visibleMenu["opacity"]
            }}
        >

            <article className="menu_box_content">
                <SideBarContainer 

                />
            </article>

            
            <div className="side_bar_bottom" user="name">
                <ion-icon name="person" id="profile_ic"></ion-icon>

                <div 
                    onClick={handle_user_logout}
                    className="user_logout_popup_menu"
                    style={{
                        visibility:logoutDisplay_Popup_Menu["visibility"],
                        opacity:logoutDisplay_Popup_Menu["opacity"]
                    }}
                >
                    <p>LOGOUT</p>
                </div>


                <div className="user_name_box" onClick={handle_logout_display}>
                    {/* <p>{userData && userData.user.name}</p> */}
                    <p>{userData ? userData.user.name : "NAME"}</p>
                </div>
            </div>

        </section>
    )

}