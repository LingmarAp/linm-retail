class SkuPending {
    pending = []

    constructor() {
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
}

export {
    SkuPending
}