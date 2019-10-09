import * as AWS from 'aws-sdk';
/**
 * AWS S3에 직접 업로드 하는 코드. 사용하기 위해서는 API Key가 필요하다 현재 사용하지 않음.
 */
const BucketName = '';
const bucketRegion = '';
const IdentityPoolId = '';

// Set the region 
AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

// Create S3 service object
var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: BucketName}

});

export function uploadVideo(file, uid) {
    return new Promise(function(resolve, reject) {
        const uploadParams = {
            Bucket: 'vidflow',
            Key: 'videos/imsi.mp4',
            Body: file,
            ACL: 'public-read'
        }

        s3.upload(uploadParams, function(err, data) {
            if(err) {
                console.log("Error", err);
            }
            if(data) {
                console.log("video upload success", data.Location);
                resolve('imsi.mp4');
            }
        });
    });
}

export function uploadImage(file, uid) {
    return new Promise(function(resolve, reject) {
        const uploadParams = {
            Bucket: 'vidflow',
            Key: 'images/imsi.png',
            Body: file,
            ACL: 'public-read'
        }

        s3.upload(uploadParams, function(err, data) {
            if(err) {
                console.log("Error", err);
            }
            if(data) {
                console.log("video upload success", data.Location);
                resolve('imsi');
            }
        });
    });
}
