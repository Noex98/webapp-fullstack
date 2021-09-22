import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'

export default function Home(){

    return (/*html*/ `
        ${Background()}
        ${Header()}
        <h1>Home component</h1>
        ${Nav()}
    `)
}