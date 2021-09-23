import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'

export default function Home(){
    let _days = []
    // Get todays date and day of the week
    let today = new Date();
    function getWeekDay(today){
        let days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
        return days[today.getDay()]
    
    }
    let day = {dayOfWeek: getWeekDay(today),
    dateOfMonth:today.getDate()};
    //Push day to array _days
    _days.push(day)

    // Add dates ahead of today and add to end of _days array
    for (let i = 0; i < 31; i++){
    today.setDate(today.getDate()+1)
    let dayAhead = {dayOfWeek: getWeekDay(today),
        dateOfMonth:today.getDate()};
        _days.push(dayAhead)
    }
 


    //Display workout 
     

    // Append to DOM
    function appendDays(_days){
        let html_template = ''
        for (let day of _days){
            html_template += /*html*/ `<div class="nd" onclick="displayWorkout()"><div id="n">${day.dayOfWeek}</div><br> <div id="d">${day.dateOfMonth}</div></div>`
        }
        return html_template
    }

    return (/*html*/ `
        ${Background()}
        ${Header({profileBtn: true})}
        <div id="view__home">
            <h2>Hello Lukas 💪<h2>
            <h1>Welcome Back!</h1>
           
            <div>
            <img id="arrowleft" src="../media/images/icons/arrow_left.svg">
            <div id="home__days">
                ${appendDays(_days)}
            </div>
            <img id="arrowright" src="../media/images/icons/arrow_right.svg">
            </div>
            <div id="workoutContainer"></div>
        </div>
     
        ${Nav()}
    `)
}

