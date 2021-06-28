import { GiffyGram } from "./GiffyGram.js"
import {LoginForm} from "./auth/Login.js"
import { applicationState, fetchExternalData } from "./data/provider.js"

const applicationElement = document.querySelector(".giffygram")

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))
    fetchExternalData().then(()=>{
    if (user) {
        applicationElement.innerHTML = GiffyGram()
    } else {
        applicationElement.innerHTML = LoginForm()
        console.log(applicationState)
    }
})
}


renderApp()

applicationElement.addEventListener("stateChanged", (customEvent) => {
    renderApp();
  });



