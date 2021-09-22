import Link from "../utils/Link.js"
import NavigateBack from "../utils/NavigateBack.js"

export default function Header(props){

    function BackBtn(){
        if (props && props.backBtn === true){
            return (
                NavigateBack(/*html*/ `
                    <div class="header__backBtn">
                        <img src="../media/images/icons/back.svg"/>
                    </div>
                `)
            )
        } else {
            return ''
        }
    }

    function ProfileBtn(){
        if (props && props.profileBtn === true){
            return (
                Link('/profile', /*html*/ `
                    <div class="header__profileBtn">
                        <img src="../media/images/icons/profile.svg"/>
                    </div>
                `)
            )
        } else {
            return ''
        }
    }


    return (/*html*/`
        <header>
            
            ${BackBtn()}
            ${Link('/', /*html*/ `
                <h1 class="logo">Liftr</h1>
            `)}
            ${ProfileBtn()}
            
        </header>
    `)
}