import { applicationState } from "./data/provider.js";
import { newPostForm } from "./feed/PostForm.js";
import { postFeed } from "./feed/PostList.js";
import { messageFeed } from "./friends/DirectMessage.js";
import { newMessageForm } from "./message/MessageForm.js";

export const GiffyGram = () => {
  
  const profilePic = localStorage.getItem("gg_profile_pic")
  return `
    <section class="navigation">
        <div class="logo_title">
            <img src="./images/pb.png" alt="Giffygram Logo" width="75" height="75" id="giffygram">
            <h1 id="giffygram">Giffygram</h1>
        </div>
        <div class = "nav_buttons">
        <button id="new_message_form">Send DM </button>
        <button id="to_new_post_page_button"> Create New Post </button> 
        <div class="message_inbox" id="message_inbox"> ${applicationState.messageCounter.totalUnreadMessages} </div>
            <img class="profile_pic_top" id="profile_pic_top" src="${profilePic}">
        </div>
        
        </section>
        `;
};
export const GiffyGramLogIn = () => {
  

  return `
    <section class="navigation">
        
        <div class="logo_title">
            <img src="./images/pb.png" alt="Giffygram Logo" width="75" height="75" id="giffygram_login">
            <h1 id="giffygram_login">Giffygram</h1>
        </div>
        
        </section>
        `;
};

const applicationHeader = document.querySelector(".header");
const applicationElement = document.querySelector(".giffygram");

applicationHeader.addEventListener("click", (event) => {
  if (event.target.id === "giffygram") {
    applicationState.currentPage.page = 0;
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

applicationHeader.addEventListener("click", (event) => {
  if (event.target.id === "new_message_form") {
    applicationElement.innerHTML = newMessageForm();
  }
});
applicationHeader.addEventListener("click", (event) => {
  if (event.target.id === "message_inbox") {
    applicationState.currentPage.page = 1;
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

applicationHeader.addEventListener("click", (event) => {
  if (event.target.id === "to_new_post_page_button") {
    applicationState.currentPage.page = 3;
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
applicationHeader.addEventListener("click", (event) => {
  if (event.target.id === "profile_pic_top") {
    localStorage.removeItem("gg_user");
    localStorage.removeItem("gg_user_profile_pic");
    applicationState.currentPage.page = 0;
    applicationHeader.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
