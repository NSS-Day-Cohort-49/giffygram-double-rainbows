import { getLikes } from "./data/provider.js"

export const favoriteList = () => {
const likes = getLikes()
const currentUserId = parseInt(localStorage.getItem("gg_user"))

}












// export const deleteRequest = (id) => {
//     return fetch(`${API}/requests/${id}`, { method: "DELETE" })
//         .then(
//             () => {
//                 mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
//             }
//         )
//   }
