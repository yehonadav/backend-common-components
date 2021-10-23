import S3 from 'aws-sdk/clients/s3';

const s3 = new S3();

export function deleteS3Object(deleteObjectRequest: S3.Types.DeleteObjectRequest):Promise<S3.Types.DeleteObjectOutput> {
  return new Promise((resolve, reject) => {
    s3.deleteObject(deleteObjectRequest, function(err, data) {
      if (err)
        reject(err);
      resolve(data);
    });
  });
}