import { getMessages, getUsers, sendIsReadBoolean,applicationState } from "../data/provider.js"


export const messageCounter = ()=> {
	const messages = getMessages()
	const currentUser = parseInt(localStorage.getItem("gg_user"))	
	const filteredMessages = messages.filter((message) => { return message.recipientId === currentUser})
	const unreadMessages = filteredMessages.filter((message) => { return message.isRead === false})
	const readMessages = filteredMessages.filter((message) => { return message.isRead === true})
	applicationState.messageCounter.totalReadMessages = readMessages.length
	applicationState.messageCounter.totalUnreadMessages = unreadMessages.length
}




export const messageFeed = () => {
	const currentUser = parseInt(localStorage.getItem("gg_user"))
	const messages = getMessages()
	const users = getUsers()
	

	const filteredMessages = messages.filter((message) => { return message.recipientId === currentUser})
	const unreadMessages = filteredMessages.filter((message) => { return message.isRead === false})
	const readMessages = filteredMessages.filter((message) => { return message.isRead === true})
	const sortedMessages = unreadMessages.sort((a,b)=> {return b.id-a.id})
	applicationState.messageCounter.totalReadMessages = readMessages.length
	applicationState.messageCounter.totalUnreadMessages = unreadMessages.length
	// console.log(applicationState)
	
	let html = `<section class="messages">
	<h1 class="dm_header"> Direct Messages </h1>
	<container class="messages_toggle">
	<div id="unread_messages"> New Messages</div>
	<button id="read_messages">Read Messages</button>
	</container><div>`

	html += sortedMessages.map((message)=>{ const senderObj = users.find(user => user.id === message.userId) 
		return `
		<div class="message">
			<div class="bobble_head_wrapper">
			<img class="profile_pic" src=".${senderObj.profile_pic}">
			<div class="userNameLink">${senderObj.name} ${senderObj.surname}</div> 
			</div>
		<div class="message_wrapper">
			<div id="message--${message.id}"> ${message.message}</div>
			</div>
			<button class="is_read_button" id=is_read--${message.id}> Mark as Read</button>
			
		</div>
		</div>`}).join("")
	html += `</section>`
	return html
}
export const readMessageFeed = () => {
	const currentUser = parseInt(localStorage.getItem("gg_user"))
	const messages = getMessages()
	const users = getUsers()

	const filteredMessages = messages.filter((message) => { return message.recipientId === currentUser})
	const readMessages = filteredMessages.filter((message) => { return message.isRead === true})
	const unreadMessages = filteredMessages.filter((message) => { return message.isRead === false})
	const sortedMessages = readMessages.sort((a,b)=> {return b.id-a.id})
	applicationState.messageCounter.totalReadMessages = readMessages.length
	applicationState.messageCounter.totalUnreadMessages = unreadMessages.length
	// console.log(applicationState)
	
	let html = `
	<section class="messages">
	<h1 class="dm_header"> Direct Messages </h1>
	<container class="messages_toggle">
	<button id="unread_messages"> New Messages</button>
	<div id="read_messages">Read Messages</div>
	</container><div>`

	html += sortedMessages.map((message)=>{ 
		const senderObj = users.find(user => user.id === message.userId) 
		

		return `
		<div class="message">
			<div class="bobble_head_wrapper">
				<img class="profile_pic" src=".${senderObj.profile_pic}">
				<div class="userNameLink">${senderObj.name} ${senderObj.surname}</div>
			</div>
			<div class="message_wrapper">
				<div id="message--${message.id}"> ${message.message}</div>
			</div>
			<button class="make_unread_button" id=make_unread--${message.id}> Mark as Unread</button>	
		 </div>
		 </div>
		 `}).join("")
	html += `</section>`
	return html

	
}


const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", (event) => {
	
	if(event.target.id.startsWith("is_read")){
		applicationState.currentPage.page = 1
		// console.log(applicationState.currentPage.page)
		const [,messageId] = event.target.id.split("--")
		const messageAsNumber = parseInt(messageId)
		const sendToAPI = {
			isRead: true
		}
		sendIsReadBoolean(sendToAPI,messageAsNumber)
		// applicationElement.innerHTML = messageFeed()
		
	}
})
applicationElement.addEventListener("click", (event) => {
	
	if(event.target.id.startsWith("make_unread")){

		applicationState.currentPage.page = 2
		// console.log(applicationState.currentPage.page)
		const [,messageId] = event.target.id.split("--")
		const messageAsNumber = parseInt(messageId)
		const sendToAPI = {
			isRead: false
		}
		sendIsReadBoolean(sendToAPI,messageAsNumber)
		// applicationElement.innerHTML = readMessageFeed()
		
	}
})
applicationElement.addEventListener("click", (event) => {
	
	if(event.target.id === "unread_messages"){
	
			applicationState.currentPage.page = 1
		// console.log(applicationState.currentPage.page)
		applicationElement.innerHTML = messageFeed()
		
	}
})
applicationElement.addEventListener("click", (event) => {
	
	if(event.target.id === "read_messages"){
		
		applicationState.currentPage.page = 2
		// console.log(applicationState.currentPage.page)
		applicationElement.innerHTML = readMessageFeed()
		
	}
})