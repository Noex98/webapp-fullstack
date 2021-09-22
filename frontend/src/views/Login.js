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
    

    return (/*html*/ `
        ${Background()}
        <div id="view__login">
            <h1 class="logo" >Liftr</h1>
            <div class="login__container">
                <h2>Login</h2>
                <p>Start your training and see your progress!</p>
                <div class="container__inputs">
                    <div>
                        <img src="../media/images/icons/username2.svg" alt="icon" />
                        <div class="inputs__fields">
                            <label for="user">Username / E-mail: </label>
                            <input type="text" name="user" id="user" />
                        </div>
                    </div>
                    <div>
                        <img src="../media/images/icons/mail.svg" alt="icon" />
                        <div class="inputs__fields">
                            <label for="password">Password: </label>
                            <input type="password" name="password" id="password" />
                        </div>
                    </div>
                    <div>
                        <img src="../media/images/icons/password.svg" alt="icon" />
                        <div class="inputs__fields">
                            <input type="checkbox" />
                            <label for="remember">Remember me: </label>
                        </div>
                    </div>
                <div>
                    <button onclick="login()">Login</button>
                    <div id="errLog"></div>
                </div>
                
                ${Link('/forgot-password', /*html*/`
                    Forgot you password?
                `)}

                ${Link('/new-user', /*html*/`
                    <div>Signup here!</div>    
                `)}
            </div>
        </div>
    `)
}