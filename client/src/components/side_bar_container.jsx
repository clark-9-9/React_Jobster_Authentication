import { Fragment, useContext } from "react"
import { NavLink } from "react-router-dom"
import { Values } from "../App"



export function SideBarContainer() {


    const{ 
        visibleMenu, setVisibleMenu, 
        setLogoutDisplay_Popup_Menu,
        setAddJob_EditJob_Titile_Text,
        setJobId_And_UserID
    
    } = useContext(Values)


    const handle_navlink_click = () => {
        setVisibleMenu({ visibility:'hidden', opacity:0 })
        setAddJob_EditJob_Titile_Text("ADD JOB")
        setJobId_And_UserID({ jobId:'', userId:'' })
    }


    return (
        <Fragment>
                <div className="jbox_jobster">
                    <div className="j_box_light">
                        <p>J</p>
                    </div>

                    <p id="jobster_light">JOBSTER</p>

                    <ion-icon 
                        name="close-outline" 
                        className="close_ic"
                        onClick={() => {
                            setVisibleMenu({ visibility:'hidden', opacity:0 })
                            setLogoutDisplay_Popup_Menu({ visibility:'hidden', opacity:0 })
                        }}
                    >
                    </ion-icon>
                </div>


                <div className="side_bar_center_box">

                    <NavLink 
                        to="/main-page/all-jobs" 
                        className="side_bar_center_sigle_element"
                        onClick={handle_navlink_click}
                    >
                        <ion-icon name="stats-chart-outline" id="all_job_ic"></ion-icon>
                        <p>All Jobs</p>
                    </NavLink>


                    <NavLink 
                        to="/main-page/add-jobs" 
                        className="side_bar_center_sigle_element"
                        onClick={handle_navlink_click}
                    >
                        <ion-icon name="add-outline" id="add_job_ic"></ion-icon>
                        <p>Add Jobs</p>
                    </NavLink>


                    <NavLink 
                        to="/main-page/profile" 
                        className="side_bar_center_sigle_element"
                        onClick={handle_navlink_click}
                    >
                        <ion-icon name="analytics-outline" id="profile_data_ic"></ion-icon>
                        <p>Profile</p>
                    </NavLink>

                </div>
        </Fragment>

    )
}


