import {Cell} from "./cell";
import boolean from "../../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

class Fence {
    specs = []

    cells = []
    id
    title

    constructor(specs) {
        this.specs = specs
        this.id = specs[0].key_id
        this.title = specs[0].key
    }

    init() {
        this._initCells()
    }

    setSketchFence(skuList) {
        this.cells.forEach(cell => {
            this._setCellSkuImg(cell, skuList)
        })
    }

    _setCellSkuImg(cell, skuList) {
        const code = cell.getCellCode()
        const matchedSku = skuList.find(sku => sku.code.includes(code))
        if (matchedSku) {
            cell.skuImg = matchedSku.img
        }
    }

    _initCells() {
        this.specs.forEach(element => {
            const existed = this.cells.some(c => {
                return c.id === element.value_id
            })
            if (existed) {
                return
            }
            const cell = new Cell(element)
            this.cells.push(cell)
        })
    }
}

export {
    Fence
}
