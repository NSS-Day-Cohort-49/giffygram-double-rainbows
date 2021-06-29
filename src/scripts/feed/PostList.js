import { getPosts, getUsers } from "../data/provider.js"
import { newPostForm } from "./PostForm.js"

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
						return name
					}})
				}</div>
			<div> at ${new Date(post.timeStamp)} </div>
		`
	}).join("")
	 html += `</section>`
	 return html
	
}

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", (event)=>{
	if(event.target.id === "to_new_post_page_button"){
		applicationElement.innerHTML=newPostForm()
	}
})