import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {Joiner} from "../../utils/joiner";
import {SkuPending} from "./sku-pending";

class Judge {
    fenceGroup
    pathDict = [] // 所有SKU可能的路径
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    _initSkuPending() {
        this.skuPending = new SkuPending()
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
        this._changeCurrentCellStatus(cell, row, column)
        this._changeOtherCellStatus(row, column)
    }

    _changeCurrentCellStatus(tapCell, tapRow, tapColumn) {
        // 1. 对当前Cell状态取反
        // 2. 对pending进行修改（修改选中cell的集合）
        if (tapCell.status === CellStatus.WAITING) {
            tapCell.status = CellStatus.SELECTED
            this.skuPending.insertCell(tapCell, tapRow)
        } else if (tapCell.status === CellStatus.SELECTED) {
            tapCell.status = CellStatus.WAITING
            this.skuPending.removeCell(tapRow)
        }

        this.fenceGroup.fences[tapRow].cells[tapColumn].status = tapCell.status
    }

    _changeOtherCellStatus(tapRow, tapColumn) {
        this.fenceGroup.eachCell((cell, currentRow, currentColumn) => {
            const path = this._findPotentialPath(cell, currentRow, currentColumn)
            console.log(path)
        })
    }

    _findPotentialPath(cell, currentRow, currentColumn) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.getCellByRow(i)
            if (currentRow === i) {
                joiner.join(cell.getCellCode())
            } else if (selected) {
                joiner.join(selected.getCellCode())
            }
        }
        return joiner.getStr()
    }
}

export {
    Judge
}