const Handle_Delete_Job = async (e) => {

    e.preventDefault()


    const userData = JSON.parse(localStorage.getItem("userData")) 

    const id = userData ? e.target.dataset.id : "none"
    const userId =  userData ? e.target.dataset.userId : "none"

    // console.log(id);

    try {
        const sendDeleteJob = await fetch(`/api/v1/jobs/${id}`, 
            { 
                method:"delete",
                headers:{
                    Authorization:`Bearer ${userData ? userData.token : ''}`
                },

            })

        const deletedJob = await sendDeleteJob.json()
        console.log(deletedJob);

    } catch(err) {
        console.log(err);
    }

}

export  { Handle_Delete_Job }