import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId, sort = 'id_asc') {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&sort=${sort}&${this.commonInfo}`
    }
}

export const urls = new Urls()