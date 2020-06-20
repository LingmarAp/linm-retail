Component({
    properties: {
        data: {
            type: Array,
            observers(newVal, oldVal) {
                console.log(oldVal)
                console.log(newVal)
            }
        },
    },

    data: {},

    ready() {
        // console.log("attached")
        // this._init();
    },

    attached() {
        // console.log("attached")
        // this._init();
    },

    pageLifetimes: {
        show() {
            // console.log("show")
            // this._init();
        }
    },

    onReachBottom() {
        console.log("onReachBottom")
    },

    methods: {
        onBtnTap() {
            this._init()
        },

        _init() {
            console.log("_init")
            console.log(this.data.data)
            wx.lin.renderWaterFlow(this.data.data, false ,()=>{
                console.log('渲染成功')
            })
        }
    },
})
