import { Values } from "../App"
import { useState, useContext, useEffect } from "react"
import { UpdateJob } from "./edit_job"



export function AddJobs() {

    const[position, setPosition] = useState("")
    const[company, setCompany] = useState("")
    const[jobLocation, setJobLocation] = useState("My City")
    const[status, setStatus] = useState("pending")
    const[jobType, setJobType] = useState("full-time")


    const{ 
        navMotion: { paddingLeft }, windowWith, JobId_And_UserID:{ jobId, userId }, 
        AddJob_EditJob_Title_Text, setAddJob_EditJob_Titile_Text, JobId_And_UserID, setJobId_And_UserID
    } = useContext(Values)

    const userData = JSON.parse(localStorage.getItem("userData"))
    

    //* ADD JOBS
    const handle_add_job = async (e) => {

        e.preventDefault()

        let body_request = {
            position:position,
            company:company,
            location:jobLocation,
            status:status,
            jobType:jobType,
        }

        let option = {
            method:"post",
            headers: { 
                "Content-Type":"application/json",
                Authorization: `Bearer ${userData ? userData.token : ''}`
            },
            
            body: JSON.stringify(body_request)
        }
        


        try {
            const send_job = await fetch("/api/v1/jobs", option)
            const job = await send_job.json()

            console.log(job);

            if(job.err) alert("please fill out the boxs")
                 

            setPosition('')
            setCompany('')
            setJobLocation('My City')
            setStatus('pending')
            setJobType('full-time')


        } catch(err) {
            console.log(err);
            alert("please fill out the boxs")
        }

    }


    const handle_clear_filter = () => {
        setPosition('')
        setCompany('')
        setJobLocation('My City')
        setStatus('pending')
        setJobType('full-time')
    }



    //* UPDATE JOBS
    const handle_update_job = async (e) => {

        e.preventDefault()

        try {

            const Err_From_UpdateJob = await UpdateJob(
                position, company, jobLocation,
                status, jobType, jobId            
            ) 

            
            if(!Err_From_UpdateJob.msg) {
                setAddJob_EditJob_Titile_Text("ADD JOB")
                setJobId_And_UserID({ jobId:'', userId:'' })
            } else {
                setJobId_And_UserID({ jobId:jobId, userId:userId })
                alert("please fill out the boxs")
            }

            setPosition('')
            setCompany('')
            setJobLocation('My City')
            setStatus('pending')
            setJobType('full-time')



        } catch(err) {
            console.log(err);
        }

    }




    return (
        <form className="add_jobs_main_parent" 
            style={{
                paddingLeft: windowWith <= 1000 
                ? "1rem" 
                :  windowWith >= 1000 ? (paddingLeft === "20rem" ? "21rem" : '1rem') 
                : "1rem",
            }}
            
            onSubmit={(e) => { 
                if(AddJob_EditJob_Title_Text === "EDIT") {
                    handle_update_job(e);
                } else {
                    handle_add_job(e); 
                }

            }}
        >

            <section className="add_jobs_form_box">
                
                <p id="add_job_form_title">{ AddJob_EditJob_Title_Text }</p>

                <article className="add_jobs_inputs_parent">

                    <div className="single_search_form_input_box">
                        <label htmlFor="position">Position</label>

                        <input 
                            type="text" 
                            id="position" 
                            name="position" 
                            className="input_text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>

                    <div className="single_search_form_input_box">
                        <label htmlFor="company">Company</label>

                        <input 
                            type="text" 
                            name="company" 
                            className="input_text" 
                            color="white"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />

                    </div>

                    <div className="single_search_form_input_box">
                        <label htmlFor="job_location">Job Location</label>

                        <input 
                            type="text" 
                            id="job_location" 
                            name="job_location"
                            className="input_text" 
                            value={jobLocation}
                            onChange={(e) => setJobLocation(e.target.value)}
                        />
                    </div>


                    <div className="single_search_form_input_box">
                        <label htmlFor="status">Status</label>

                        <select 
                            className="search_type" 
                            // defaultValue={status} 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="interview">interview</option>
                            <option value="declined">declined</option>
                            <option value="pending">pending</option>
                        </select>
                    </div>

                    <div className="single_search_form_input_box">
                        <label htmlFor="Job_type">Job type</label>

                        <select 
                            className="search_status"
                            // defaultValue={jobType} 
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="full-time">full-time</option>
                            <option value="part-time">part-time</option>
                            <option value="remote">remote</option>
                            <option value="internship">internship</option>
                        </select>
                    </div>

                    <footer className="clear_submit_btn_box">

                        <button 
                            className="clear_filter_btn" 
                            type="button"
                            onClick={handle_clear_filter}
                        >
                            Clear Filter
                        </button>

                        <button className="add_jobs_submit_btn" type="submit">
                            Submit
                        </button>

                    </footer>

                </article>
            </section>

        </form>
    )
}