import { VIDFLOW_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    
    return fetch(options.url, options)
    .then(response => {
        // console.log(response);
        if(response) 
            return response.json();
        else
            return {};
    })
    /*
    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
    */
    
};

export function login(loginRequest) {
    return request({
        url: VIDFLOW_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: VIDFLOW_URL + "/users",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function queryUserName(name) {
    return request({
        url: VIDFLOW_URL + "/users?name=" + name,
        method: 'GET'
    })
}

export function getUserInfo(userId) {
    return request({
        url: VIDFLOW_URL + "/users/" + userId,
        method: 'GET'
    })
}

export function getUserPosts(userId) {
    return request({
        url: VIDFLOW_URL + "/users/" + userId + "/posts",
        method: 'GET'
    })
}

export function getUserLikes(userId) {
    return request({
        url: VIDFLOW_URL + "/users/" + userId + "/likes",
        method: 'GET'
    })
}

export function followUser(userId) {
    return request({
        url: VIDFLOW_URL + "/users/" + userId + "/follow",
        method: 'POST'
    })
}

export function unfollowUser(userId) {
    return request({
        url: VIDFLOW_URL + "/users/" + userId + "/follow",
        method: 'DELETE'
    })
}

export function isFollowing(userId) {
    return request({
        url: VIDFLOW_URL + "/users/" + userId + "/follow",
        method: 'GET'
    })
}

export function getNotifications(userId) {
    return request({
        url: VIDFLOW_URL + "/users/" + userId + "/notification",
        method: 'GET'
    });
}


export function getPostById(postId) {
    return request({
        url: VIDFLOW_URL + "/posts/" + postId,
        method: 'GET'
    });
}

export function createPost(postData) {
    return request({
        url: VIDFLOW_URL + "/posts",
        method: 'POST',
        body: JSON.stringify(postData)
    });
}

export function deletePost(postId) {
    return request({
        url: VIDFLOW_URL + "/posts/" + postId,
        method: 'DELETE'
    })
}

export function getPostId() {
    return request({
        url: VIDFLOW_URL + "/posts/postId",
        method: 'GET'
    })
}

export function getPosts(postId, page) {
    return request({
        url: VIDFLOW_URL + "/posts?id=" + postId + "&page=" + page,
        method: 'GET'
    });
}

export function getCommentsByPostId(postId) {
    return request({
        url: VIDFLOW_URL + "/comments/" + postId,
        method: 'GET'
    });
}

export function createComment(postId, commentData) {
    return request({
        url: VIDFLOW_URL + "/comments/" + postId,
        method: 'POST',
        body: JSON.stringify(commentData)
    });
}

export function deleteComment(postId, commentId) {
    return request({
        url: VIDFLOW_URL + "/comments/" + postId + "/" + commentId,
        method: 'DELETE'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: VIDFLOW_URL + "/users/me",
        method: 'GET'
    });
}

export function likePost(postId) {
    return request({
        url: VIDFLOW_URL +"/posts/" + postId + "/like",
        method: 'POST'
    })
}

export function unlikePost(postId) {
    return request({
        url: VIDFLOW_URL + "/posts/" + postId + "/like",
        method: 'DELETE'
    })
}

export function queryPostContent(content) {
    return request({
        url: VIDFLOW_URL + "/posts?content=" + content,
        method: 'GET'
    })
}

export function checkNameAvailability(name) {
    return request({
        url: VIDFLOW_URL + "/users/checkNameAvailability?name=" + name,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: VIDFLOW_URL + "/users/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}