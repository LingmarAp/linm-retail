import {Cell} from "./cell";
import {CellStatus} from "../../core/enum";

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