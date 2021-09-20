import Header from "../components/Header.js"
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
        ${Header()}
        <h1>Login</h1>
        <div>
            <label for="user">Username / E-mail: </label>
            <input type="text" name="user" id="user" />
            <label for="password">Password: </label>
            <input type="password" name="password" id="password" />
            <div>
                <button onclick="login()">Login</button>
            </div>
            <div id="errLog"></div>
        </div>
        ${Link('/new-user', /*html*/`
            <div>Signup here!</div>    
        `)}
    `)
}