import { applicationState, fetchExternalData, getUsers, sendMessages } from "../data/provider.js";
import { postFeed } from "../feed/PostList.js";

const applicationElement = document.querySelector(".giffygram")

export const newMessageForm =()=> {
	
	fetchExternalData()
	// const currentUserId = parseInt(localStorage.getItem("gg_user"))
	const users = getUsers()
	// const filteredUsers = users.filter(user=> {user.id !== currentUserId})
	
	return `
	<section class="submit_new_message_wrapper"> 
		<form class="new_post_form">
		<h1> Send New DM </h1>
		<div>
			<label for="message_title">Title</label>
		</div>
		<div>
			<input class="input_message_title" type="text" id="input_message_title">
		</div>
		<div>
			<label for="users">Send to:</label>
		</div>
		<div>
			<select name="users" id="users">
			${users.map((user)=> {
			return `<option class="recipient" value="${user.id}">${user.name} ${user.surname}</option>`}).join("")}
			</select>
		</div>
		<div>
			<label for="message_label">Message</label>
		</div>
		<div>
			<textarea id="input_message" class="input_message" rows="4" cols="50" ></textarea>
		</div>
		<div class="button_wrapper">
			<div> <button class="submit_new_message_button" id="submit_new_message_button">Send</button></div>
			<div> <button class="cancel_new_message_button" id="cancel_new_message_button">Cancel</button></div>
		</div>
		</form>
	</section>
	`;
	};
	
	
	applicationElement.addEventListener("click", (event) => {
		if(event.target.id === "submit_new_message_button"){
		applicationState.currentPage.page = 0
		console.log(applicationState.currentPage.page)
		const currentUserId = parseInt(localStorage.getItem("gg_user"))
		const recipientId = document.getElementById("users").value
		const message = document.getElementById("input_message").value
		const sendToAPI= {
		
		userId: currentUserId,
		recipientId: parseInt(recipientId),
		message: message,
		isRead: false
		}
		applicationElement.innerHTML = sendMessages(sendToAPI)
		
	}
})

applicationElement.addEventListener("click", (event) => {
	if(event.target.id === "cancel_new_message_button"){
		applicationElement.dispatchEvent(new CustomEvent("stateChanged"))		
	}
})