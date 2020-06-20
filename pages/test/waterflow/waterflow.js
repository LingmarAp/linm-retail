const spuData = require("../../../data/spu")

Page({

    data: {
        spuData: {},
        index: 1,
        pageSize: 7,
        total: -1,
        paging: null
    },

    onLoad: function (options) {
        this.initData()
        wx.lin.renderWaterFlow(this.data.spuData, false, () => {
            console.log('渲染成功')
        })
    },

    initData() {
        const data = this.getData(1, 7)
        this.setData({
            spuData: data,
            total: spuData.local_spu.total
        })
        wx.hideLoading()
    },

    getNext() {
        const index = this.data.index
        const pageSize = this.data.pageSize
        if (index * pageSize < this.data.total) {
            const spuData = this.getData(index + 1, pageSize)
            this.setData({
                index: index + 1,
                spuData: spuData
            })
            wx.lin.renderWaterFlow(this.data.spuData, false, () => {
                console.log('渲染成功')
            })
            wx.hideLoading()
            // this.setData({
            //     spuData: this.data.spuData.concat(spuData)
            // })
        } else {
            wx.showToast({
                title: '没有更多',
            })
        }

    },

    getData(index, pageSize) {  // 1, 7
        wx.showLoading({
            title: '加载中',
        })
        const items = spuData.local_spu.items
        const total = spuData.local_spu.total

        let list = []
        const currentIndex = (index - 1) * pageSize
        const nextIndex = index * pageSize - 1
        if (currentIndex + 1 < total) {
            list = items.slice(currentIndex, nextIndex + 1 > total ? total : nextIndex + 1)
        }
        return list
    },

    onReady: function () {

    },

    onShow: function () {

    },
    onPullDownRefresh: function () {

    },

    onReachBottom: function () {
        this.getNext()
    },

    onShareAppMessage: function () {

    }
})
