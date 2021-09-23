import Header from "../components/Header.js"
import Nav from "../components/Nav.js";
import Background from "../components/Background.js"
import { user } from "../Store.js";
import __ENV from "../env.js";

export default function Plans(){


    window.updatePlans = () => {

        let newPlan = {
            name: 'Squads',
            repeat: [
                'monday',
                'friday,'
            ],
            
        }

        fetch(__ENV + '/api/plans', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(['1', '2']),
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    let exerciseCount = 1

    window.addExercise = () => {
        exerciseCount += 1
        document.getElementById('exerciseCount'). innerText = `${exerciseCount} exercises`

        let newRow = /*html*/`
            <tr>
                <td>
                    <input type="text" placeholder="Untitled" />
                </td>
                <td>
                    <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/>
                </td>
                <td>
                    <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/>
                </td>
                <td>
                    <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/> 
                </td>
            </tr>
        `
        let tableBody = document.querySelector('tbody')

        tableBody.innerHTML += newRow

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
                        <td>
                            <input type="text" placeholder="Untitled" />
                        </td>
                        <td>
                            <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/>
                        </td>
                        <td>
                            <input class="td__numberInput" min="0" max="999" type="number" placeholder="x"/>
                        </td>
                        <td>
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