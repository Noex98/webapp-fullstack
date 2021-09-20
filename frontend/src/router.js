// Views
import Err404 from './views/Err404.js'
import Home from './views/Home.js'
import Login from './views/Login.js'
import NewUser from './views/NewUser.js'
import Settings from './views/Settings.js'
import Stats from './views/Stats.js'
import StartWorkout from './views/StartWorkout.js'
import Plans from './views/Plans.js'

// Utils
import ProtectRoute from './utils/ProtectRoute.js'

const routes = [
    {
        path: '/',
        view: Home,
        protectedRoute: true
    }, {
        path: '/login',
        view: Login,
        protectedRoute: false
    }, {
        path: '/new-user',
        view: NewUser,
        protectedRoute: false
    }, {
        path: '/settings',
        view: Settings,
        protectedRoute: true
    }, {
        path: '/stats',
        view: Stats,
        protectedRoute: true
    }, {
        path: '/startWorkout',
        view: StartWorkout,
        protectedRoute: true
    }, {
        path: '/plans',
        view: Plans,
        protectedRoute: true
    }
]

let root = document.getElementById('root')

// Render view in the DOM
function render(){
    let target = routes.find(element => element.path === window.location.pathname);
    if (target.protectedRoute){
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