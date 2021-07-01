import { getPosts, getUsers, deletePost } from "../data/provider.js"
// import { newPostForm } from "./PostForm.js"
import { userProfile } from "./UserProfile.js"
const applicationElement = document.querySelector(".giffygram")

export const postFeed = ()=> {
	
	const currentPost = getPosts()
	const usersName = getUsers()
	const sortedPost = currentPost.sort((a,b)=> {return b.timeStamp-a.timeStamp})
	let html = `<section class="post_feed_wrapper">`
	sortedPost.map((post)=>{
		let deleteButton = " "
		const postName = usersName.find((user) => {
			if (user.id === post.userId){
				return user
			}}) 

		// if the user created the post, show a delete option on that post
		if (post.userId === parseInt(localStorage.getItem("gg_user"))){
			deleteButton = `<button class="postDelete" id="targetTitle--${post.id}" name="postDelete">DeleteMyPost</button>`
		}else{
			deleteButton = " "
		}

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
					
						${deleteButton}
					
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

