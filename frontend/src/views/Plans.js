import Header from "../components/Header.js"
import Nav from "../components/Nav.js";
import Background from "../components/Background.js"

export default function Plans(){
    return (/*html*/ `
    ${Background()}
    <div id="view__plans">
        ${Header({backBtn: true, profileBtn: true})}
        <h2>Create your workout</h2>
        <div id="plans__inputCont">
            <input class="inputCont__name" type="text" placeholder="Untitled" />
        </div>
    </div>
    ${Nav('plans')}
    `)
}