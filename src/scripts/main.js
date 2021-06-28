import { GiffyGram } from "./GiffyGram.js"
import {LoginForm} from "./auth/Login.js"
import { applicationState, fetchExternalData } from "./data/provider.js"
// import { newPostForm } from "./feed/PostForm.js"
import { postFeed } from "./feed/PostList.js"

const applicationElement = document.querySelector(".giffygram")
const applicationHeader = document.querySelector(".header")
const applicationFooter = document.querySelector(".footer")

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))
    fetchExternalData().then(()=>{
    if (user) {
        applicationElement.innerHTML = postFeed()
        applicationHeader.innerHTML = GiffyGram()
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



