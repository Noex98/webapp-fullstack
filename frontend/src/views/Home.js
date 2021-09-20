import Header from '../components/Header.js'
import Nav from '../components/Nav.js'

export default function Home(){

    return (/*html*/ `
        ${Header()}
        <h1>Home component</h1>
        ${Nav()}
    `)
}