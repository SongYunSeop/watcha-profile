import AWS, {AWSError} from 'aws-sdk'
import S3 from "aws-sdk/clients/s3";


class S3CacheService {
    public static instance
    cache: AWS.S3

    constructor() {
        this.cache = new AWS.S3()
    }

    public static getInstance(): S3CacheService {
        if (!S3CacheService.instance) {
            S3CacheService.instance = new S3CacheService()
        }
        return S3CacheService.instance;
    }

    public static async get(bucketName: string, key: string) {
        const params = {
            Bucket: bucketName,
            Key: `cache/${key}`,
        };
        return await this.getInstance().cache.getObject(params).promise().then((result) => {
            return JSON.parse(result.Body.toString())
        });
    }

    public static async set(bucketName: string, key: string, value: Object, expires?: Date) {
        const params = {
            Bucket: bucketName,
            Key: `cache/${key}`,
            Body: Buffer.from(JSON.stringify(value)),
            Expires: expires ? expires : new Date((new Date()).getTime() + 60 * 24),
        };
        await this.getInstance().cache.putObject(params).promise();
    }

    public static async getKeys(bucketName: string, prefix: string) {
        const params = {
            Bucket: bucketName,
            MaxKeys: 10,
            Prefix: `cache/${prefix}`,
        };
        return await this.getInstance().cache.listObjectsV2(params).promise().then((result) => {
            return result.Contents.map(key => key.Key)
        });
    }
}

export default S3CacheService