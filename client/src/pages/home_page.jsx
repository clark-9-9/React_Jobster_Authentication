import svg from "../images/couple_illustration.svg"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect } from "react"


export function HomePage() {

    const NavigateTo = useNavigate()

    const userData  = JSON.parse(localStorage.getItem("userData")) 

    useEffect(() => {
        if(userData && userData.token) {
            NavigateTo("/main-page/all-jobs")
        }
    })

    
    return (
        <section className="home_page">

            <article className="jbox_jobster">
                <div className="j_box">
                    <p>J</p>
                </div>

                <p id="jobster">JOBSTER</p>
            </article>


            <article className="home_page_writing_btn">
                <h1 id="job_tracking_para">JOB Tracking App</h1>

                <p id="job_tracking_intro">
                    Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up fixie raclette 
                    taxidermy craft beer. Brunch bitters synth, VHS crucifix heirloom meggings bicycle rights.
                </p>

                <NavLink 
                    to="/login"
                    type="click" 
                    id="login_registet_btn"
                    
                >    
                    Login/Register
                </NavLink>
            </article>


            <article className="img_box">
                <img 
                    src={svg} 
                />
            </article>

        </section>
    )

}
