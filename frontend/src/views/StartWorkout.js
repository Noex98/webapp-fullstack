import Header from "../components/Header.js"
import Nav from "../components/Nav.js"
import Background from "../components/Background.js"

export default function StartWorkout(){


    return (/*html*/ `
        ${Background()}
        ${Header({profileBtn: true})}
            StartWorkout component
        ${Nav('startWorkout')}
    `)
}