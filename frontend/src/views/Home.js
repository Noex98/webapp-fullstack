import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'
import Spinner from '../components/Spinner.js'
import { user } from '../Store.js' 

export default function Home(){

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


    let _days = []
    // Get todays date and day of the week
    let today = new Date();
    function getWeekDay(today){
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return days[today.getDay()]
    }

    function getMonth(today){
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        return months[today.getMonth()]
    }

    
    let day = {
        dayOfWeek: getWeekDay(today),
        dateOfMonth:today.getDate()
    };
    //Push day to array _days
    _days.push(day)

    // Add dates ahead of today and add to end of _days array
    for (let i = 0; i < 10; i++){
    today.setDate(today.getDate()+1)
    let dayAhead = {
        dayOfWeek: getWeekDay(today),
        dateOfMonth:today.getDate()
    };
    _days.push(dayAhead)
    }
 
    // Append to DOM
    function appendDays(){
        let html_template = ''
        for (let [i, day] of _days.entries()){
            html_template += /*html*/ `

                <div class="nd ${i == 0 ? 'activeButton' : ''}" id="date${day.dateOfMonth}" data-date="${day.dayOfWeek}" onclick="changeStyle(this.id)">
                    <div class="n">${day.dayOfWeek.substring(0, 2)}</div><br> 
                    <div class="d">${day.dateOfMonth}</div>
                </div>`

        }
        return html_template
    }
   //Change style onclick
    

    window.changeStyle = (clicked_id) => {

        let clickedBtn = document.getElementById(clicked_id)

        // Get list of all buttons
        let buttons = document.querySelectorAll(".nd");

        // Remove active class from all buttons
        for (const button of buttons) {
           button.classList.remove("activeButton");
        }

        // Add active class to the clicked element
        clickedBtn.classList.add("activeButton")
        
        document.getElementById('workoutContainer').innerHTML = showPlan(clickedBtn.dataset.date.toLowerCase())
    }
    
    function showPlan(day){

        let plansShowed = _plans.filter(plan => plan.repeat.includes(day))

        // No plans for the day
        if (plansShowed.length == 0){
            return (/*html*/ `
                <div id="workoutContainer__header">
                    <h3>No plans</h3>
                </div>
            `)
            
        // One plan for the day
        } else if (plansShowed.length == 1){
            let html_template ='';
            let plan = plansShowed[0];
                html_template += /*html*/
                `<div id="workoutContainer__header">
                    <h3>Today's plan</h3>
                    <h1>${plan.name}</h1>
                </div>
                <table>
                <tr>
                <th class="start">exercise</th>
                <th>set</th>
                <th class="rep">rep</th>
                <th>weight</th>
                </tr>
                `

                for (let exercise of plan.exercises) {
                    html_template +=/*html*/`
                    <tr>
                    <td class="start">${exercise.name}</td>
                    <td class="number">${exercise.set}</td>
                    <td class="number repnum">${exercise.rep}</td>
                    <td class="number">${exercise.weight}</td>
                    </tr>
                   `
                }
                html_template +=/*html*/
            `  </table>
            <div class="buttons">
            <button>Edit</button>
            <button>Start</button>`
            return html_template

        // More than 1 plan for the day
        } else {

            let html_template = ''

            // html for each plan
            for (const plan of plansShowed) {
                html_template += /*html*/`
                    <h1>${plan.name}</h1>
                `

            }

            return (/*html*/ `
            <div id="workoutContainer__header">
                <h3>You have ${plansShowed.length} plans today</h3>
                ${html_template}
            </div>
        `)
        }

    }
   console.log(_days);
   
    

    return (/*html*/ `
        ${Background()}
        ${Header({profileBtn: true})}
        <div id="view__home">
            <h2>Hello ${_user !== undefined ? _user.username : "Loading"}💪<h2>
            <h1>Welcome Back!</h1>
            <div id="weekMonth">
                <h2>${getMonth(today)}</h2> 
            </div>
            <div>
                <img id="arrowleft" src="../media/images/icons/arrow_left.svg">

                <div id="home__days">
                    ${appendDays()}
                </div>

                <img id="arrowright" src="../media/images/icons/arrow_right.svg">
            </div>
          
            <div id="workoutContainer">
                ${showPlan(day.dayOfWeek)}
            </div>
        </div>
        
     
        ${Nav()}
    `)
}
