import { VIDFLOW_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        options.headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) { // status is not 200-299
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export function login(loginRequest) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function queryUserName(name) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users?name=" + name,
        method: 'GET'
    })
}

export function getUserInfo(userId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/" + userId,
        method: 'GET'
    })
}

export function getUserPosts(userId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/" + userId + "/posts",
        method: 'GET'
    })
}

export function getUserLikes(userId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/" + userId + "/likes",
        method: 'GET'
    })
}

export function followUser(userId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/" + userId + "/follow",
        method: 'POST'
    })
}

export function unfollowUser(userId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/" + userId + "/follow",
        method: 'DELETE'
    })
}

export function isFollowing(userId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/" + userId + "/follow",
        method: 'GET'
    })
}

export function getNotifications(userId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/" + userId + "/notification",
        method: 'GET'
    });
}


export function getPostById(postId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/posts/" + postId,
        method: 'GET'
    });
}

export function uploadFileRequest(type) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/files/" + type,
        method: 'POST',
    });
}

export function putFilesToPresignedURL(url, file) {
    const headers = new Headers();
    const options = {
        headers: headers,
        url: url,
        method: 'PUT',
        body: file
    };
    fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) { // status is not 200-299
                return Promise.reject(json);
            }
            return json;
        })
    );
}

export function createPost(postData) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/posts",
        method: 'POST',
        body: JSON.stringify(postData)
    });
}

export function deletePost(postId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/posts/" + postId,
        method: 'DELETE'
    })
}

export function getPostId() {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/posts/postId",
        method: 'GET'
    })
}

export function getPosts(postId, page) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/posts?id=" + postId + "&page=" + page,
        method: 'GET'
    });
}

export function getCommentsByPostId(postId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/comments/" + postId,
        method: 'GET'
    });
}

export function createComment(postId, commentData) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/comments/" + postId,
        method: 'POST',
        body: JSON.stringify(commentData)
    });
}

export function deleteComment(postId, commentId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/comments/" + postId + "/" + commentId,
        method: 'DELETE'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/me",
        method: 'GET'
    });
}

export function likePost(postId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL +"/posts/" + postId + "/like",
        method: 'POST'
    })
}

export function unlikePost(postId) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/posts/" + postId + "/like",
        method: 'DELETE'
    })
}

export function queryPostContent(content) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/posts?content=" + content,
        method: 'GET'
    })
}

export function checkNameAvailability(name) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/checkNameAvailability?name=" + name,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return request({
        headers: headers,
        url: VIDFLOW_URL + "/users/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}