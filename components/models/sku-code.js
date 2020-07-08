import {combination} from "../../utils/util";

class SkuCode {
    code
    spuId
    totalSegments = [] // 单个SKU可能的路径

    constructor(code) {
        this.code = code
        this.splitToFragments()
    }

    splitToFragments() {
        // spuCode:2$1-44#3-9#4-14
        // spu and specifications
        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]

        const specCodeArray = spuAndSpec[1].split('#')
        const length = specCodeArray.length

        for (let i = 0; i < length; i++) {
            const segments = combination(specCodeArray, i + 1)
            const newSegments = segments.map(seg => {
                return seg.join('#')
            })
            // 注意这里使用concat而不是push，因为对以为数组进行匹配更方便
            this.totalSegments = this.totalSegments.concat(newSegments)
        }
    }
}

export {
    SkuCode
}