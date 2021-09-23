import Header from "../components/Header.js"
import Link from "../utils/Link.js"
import Background from "../components/Background.js"

export default function Err404(){

    return (/*html*/ `
        ${Background()}
        ${Header({backBtn: true})}
        <h2>Oops, can't find this resource</h2>
        ${Link('/', 'Take me back')}
    `)
}