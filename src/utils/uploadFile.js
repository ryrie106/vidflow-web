import { UPLOAD_URL, UPLOAD_CHUNKSIZE } from '../constants';
/**
 * 웹소켓을 이용한 파일 업로드 구현. 지금은 사용하지 않음.
 */

export function uploadFile(file, uid) {
    return new Promise(function(resolve, reject) {
        const ws = new WebSocket(UPLOAD_URL);

        let currentChunk = 0;
        let fileName;
        const numChunks = Math.ceil(file.size / UPLOAD_CHUNKSIZE);
        ws.binaryType = "arraybuffer";
        ws.onopen = (e) => {
            console.log('Connected: ' + e);
            let sendmsg = {
                type: "info",
                uid: uid,
                fileSize: file.size,
                numChunks: numChunks,
                extension: file.name.split(".").pop().toLowerCase()
            };
            ws.send(JSON.stringify(sendmsg));
        };

        ws.onmessage = (e) => {

            if(e.data instanceof ArrayBuffer) {
                // TODO: Text 메시지가 온 다음 왜 ArrayBuffer 메시지가 오는거지?
                console.log("Array");
            }
            else {
                console.log(e);
                const msg = JSON.parse(e.data);
                let sendmsg;
                let senddata;
                switch(msg.type) {
                    case "start":
                        senddata = file.slice(currentChunk * UPLOAD_CHUNKSIZE, 
                            Math.min((currentChunk + 1) * UPLOAD_CHUNKSIZE, file.size));
                        console.log(currentChunk + "/" + numChunks + " uploaded");
                        currentChunk += 1;
                        ws.send(senddata);
                        break;

                    case "uploading":
                        senddata = file.slice(currentChunk * UPLOAD_CHUNKSIZE,
                            Math.min((currentChunk + 1) * UPLOAD_CHUNKSIZE, file.size));
                        currentChunk += 1;
                        ws.send(senddata);
                        break;

                    case "complete":
                        sendmsg = {
                            type: "complete",
                            uid: uid
                        };
                        ws.send(JSON.stringify(sendmsg));
                        fileName = msg.fileName;
                        ws.close();                    
                        break;
                    default:
                        break;
                }
            }
        }

        ws.onclose = (e) => {
            resolve(fileName);
        }

        ws.onerror = (err) => {
            reject(err);
        }
    });
}