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
            const skuList = spu.sku_list
            const fenceGroup = new FenceGroup(spu)
            fenceGroup.initFences()
            // fenceGroup.initFencesTransPose()
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {}
})
