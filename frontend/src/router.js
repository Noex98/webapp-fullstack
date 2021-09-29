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
        auth: true
    }, {
        path: '/login',
        view: Login,
        auth: false
    }, {
        path: '/new-user',
        view: NewUser,
        auth: false
    }, {
        path: '/forgot-password',
        view: ForgotPassword,
        auth: false
    }, {
        path: '/profile',
        view: Profile,
        auth: true
    }, {
        path: '/stats',
        view: Stats,
        auth: true
    }, {
        path: '/start-workout',
        view: StartWorkout,
        auth: true
    }, {
        path: '/active-workout',
        view: ActiveWorkout,
        auth: true
    }, {
        path: '/plans',
        view: Plans,
        auth: true
    }, {
        path: '/change-password',
        view: ChangePassword,
        auth: true
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
            root.innerHTML = target.view(data)
        } else {
            root.innerHTML = target.view(data)
        }
    } 
    
}

// Global navigation function
window.navigateTo = (path, data) => {
    window.history.pushState(null, null, path)
    render(data)
}

// Navigating with history api
window.onpopstate = () => render()

// First render
window.onload = () => render()