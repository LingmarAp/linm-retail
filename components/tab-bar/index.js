// components/tab-bar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onGotoHome(event) {
            this.triggerEvent("gotoHome", {event:event}, {bubbles: true, composed: true})
        },

        onGotoCart(event) {
            this.triggerEvent("gotoCart", {event:event}, {bubbles: true, composed: true})
        },

        onAddToCart(event) {
            this.triggerEvent("addToHome", {event:event}, {bubbles: true, composed: true})
        },

        onBuy(event) {
            this.triggerEvent("buy", {event:event}, {bubbles: true, composed: true})
        }
    }
})
