import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'

export default function Home(){
    let _days = []
    // Get todays date and day of the week
    let today = new Date();
    function getWeekDay(today){
        let days = ["M", "T", "W", "T", "F", "S", "S"]
        return days[today.getDay()]
    
    }
    let day = {dayOfWeek: getWeekDay(today),
    dateOfMonth:today.getDate()};
    //Push day to array _days
    _days.push(day)

    // Add dates ahead of today and add to end of _days array
    for (let i = 0; i < 7; i++){
    today.setDate(today.getDate()+1)
    let dayAhead = {dayOfWeek: getWeekDay(today),
        dateOfMonth:today.getDate()};
        _days.push(dayAhead)
    }
    let today1 = new Date();
    // Add dates prior of today and add to beginning of _days array
    for (let i = 0; i < 7; i++){
        today1.setDate(today1.getDate()-1)
        let dayPrior = {dateOfMonth:today1.getDate(), dayOfWeek: getWeekDay(today1)};
            _days.unshift(dayPrior)
        }
    console.log(_days);

    // Append to DOM
    function appendDays(_days){
        let html_template = ''
        for (let day of _days){
            html_template += `<div>${day.dayOfWeek}<br>  ${day.dateOfMonth}</div>`
        }
        return html_template
    }

    return (/*html*/ `
        ${Background()}
        ${Header({profileBtn: true})}
        <div id="view__home">
            <h2>Hello Lukas 💪<h2>
            <h1>Welcome Back!</h1>
            
            <div id="home__days">
                ${appendDays(_days)}
            </div>
        </div>
        ${Nav()}
    `)
}