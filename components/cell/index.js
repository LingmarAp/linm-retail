// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object,
        row: Number,
        column: Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap() {
            this.triggerEvent('cellevent', {
                cell: this.properties.cell,
                row: this.properties.row,
                column: this.properties.column
            }, {bubbles: true, composed: true})
        }
    }
})
