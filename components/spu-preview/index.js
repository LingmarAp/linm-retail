Component({
    properties: {
        data: Object
    },

    observers: {
        'data': function (data) {
            if (!data || !data.tags) {
                return
            }
            this.setData({
                tags: data.tags.split('$')
            })
        }
    },

    data: {
        tags: null
    },

    methods: {
        onImgLoad(event) {
            // console.log(event)
            const {width, height} = event.detail
            // height/width = h/340
            this.setData({
                w: 340,
                h: height / width * 340
            })
        },

        onItemTap(event) {
            const pid = event.currentTarget.dataset.pid
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            })
        }
    }
})
