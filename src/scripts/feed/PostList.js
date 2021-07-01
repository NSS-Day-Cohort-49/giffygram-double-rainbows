import { getPosts, getUsers, getLikes, sendLikes } from "../data/provider.js"
// import { newPostForm } from "./PostForm.js"
import { userProfile } from "./UserProfile.js"
const applicationElement = document.querySelector(".giffygram")

export const postFeed = ()=> {
	
	const currentPost = getPosts()
	const usersName = getUsers()
	const likes = getLikes()
	const sortedPost = currentPost.sort((a,b)=> {return b.timeStamp-a.timeStamp})
	let html = `<section class="post_feed_wrapper">`
	sortedPost.map((post)=>{
		const postName = usersName.find((user) => {
		const likedObj = likes.find((like) => {
			return like.postId === post.id
		})	
		const isLiked = !!likedObj 
			console.log(isLiked)
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
			<div class="favorite_wrapper">
			<div class="favorite_true" id="favorite_button--${post.id}">"  "
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

applicationElement.addEventListener("click", (event)=>{
	if(event.target.id.startsWith("favorite_button")){
		// if()
		const [,targetpostId] = event.target.id.split("--")
		const targetpostIdAsInt = parseInt(targetpostId)
		
		const sendToAPI = {
			userId: parseInt(localStorage.getItem("gg_user")),
      	postId: targetpostIdAsInt,
		}
		sendLikes(sendToAPI)
	}
		// else {
		// const deleteLike = (id) => {
		// 	return fetch(`${API}/likes/${id}`, {method: "DELETE"})
		// 		.then(
		// 			() => {
		// 				mainContainer.dispatchEvent(new CustomEvent(""))
		// 			}
		// 		)
		// }
		// }
})

  