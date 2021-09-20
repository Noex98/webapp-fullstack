import Header from "../components/Header.js"
import Link from "../utils/Link.js"

export default function Err404(){

    return (/*html*/ `
        ${Header()}
        <h1>404 component</h1>
        ${Link('/', 'Back to home')}
    `)
}