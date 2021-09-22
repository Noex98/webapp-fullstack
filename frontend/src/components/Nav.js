import Link from '../utils/Link.js'

export default function Nav(active){

    return ( /*html*/ `
        <nav>
            <ul>
                <li>
                    ${Link('/plans', /*html*/ `
                        <img src="../media/images/icons/nav_plan.svg" ${active === 'plans' ? 'class="nav__active"' : ''}" />
                    `)}
                </li>
                <li>
                    ${Link('/startWorkout', /*html*/ `
                        <img src="../media/images/icons/nav_workouts.svg"  ${active === 'startWorkout' ? 'class="nav__active"' : ''}"/>
                    `)}
                </li>
                <li>
                    ${Link('/stats', /*html*/ `
                        <img src="../media/images/icons/nav_stats.svg" ${active === 'stats' ? 'class="nav__active"' : ''}"/>
                    `)}
                </li>
            </ul>
        </nav>
    `)
}