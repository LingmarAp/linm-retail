// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judge} from "../models/judge";
import {Cell} from "../models/cell";
import {Spu} from "../../models/spu";
import {Cart} from "../../models/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object,
        orderWay: String
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
            this.triggerSpecEvent()
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
        stock: Number,
        noSpec: false,

        currentSkuStock: Cart.SKU_MIN_COUNT,
        outStock: Boolean
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
            this.setStockStatus()
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
            this.bindTipData()
            this.bindFenceGroupData(fenceGroup)
        },

        triggerSpecEvent() {
            const isNoSpec = Spu.isNoSpec(this.properties.spu)
            if (isNoSpec) {
                this.triggerEvent("spec-change", {
                    noSpec: isNoSpec
                })
            } else {
                this.triggerEvent("spec-change", {
                    noSpec: isNoSpec,
                    isIntact: this.data.judge.isIntactPending(),
                    currentValues: this.data.judge.getCurrentSpecValue(),
                    missingKeys: this.data.judge.getMissingSpecKeys()
                })
            }
        },

        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discount_price: spu.discount_price
            })
        },

        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discount_price: sku.discount_price,
                stock: sku.stock
            })
        },

        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },

        bindTipData() {
            this.setData({
                isIntact: this.data.judge.isIntactPending(),
                currentValues: this.data.judge.getCurrentSpecValue(),
                missingKeys: this.data.judge.getMissingSpecKeys()
            })
        },

        isOutOfStock() {
            return this.data.stock < this.data.currentSkuStock
        },

        setStockStatus() {
            // 三种情况下要去改变底部按钮的状态
            // 1. 当前spu有规格时
            // 1.1 当点击count选择器，导致选择的量大于库存量
            // 1.2 用户切换cell，此时，上次选择的量大于当前sku的库存量
            // 2. 当前spu无规格时
            // 3. currentSkuCount的值不应该默认1，而是Cart.SKU_MIN_COUNT
            this.setData({
                outStock: this.isOutOfStock()
            })
        },

        onSelectCount(event) {
            const currentSkuStock = event.detail.count
            this.setData({
                currentSkuStock: currentSkuStock
            })

            const determinateSku = this.data.judge.getDeterminateSku()
            if (determinateSku) {
                this.setStockStatus()
            }
        },

        onCellTap(event) {
            const judge = this.data.judge
            const detail = event.detail

            const cell = new Cell(detail.cell.element, detail.cell.status) // 重新构造cell对象，这样才可以调用cell中的方法
            const row = detail.row
            const column = detail.column

            judge.judge(cell, row, column)
            const determinateSku = judge.getDeterminateSku()
            if (determinateSku) {
                this.bindSkuData(determinateSku)
                this.setStockStatus()
            }

            this.bindFenceGroupData(judge.fenceGroup)
            this.bindTipData()

            this.triggerSpecEvent()
        }
    }
})
