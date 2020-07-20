// pages/search/search.js
import {Tag} from "../../models/tag";
import {HistoryKeyword} from "../../models/history-keyword";
import {Search} from "../../models/search";
import {showToast} from "../../utils/ui";

Page({

    data: {
        history: null,
        historyTags: [],
        hotTags: []
    },

    onLoad: async function (options) {
        const hotTags = await Tag.getSearchTags()
        const history = new HistoryKeyword()
        const historyTags = history.get()

        this.bindHistoryTags(historyTags)
        this.setData({
            hotTags: hotTags,
            history: history,
        })
    },

    async onSearch(event) {
        this.setData({
            search: true,
            items: []
        })
        const keyword = event.detail.value || event.detail.name
        if (!keyword) {
            showToast('请输入关键字')
            return
        }
        this.data.history.save(keyword)
        this.bindHistoryTags(this.data.history.get())

        const paging = Search.search(keyword)
        wx.lin.showLoading({
            color: '#157658',
            type: "flash",
            fullScreen: true
        })
        const data = await paging.next()
        wx.lin.hideLoading()
        this.bindItems(data.items)
    },

    onCancel(event) {
        this.setData({
            search: false,
            items: []
        })
    },

    onDeleteHistory(event) {
        this.data.history.clear()

        const historyTags = this.data.history.get()
        this.setData({
            historyTags
        })
    },

    bindItems(items) {
        this.setData({
            items: items
        })
    },

    bindHistoryTags(tags) {
        this.setData({
            historyTags: tags
        })
    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

    onShareAppMessage: function () {

    }
})