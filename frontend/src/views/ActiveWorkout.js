import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'
import Spinner from '../components/Spinner.js'
import Redirect from '../utils/Redirect.js'
import { user } from '../Store.js' 

export default function ActiveWorkout(planIndex){

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
    if (!planIndex){
        if(planIndex !== 0){
            Redirect('start-workout')
        }
    }

    let _exercises = _user.plans[planIndex].exercises

    

    function workoutTimer(){
        let display = document.querySelector('#active-workout__timerCont .timerCont__display')
        let time = 0

        setTimeout(() => {
            time += 1
            display.innerText = time
        }, 1000)
    }

    // Holds all timers
    let timers = {}

    function pauseTimer(id){

        // Avoid reinitializing the timer if already created
        if (!timers[id]){
            timers[id] = {
                container: document.getElementById(id),
                initialTime: 60,
                time: 60,
                start: setInterval(() => {
                    if (timers[id].time === 0){
                        timers[id].end()
                        timers[id].container.querySelector('.display__timer').innerHTML = /*html*/`<div class="timer__end">Pause finished</div>`
                    } else {
                        timers[id].time -= 1
                        timers[id].container.querySelector('.timer__number').innerText = timers[id].time
                    }
                }, 1000),
                end: () => {
                    clearInterval(timers[id].start)
                }
            }
        }
    }

    // Update the bread crumbs
    document.breadCrumbs = (element) => {
        // Get scroll x position
        let position = element.scrollLeft

        // Get width of the wrapper
        let width = element.offsetWidth

        // Avoid burning peoples cpu
        if (position % width === 0){
            // Grab all the dots from the dom
            let dots = document.querySelectorAll('#active-workout__dotCont div')

            // Remove active class
            for (const dot of dots) {
                dot.classList.remove('dotCont__dot--active')
            }

            // Add active class on desired element
            dots.item( position / width ).classList.add('dotCont__dot--active')
        }

    }

    // Returns the main content on the page
    function returnExercises(){

        let html_template = ''

        // Loop through all exercises
        for (const [index, exercise] of _exercises.entries()) {

            // Template for each set
            let set_template = ''

            // Loop though all sets for each exercise
            for (let i = 0; i < parseInt(exercise.set) ;i++) {

                // Returns the pause appended after each set
                let pause = /*html*/`
                    <div class="setCont__pause">
                        <div class="pause__title">Rest</div>
                        <div class="pause__display" id="pause__display-${index.toString() + i.toString()}">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 757.58 671.39">
                                <defs>
                                    <style>.cls-1{fill:#fff;}.cls-2{fill:#aad4c5;}</style>
                                </defs>
                                    <g id="Lag_2" data-name="Lag 2">
                                        <g id="Lag_1-2" data-name="Lag 1">
                                            <path class="cls-1" d="M378.79,0C169.59,0,0,169.59,0,378.79c0,117.85,53.82,223.12,138.22,292.6V638.2q-4.87-4.53-9.59-9.25A354,354,0,1,1,629,629q-4.73,4.72-9.6,9.25v33.19c84.4-69.48,138.22-174.75,138.22-292.6C757.58,169.59,588,0,378.79,0Z"/>
                                            <path class="cls-2" d="M378.79,0C169.59,0,0,169.59,0,378.79c0,117.85,53.82,223.12,138.22,292.6V638.2q-4.87-4.53-9.59-9.25A354,354,0,1,1,629,629q-4.73,4.72-9.6,9.25v33.19c84.4-69.48,138.22-174.75,138.22-292.6C757.58,169.59,588,0,378.79,0Z"/>
                                    </g>
                                </g>
                            </svg>
                            <div class="display__timer">
                                <div class="timer__number">60</div>
                                <div class="timer__text">seconds</div>
                            </div>
                        </div>
                        <div class="pause__arrowCont">
                            <img onclick="nextSet(${index}, 0)" src="../media/images/icons/previous.svg" alt="arrow" />
                            <img onclick="nextSet(${index}, 1)" src="../media/images/icons/next.svg" alt="arrow" />
                        </div>
                    </div>
                `
                
                // Returns each set
                set_template += /*html*/`
                    <!-- Set -->
                    <div class="setCont__set ${i === 0 ? '--activeDisplay' : ''}">
                        <div class="set__setDisplay">Set <i>${i + 1}</i> of <i>${exercise.set}</i></div>
                        <div class="set__inputCont">
                            <input id="${'repInput-' + index.toString() + i.toString()}" type="number" placeholder="${exercise.rep}"/>
                            <label for="${'repInput-' + index.toString() + i.toString()}">rep</label>
                        </div>
                        <div class="set__inputCont">
                            <input id="${'weightInput-' + index.toString() + i.toString()}" type="number" placeholder="${exercise.weight}"/>
                            <label for="${'weightInput-' + index.toString() + i.toString()}">kg</label>
                        </div>

                        <div for="" class="set__arrowCont">
                            <img onclick="nextSet(${index}, 0)" src="../media/images/icons/previous.svg" alt="arrow" />
                            <img onclick="nextSet(${index}, 1)" src="../media/images/icons/next.svg" alt="arrow" />
                        </div>
                    </div>

                    <!-- Pause -->
                    ${i == parseInt(exercise.set) - 1 ? '' : pause}
                `
            }

            // Returns each exercise, with sets
            html_template += /*html*/`
                <div class="active-workout__exercise">
                    <div class="exercise__type">exercise</div>
                    <div class="exercise__nameDisplay">${exercise.name}</div>
                    <div class="exercise__setCont">
                        ${set_template}
                    </div>
                </div>
            `
        }

        return html_template
    }

    function returnDots() {
        let html_template = ''
        for (let i = 0; i < _exercises.length; i++) {
            html_template += /*html*/`
                <div class="${i === 0 ? 'dotCont__dot--active' : ''}"></div>
            `
        }
        return html_template
    }

    window.nextSet = (exerciseIndex, direction) => {
        let wrapper = document.getElementById('active-workout__wrapper')
        let exerciseCont = document.getElementById('active-workout__wrapper').children[exerciseIndex]
        let activeDisplay = exerciseCont.querySelector('.--activeDisplay')
        
        if (direction == 0){ // Arrow backwards
            if (activeDisplay.previousElementSibling === null){ // No previous set to go to
                if (exerciseIndex !== 0){ // No arrow back at the first set of the first exercise
                    wrapper.scroll(wrapper.scrollLeft - activeDisplay.offsetWidth, 0)
                }
            } else { // go back to last set
                activeDisplay.classList.remove('--activeDisplay')
                activeDisplay.previousElementSibling.classList.add('--activeDisplay')
                let nextDisplay = activeDisplay.previousElementSibling
                if (nextDisplay.classList.contains('setCont__pause')){
                    pauseTimer(nextDisplay.querySelector('.pause__display').id)
                }
            }
        } else { // Arrow forwards
            if (activeDisplay.nextElementSibling === null){ // No next set to go to, so we scroll
                wrapper.scroll(wrapper.scrollLeft + activeDisplay.offsetWidth, 0)
            } else { // go to next set
                activeDisplay.classList.remove('--activeDisplay')
                activeDisplay.nextElementSibling.classList.add('--activeDisplay')
                let nextDisplay = activeDisplay.nextElementSibling
                if (nextDisplay.classList.contains('setCont__pause')){
                    pauseTimer(nextDisplay.querySelector('.pause__display').id)
                }
            }
        }
    }


    return (/*html*/`
        ${Background()}
        ${Header({backBtn: true, profileBtn: true})}
        <div id="view__active-workout">
            <div id="active-workout__wrapper" onscroll="breadCrumbs(this)">
                ${returnExercises()}
            </div>
            <div id="active-workout__timerCont">
                <div class="timerCont__header">workout time</div>
                <div class="timerCont__display">00:00</div>
            </div>
            <div id="active-workout__dotCont">
                ${returnDots()}
            </div>
        </div>
    `)
}