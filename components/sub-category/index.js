// components/sub-category/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bannerImg: String,
        categories: Array
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onGridItemTap(event) {
            const id = event.detail.key
            this.triggerEvent('itemtap', {
                cid: id
            })
        }
    }
})
