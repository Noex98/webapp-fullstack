import __ENV from "./env.js"
import Redirect from "./utils/Redirect.js"
import ReRender from "./utils/ReRender.js"

export let user = {
    loaded: false,
    dataStore: undefined,
    data: () => {
        if (user.loaded){
            return user.dataStore
        } else {
            fetch('https://randomuser.me/api/')
                .then(res => res.json())
                .then(data => {
                    if (data.auth === false){
                        Redirect('/login')
                    } else {
                        user.dataStore = data 
                        user.loaded = true
                        ReRender()
                    }
                })
        }
    }
}

export let plans = {
    loaded: false,
    dataStore: undefined,
    data: () => {
        if (plans.loaded){
            return plans.dataStore
        } else {
            fetch('')
                .then(res => res.json())
                .then(data => {
                    if (data.auth === false){
                        Redirect('/login')
                    } else {
                        plans.dataStore = data 
                        plans.loaded = true
                        navigateTo()
                    }
                })
        }
    }
}

export let prevWorkouts = {
    loaded: false,
    dataStore: undefined,
    data: () => {
        if (prevWorkouts.loaded){
            return prevWorkouts.dataStore
        } else {
            fetch('')
                .then(res => res.json())
                .then(data => {
                    if (data.auth === false){
                        Redirect('/login')
                    } else {
                        prevWorkouts.dataStore = data 
                        prevWorkouts.loaded = true
                        navigateTo()
                    }
                })
        }
    }
}