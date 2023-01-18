import React, { useState } from "react"
import { App_container } from "../App_container"


export const hooks = React.createContext()

export function HooksContainer() {

    //* search form hooks
    const[SearchJob, setSearchJob] = useState("")
    const[StatusJob, setStatusJob] = useState("all")
    const[JobType, setJobType] = useState("all")
    const[SortJob, setSortJob] = useState("latest")



    return(
        <hooks.Provider value=
        {{
            SearchJob, setSearchJob, StatusJob, setStatusJob,
            JobType, setJobType, 
            SortJob, setSortJob

        }}>

            <App_container />

        </hooks.Provider>
    )

}


