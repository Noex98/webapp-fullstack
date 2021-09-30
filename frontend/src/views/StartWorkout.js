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
    
    for (let [index, plan] of _plans.entries()) {
        plan.index = index
        if (plan.repeat.includes(getWeekDay(today))){
            _plansToday.push(plan)
        } else {
            _plansNotToday.push(plan)
        }
    }
    //append todays workout to DOM
    function returnWorkoutsToday(){
        //if there is more then 0 plans to day display them, else display nothing
        if (_plansToday.length != 0){
            let html_template = ""
            html_template += /*html*/`
            <h2>Scheduled for today</h2>
            `
            //loop through plans today and display them
            for (let plans of _plansToday) {
                //Give workoutContainer unique ids
                var id = "id" + Math.random().toString(16).slice(2)

                //append to dom
                html_template  += /*html*/
                ` <div class="workoutContainer"  id="${id}" onclick="showAccordion(this.id)">
                <div class="workoutContainer__header">
                    <h3>
                    ${plans.name}</h3>
                    <img src="../media/images/icons/arrow_down.svg">
                </div>
                <div class="accordion">
                    <h4>${plans.exercises.length} exercises</h4>
                    <table>
                        <tr>
                        <th class="start">exercise</th>
                        <th>set</th>
                        <th class="rep">rep</th>
                        <th>weight</th>
                    </tr>
                </div>
               
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
            <button>
                ${Link('/active-workout', 'Start', plans.index)}
            </button>
            </div>
            </div>
            </div>`
            }
            return html_template
          
        } else {
            return ''
        }
    }

   
    //append all workouts to DOM
    function returnWorkouts(){
        let html_template = ''
        for (let [index, plans] of _plansNotToday.entries()) {
            //give unique id's
            var id = "id" + Math.random().toString(16).slice(2)
            html_template +=/*html*/ `
            <div class="workoutContainer" id="${id}" onclick="showAccordion(this.id)">
            <div class="workoutContainer__header">
            <h3>
            ${plans.name}</h3> 
            <img src="../media/images/icons/arrow_down.svg">
            </div>
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
            ${Link('/active-workout', /*html*/`
                <button>Start</button>
            `, index)}
            </div>
            </div>
            </div>`
        }
       
        return html_template
    }
  
    window.showAccordion = (clicked_id) => {

        let clickedBtn = document.getElementById(clicked_id)

        let addBtn = clickedBtn.classList.contains('activeBtn') ? false : true;

        // Get list of all buttons
        let buttons = document.querySelectorAll(".workoutContainer");

        // Remove active class from all buttons
        for (const button of buttons) {
            button.classList.remove("activeBtn")
            button.lastElementChild.classList.remove("activeAcc");
        }

        if (addBtn) {

            // Add active class to the clicked element
            clickedBtn.classList.add("activeBtn")
            clickedBtn.lastElementChild.classList.add("activeAcc")
            
        }
    }
  
    return (/*html*/ `
        ${Background()}
        ${Header({profileBtn: true, backBtn: true})}
            <div id="workout_view">
            <h1>Choose your workout</h1>
            ${returnWorkoutsToday()}
            <h2>All Workouts</h2>
            
            ${returnWorkouts()}
            </div>
            ${Link('/active-workout', /*html*/`
                Knap til active-workout
            `, 0)}
        ${Nav('startWorkout')}
    `)
}