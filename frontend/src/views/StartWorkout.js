import Header from "../components/Header.js"
import Nav from "../components/Nav.js"

export default function StartWorkout(){

    window.clickfunc = () => {
        abc()
    }

    return (/*html*/ `
        ${Header({profileBtn: true})}
            StartWorkout component
            <button onclick="clickfunc()">click me</button>
        ${Nav()}
    `)
}