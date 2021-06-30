import { getMessages, getUsers, sendIsReadBoolean } from "../data/provider.js"

let totalUnreadMessages = 0
let totalReadMessages =0

export const messageFeed = () => {
	const currentUser = parseInt(localStorage.getItem("gg_user"))
	const messages = getMessages()
	const users = getUsers()

	const filteredMessages = messages.filter((message) => { return message.recipientId === currentUser})
	const unreadMessages = filteredMessages.filter((message) => { return message.isRead === false})
	totalUnreadMessages = unreadMessages.length
	console.log(filteredMessages, totalUnreadMessages)
	
	let html = `<section class="messages"><h1 class="dm_header"> Direct Messages </h1><container>
	<button id="unread_messages"> New Messages</button><button id="read_messages">Read Messages</button>
	</container><div>`

	html += unreadMessages.map((message)=>{ const senderObj = users.find(user => user.id === message.userId) 
		return `<div class="message"><h3>From: ${senderObj.name} ${senderObj.surname}</h3> <div ><div id="message--${message.id}"> ${message.message}</div><button class="is_read_button" id=is_read--${message.id}> Mark as Read</button></div></div>`}).join("")
	html += `</section>`
	return html
}
export const readMessageFeed = () => {
	const currentUser = parseInt(localStorage.getItem("gg_user"))
	const messages = getMessages()
	const users = getUsers()

	const filteredMessages = messages.filter((message) => { return message.recipientId === currentUser})
	const readMessages = filteredMessages.filter((message) => { return message.isRead === true})
	totalReadMessages = readMessages.length
	console.log(filteredMessages, totalReadMessages)
	
	let html = `<section class="messages"><h1 class="dm_header"> Direct Messages </h1><container>
	<button id="unread_messages"> New Messages</button><button id="read_messages">Read Messages</button>
	</container><div>`

	html += readMessages.map((message)=>{ const senderObj = users.find(user => user.id === message.userId) 
		return `<div class="message"><h3>From: ${senderObj.name} ${senderObj.surname}</h3> <div ><div id="message--${message.id}"> ${message.message}</div><button class="make_unread_button" id=make_unread--${message.id}> Mark as Unread</button></div></div>`}).join("")
	html += `</section>`
	return html
}



// 	 "userId": 1,
//       "recipientId": 2,
//       "message": "\"Wouldn't they?\" said Ron, looking skeptical. \"I dunno . . . they don't exactly mind breaking rules, do they?\" \"Yes, but this is the law\" said Hermione, looking scared. \"This isn't some silly school rule. . . . They'll get a lot more than detention for blackmail! Ron. . . maybe you'd better tell Percy. . . .\" \"Are you mad?\" said Ron. \"Tell Percy? He'd probably do a Crouch and turn them in.\" He stared at the window through which Fred and George's owl had departed, then said, \"Come on, let's get some breakfast.\" \"D'you think it's too early to go and see Professor Moody?\" Hermione said as they went down the spiral staircase. \"Yes,\" said Harry. \"He'd probably blast us through the door if we wake him at the crack of dawn; he'll think we're trying to attack him while he's asleep. Let's give it till break.\"\n",
//       "id": 2
const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", (event) => {
	
	if(event.target.id.startsWith("is_read")){
		const [,messageId] = event.target.id.split("--")
		const messageAsNumber = parseInt(messageId)
		const sendToAPI = {
			isRead: true
		}
		sendIsReadBoolean(sendToAPI,messageAsNumber)
		
	}
})
applicationElement.addEventListener("click", (event) => {
	
	if(event.target.id.startsWith("make_unread")){
		const [,messageId] = event.target.id.split("--")
		const messageAsNumber = parseInt(messageId)
		const sendToAPI = {
			isRead: true
		}
		sendIsReadBoolean(sendToAPI,messageAsNumber)
		
	}
})
applicationElement.addEventListener("click", (event) => {
	
	if(event.target.id === "unread_messages"){
		
		applicationElement.innerHTML = messageFeed()
		
	}
})
applicationElement.addEventListener("click", (event) => {
	
	if(event.target.id === "read_messages"){
		
		applicationElement.innerHTML = readMessageFeed()
		
	}
})