import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
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

export function getAllPosts() {
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

export function getCommentsByPostId(postId) {
    return request({
        url: API_BASE_URL + "/comments/" + postId,
        method: 'GET'
    });
}

export function createComment(commentId, commentData) {
    return request({
        url: API_BASE_URL + "/comments/" + commentId,
        method: 'POST',
        body: JSON.stringify(commentData)
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

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}