import {Http} from "../utils/http";

class Tag {
    static async getSearchTags() {
        const data = await Http.request({
            url: `tag/type/1`
        })
        return data
    }
}

export {
    Tag
}