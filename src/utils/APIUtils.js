import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

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
        url: API_BASE_URL + "/user/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/user/create",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getPostId() {
    return request({
        url: API_BASE_URL + "/posts/postId",
        method: 'GET'
    })
}

export function getPosts(postId, page) {
    return request({
        url: API_BASE_URL + "/posts?id=" + postId + "&page=" + page,
        method: 'GET'
    });
}

export function getUserInfo(userId) {
    return request({
        url: API_BASE_URL + "/user/info/" + userId,
        method: 'GET'
    })
}

export function getUserPosts(userId) {
    return request({
        url: API_BASE_URL + "/posts/user/" + userId,
        method: 'GET'
    })
}

export function getUserLikes(userId) {
    return request({
        url: API_BASE_URL + "/posts/likes/" + userId,
        method: 'GET'
    })
}

export function getPostById(postId) {
    return request({
        url: API_BASE_URL + "/posts/" + postId,
        method: 'GET'
    });
}

export function getNumCommentByPostId(postId) {
    return request({
        url: API_BASE_URL + "/posts",
        method: 'GET'
    });
}

export function getNumLikeByPostId(postId) {
    return request({
        url: API_BASE_URL + "/posts",
        method: 'GET'
    });
}

export function createPost(postData) {
    return request({
        url: API_BASE_URL + "/posts",
        method: 'POST',
        body: JSON.stringify(postData)
    });
}

export function deletePost(postId) {
    return request({
        url: API_BASE_URL + "/posts/" + postId,
        method: 'DELETE'
    })
}

export function getCommentsByPostId(postId) {
    return request({
        url: API_BASE_URL + "/comments/" + postId,
        method: 'GET'
    });
}

export function createComment(postId, commentData) {
    return request({
        url: API_BASE_URL + "/comments/" + postId,
        method: 'POST',
        body: JSON.stringify(commentData)
    });
}

export function deleteComment(commentId) {
    return request({
        url: API_BASE_URL + "/comments/" + commentId,
        method: 'DELETE'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function likePost(postId) {
    return request({
        url: API_BASE_URL +"/posts/like/" + postId,
        method: 'POST'
    })
}

export function unlikePost(postId) {
    return request({
        url: API_BASE_URL + "/posts/like/" + postId,
        method: 'DELETE'
    })
}

export function queryPostContent(content) {
    return request({
        url: API_BASE_URL + "/posts/query?content=" + content,
        method: 'GET'
    })
}

export function queryUserName(name) {
    return request({
        url: API_BASE_URL + "/user/query?name=" + name,
        method: 'GET'
    })
}

export function followUser(userId) {
    return request({
        url: API_BASE_URL + "/user/follow/" + userId,
        method: 'POST'
    })
}

export function unfollowUser(userId) {
    return request({
        url: API_BASE_URL + "/user/follow/" + userId,
        method: 'DELETE'
    })
}

export function isFollowing(from, to) {
    return request({
        url: API_BASE_URL + "/user/following/?from=" + from + "&to=" + to,
        method: 'GET'
    })
}

export function getNotifications(userId) {
    return request({
        url: API_BASE_URL + "/user/notification/" + userId,
        method: 'GET'
    });
}

export function checkNameAvailability(name) {
    return request({
        url: API_BASE_URL + "/user/checkNameAvailability?name=" + name,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}