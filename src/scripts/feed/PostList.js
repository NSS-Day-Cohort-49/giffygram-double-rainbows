import { getPosts, getUsers, getLikes, sendLikes } from "../data/provider.js"
import { newPostForm } from "./PostForm.js"
import { userProfile } from "./UserProfile.js"
const applicationElement = document.querySelector(".giffygram")

export const postFeed = ()=> {
	
	const currentPost = getPosts()
	const usersName = getUsers()
	const likes = getLikes()
	const sortedPost = currentPost.sort((a,b)=> {return b.timeStamp-a.timeStamp})
	let html = `<button id="to_new_post_page_button"> Create New Post </button> <section class="post_feed_wrapper">`
	sortedPost.map((post)=>{
		const postName = usersName.find((user) => {
		const likedObj = likes.find((like) => {
			return like.postId === post.id
		})	
		const isLiked = !!likedObj 
			console.log(isLiked)
		if (user.id === post.userId){
				return user.name
			}}) 
		return html += `
			<div class="post_wrapper">
			<h3> ${post.title}</h3>
			<img class="post_gif" src="${post.imageURL}" alt="${post.title}"> 
			<div> ${post.description} </div>
			<div> Posted by <div class="userNameLink" id="targetUser--${post.userId}"> ${postName.name}</div>
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

applicationElement.addEventListener("click", (event)=>{
	if(event.target.id.startsWith("favorite_button")){
		// if(event.target.id.startsWith){
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

// export const deleteLike = (id) => {
// 	return fetch(`${API}/likes/${id}`, { method: "DELETE" })
// 		.then(
// 			() => {
// 				mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
// 			}
// 		)
//   }
  