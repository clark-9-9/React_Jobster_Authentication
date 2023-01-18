import { useEffect } from "react"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"




export function Login() {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const NavigateTo = useNavigate()
    
    // Authorizatio: "Basic " + btoa(email + ":" +  password)
    // Authorizatio: `Bearer ${}`


    const handle_login_user = async (e) => {

        e.preventDefault()

        let body_req = {
            email:email,
            password:password,
        }

        let option = {
            method:"post",
            headers: {
                "Content-Type":"application/json",
            },

            body:JSON.stringify(body_req)
        }



        try {
            const sendUserLogin = await fetch("/api/v1/auth/login", option)
            const userData = await sendUserLogin.json() 
            // console.log(userData);
            
            setEmail('')
            setPassword('')
            localStorage.setItem("userData", JSON.stringify(userData))

            if(!userData.msg) {
                NavigateTo("/main-page/all-jobs")
            }
            
        } catch(err) {
            console.log(err);
        }


    }

    const userData_2 = JSON.parse(localStorage.getItem("userData")) 

    useEffect(() => {
        if(userData_2 && userData_2.token) {
            NavigateTo("/main-page/all-jobs")
        }
    })

    
    return (
        <div className="make_box_center">
            <form 
                className="register_box"
                onSubmit={handle_login_user}
            >

                <article className="jbox_register_parent">
                    <div className="jbox_jobster">
                        <div className="j_box">
                            <p>J</p>
                        </div>

                        <p id="jobster">JOBSTER</p>
                    </div>

                    <p id="register">
                        LOGIN
                    </p>
                </article>

                <article className="inputs_box">

                    <div className="label_input">
                        <label htmlFor="email">EMAIL</label>
                        <input 
                            type="text" 
                            className="the_input" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="label_input">
                        <label htmlFor="password">PASSWORD</label>
                        <input 
                            type="password" 
                            className="the_input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                </article>

                <article className="submit_form">
                    <button 
                        type="submit" 
                        className="submit_btn"
                    >
                        SUBMIT
                    </button>

                    <div className="instruction">
                        <p>Not A Member Yet?</p>
                        <NavLink to="/Register" >
                            REGISTER
                        </NavLink>
                    </div>
                </article>

            </form>
        </div>
    )

}
