import { GiffyGram, GiffyGramLogIn } from "./GiffyGram.js"
import {LoginForm} from "./auth/Login.js"
import { applicationState, fetchExternalData } from "./data/provider.js"
// import { newPostForm } from "./feed/PostForm.js"
import { postFeed } from "./feed/PostList.js"
import { footer, footerLogIn } from "./nav/Footer.js"
import { messageCounter, messageFeed, readMessageFeed } from "./friends/DirectMessage.js"
import { newMessageForm } from "./message/MessageForm.js"
import { newPostForm } from "./feed/PostForm.js"

const applicationElement = document.querySelector(".giffygram")
const applicationHeader = document.querySelector(".header")
const applicationFooter = document.querySelector(".footer")



export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))
    fetchExternalData().then(()=>{
    if (user) {
        messageCounter()
        
        if(applicationState.currentPage.page === 0){
            applicationElement.innerHTML = postFeed()
        }
        if(applicationState.currentPage.page === 1){
            applicationElement.innerHTML = messageFeed()
        }
        if(applicationState.currentPage.page === 2){
            applicationElement.innerHTML = readMessageFeed()
        }
        if(applicationState.currentPage.page === 3){
            applicationElement.innerHTML = newPostForm()
        }
        
        applicationHeader.innerHTML = GiffyGram()
        applicationFooter.innerHTML = footer()


    } else {
        applicationHeader.innerHTML = GiffyGramLogIn()
        applicationFooter.innerHTML = footerLogIn()
        applicationElement.innerHTML = LoginForm()
        // console.log(applicationState)
    }
})
}


renderApp()

applicationElement.addEventListener("stateChanged", (customEvent) => {
    renderApp();
  });
applicationHeader.addEventListener("stateChanged", (customEvent) => {
    renderApp();
  });



