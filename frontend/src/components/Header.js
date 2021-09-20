import Link from "../utils/Link.js"

export default function Header(backBtn){

    function insertBtn(backBtn){
        if (backBtn === true){
            return (/*html*/`
                <div class="header__backBtn">
                    <--
                </div>
            `)
        } else {
            return ''
        }
    }

    return (/*html*/`
        <header>
            ${Link('/', /*html*/ `
                ${insertBtn(backBtn)}
                <h1>LIFTR</h1>
            `)}
        </header>
    `)
}