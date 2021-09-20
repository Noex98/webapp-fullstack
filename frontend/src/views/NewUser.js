import Header from "../components/Header.js"

export default function NewUser(){
    return (/*html*/ `
            ${Header()}
            <h1>Sign up</h1>
            <div>
                <div>
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div>
                    <label for="email">E-mail: </label>
                    <input type="text" name="email" id="email" />
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                <div>
                    <label for="reppassword">Repeat Password: </label>
                    <input type="password" name="reppassword" id="reppassword" />
                </div>

            </div>
    `)
}