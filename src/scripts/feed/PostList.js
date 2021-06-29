import { getPosts, getUsers } from "../data/provider.js"
import { newPostForm } from "./PostForm.js"
import { userProfile } from "./UserProfile.js"
const applicationElement = document.querySelector(".giffygram")

export const postFeed = ()=> {
	const currentPost = getPosts()
	const usersName = getUsers()
	let html = `<button id="to_new_post_page_button"> Create New Post </button> <section class="post_feed_wrapper">`
	currentPost.map((post)=>{ 


		return html += `
			<div class="post_wrapper">
			<h3> ${post.title}</h3>
			<img class="post_gif" src="${post.imageURL}" alt="${post.title}"> 
			<div> ${post.description} </div>
			<div> Posted by 
				<div class="userNameLink" id="targetUser--${post.userId}"> ${usersName.find((name) => {
					if (name.id === post.userId){
						return name.name
					}})
				}</div>
			<div> at ${new Date(post.timeStamp)} </div>
		`
	}).join("")
	 html += `</section>`
	 return html
	
}


applicationElement.addEventListener("click", (event)=>{
	if(event.target.id === "to_new_post_page_button"){
		applicationElement.innerHTML=newPostForm()
	}
})

applicationElement.addEventListener("click", (event)=>{
	if(event.target.id.startsWith("targetUser")){
		const [,targetUser] = event.target.id.split("--")
		const targetUserId = parseInt(targetUser)
		applicationElement.innerHTML = userProfile(targetUserId)
		
	}

})