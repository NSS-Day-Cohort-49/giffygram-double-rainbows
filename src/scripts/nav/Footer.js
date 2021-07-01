import { applicationState, getPosts, getUsers } from "../data/provider.js"
import { postFeed } from "../feed/PostList.js";
const applicationElement = document.querySelector(".giffygram");
const applicationFooter = document.querySelector(".footer")

export const footer = () => {
	const users = getUsers()
	
	return `
	<div class="footer"> 
	<select class="filter_users_button">
	<option class="filtered_post_options" value="users--0" name="users" id="users--0"> Filter Post by User </option>
	${users.map((user)=> {
		return `
		<option class="filtered_post_options" value="users--${user.id}" id="users--${user.id}">${user.name} ${user.surname}</option>`}).join("")}
		</select>
		<div class="checkbox_wrapper"><input class="checkbox" type="checkbox" id="favorite_filter" name="favorite_filter" value="favorite">
		<label class="checkbox" for="favorite_filter">Favorites</label></div>
	</div>`
}
export const footerLogIn = () => {
	
	
	return `
	<div class="footer"> 
	
	</div>`
}

export const filterByUser =(userId)=> {
	
	const posts = getPosts()
	const users = getUsers()
	const sortedPost = posts.sort((a,b)=> {return b.id-a.id})

	const filteredPost = sortedPost.filter((post) => {
		return post.userId === userId
	})
	const currentSectionObj = users.find((user) => {return user.id === userId})
	let html = `<section class="post_feed_wrapper">`
	filteredPost.map((post) => { 
		let deleteButton = " "
		const postName = users.find((user) => {
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


applicationFooter.addEventListener("change", (event) => {
	if (event.target.value.startsWith("users--")){
		const idString = event.target.value
		const [,userId] = idString.split("--")
		const userIdAsNumb = parseInt(userId)
		if(userIdAsNumb === 0){
			applicationState.currentPage.page = 0
			applicationElement.innerHTML = postFeed()
		}else{
			applicationState.currentPage.page = 0
			applicationElement.innerHTML = filterByUser(userIdAsNumb);
			
		}
	
	}
})