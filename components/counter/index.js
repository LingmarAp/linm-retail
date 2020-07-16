// components/counter/index.js
import {Cart} from "../../models/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: {
            value: Cart.SKU_MIN_COUNT,
            type: Number
        },
        min: {
            value: Cart.SKU_MIN_COUNT,
            type: Number
        },
        max: {
            value: Cart.SKU_MAX_COUNT,
            type: Number
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onOverflowEvent(type) {
            type = type.detail.type
            if (type === "overflow_min") {
                wx.showToast({
                    title: '不能再小了',
                    icon: 'none',
                    duration: 3000
                })
            } else if (type === "overflow_max") {
                wx.showToast({
                    title: `最多选择${this.properties.max}件呢`,
                    icon: 'none',
                    duration: 3000
                })
            }
        }
    }
})
