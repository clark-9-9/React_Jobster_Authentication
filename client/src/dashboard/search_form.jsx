import { useContext, Fragment } from "react"
import { Values } from "../App"
import { AllJobs } from "./all_jobs"
import { hooks } from "../hooks/hooks_container"

export function SearchForm() {

    const importValue = useContext(Values)
    const{   
       navMotion: { paddingLeft },
       windowWith

    } = importValue
  
  
 
    return (
        <Fragment>
            
            <main 
                className="search_form_main_parent"
                style={{
                    paddingLeft: windowWith <= 1000 
                    ? "1rem" 
                    :  windowWith >= 1000 ? (paddingLeft === "20rem" ? "21rem" : '1rem') 
                    : "1rem",
                }}
            >
                <SearchForm2 />
                <AllJobs />

            </main>

        </Fragment>
    )
}

 
function SearchForm2() {

    const{ 
        SearchJob, setSearchJob, StatusJob, setStatusJob,
        JobType, setJobType, 
        SortJob, setSortJob
  
    } = useContext(hooks)
 



    const handle_clear_filter = () => {
        setSearchJob("")
        setStatusJob("all")
        setJobType("all")
    }





 
    return (
            <section className="search_form_box" >
                
                <p id="search_form_title" >SEARCH FORM</p>

                <article className="search_form_inputs_parent">

                    <div className="single_search_form_input_box">
                        <label htmlFor="search">Search</label>

                        <input type="text" className="search_input" 
                            value={SearchJob}
                            onChange={(e) => setSearchJob(e.target.value)}
                        />
                    </div>


                    <div className="single_search_form_input_box">
                        <label htmlFor="search">Status</label>

                        <select 
                            className="search_status" 
                            value={StatusJob}
                            onChange={(e) => setStatusJob(e.target.value)}
                        >
                            <option value="all">all</option>
                            <option value="interview">interview</option>
                            <option value="declined">declined</option>
                            <option value="pending">pending</option>
                        </select>
                    </div>

                    <div className="single_search_form_input_box">
                        <label htmlFor="search">Type</label>

                        <select 
                            className="search_type"
                            value={JobType}
                            onChange={(e) => setJobType(e.target.value)}

                        >
                            <option value="all">all</option>
                            <option value="full-time">full-time</option>
                            <option value="part-time">part-time</option>
                            <option value="remote">remote</option>
                            <option value="internship">internship</option>
                        </select>
                    </div>

                    <div className="single_search_form_input_box">
                        <label htmlFor="search">Sort</label>

                        <select 
                            className="search_sort"
                            value={SortJob}
                            onChange={(e) => setSortJob(e.target.value)}
                        >
                            <option value="latest">latest</option>
                            <option value="oldest">oldest</option>
                            <option value="a-z">a-z</option>
                            <option value="z-a">z-a</option>
                        </select>
                    </div>

                    <div className="clear_filter_btn_box">
                        <p>Clear</p>

                        <button 
                            className="clear_filter_btn"
                            onClick={handle_clear_filter}
                        >
                            Clear Filter
                        </button>
                    </div>

                </article>
            </section>
    )
}