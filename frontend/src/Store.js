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
            fetch(__ENV + '/api/user')
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
            fetch(__ENV + '/api/plans')
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

export let history = {
    loaded: false,
    dataStore: undefined,
    data: () => {
        if (history.loaded){
            return history.dataStore
        } else {
            fetch(__ENV + '/api/history')
                .then(res => res.json())
                .then(data => {
                    if (data.auth === false){
                        Redirect('/login')
                    } else {
                        history.dataStore = data 
                        history.loaded = true
                        navigateTo()
                    }
                })
        }
    }
}