// components/realm/index.js
import {FenceGroup} from "../models/fence-group";

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
            this.bindInitData(fenceGroup)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        fences: Array
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        }
    }
})
