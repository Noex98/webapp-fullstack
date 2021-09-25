import Header from "../components/Header.js"
import Nav from "../components/Nav.js";
import Background from "../components/Background.js"
import __ENV from "../env.js";
import Redirect from "../utils/Redirect.js";
import { user } from "../Store.js";

export default function Plans(){

    let exerciseCount = 1

    let _user = user.data()

    let _newPlan = {
        name: '',
        repeat: [],
        exercises: []
    }

    // Create a new object with the given information
    // And render the next page
    window.savePlanData = () => {

        let rows = document.querySelectorAll('tbody tr')

        let nameInput = document.querySelector('#plans__inputCont .inputCont__name').value

        // Schema for the new plan object

        let newPlan = {
            name: nameInput.length !== 0 ? nameInput : 'Untitled',
            repeat: [],
            exercises: [],
        }

        // Collect data from each row into an array
        for (const row of rows) {
            let exercise = {
                name: row.querySelector('.td__name input').value,
                set: row.querySelector('.td__set input').value,
                rep: row.querySelector('.td__rep input').value,
                weight: row.querySelector('.td__weight input').value,
            }
            newPlan.exercises.push(exercise)
        }

        _newPlan = newPlan

        // Load next page
        renderNextPage(newPlan)
    }

    function renderNextPage(newPlan){

        // Set plan name
        document.querySelector('.inputContSet__nameDisplay').innerText = newPlan.name

        // Hide first input container
        document.getElementById('plans__inputCont').style.display = "none"

        // Show next input container 
        document.getElementById('plans__inputContSet').style.display = "flex"
    }

    

    window.addExercise = () => {
        exerciseCount += 1
        document.getElementById('exerciseCount'). innerText = `${exerciseCount} exercises`

        let tr = document.createElement('tr')

        tr.innerHTML = /*html*/`
            <tr>
                <td class="td__name">
                    <input type="text" placeholder="Untitled" />
                </td>
                <td class="td__set">
                    <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/>
                </td>
                <td class="td__rep">
                    <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/>
                </td>
                <td class="td__weight">
                    <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/> 
                </td>
            </tr>
        `
        let tableBody = document.querySelector('tbody')
        tableBody.appendChild(tr)
    }

    window.selectRepeatDay = (element) => {
        element.classList.toggle('selected')
    }

    window.sendNewPlan = () => {

        let repeat = []
        let repeatBtns = document.querySelectorAll('.repeat__btnCont div')

        for (const btn of repeatBtns) {
            if (btn.classList.contains('selected')){
                repeat.push(btn.dataset.value)
            }
        }

        _newPlan.repeat = repeat

        _user.plans.push(_newPlan)
        
        fetch(__ENV + '/api/plans', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_user.plans),
        })
            .then(res => res.json())
            .then(data => Redirect('/'))
            
    }

    return (/*html*/ `
    ${Background()}
    <div id="view__plans">
        ${Header({backBtn: true, profileBtn: true})}
        <h2>Create your workout</h2>
        
        <div id="plans__inputCont">
            <input class="inputCont__name" type="text" placeholder="Untitled" />
            <div id="exerciseCount">1 exercise</div>

            <table>
                <thead>
                    <tr>
                        <th>exercise</th>
                        <th>set</th>
                        <th>rep</th>
                        <th>weight</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="td__name">
                            <input type="text" placeholder="Untitled" />
                        </td>
                        <td class="td__set">
                            <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/>
                        </td>
                        <td class="td__rep">
                            <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/>
                        </td>
                        <td class="td__weight">
                            <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/> 
                        </td>
                    </tr>
                </tbody>
            </table>

            <img id="addBtn" src="../media/images/icons/add.svg" alt="icon" onclick="addExercise()" />

            <button class="finishBtn" onclick="savePlanData()">Next</button>
        </div>


        <div id="plans__inputContSet">
            <div class="inputContSet__nameDisplay"></div>

            <div class="inputContSet__repeat">
                <div class="repeat__title">
                    <div>Days to repeat</div>
                </div>
                <div class="repeat__btnCont">
                    <div data-value="monday" onclick="selectRepeatDay(this)" >M</div>
                    <div data-value="tuesday" onclick="selectRepeatDay(this)" >T</div>
                    <div data-value="wednesday" onclick="selectRepeatDay(this)" >W</div>
                    <div data-value="thursday" onclick="selectRepeatDay(this)" >T</div>
                    <div data-value="friday" onclick="selectRepeatDay(this)" >F</div>
                    <div data-value="saturday" onclick="selectRepeatDay(this)" >S</div>
                    <div data-value="sunday" onclick="selectRepeatDay(this)" >S</div>
                </div>
            </div>

            <button class="finishBtn" onclick="sendNewPlan()">Finish</button>
        </div>

    </div>



    ${Nav('plans')}
    `)
}