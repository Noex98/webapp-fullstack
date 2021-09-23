import Header from "../components/Header.js"
import Nav from "../components/Nav.js";
import Background from "../components/Background.js"
import { user } from "../Store.js";
import __ENV from "../env.js";
import Redirect from "../utils/Redirect.js";

export default function Plans(){

    let data = user.data()

    window.updatePlans = () => {

        

        let rows = document.querySelectorAll('tbody tr')

        let newPlan = {
            name: document.querySelector('.inputCont__name').value,
            repeat: [],
            exercises: [],
        }

        for (const row of rows) {
            let exercise = {
                name: row.querySelector('.td__name input').value,
                set: row.querySelector('.td__set input').value,
                rep: row.querySelector('.td__rep input').value,
                weight: row.querySelector('.td__weight input').value,
            }
            newPlan.exercises.push(exercise)
        }

        data.plans.push(newPlan)

        
        fetch(__ENV + '/api/plans', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.plans),
        })
            .then(res => res.json())
            .then(data => Redirect('/'))
        
    }

    let exerciseCount = 1

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

            <button id="finishBtn" onclick="updatePlans()">Finish</button>
        </div>
    </div>
    ${Nav('plans')}
    `)
}