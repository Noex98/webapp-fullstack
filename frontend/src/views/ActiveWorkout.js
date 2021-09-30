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

    function pauseTimer(id){
        console.log(id)
    }

    function returnExercises(){

        let html_template = ''

        // Loop through all exercises
        for (const [index, exercise] of _exercises.entries()) {



            let set_template = ''

            // Loop though all sets for each exercise
            for (let i = 0; i < parseInt(exercise.set) ;i++) {

                let pause = /*html*/`
                    <div class="setCont__pause">
                        <div class="pause__display" id="pause__display-${index.toString() + i.toString()}">
                            <div class="display__number">01:00</div>
                        </div>
                        <div class="pause__arrowCont">
                            <img onclick="nextSet(${index}, 0)" src="../media/images/icons/previous.svg" alt="arrow" />
                            <img onclick="nextSet(${index}, 1)" src="../media/images/icons/next.svg" alt="arrow" />
                        </div>
                    </div>
                `
                
                set_template += /*html*/`
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
            if (activeDisplay.nextElementSibling === null){ // No next set to go to
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
            <div id="active-workout__wrapper">
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