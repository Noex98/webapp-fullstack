import Header from '../components/Header.js'
import Nav from '../components/Nav.js'
import Background from '../components/Background.js'
import { user } from '../Store.js'

export default function Home(){

    console.log(user.data())

    return (/*html*/ `
        ${Background()}
        ${Header()}
        <h1>Home component</h1>
        ${Nav()}
    `)
}