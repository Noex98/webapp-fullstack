// Views
import Err404 from './views/Err404.js'
import Home from './views/Home.js'
import Login from './views/Login.js'
import NewUser from './views/NewUser.js'
import Profile from './views/Profile.js'
import Stats from './views/Stats.js'
import StartWorkout from './views/StartWorkout.js'
import Plans from './views/Plans.js'

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
    }, {
        path: '/new-user',
        view: NewUser,
    }, {
        path: '/profile',
        view: Profile,
        auth: true
    }, {
        path: '/stats',
        view: Stats,
        auth: true
    }, {
        path: '/startWorkout',
        view: StartWorkout,
        auth: true
    }, {
        path: '/plans',
        view: Plans,
        auth: true
    }
]

let root = document.getElementById('root')

// Render view in the DOM
function render(){
    let target = routes.find(element => element.path === window.location.pathname);
    if (target.auth){
        ProtectRoute()
    } 
    root.innerHTML = target !== undefined ? target.view() : Err404()
}

// Global navigation function
window.navigateTo = path => {
    window.history.pushState(null, null, path)
    render()
}

// Navigating with history api
window.onpopstate = () => render()

// First render
window.onload = () => render()