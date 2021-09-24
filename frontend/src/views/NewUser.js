import Header from "../components/Header.js"
import Background from '../components/Background.js'
import Link from "../utils/Link.js"
import Redirect from "../utils/Redirect.js"

export default function NewUser(){

    // window.login = () => {
    //     fetch(__ENV + '/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include',
    //         mode: 'cors',
    //         secure: true,
    //         body: JSON.stringify({
    //             user: document.getElementById('user').value,
    //             password: document.getElementById('password').value
    //         }),
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.login !== true){
    //                 document.getElementById('errLog').innerText = data.err
    //             } else {
    //                 Redirect('/')
    //             }
    //         })
    // }

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
        <div id="view__newUser">
            ${Background()}
            ${Header()}
            <div id="newUser__container">
                <h2>Sign up</h2>
                <p>Let's get you all set up, so you can start lifting, create your own workouts and see your progress
                
                <div class="container__inputs">
                    <div>
                        <img src="../media/images/icons/username.svg" alt="icon" />
                        <div class="input__fields">
                            <label for="username">Username</label>
                            <input placeholder="Username" type="text" name="username" id="username" />
                        </div>
                    </div>
                    <div>
                        <img src="../media/images/icons/mail.svg" alt="icon" />
                        <div class="input__fields">
                            <label for="email">E-mail: </label>
                            <input placeholder="example@example.com" type="text" name="email" id="email" />
                        </div>
                    </div>
                    <div>
                        <img src="../media/images/icons/password.svg" alt="icon" />
                        <div class="input__fields">
                            <label for="password">Password: </label>
                            <input placeholder="Password" type="password" name="password" id="password" />
                        </div>
                        <img onclick="showPasword()" id="showPassword" src="../media/images/icons/eye.svg" alt="icon" />
                    </div>
                </div>

                <div class="container__terms">
                    <input type="checkbox" id="terms"/>
                    <label for="terms">I agree to the <strong>Terms</strong> and <strong>Privacy Policy</strong> </label>
                </div>
                
                <button  class="container__signupBtn"onclick="signUp()">Get started</button>
                
                <div id="errLog"></div>

                ${Link('/login', /*html*/`
                    <div class="container__link">Already have an account <strong>Log in</strong></div>    
                `)}

            </div>
        </div>
    `)
}