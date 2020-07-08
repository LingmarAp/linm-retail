import {SkuCode} from "./sku-code";

class Judge {
    fenceGroup
    pathDict = [] // 所有SKU可能的路径

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.initPathDict()
    }

    initPathDict() {
        this.fenceGroup.skuList.forEach(sku => {
            const skuCode = new SkuCode(sku.code)
            // 注意这里使用concat而不是push，因为对以为数组进行匹配更方便
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log(this.pathDict)
    }
}

export {
    Judge
}