import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {Cell} from "./cell";

class Judge {
    fenceGroup
    pathDict = [] // 所有SKU可能的路径

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
    }

    _initPathDict() {
        this.fenceGroup.skuList.forEach(sku => {
            const skuCode = new SkuCode(sku.code)
            // 注意这里使用concat而不是push，因为对一维数组进行匹配更方便
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        console.log(this.pathDict)
    }

    judge(cell, row, column) {
        this._changeCellStatus(cell, row, column)
    }

    _changeCellStatus(cell, row, column) {
        if (cell.status === CellStatus.WAITING) {
            cell.status = CellStatus.SELECTED
        } else if (cell.status === CellStatus.SELECTED) {
            cell.status = CellStatus.WAITING
        }

        this.fenceGroup.fences[row].cells[column].status = cell.status
        // this.fenceGroup.fences.forEach(fence => {
        //     fence.cells.forEach(c => {
        //         if (c.id === cell.id) {
        //             c.status = cell.status
        //         }
        //     })
        // })
    }
}

export {
    Judge
}