const GetJobs = async (setAllJobs) => {

    const userData = JSON.parse(localStorage.getItem("userData")) 

    let option = {
        method:"get",
        headers: { 
            Authorization: `Bearer ${userData ? userData.token : ''}`
        }
    }
    
    const GetAllJob = await fetch("/api/v1/jobs", option)
    const jobs = await GetAllJob.json()    
    setAllJobs(jobs)

}

export { GetJobs }


//! if we do pass [] we have to refresh tha page to what job was deleted
//! but if we do pass dependency array [alljobs] or we dont pass it at alla and leave it 
//! we will see which job was deleted because the useEffect keep tracking alljobs
//? [] ---> didComponentMount
//? [alljobs] ---> didComponentUpdate , without dependency ---> didComponentMount didComponentUpdate
