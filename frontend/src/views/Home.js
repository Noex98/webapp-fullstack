import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'
import { user } from '../Store.js' 

export default function Home(){

    let _user = user.data();
    let _plans = _user.plans

    console.log(_plans)

    let _days = []
    // Get todays date and day of the week
    let today = new Date();
    function getWeekDay(today){
        let days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
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
        return months[today.getMonth()-1]
    }

    
    let day = {
        dayOfWeek: getWeekDay(today),
        dateOfMonth:today.getDate()
    };
    //Push day to array _days
    _days.push(day)

    // Add dates ahead of today and add to end of _days array
    for (let i = 0; i < 14; i++){
    today.setDate(today.getDate()+1)
    let dayAhead = {
        dayOfWeek: getWeekDay(today),
        dateOfMonth:today.getDate()
    };
    _days.push(dayAhead)
    }
 


    //Display workout 
    
 

    // Append to DOM
    function appendDays(_days){
        let html_template = ''
        for (let day of _days){
            html_template += /*html*/ `<div class="nd" id="date${day.dateOfMonth}" onclick="changeStyle(this.id)"><div id="n">${day.dayOfWeek}</div><br> <div id="d">${day.dateOfMonth}</div></div>`
        }
        return html_template
    }
   //Change style onclick
   window.changeStyle = (clicked_id) => {
       let buttons = document.querySelectorAll(".nd");
       for (const button of buttons) {
           button.classList.remove("activeButton");
       }
    document.getElementById(clicked_id).classList.add("activeButton")
    console.log(buttons);
}
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
                ${appendDays(_days)}
            </div>
            <img id="arrowright" src="../media/images/icons/arrow_right.svg">
            </div>
          
            <div id="workoutContainer">
            <div id="workoutContainer__header">
            <h3>Today's plan</h3>
            <h1>No Workouts</h1></div>
            <p></p>
        </div>
     
        ${Nav()}
    `)
}

