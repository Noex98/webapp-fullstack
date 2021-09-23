import Header from "../components/Header.js"
import Nav from "../components/Nav.js"
import Background from "../components/Background.js"

export default function Stats(){
    return (/*html*/ `
        ${Background()}
        ${Header({backBtn: true, profileBtn: true})}
            Stats component
        ${Nav('stats')}
    `)
}