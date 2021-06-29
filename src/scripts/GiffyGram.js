import { postFeed } from "./feed/PostList.js"
import { newMessageForm } from "./message/MessageForm.js"

export const GiffyGram = () => {

    // Show main main UI
    return `<section class="top_bar"><img src="./images/pb.png" alt="Giffygram Logo" width="75" height="75" id="giffygram"> <h1 id="giffygram">Giffygram</h1></section> <section><button id="new_message_form"> New Message</button>`
}

const applicationHeader = document.querySelector(".header")
const applicationElement = document.querySelector(".giffygram")

applicationHeader.addEventListener("click", (event)=>{
	if(event.target.id === "giffygram"){
		applicationElement.innerHTML=postFeed()
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
	}
})


applicationHeader.addEventListener("click", (event)=>{
	if(event.target.id === "new_message_form"){
		applicationElement.innerHTML= newMessageForm()
      
	}
})