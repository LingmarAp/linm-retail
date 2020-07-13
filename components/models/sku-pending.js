import {Cell} from "./cell";
import {CellStatus} from "../../core/enum";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    pending = []
    size

    constructor() {
    }

    // 初始化默认sku路径
    init(sku) {
        sku.specs.forEach((s, i) => {
            const cell = new Cell(s)
            cell.status = CellStatus.SELECTED
            this.insertCell(cell, i)
        })
    }

    insertCell(cell, row) {
        this.pending[row] = cell
    }

    removeCell(row) {
        this.pending[row] = undefined
    }

    getCellByRow(row) {
        return this.pending[row]
    }

    getSkuCode(currentSpu) {
        const joiner = new Joiner('#')
        this.pending.forEach(cell => {
            if (!cell) {
                return
            }
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        const specCode = joiner.getStr()
        return currentSpu.id + '$' + specCode
    }

    getCurrentSpecValues() {
        return this.pending.map(cell => {
            return cell ? cell.title : null
        })
    }

    getMissingSpecKeysIndex() {
        const keysIndex = []
        for (let i = 0; i < this.pending.length; i++) {
            const cell = this.pending[i]
            if (!cell) {
                keysIndex.push(i)
            }
        }

        return keysIndex
    }

    isIntact() {
        for (let i = 0; i < this.pending.length; i++) {
            if (this._isEmptyCell(this.pending[i])) {
                return false
            }
        }
        return true
    }

    isSelected(cell, row) {
        const selected = this.pending[row]
        if (!selected) {
            return false
        }

        return cell.id === selected.id
    }

    _isEmptyCell(cell) {
        return !cell
    }
}

export {
    SkuPending
}