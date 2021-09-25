import Header from "../components/Header.js"
import Nav from "../components/Nav.js"
import Background from "../components/Background.js"
import { user } from "../Store.js";
import Spinner from "../components/Spinner.js";

export default function StartWorkout(){
    
    let _user = user.data();

    if (_user === undefined){
        return(/*html*/`
            ${Background()}
            ${Header()}
            ${Spinner()}
            ${Nav()}
        `)
    }


    let _plans = _user.plans;
    let today = new Date();
    console.log(_plans);

    function getWeekDay(today){
        let days = ["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday", ]
        return days[today.getDay()]
    }
    console.log(getWeekDay(today))

    let _plansToday = []
    let _plansNotToday = []
    
    for (const plan of _plans) {
        if (plan.repeat.includes(getWeekDay(today))){
            _plansToday.push(plan)
        } else {
            _plansNotToday.push(plan)
        }
    }

    console.log(_plansNotToday)

    function returnWorkoutsToday(){
        if (_plansToday.length != 0){
            return (/*html*/`
            <h2>Scheduled for today</h2>
            <div class="workoutContainer"><h3>
            ${_plansToday[0].name}</h3></div>
            `)
        } else {
            return ''
        }
    }
    function returnWorkouts(){
        for (const plans of _plansNotToday) {
            return (/*html*/ `<h2>All workouts</h2>
            <div class="workoutContainer"><h3>
            ${plans.name}</h3></div>`)
            
        }
    }
    
    return (/*html*/ `
        ${Background()}
        ${Header({profileBtn: true})}
            <h1>Choose your workout</h1>
            ${returnWorkoutsToday()}
            ${returnWorkouts()}
        ${Nav('startWorkout')}
    `)
}