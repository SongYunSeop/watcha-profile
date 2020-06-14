import S3CacheService from "../../s3";
import contents from "../../watcha/contents";

const getBooks = async (userID) => {
    const cacheKey = `contents/books/${userID}.json`
    let booksData
    booksData = await S3CacheService
        .get('watcha-profile', cacheKey)
        .catch(() => {
            console.log('cache miss')
        })
    if (booksData === undefined || booksData === null) {
        booksData = await contents
            .allBooks(userID)
            .then((responses) => responses
                .flatMap(json => json["result"].result)
                .sort((x, y) => {
                    return y["user_content_action"].rating - x["user_content_action"].rating;
                }))
        await S3CacheService.set('watcha-profile', cacheKey, booksData)
    }
    return booksData
}

export default getBooks