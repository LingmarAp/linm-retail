// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judge} from "../models/judge";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    observers: {
        'spu': function (spu) {
            if (!spu) {
                return
            }
            const fenceGroup = new FenceGroup(spu)
            // fenceGroup.initFences()
            fenceGroup.initFencesTransPose()
            const judge = new Judge(fenceGroup)

            this.setData({
                judge: judge
            })
            this.bindInitData(fenceGroup)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        fences: Array,
        judge: Object
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        },

        onCellTap(event) {
            const judge = this.data.judge
            const detail = event.detail

            const cell = detail.cell
            const row = detail.row
            const column = detail.column

            judge.judge(cell, row, column)
            this.bindInitData(judge.fenceGroup)
        }
    }
})
