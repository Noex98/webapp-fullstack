import Header from "../components/Header.js"
import Nav from "../components/Nav.js"

export default function StartWorkout(){

    let n = 13

    window.clickfunc = () => {
        alert(n)
    }

    return (/*html*/ `
        ${Header()}
            StartWorkout component
            <button onclick="clickfunc()">click me</button>
        ${Nav()}
    `)
}