import { Fragment } from "react"
import { SideBar, Menu } from "./z-index"
import { Outlet } from "react-router-dom";


export function MainPageContainer() {



    return(
        <Fragment>

            <SideBar />
            <Menu />

            <Outlet />
            
        </Fragment>
    )
}


