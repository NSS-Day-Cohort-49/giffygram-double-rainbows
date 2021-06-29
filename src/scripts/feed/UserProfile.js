import { getPosts, getUsers } from "../data/provider.js";

export const userProfile = (targetUserId) => {
  const users = getUsers();
  const posts = getPosts();
  const sortedPost = posts.sort((a,b)=> {return b.timeStamp - a.timeStamp})
  for (const user of users) {
    let html = `<button id="to_new_post_page_button"> Create New Post </button> <section class="post_feed_wrapper">`;
    if (targetUserId === user.id) {
      const filteredPost = sortedPost.filter((userPost) => {
        return userPost.userId === user.id;
      });
      filteredPost
        .map((post) => {
          html += `
				<div class="post_wrapper">
				<h3> ${post.title}</h3>
				<img class="post_gif" src="${post.imageURL}" alt="${post.title}"> 
				<div> ${post.description} </div>
				<div> Submitted by <div class="userNameLink" id="targetUser--${post.userId}"> ${post.userId}</div> at
				 ${post.timeStamp} </div>
				 </div>`;
        })
        .join("");
      html += `</section>`;
      return html;
    }
  }
};


