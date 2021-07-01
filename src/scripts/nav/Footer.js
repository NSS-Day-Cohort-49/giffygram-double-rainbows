import { applicationState, getPosts, getUsers } from "../data/provider.js"
import { postFeed } from "../feed/PostList.js";
const applicationElement = document.querySelector(".giffygram");
const applicationFooter = document.querySelector(".footer")

export const footer = () => {
	const users = getUsers()
	
	return `
	<div class="footer"> 
	<select>
	<option class="filtered_post_options" value="users--0" name="users" id="users--0"> Filter Post by User </option>
	${users.map((user)=> {
		return `
		<option class="filtered_post_options" value="users--${user.id}" id="users--${user.id}">${user.name} ${user.surname}</option>`}).join("")}
		</select>
		<div class="checkbox_wrapper"><input class="checkbox" type="checkbox" id="favorite_filter" name="favorite_filter" value="favorite">
		<label class="checkbox" for="favorite_filter">Favorites</label></div>
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
	 html += `
			<div class="post_wrapper">
			<h3> ${post.title}</h3>
			<img class="post_gif" src="${post.imageURL}" alt="${post.title}"> 
			<div> ${post.description} </div>
			<div class="userNameLink" id="targetUser--${post.userId}"> Posted by: ${currentSectionObj.name}</div>
			<div id="output"> at ${new Date(post.timeStamp)} </div>
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