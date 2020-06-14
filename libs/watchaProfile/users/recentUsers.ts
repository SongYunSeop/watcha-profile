import S3CacheService from "../../s3";

const getRecentUser = async () => {
    const keys = await S3CacheService
        .getKeys('watcha-profile', 'users')
    return Promise.all(keys
        .map(async (key: string) => await S3CacheService
            .get('watcha-profile', key.replace('cache/', ''))))
}

export default getRecentUser