import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'
import Redirect from '../utils/Redirect.js'
import { user } from '../Store.js'
import __ENV from '../env.js'
import ReRender from '../utils/ReRender.js'


export default function Profile(){

    let _user = user.data()

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
            .then(data => ReRender())
    }
    
    function returnNumber() {
        if (_user !== undefined) {
            if (_user.phoneNumber) {
                return _user.phoneNumber
            } else {
                return 'Registrer phonenumber'
            }
        } else {
            return 'Loading'
        }
    }

    // Invalidate login token and redirect to login
    window.logout = () => {
        document.cookie = 'user_Id=0; expires=Thu, 30 Dec 2013 12:00:00 UTC'
        Redirect('/login')
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
        <div class="profile__container">
            <h1>Your Profile</h1>

            <h2>Account Settings</h2>
            <div>
                <img src="../media/images/icons/profile.svg" alt="icon" />   
                <div class="input__fields">
                    <label for="user">Username</label>
                    <input autocomplete="off" placeholder="${_user !== undefined ? _user.username : 'Loading'}" type="text" name="user" id="user" />
                </div>
            </div>

            <h3>Contact Details</h3>
            <div>
                <img src="../media/images/icons/mail.svg" alt="icon" />   
                <div class="input__fields">
                    <label for="email">Email adress</label>
                    <input autocomplete="off" placeholder="${_user !== undefined ? _user.email : 'Loading'}" type="text" name="user" id="email" />
                </div>
            </div>
            <div>
                <img src="../media/images/icons/phone.svg" alt="icon" />   
                <div class="input__fields">
                    <label for="phoneNumber">Phone number</label>
                    <input autocomplete="off" placeholder="${returnNumber()}" type="text" name="user" id="phoneNumber" />
                </div>
            </div>

            <h3>Security Settings</h3>
            <div class="change__password" onclick="changePassword()">
                    <img src="../media/images/icons/password.svg" alt="icon"/>
                    <p>Change password</p>
            </div>

            <h3>App Settings</h3>
            <div>
                <img src="../media/images/icons/notification.svg" alt="icon" />
                <div class="input__fields notifications">
                    <input type="text" placeholder="Notifications">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </div>            
            </div>

            <button onclick="logout()" type="button">Log out</button>
        </div>
        ${Nav()}
    `)
}