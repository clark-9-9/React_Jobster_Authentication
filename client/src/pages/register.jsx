import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"



export function Register() {

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const NavigateTo = useNavigate()


    const userData = JSON.parse(localStorage.getItem("userData")) 

    useEffect(() => {
        if( userData && userData.token) {
            NavigateTo("/main-page/all-jobs")
        }
    }, [])




    const handle_register_user = async (e) => {
        e.preventDefault()


        const body_req = {
            name:name,
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
            const sendUserRegister = await fetch("/api/v1/auth/register", option)
            const userRegister = await sendUserRegister.json()

            setName('')
            setName('')
            setPassword('')
            
            if(!userRegister.err || !userRegister.msg) {
                NavigateTo('/login')
            }

            console.log(userRegister);


        } catch(err) {
            console.log(err);
        }

    }




    return (
        <div className="make_box_center">
            <form 
                className="register_box"
                onSubmit={handle_register_user}
            >

                <article className="jbox_register_parent">
                    <div className="jbox_jobster">
                        <div className="j_box">
                            <p>J</p>
                        </div>

                        <p id="jobster">JOBSTER</p>
                    </div>

                    <p id="register">
                        REGISTER
                    </p>
                </article>

                <article className="inputs_box">

                    <div className="label_input">
                        <label htmlFor="name">NAME</label>
                        <input 
                            type="text" 
                            className="the_input" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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

                    <button type="submit" className="submit_btn">
                        SUBMIT
                    </button>

                    <div className="instruction">
                        <p>Already A Member?</p>
                        <NavLink to="/login" >
                            LOGIN
                        </NavLink>
                    </div>

                </article>
            </form>
        </div>
    )
}





