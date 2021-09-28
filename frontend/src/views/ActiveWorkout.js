import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'
import Spinner from '../components/Spinner.js'
import Redirect from '../utils/Redirect.js'
import { user } from '../Store.js' 

export default function ActiveWorkout(props){

    let _user = user.data();

    if (_user === undefined){
        return(/*html*/`
            ${Background()}
            ${Header()}
            ${Spinner()}
            ${Nav()}
        `)
    }

    // Redirect if component doesn't have a plan to use
    if (!props || !props.planIndex){
        Redirect('active-workout')
    }


    return (/*html*/`
        ${Background()}
        ${Header()}
        ${Spinner()}
        ${Nav()}
    `)
}