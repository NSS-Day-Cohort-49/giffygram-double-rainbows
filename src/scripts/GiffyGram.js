import { postFeed } from "./feed/PostList.js"

export const GiffyGram = () => {

    // Show main main UI
    return `<section class="top_bar"><img src="./images/pb.png" alt="Giffygram Logo" width="75" height="75" id="giffygram"> <h1 id="giffygram">Giffygram</h1></section>`
}

const applicationHeader = document.querySelector(".header")
const applicationElement = document.querySelector(".giffygram")

applicationHeader.addEventListener("click", (event)=>{
	if(event.target.id === "giffygram"){
		applicationElement.innerHTML=postFeed()
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
	}
})