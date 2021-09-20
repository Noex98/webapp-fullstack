import Link from '../utils/Link.js'

export default function Nav(active){

    return ( /*html*/ `
        <nav>
            <ul>
                <li class="${active === 'plans' ? 'nav__active' : ''}">
                    ${Link('/plans', /*html*/ 'Plans icon')}
                </li>
                <li class="${active === 'plans' ? 'nav__active' : ''}id="nav-li-center">
                    ${Link('/startWorkout', /*html*/ 'Start icon')}
                </li>
                <li class="${active === 'plans' ? 'nav__active' : ''}">
                    ${Link('/stats', /*html*/ 'Stats icon')}
                </li>
            </ul>
        </nav>
    `)
}