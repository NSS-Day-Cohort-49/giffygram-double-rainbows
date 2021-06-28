const API = "http://localhost:3000"
const appContainer = document.querySelector(".giffygram")


export const applicationState = {
    users:[],
    messages:[],
    posts:[],
    likes:[],
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    }
}

export const fetchExternalData = () => {
    return Promise.all([
        fetch(`${API}/users`),
        fetch(`${API}/messages`),
        fetch(`${API}/posts`),
        fetch(`${API}/likes`),
    ]).then(responses => {
        return Promise.all(responses.map(response => {
            return response.json()
        }))
    }).then(externalData => {
        applicationState.users = externalData[0]
        applicationState.messages = externalData[1]
        applicationState.posts = externalData[2]
        applicationState.likes = externalData[3]
       
    })
}

export const getMessages = () => {
    return applicationState.messages.map(message => ({...message}))
}
export const getUsers = () => {
    return applicationState.users.map(user => ({...user}))
}
export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}))
}
export const getLikes = () => {
    return applicationState.likes.map(like => ({...like}))
}


// export const sendPost = post => {
//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(post)
//     }

//     return fetch(`${API}/post`, fetchOptions)
//         .then(response => response.json())
//         .then(() => {
//             appContainer.dispatchEvent(new CustomEvent("stateChanged"))
//         })
// }
// export const sendLikes = like => {
//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(like)
//     }

//     return fetch(`${API}/likes`, fetchOptions)
//         .then(response => response.json())
//         .then(() => {
//             appContainer.dispatchEvent(new CustomEvent("stateChanged"))
//         })
// }
// export const sendMessages = message => {
//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(message)
//     }

//     return fetch(`${API}/messages`, fetchOptions)
//         .then(response => response.json())
//         .then(() => {
//             appContainer.dispatchEvent(new CustomEvent("stateChanged"))
//         })
// }
// export const sendUsers = user => {
//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     }

//     return fetch(`${API}/users`, fetchOptions)
//         .then(response => response.json())
//         .then(() => {
//             appContainer.dispatchEvent(new CustomEvent("stateChanged"))
//         })
// }
