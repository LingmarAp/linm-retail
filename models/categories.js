import {Http} from "../utils/http";

class Categories {
    roots = []  // 一级分类
    subs = []   // 二级分类

    async getAll() {
        // http://se.7yue.pro/v1/category/all
        const data = await Http.request({
            url: `category/all`
        })
        this.roots = data.roots
        this.subs = data.subs
    }

    getRoots() {
        return this.roots
    }

    getSubs(rootId) {
        return this.roots.find(root => root.id === rootId)
    }
}

export {
    Categories
}