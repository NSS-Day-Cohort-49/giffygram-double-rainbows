import { getPosts, getUsers, deletePost, deleteLikes, getLikes, sendLikes } from "../data/provider.js"
import { filterByUser } from "../nav/Footer.js"
// import { newPostForm } from "./PostForm.js"
import { userProfile } from "./UserProfile.js"
const applicationElement = document.querySelector(".giffygram")

export const postFeed = ()=> {
	
	const currentPost = getPosts()
	const usersNames = getUsers()
	const likes = getLikes()
	let isLiked = false
	
	const sortedPost = currentPost.sort((a,b)=> {return b.timeStamp-a.timeStamp})
	let html = `<section class="post_feed_wrapper">`
	sortedPost.map((post)=>{

		let deleteButton = " "
		const likedObj = likes.find((like) => {return like.postId === post.id})	

		isLiked = !!likedObj 

		// console.log(isLiked, likedObj)
		
		const userName = usersNames.find((user) => {
			if (user.id === post.userId){
				return user
			}}) 
			
			// if the user created the post, show a delete option on that post
			if (post.userId === parseInt(localStorage.getItem("gg_user"))){
				deleteButton = `<button class="postDelete" id="targetTitle--${post.id}" name="postDelete">DeleteMyPost</button>`
			}else{
				deleteButton = " "
			}
			// Find the like.id with the proper postId and userId
			// userId === currentUser 
			return html += `
			<div class="post_wrapper">
				<div class="post_title_wrapper">
					<div class="bobble_head_wrapper">
						<img class="profile_pic" src=".${userName.profile_pic}">
						<div class="userNameLink" id="targetUser--${post.userId}">${userName.name} ${userName.surname}</div>
					</div>
				<h2 class="post_title"> ${post.title}</h2>
				</div> 
				<img class="post_gif" src="${post.imageURL}" alt="${post.title}"> 
				<div class="description_wrapper">
					<div> ${post.description} </div>
					<div id="output"> at ${new Date(post.timeStamp)} </div>
					<div class="favorite_wrapper">
						<div class="favorite_${isLiked}" value= "favorite_${isLiked}" id="favorite_button--${post.id}--${isLiked}"> favStar</div>
					${deleteButton}
					</div>
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


applicationElement.addEventListener("click", (event) => {
	if (event.target.id.startsWith("targetTitle")) {
		const [,targetTitle] = event.target.id.split("--")
		deletePost(targetTitle)
	}
})
applicationElement.addEventListener("click", (event) => {
	if (event.target.id.startsWith("favorite_button--")) {
		const currentUser = parseInt(localStorage.getItem("gg_user"))
		const likes = getLikes()
		const [,postId, boolean, ] = event.target.id.split("--")
		const targetPostAsInt = parseInt(postId)
		
		if (boolean === "false"){
			
			const sendToAPI = {
				
				userId: parseInt(localStorage.getItem("gg_user")),
				postId: targetPostAsInt,
			}
			sendLikes(sendToAPI)
		}
		 else {
		
		// find the like record and get the id to pass to the deleteLikes(id)
		const filteredLikes = likes.filter((like)=>{return like.userId === currentUser})
		const foundLike = filteredLikes.find((like)=>{return like.postId === targetPostAsInt})
		
		
		// delete this like record
		deleteLikes(foundLike.id)
	}
}
})

