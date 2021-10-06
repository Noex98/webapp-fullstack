import Background from "../components/Background.js"
import Header from "../components/Header.js"

export default function ForgotPassword(){
    return (/*html*/`
        ${Background()}
        ${Header({backBtn: true})}
        <div>Forgot password component</div>
    `)
}