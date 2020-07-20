class HistoryKeyword {
    HISTORY_MAX_COUNT = 10
    HISTORY_KEY = 'history_key'

    keywords = []

    constructor() {
        if (typeof HistoryKeyword.instance === 'object') {
            return HistoryKeyword.instance
        }
        if(this.instance)
        this.keywords = this._getCache()
        if (!this.keywords) {
            this.keywords = []
        }
        HistoryKeyword.instance = this
        return this
    }

    save(keyword) {
        // 作为搜索历史应该注意的几个点：
        // 1. 元素不能重复
        // 2. 元素添加有上限，且超出上限后早期的元素要被删除（队列）
        const isExist = this.keywords.some(k => k === keyword)
        if (isExist) {
            return
        }
        if (this.keywords.length >= this.HISTORY_MAX_COUNT) {
            this.keywords.pop()
        }
        this.keywords.unshift(keyword)
        this._refreshCache()
    }

    get() {
        return this.keywords
    }

    clear() {
        this.keywords = []
        this._refreshCache()
    }

    _refreshCache() {
        wx.setStorageSync(this.HISTORY_KEY, this.keywords)
    }

    _getCache() {
        return wx.getStorageSync(this.HISTORY_KEY)
    }
}

export {
    HistoryKeyword
}