
// export const VIDFLOW_URL = 'https://vidflow.ryrie.xyz:8080';
// export const VIDFLOW_URL = 'http://localhost:8080';
export const VIDFLOW_URL = 'http://192.168.0.153:8080';

export const ACCESS_TOKEN = 'accessToken';

// File upload를 위한 Raw Websocket Endpoint
// export const UPLOAD_URL = "wss://vidflow.ryrie.xyz:8080/upload";
export const UPLOAD_URL = 'ws://192.168.0.153:8080/upload';
export const UPLOAD_CHUNKSIZE = 1024 * 1024; // 1MB

export const UPLOAD_SRC = 'https://vidflow.ryrie.xyz/uploads/';
// export const VIDEO_SRC = '';

export const PAGE_SIZE = 3;

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 10;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;