async function UpdateJob(
    position, company, jobLocation,
    status, jobType, jobId
) 
{


    const userData = JSON.parse(localStorage.getItem("userData"))


    let body_request = {
        position:position,
        company:company,
        location:jobLocation,
        status:status,
        jobType:jobType,
    }

    let option = {
        method:"PATCH",
        headers: { 
            "Content-Type":"application/json",
            Authorization: `Bearer ${userData ? userData.token : ''}`
        },
        
        body: JSON.stringify(body_request)
    }
    
    const send_update_job = await fetch(`/api/v1/jobs/${jobId}`, option)
    const updateJob = await send_update_job.json()


    console.log(updateJob);
    return updateJob

}




export { UpdateJob }