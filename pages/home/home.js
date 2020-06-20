import {
    Theme
} from "../../models/theme";
import {Spu} from "../../models/spu";
import {Paging} from "../../utils/paging";

const bannerData = require('../../data/banner')
const themesData = require('../../data/themes')
const categoryData = require('../../data/category')
const activityData = require('../../data/activity')
const spuData = require('../../data/spu')
const banner2Data = require('../../data/banner2')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        themeF: null,
        themeH: null,
        themeESpu: null,
        bannerB: null,
        grid: [],
        activityD: null,
        bannerG: null,
        paging: null,
        loadingType: "loading"
    },

    onLoad: async function (options) {
        // const data = await Theme.getHomeLocationA()
        // console.log(data)
        this.initAllData()
        await this.initBottomSpuList()
    },

    async initBottomSpuList() {
        const paging = new Paging({
            url: ''
        })
        this.setData({
            paging
        })
        const spu = await paging.next()
        if (!spu) {
            return
        }
        wx.lin.renderWaterFlow(spu.items, false)
    },

    initAllData() {
        // TODO 模拟网络数据
        const themes = themesData.local_themes

        const themeA = themes.find(t => t.name === Theme.locationA)
        const themeE = themes.find(t => t.name === Theme.locationE)
        let themeESpu = []
        if (themeE.online) {
            const data = spuData.local_spu.items
            if (data) {
                themeESpu = data.slice(0, 8)
            }
        }

        const themeF = themes.find(t => t.name === Theme.locationF)

        const bannerB = bannerData.local_banner
        const grid = categoryData.local_category
        const activityD = activityData.local_activity

        const bannerG = banner2Data.local_banner2

        const themeH = themes.find(t => t.name === Theme.locationH)

        this.setData({
            themeA,
            themeE,
            themeF,
            themeH,
            themeESpu,
            bannerB,
            grid,
            activityD,
            bannerG
        })
    },

    onPullDownRefresh: function () {
    },

    onReachBottom: async function () {
        const spu = await this.data.paging.next()
        if (!spu) {
            return
        }
        if (!spu.moreData) {
            this.setData({
                loadingType: "end"
            })
        }
        wx.lin.renderWaterFlow(spu.items, false)
    },

    onShareAppMessage: function () {

    }
})
