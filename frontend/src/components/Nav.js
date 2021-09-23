import Link from '../utils/Link.js'

export default function Nav(active){

    return ( /*html*/ `
        <div id="navSpaceReserve"></div>
        <nav>
            <ul>
                <li>
                    ${Link('/plans', /*html*/ `
                        <div ${active === 'plans' ? 'class="nav__active"' : ''}>
                            <svg width="43" height="37" viewBox="0 0 43 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path class="fill" d="M20.5417 14.4167V36.875H4.20833C3.12537 36.875 2.08675 36.4448 1.32098 35.679C0.555207 34.9132 0.125 33.8746 0.125 32.7917V4.20833C0.125 3.12537 0.555207 2.08675 1.32098 1.32098C2.08675 0.555207 3.12537 0.125 4.20833 0.125H32.7917C33.8746 0.125 34.9132 0.555207 35.679 1.32098C36.4448 2.08675 36.875 3.12537 36.875 4.20833V14.4167H20.5417ZM16.4583 14.4167H4.20833V22.5833H16.4583V14.4167ZM16.4583 32.7917V26.6667H4.20833V32.7917H16.4583ZM20.5417 4.20833V10.3333H32.7917V4.20833H20.5417ZM16.4583 4.20833H4.20833V10.3333H16.4583V4.20833Z" fill="#66848A"/>
                                <path class="fill" d="M32.791 36.8748V30.7498H26.666V26.6665H32.791V20.5415H36.8744V26.6665H42.9994V30.7498H36.8744V36.8748H32.791Z" fill="#66848A"/>
                            </svg>
                        </div>
                    `)}
                </li>
                <li>
                    ${Link('/startWorkout', /*html*/ `
                        <div src="../media/images/icons/nav_workouts.svg"  ${active === 'startWorkout' ? 'class="nav__active"' : ''}>
                            <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path class="fill" d="M0.125 31.4442C0.125 31.4442 2.16667 8.47542 8.29167 0.125L18.5 2.16667L16.4583 8.47542H12.375V23.0938H14.4167C18.5 16.8258 26.9525 14.5392 32.0567 16.8258C38.7942 19.9496 38.1817 29.3617 32.0567 33.5267C27.1567 36.875 12.375 39.7946 0.125 31.4442Z" fill="#66848A"/>
                            </svg>
                        </div>
                    `)}
                </li>
                <li>
                    ${Link('/stats', /*html*/ `
                        <div ${active === 'stats' ? 'class="nav__active"' : ''}>
                            <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect class="stroke" x="2" y="2" width="36" height="37" rx="4" stroke="#66848A" stroke-width="4"/>
                            <rect class="fill" x="11" y="20" width="4" height="13" rx="2" fill="#66848A"/>
                            <rect class="fill" x="19" y="15" width="4" height="18" rx="2" fill="#66848A"/>
                            <rect class="fill" x="27" y="8" width="4" height="25" rx="2" fill="#66848A"/>
                            </svg>
                        <div>
                    `)}
                </li>
            </ul>
        </nav>
    `)
}