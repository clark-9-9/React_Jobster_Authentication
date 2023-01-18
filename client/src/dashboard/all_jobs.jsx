import { useState, Fragment, useEffect, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { GetJobs, Handle_Delete_Job } from "./z-index"
import { Values } from "../App"
import { hooks } from "../hooks/hooks_container"



export function AllJobs() {



    const[allJobs, setAllJobs] = useState([])
    const NavigateTo = useNavigate()
    const all_job_box = useRef()

    const importValue = useContext(Values)

    const {
        setAddJob_EditJob_Titile_Text,
        setJobId_And_UserID,
        
    } = importValue

    const{ 
        SearchJob, StatusJob,
        JobType, SortJob, 
  
    } = useContext(hooks)



    //! const userData  = localStorage.getItem("userData") <--- it will just bring text not an object we want
    // const userData  = JSON.parse(localStorage.getItem("userData")) //? <--- we gonna parse json from login we put this ---> // ! localStorage.setItem("userData", JSON.stringify(userData))
    const userData = JSON.parse(localStorage.getItem("userData")) 


    // const token = undefined
    // console.log(user);
    // console.log(token);


    //* if we did not have a token then we send user to login page 
    //* to get our token from local storage
    useEffect(() => {

        if(userData && userData.token) {
            NavigateTo("/main-page/all-jobs")
        }
        else {
            NavigateTo("/")
        }

    
    }, [])

    

    //* get all jobs
    useEffect(() => {

        GetJobs(setAllJobs)

    }, []) 




    const handle_click_edit_btn = (e) => {
        NavigateTo('/main-page/add-jobs')
        setAddJob_EditJob_Titile_Text("EDIT")

        const id = userData ? e.target.dataset.id : "none"
        const userId =  userData ? e.target.dataset.userId : "none"

        setJobId_And_UserID({ jobId:id, userId:userId })
    }

    

   
    return (
        <Fragment>

            <section className="all_jobs_box_grid">

                {!allJobs.jobs && <h3>Loding...</h3>}
                
                {
                    allJobs.jobs && 
                    <h3 id="found_jobs"> 
                        {allJobs.jobs.length} JOB FOUND
                    </h3> 

                }



                {allJobs.jobs &&
                    allJobs.jobs.map((JOB, index) => {

                        const{ 
                            _id, company, position, status, 
                            createdBy, jobType
                        } = JOB
    
                        if(
                            (
                                position.toLowerCase().includes(SearchJob.toLowerCase()) ||
                                company.toLowerCase().includes(SearchJob.toLowerCase()) 
                            ) 
                            &&
                            (
                                StatusJob === "all" 
                                ? status
                                : status.toLowerCase().includes(StatusJob.toLowerCase()) 
                            )   
                            &&
                            (
                                JobType === "all" 
                                ? jobType
                                : jobType.toLowerCase().includes(JobType.toLowerCase())
                            )

                        ) {

                        return ( 
                            <form  
                                className="all_jobs_box" 
                                key={index}
                            >
                                
                                <div 
                                    className="single_job_box"
                                    ref={all_job_box}
                                >
    
                                    <HeaderSingleJob 
                                        company={company}
                                        position={position}
                                    />

                                    <div className="single_job_informations">
                                        <Informations  
                                            JOB={ JOB }                                            
                                        />

                                        <div className="edit_delete_job_btn">
                                            <button 
                                                className="edit" 
                                                type="button"
                                                data-id={_id} 
                                                data-user-id={createdBy}
                                                onClick={handle_click_edit_btn}
                                            >
                                                EDIT
                                            </button>
                                            
                                            <button 
                                                className="delete" 
                                                type="button" 
                                                data-id={_id} 
                                                data-user-id={createdBy}
                                                onClick={Handle_Delete_Job}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        )
                    }
                        
                }).sort((a,b) => SortJob === "latest" || SortJob === "z-a" ? -1 : 1 )}

            </section> 
        </Fragment> 
    )

}


function HeaderSingleJob({ company, position }) {

    return (
        <Fragment>
            
            <div className="header_job_box_name">
                <div className="first_letter_company_box">
                    <p>{ company.substring(0, 1) }</p>
                </div>

                <div className="position_company">
                    <p id="position">{position}</p>
                    <p id="company">{company}</p>
                </div>
            </div>           

            <hr id="horizontal" />     

        </Fragment>
    )
}




function Informations(props) {

    const{ status, createdAt, location, jobType } = props.JOB

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const date = new Date(createdAt)

    return (
        <section className="job_information_details">

            <article className="location_postion_box">
                <div className="location_name_ic">
                    <ion-icon name="navigate"></ion-icon>
                    <p>{location}</p>
                </div>

                <div className="position_name_ic">
                    <ion-icon name="bag-sharp"></ion-icon>
                    <p>{jobType}</p>
                </div>
            </article>


            <article className="date_status_box">
                <div className="date_box">
                    <ion-icon name="calendar"></ion-icon>
                    <p>
                        {
                              date.getDate() === 1 ? date.getDate() + "st" 
                            : date.getDate() === 2 ? date.getDate() + "nd"
                            : date.getDate() === 3 ? date.getDate() + "rd"
                            : date.getDate() + "th" + " " +

                            month[date.getMonth()].substring(0, 3) + " " + new Date().getFullYear() 
                        }
                    </p>
                </div>

                <p id="status">{status}</p>
            </article>

        </section>
    )

}

