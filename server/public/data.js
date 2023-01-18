const form_register = document.querySelector(".form_register")
const name_register = document.querySelector(".name")
const email_register = document.querySelector(".email_register")
const password_register = document.querySelector(".password_register")

const form_login = document.querySelector(".form_login")
const email_login = document.querySelector(".email")
const password_login = document.querySelector(".password")




form_register.addEventListener("submit", registerData)

async function registerData(e) {

    e.preventDefault()


    let dataInfo = {
        name: name_register.value,
        email: email_register.value,
        password: password_register.value
    }


    const option = {
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(dataInfo)
    }


    try {

        const register_data = await fetch("/api/v1/auth/register", option)
        const data_from_register = await register_data.json()
        
        name.value = ''
        email_register.value = ''
        password_register.value = ''

        console.log(data_from_register);


    } catch(err) {
        console.log(err);
    }

    
}















form_login.addEventListener("submit", LoginData)

async function LoginData(e) {

    e.preventDefault()

    let dataInfo = {
        email: email_login.value,
        password: password_login.value,
    }

    const option = {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',            
        },

        body: JSON.stringify(dataInfo)
    }

    /* 
    "email": "Anna@gmail.com"
    "password":"secret123"
    */


    try {

        const GetAllJobs = await fetch("/api/v1/auth/login", option)
        const{user, token} = await GetAllJobs.json()

        email_login.value = '',
        password_login.value = ''

        console.log(user);
        console.log(token);


    } catch(err) {
        console.log(err);
    }

}

