import Link from '../utils/Link.js'

export default function Nav(active){

    return ( /*html*/ `
        <nav>
            <ul>
                <li class="${active === 'plans' ? 'nav__active' : ''}">
                    ${Link('/plans', /*html*/ '<img src="../media/images/icons/nav_plan.svg" />')}
                </li>
                <li class="${active === 'plans' ? 'nav__active' : ''}" id="nav-li-center">
                    ${Link('/startWorkout', /*html*/ '<img src="../media/images/icons/nav_workouts.svg" />')}
                </li>
                <li class="${active === 'plans' ? 'nav__active' : ''}">
                    ${Link('/stats', /*html*/ '<img src="../media/images/icons/nav_stats.svg" />')}
                </li>
            </ul>
        </nav>
    `)
}