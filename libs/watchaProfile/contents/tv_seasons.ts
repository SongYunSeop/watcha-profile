import S3CacheService from "../../s3";
import contents from "../../watcha/contents";

const getTvSeasons = async (userID) => {
    const cacheKey = `contents/tvSeasons/${userID}.json`
    let tvSeasonsData
    tvSeasonsData = await S3CacheService
        .get('watcha-profile', cacheKey)
        .catch(() => {
            console.log('cache miss')
        })
    if (tvSeasonsData === undefined || tvSeasonsData === null) {
        tvSeasonsData = await contents
            .allTvSeasons(userID)
            .then((responses) => responses
                .flatMap(json => json["result"].result)
                .sort((x, y) => {
                    return y["user_content_action"].rating - x["user_content_action"].rating;
                }))
        await S3CacheService.set('watcha-profile', cacheKey, tvSeasonsData)
    }
    return tvSeasonsData
}

export default getTvSeasons