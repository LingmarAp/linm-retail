import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    eachCell(callback) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                callback(cell, i, j)
            }
        }
    }

    initFencesTransPose() {
        const matrix = this._createMatrix(this.skuList)
        const aT = matrix.transpose()
        const fences = []
        aT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        })
        this.fences = fences
    }

    // 将每个sku的specs插入这个数组中，形成的二维数组
    // [[],[],[]]
    // [{金属灰,...} {七龙珠,...} {小号S,...}]
    // [青芒色 灌篮高手 中号M]
    // [青芒色 圣斗士 大号L]
    // [橘黄色 七龙珠 小号S]
    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }

    _createFence() {
        return new Fence()
    }

    initFences() {
        const matrix = this._createMatrix(this.skuList)
        // const fences = []
        let currentJ = -1
        matrix.forEach((element, i, j) => {
            if (currentJ !== j) {
                currentJ = j
                fences[currentJ] = this._createFence()
                // fences.push(this._createFence())
            }
            // fences[currentJ].pushValueTitle(element.value)
        })
    }
}

export {
    FenceGroup
}
