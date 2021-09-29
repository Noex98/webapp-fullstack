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

    console.log(_exercises);

    let pause = /*html*/`

    `

    function returnExercises(){

        let html_template = ''

        // Loop through all exercises
        for (const [index, exercise] of _exercises.entries()) {

            let set_template = ''

            // Loop though all sets for each exercise
            for (let i = 0; i < parseInt(exercise.set) ;i++) {
                
                set_template += /*html*/`
                    <div class="setCont__set ${i === 0 ? 'exercise__setCont--active' : ''}">
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
        let exerciseCont = document.getElementById('active-workout__wrapper').children[exerciseIndex]
        let activeDisplay = exerciseCont.querySelector('.exercise__setCont--active')
        
        if (direction == 0){    //Arrow backwards
            if (activeDisplay.previousElementSibling === null){ // No previous set to go to

            } else { // go back to last set

            }
        } else {                // Arrow forwards
            if (activeDisplay.nextElementSibling === null){ // No next set to go to

            } else { // go to next set

            }
        }
        
        console.log(activeDisplay.previousElementSibling)
        console.log(activeDisplay.nextElementSibling)
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