const spuData = require("../../../data/spu")

Page({

    data: {
        data: []
    },

    onLoad: function (options) {

    },

    onReady: function () {
        this.setData({
            data: spuData.local_spu.items,
        })
    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {
        console.log("onReachBottom")
    },

    onShareAppMessage: function () {

    }
})
