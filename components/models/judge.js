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
        // 初始化默认路径
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku)
        this._initSelectedCell()
        this._changeOtherCellStatus()
    }

    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
        })
    }

    _initPathDict() {
        this.fenceGroup.skuList.forEach(sku => {
            const skuCode = new SkuCode(sku.code)
            // 注意这里使用concat而不是push，因为对一维数组进行匹配更方便
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        // console.log(this.pathDict)
    }

    judge(cell, row, column) {
        this._changeCurrentCellStatus(cell, row, column)
        this._changeOtherCellStatus()
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

        this.fenceGroup.setCellStatusByAxis(tapRow, tapColumn, tapCell.status)
    }

    _changeOtherCellStatus() {
        this.fenceGroup.eachCell((cell, currentRow, currentColumn) => {
            const path = this._findPotentialPath(cell, currentRow, currentColumn)
            if (!path) {
                return
            }

            const isInDict = this.pathDict.includes(path)
            if (isInDict) {
                cell.status = CellStatus.WAITING
            } else {
                cell.status = CellStatus.FORBIDDEN
            }
        })
    }

    _findPotentialPath(cell, currentRow, currentColumn) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.getCellByRow(i)
            if (currentRow === i) {
                // 如果当前cell被选中，则不寻找关于这个cell的潜在路径
                // 因为要保存当前cell的状态
                if (this.skuPending.isSelected(cell, i)) {
                    return
                }
                joiner.join(cell.getCellCode())
            } else if (selected) {
                joiner.join(selected.getCellCode())
            }
        }
        return joiner.getStr()
    }

    isIntactPending() {
        return this.skuPending.isIntact()
    }

    getDeterminateSku() {
        const code = this.skuPending.getSkuCode(this.fenceGroup.spu)
        return this.fenceGroup.getSku(code)
    }

    getCurrentSpecValue() {
        return this.skuPending.getCurrentSpecValues()
    }

    getMissingSpecKeys() {
        return this.skuPending.getMissingSpecKeysIndex().map(index => {
            return this.fenceGroup.fences[index].title
        })
    }

    getTip() {
        if (this.isIntactPending()) {
            return this.skuPending.getCurrentSpecValues()
        } else {
            const keysIndex = this.skuPending.getMissingSpecKeysIndex()
            const specKeys = this.fenceGroup.fences.find((cell, i) => {
                return keysIndex.includes(i)
            })
            console.log(specKeys)
        }
    }
}

export {
    Judge
}