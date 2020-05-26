import NodeCache from 'node-cache'

class UserCache {
    public static instance
    cache: NodeCache

    constructor() {
        this.cache = new NodeCache({
            stdTTL: 60 * 60 * 24,
            maxKeys: 20
        })
    }

    public static getInstance(): UserCache {
        if (!UserCache.instance) {
            UserCache.instance = new UserCache()
        }
        return UserCache.instance;
    }
}

export default UserCache
