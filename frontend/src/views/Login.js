import Background from "../components/Background.js"
import Redirect from "../utils/Redirect.js"
import Link from "../utils/Link.js"
import __ENV from "../env.js"

export default function Login(){

    window.login = () => {
        fetch(__ENV + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            secure: true,
            body: JSON.stringify({
                user: document.getElementById('user').value,
                password: document.getElementById('password').value
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.login !== true){
                    document.getElementById('errLog').innerText = data.err
                } else {
                    Redirect('/')
                }
            })
    }

    window.showPasword = () => {
        let input = document.getElementById("password");
        let btn = document.getElementById('showPassword')
        if (input.type === "password") {
          input.type = "text";
          btn.src = "../media/images/icons/eye_closed.svg"  
        } else {
          input.type = "password";
          btn.src = "../media/images/icons/eye.svg"
        }
    }
    

    return (/*html*/ `
        <div id="view__login">
            ${Background()}
            <h1 class="logo" >Liftr</h1>
            <div class="login__container">
                <h2>Log in</h2>
                <p>Start your training and see your progress!</p>

                <div class="container__inputs">
                    <div>
                        <img src="../media/images/icons/username.svg" alt="icon" />
                        <div class="inputs__fields">
                            <label for="user">Username or email: </label>
                            <input autocomplete="off" placeholder="email@email.com" type="text" name="user" id="user" />
                        </div>
                    </div>
                    <div>
                        <img src="../media/images/icons/password.svg" alt="icon" />
                        <div class="inputs__fields">
                            <label for="password">Password: </label>
                            <input placeholder="password" type="password" name="password" id="password" />
                        </div>
                        <img onclick="showPasword()" id="showPassword" src="../media/images/icons/eye.svg" alt="icon" />
                    </div>
                </div>

                <div class="container__remember">
                    <input type="checkbox" id="remember"/>
                    <label for="remember">Remember me </label>
                </div>

                <button  class="container__loginBtn"onclick="login()">Login</button>
                
                <div id="errLog"></div>
                

                ${Link('/forgot-password', /*html*/`
                    <div class="container__link">Forgot you password?</div>
                `)}

                ${Link('/new-user', /*html*/`
                    <div class="container__link">Don't have an account? <strong>Sign up</strong></div>    
                `)}
            </div>
        </div>
    `)
}