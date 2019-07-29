
// export const API_BASE_URL = 'https://vidflow.ryrie.xyz:8080';
// export const API_BASE_URL = 'http://localhost:8080';
export const API_BASE_URL = 'http://192.168.0.9:8080';

export const ACCESS_TOKEN = 'accessToken';


// Webstomp Endpoint
export const WEBSOCKET_ENDPOINT = 'http://localhost:8080/webstomp';
// export const WEBSOCKET_ENDPOINT = 'https://vidflow.ryrie.xyz:8080/webstomp';


// File upload를 위한 Raw Websocket Endpoint
// export const WEBSOCKET_VIDEOUPLOAD_URL = "wss://vidflow.ryrie.xyz:8080/videoUpload";
export const WEBSOCKET_VIDEOUPLOAD_URL = 'ws://localhost:8080/videoUpload';
export const WEBSOCKET_VIDEOUPLOAD_CHUNKSIZE = 1024 * 1024; // 1MB

export const VIDEO_SRC = 'https://vidflow.ryrie.xyz/videos/';
// export const VIDEO_SRC = '';

export const PAGE_SIZE = 5;

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 10;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;
