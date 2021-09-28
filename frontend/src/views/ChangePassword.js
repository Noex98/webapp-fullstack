import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'
import Redirect from '../utils/Redirect.js'
import { user } from '../Store.js'
import __ENV from '../env.js'
import ReRender from '../utils/ReRender.js'
import Spinner from '../components/Spinner.js'


export default function ChangePassword(){

    let _user = user.data()

    if (_user === undefined){
        return(/*html*/`
            ${Background()}
            ${Header()}
            ${Spinner()}
            ${Nav()}
        `)
    }

    window.updateData = (updatedKey, updatedValue) => {

        fetch(__ENV + '/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: updatedKey,
                value: updatedValue,
            }),
        })
            .then(res => res.json())
            .then(data => Rere)
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
        ${Background()}
        ${Header({backBtn: true})}
        <div class="changePassword__container">
            <h1>Change your password</h1>

            <div>
                <img src="../media/images/icons/password.svg" alt="icon" />
                <div class="input__fields">
                    <label for="password">Old Password: </label>
                    <input placeholder="Password" type="tekst" name="password" id="password" />
                </div>
            </div>

            <div>
                <img src="../media/images/icons/password.svg" alt="icon" />
                <div class="input__fields">
                    <label for="password">New Password: </label>
                    <input placeholder="Password" type="password" name="password" id="password" />
                </div>
                <img onclick="showPasword()" id="showPassword" src="../media/images/icons/eye.svg" alt="icon" />
            </div>


            <button onclick="savePassword()" type="button">Save</button>
        </div>
        ${Nav()}
    `)
}