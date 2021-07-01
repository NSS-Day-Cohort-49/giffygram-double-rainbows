import { applicationState, getUsers } from "../data/provider.js"
import {newUserSignUpForm} from "./Register.js"

const appContainer = document.querySelector(".giffygram")

document.addEventListener("click", (event)=> {
    if (event.target.id === "loginButton") {
        let foundUser = null
        const userState = getUsers()

        const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value

        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user
            }
        }

        if (foundUser !== null) {
            localStorage.setItem("gg_profile_pic", foundUser.profile_pic )
            localStorage.setItem("gg_user", foundUser.id)
            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
            
        }
    }
})

export const LoginForm = () => {
    return `
        <div class="loginForm">
            <form>
            <h2 class="login_header"> Welcome to Giffygram </h2>
                <fieldset>
                    <label for="email">Email:</label>
                    <input type="text" name="email" autofocus placeholder="Email address" />
                </fieldset>
                <fieldset>
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </fieldset>
            </form>
            <button id="loginButton">Login</button>
            <button id="signUpButton"> Sign Up </button>
        </div>
    `
}

document.addEventListener("click", (event) => {
    if(event.target.id === "signUpButton"){
        appContainer.innerHTML = newUserSignUpForm()
    }
})
