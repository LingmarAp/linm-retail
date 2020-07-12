// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judge} from "../models/judge";
import {Cell} from "../models/cell";
import {Spu} from "../../models/spu";
import boolean from "../../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

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
            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu)
            } else {
                this.processHasSpec(spu)
            }

        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        fences: Array,
        isIntact: Boolean,

        judge: Object,
        previewImg: String,
        title: String,
        price: String,
        discount_price: String,
        stock: String,
        noSpec: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        processNoSpec(spu) {
            this.setData({
                noSpec: true
            })
            this.bindSkuData(spu.sku_list[0])
        },

        processHasSpec(spu) {
            const fenceGroup = new FenceGroup(spu)
            // fenceGroup.initFences()
            fenceGroup.initFencesTransPose()
            const judge = new Judge(fenceGroup)
            this.setData({
                judge: judge
            })

            const defaultSku = fenceGroup.getDefaultSku()

            if (defaultSku) {
                this.bindSkuData(defaultSku)
            } else {
                this.bindSpuData()
            }
            this.bindFenceGroupData(fenceGroup)
        },

        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discount_price: spu.discount_price,
                isIntact: this.data.judge.isIntactPending()
            })
        },

        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discount_price: sku.discount_price,
                stock: sku.stock,
                isIntact: this.data.judge.isIntactPending()
            })
        },

        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },

        onCellTap(event) {
            const judge = this.data.judge
            const detail = event.detail

            const cell = new Cell(detail.cell.element, detail.cell.status) // 重新构造cell对象，这样才可以调用cell中的方法
            const row = detail.row
            const column = detail.column

            judge.judge(cell, row, column)
            this.bindFenceGroupData(judge.fenceGroup)
        }
    }
})
