import { applicationState } from "./data/provider.js";
import { newPostForm } from "./feed/PostForm.js";
import { postFeed } from "./feed/PostList.js";
import { messageFeed } from "./friends/DirectMessage.js";
import { newMessageForm } from "./message/MessageForm.js";

export const GiffyGram = () => {
  // Show main main UI
  return `
    <section class="top_bar">
        <div class="logo_title">
        <img src="./images/pb.png" alt="Giffygram Logo" width="75" height="75" id="giffygram">
         <h1 id="giffygram">Giffygram</h1>
        </div>
        <div class = "nav_buttons">
            <button id="new_message_form">Send DM </button>
            <button id="message_inbox"> ${applicationState.messageCounter.totalUnreadMessages} New DMs </button>
            <button id="to_new_post_page_button"> Create New Post </button> 
            </div>
        </section>
        `;
};

const applicationHeader = document.querySelector(".header");
const applicationElement = document.querySelector(".giffygram");

applicationHeader.addEventListener("click", (event) => {
  if (event.target.id === "giffygram") {
    applicationState.currentPage.page = 0;
    console.log(applicationState.currentPage.page);

    // applicationElement.innerHTML=postFeed()
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
    console.log(applicationState.currentPage.page);
    // applicationElement.innerHTML= messageFeed()
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});

applicationHeader.addEventListener("click", (event) => {
  if (event.target.id === "to_new_post_page_button") {
    applicationState.currentPage.page = 3;
    console.log(applicationState.currentPage.page);
    // applicationElement.innerHTML=newPostForm()
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
  }
});
