import Header from "../components/Header.js"
import Nav from "../components/Nav.js"

export default function Stats(){
    return (/*html*/ `
        ${Header(true)}
            Stats component
        ${Nav()}
    `)
}