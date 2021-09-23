import Header from "../components/Header.js"
import Nav from "../components/Nav.js";
import Background from "../components/Background.js"
import { plans } from "../Store.js";
import __ENV from "../env.js";

export default function Plans(){

    console.log(plans.data())

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

    return (/*html*/ `
    ${Background()}
    <div id="view__plans">
        ${Header({backBtn: true, profileBtn: true})}
        <h2>Create your workout</h2>
        <div id="plans__inputCont">
            <input class="inputCont__name" type="text" placeholder="Untitled" />
            <button onclick="updatePlans()">Finish</button>
        </div>
    </div>
    ${Nav('plans')}
    `)
}