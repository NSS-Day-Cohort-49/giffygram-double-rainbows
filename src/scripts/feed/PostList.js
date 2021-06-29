import { getPosts, getLikes } from "../data/provider.js"
import { newPostForm } from "./PostForm.js"
import { userProfile } from "./UserProfile.js"
const applicationElement = document.querySelector(".giffygram")

export const postFeed = ()=> {
	const likes = getLikes()
	const currentUserId = parseInt(localStorage.getItem("gg_user"))
	const currentPost = getPosts()
	const sortedPost = currentPost.sort((a,b)=> {return b.timeStamp-a.timeStamp})
	let html = `<button id="to_new_post_page_button"> Create New Post </button> <section class="post_feed_wrapper">`
	sortedPost.map((post)=>{ 


		return html += `
			<div class="post_wrapper">
			<h3> ${post.title}</h3>
			<img class="post_gif" src="${post.imageURL}" alt="${post.title}"> 
			<div> ${post.description} </div>
			<div> Submitted by <div class="userNameLink" id="targetUser--${post.userId}"> ${post.userId}</div> at
			${post.timeStamp} </div>
			<div class="favorite_wrapper">
			<button onclick="document.getElementById('favorite_button').src='./images/favorite-star-yellow.svg'">
		    <img class="star_button" id="favorite_button" src="./images/favorite-star-blank.svg">
			<button onclick="document.getElementById('favorite_button').src='./images/favorite-star-blank.svg'">
			</div>
			</div>
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