import { getPosts, getUsers } from "../data/provider.js"
// import { newPostForm } from "./PostForm.js"
import { userProfile } from "./UserProfile.js"
const applicationElement = document.querySelector(".giffygram")

export const postFeed = ()=> {
	
	const currentPost = getPosts()
	const usersName = getUsers()
	const sortedPost = currentPost.sort((a,b)=> {return b.timeStamp-a.timeStamp})
	let html = `<section class="post_feed_wrapper">`
	sortedPost.map((post)=>{
		const postName = usersName.find((user) => {
			if (user.id === post.userId){
				return user
			}}) 
		return html += `
			<div class="post_wrapper">
			<div class="post_title_wrapper">
			<div class="bobble_head_wrapper">
			<img class="profile_pic" src=".${postName.profile_pic}">
			<div class="userNameLink" id="targetUser--${post.userId}">${postName.name} ${postName.surname}</div>
			</div>
			<h2 class="post_title"> ${post.title}</h2>
			</div> 
			<img class="post_gif" src="${post.imageURL}" alt="${post.title}"> 
			<div class="description_wrapper">
			<div> ${post.description} </div>
			<div id="output"> at ${new Date(post.timeStamp)} </div>
			</div>
			</div>
		`
	}).join("")
	html += `</section>`
	return html
	}


applicationElement.addEventListener("click", (event)=>{
	if(event.target.id.startsWith("targetUser")){
		const [,targetUser] = event.target.id.split("--")
		const targetUserId = parseInt(targetUser)
		applicationElement.innerHTML = userProfile(targetUserId)
		
		
	}

})