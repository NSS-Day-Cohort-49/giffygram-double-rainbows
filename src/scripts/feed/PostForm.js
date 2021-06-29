
import { sendPost } from "../data/provider.js";
import { postFeed } from "./PostList.js";



export const newPostForm = () => {
	return `
	<section class="submit_new_post_wrapper"> 
	<form class="new_post_form">
		<h1> Submit a new post </h1>
		<div>
			<label for="post_title">Title</label>
		</div>
		<div>
			<input class="input_post_title" type="text" id="input_post_title">
		</div>
		<div>
			<label for="post_url">Post Link</label>
		</div>
		<div>
			<input class="input_post_url" type="text" id="input_post_url">
		</div>
		<div>
			<label for="post_description_label">Description</label>
		</div>
		<div>
			<input class="input_post_description" type="textarea" rows="4" cols="50" id="input_post_description">
		</div>
		<div class="button_wrapper">
			<div> <button class="submit_new_post_button" id="submit_new_post_button">Submit</button></div>
			<div> <button class="cancel_new_post_button" id="cancel_new_post_button">Cancel</button></div>
		</div>
	</form>
	</section>
	`;
};

const applicationElement = document.querySelector(".giffygram")


// Add validation to the fields to make sure that the input a valid input 

applicationElement.addEventListener("click", (event)=>{
	if(event.target.id === "submit_new_post_button"){
		const postTitle = document.getElementById("input_post_title").value
		const postURL = document.getElementById("input_post_url").value
		const postDescription = document.getElementById("input_post_description").value
		

		const sendToAPI = {
			userId: parseInt(localStorage.getItem("gg_user")),
      			title: postTitle,
      			imageURL: postURL,
      			description: postDescription,
      			timeStamp: Date.now()
		}
		sendPost(sendToAPI)
		document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))

	}
})




applicationElement.addEventListener("click", (event)=>{
	if(event.target.id === "cancel_new_post_button"){
		applicationElement.innerHTML=postFeed()
		applicationElement.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))

	}
})
