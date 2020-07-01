import S3CacheService from "../../s3";
import users from "../../watcha/users";

const getUserInfo = async (userID: string) => {
    const cacheKey = `users/${userID}.json`
    let userData;
    userData = await S3CacheService
        .get('watcha-profile', cacheKey)
        .catch(async () => {
                console.log('cache miss')
            }
        )
    if (userData === undefined || userData === null) {
        userData = await users(userID).then(res => res.json()).then(json => json.result)
        await S3CacheService.set('watcha-profile', cacheKey, userData)
    }
    return await userData
}

export default getUserInfo