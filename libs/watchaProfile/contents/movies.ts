import S3CacheService from "../../s3";
import contents from "../../watcha/contents";

const getMovies = async (userID) => {
    const cacheKey = `contents/movies/${userID}.json`
    let moviesData
    moviesData = await S3CacheService
        .get('watcha-profile', cacheKey)
        .catch(() => {
            console.log('cache miss')
        })
    if (moviesData === undefined || moviesData === null) {
        moviesData = await contents
            .allMovies(userID)
            .then((responses) => responses
                .flatMap(json => json["result"].result)
                .sort((x, y) => {
                    return y["user_content_action"].rating - x["user_content_action"].rating;
                }))
        await S3CacheService.set('watcha-profile', cacheKey, moviesData)
    }
    return moviesData;
}

export default getMovies