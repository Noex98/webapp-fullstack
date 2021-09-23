import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'
import Redirect from '../utils/Redirect.js'


export default function Profile(){

    // Invalidate login token and redirect to login
    window.logout = () => {
        document.cookie = 'user_Id=0; expires=Thu, 30 Dec 2013 12:00:00 UTC'
        Redirect('/login')
    }

    return (/*html*/ `
        ${Background()}
        ${Header({backBtn: true})}
        <div class="profile__container">
            <h1>Your Profile</h1>

            <h2>Account Settings</h2>
            <div>
                <img src="../media/images/icons/profile.svg" alt="icon" />
                <input type="text" placeholder="Profile">
            </div>

            <h3>Contact Details</h2>
            <div>
                <img src="../media/images/icons/mail.svg" alt="icon" />    
                <input type="text" placeholder="Email adress">
            </div>
            <div>
                <img src="../media/images/icons/phone.svg" alt="icon" />
                <input type="text" placeholder="Phone number">
            </div>

            <h3>Security Settings</h2>
            <div>
                <img src="../media/images/icons/password.svg" alt="icon" />
                <input type="text" placeholder="Password">
            </div>

            <h3>App Settings</h2>
            <div>
                <img src="../media/images/icons/notification.svg" alt="icon" />
                <input type="text" placeholder="Notifacations">
            </div>

            <button onclick="logout()" type="button">Logout</button>
        </div>
        ${Nav()}
    `)
}