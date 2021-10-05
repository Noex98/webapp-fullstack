// Views
import Err404 from './views/Err404.js'
import Home from './views/Home.js'
import Login from './views/Login.js'
import NewUser from './views/NewUser.js'
import Profile from './views/Profile.js'
import Stats from './views/Stats.js'
import StartWorkout from './views/StartWorkout.js'
import Plans from './views/Plans.js'
import ForgotPassword from './views/ForgotPassword.js'
import ChangePassword from './views/ChangePassword.js'
import ActiveWorkout from './views/ActiveWorkout.js'

// Utils
import ProtectRoute from './utils/ProtectRoute.js'

const routes = [
    {
        path: '/',
        view: Home,
        auth: true,
        title: 'Liftr'
    }, {
        path: '/login',
        view: Login,
        auth: false,
        title: 'Liftr | Login'
    }, {
        path: '/new-user',
        view: NewUser,
        auth: false,
        title: 'Liftr | New User'
    }, {
        path: '/forgot-password',
        view: ForgotPassword,
        auth: false,
        title: 'Liftr | Reset Password'
    }, {
        path: '/profile',
        view: Profile,
        auth: true,
        title: 'Liftr | My Profile'
    }, {
        path: '/stats',
        view: Stats,
        auth: true,
        title: 'Liftr | Statistics'
    }, {
        path: '/start-workout',
        view: StartWorkout,
        auth: true,
        title: 'Liftr | Start Workout'
    }, {
        path: '/active-workout',
        view: ActiveWorkout,
        auth: true,
        title: 'Liftr | Active workout'
    }, {
        path: '/plans',
        view: Plans,
        auth: true,
        title: 'Liftr | Create Plan'
    }, {
        path: '/change-password',
        view: ChangePassword,
        auth: true,
        title: 'Liftr | My Profile'
    }
]

let root = document.getElementById('root')

// Render view in the DOM
function render(data){
    let target = routes.find(element => element.path === window.location.pathname);
    
    if (target === undefined){
        root.innerHTML = Err404()
    } else {
        if (target.auth){
            ProtectRoute()
        }
        root.innerHTML = target.view(data)
        document.title = target.title
    }
}

// Global navigation function
window.navigateTo = (path, data) => {
    window.history. pushState(null, null, path)
    render(data)
}

// Navigating with history api
window.onpopstate = () => render()

// First render
window.onload = () => render()