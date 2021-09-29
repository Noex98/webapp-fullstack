import Header from "../components/Header.js"
import Nav from "../components/Nav.js"
import Background from "../components/Background.js"
import { user } from "../Store.js";
import Link from "../utils/Link.js";
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
    
    for (let plan of _plans) {
        if (plan.repeat.includes(getWeekDay(today))){
            _plansToday.push(plan)
        } else {
            _plansNotToday.push(plan)
        }
    }
    console.log(_plansNotToday[0].exercises.length);
    //append todays workout to DOM
    function returnWorkoutsToday(){
        if (_plansToday.length != 0){
            return (/*html*/`
            <h2>Scheduled for today</h2>
            <div class="workoutContainer"><h3>
            ${_plansToday[0].name}</h3>
            
            </div>
            
            `)
        } else {
            return ''
        }
    }

   
    //append all workouts to DOM
    function returnWorkouts(){
        let html_template = ''
        for (let plans of _plansNotToday) {
            //give unique id's
            var id = "id" + Math.random().toString(16).slice(2)
            html_template +=/*html*/ `
            <div class="workoutContainer" id="${id}" onclick="showAccordion(this.id)"><h3>
            ${plans.name}</h3>
            <div class="accordion">
            <h4>${plans.exercises.length} exercises</h4>
           <table>
            <tr>
            <th class="start">exercise</th>
            <th>set</th>
            <th class="rep">rep</th>
            <th>weight</th>
            </tr>
           
           
            `
            //Loop through the exercises withing "plans" and append them to dom
            for (const exercise of plans.exercises) {
                html_template +=/*html*/`
                <tr>
                <td class="start">${exercise.name}</td>
                <td class="number">${exercise.set}</td>
                <td class="number repnum">${exercise.rep}</td>
                <td class="number">${exercise.weight}</td>
                </tr>
             `
                
            }
            //Finish table and div tags that was started in the first loop through "plans"
            html_template +=/*html*/
            `  </table>
            <div class="buttons">
            <button>Edit</button>
            <button>Start</button>
            </div>
            </div>
            </div>`
        }
        return html_template
    }
  
    window.showAccordion = (clicked_id) => {

        let clickedBtn = document.getElementById(clicked_id)

        // Get list of all buttons
        let buttons = document.querySelectorAll(".workoutContainer");

        // Remove active class from all buttons
        for (const button of buttons) {
           button.lastElementChild.classList.remove("activeAcc");
        }

        // Add active class to the clicked element
        clickedBtn.lastElementChild.classList.add("activeAcc")
        
        }
  
    return (/*html*/ `
        ${Background()}
        ${Header({profileBtn: true})}
            <h1>Choose your workout</h1>
            ${returnWorkoutsToday()}
            <h2>All Workouts</h2>
            
            ${returnWorkouts()}
            ${Link('/active-workout', /*html*/`
                Knap til active-workout
            `, 0)}
        ${Nav('startWorkout')}
    `)
}