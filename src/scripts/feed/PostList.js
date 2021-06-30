import { getPosts, getUsers, deletePost } from "../data/provider.js"
import { newPostForm } from "./PostForm.js"
import { userProfile } from "./UserProfile.js"
const applicationElement = document.querySelector(".giffygram")

export const postFeed = ()=> {
	
	const currentPost = getPosts()
	const usersName = getUsers()
	const sortedPost = currentPost.sort((a,b)=> {return b.timeStamp-a.timeStamp})
	let html = `<button id="to_new_post_page_button"> Create New Post </button> <section class="post_feed_wrapper">`
	sortedPost.map((post)=>{
		const postName = usersName.find((user) => {
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
			<button class="postDelete" id="targetTitle--${post.title}" name="postDelete">DeleteMyPost</button>
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


applicationElement.addEventListener("click", (event) => {
    if (event.target.id.startsWith("targetTitle")) {
        const [,targetTitle] = event.target.id.split("--")
        deletePost(targetTitle)
    }
})


// applicationElement.addEventListener("click", (event) => {
// 	if (event.target.id.startsWith("targetUser")) {
// 	deletePost(event.target.id);
// 	}
// });
