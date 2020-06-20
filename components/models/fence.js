import {Cell} from "./cell";

class Fence {
    cells = []
    specs = []
    valueTitle = []

    constructor(specs) {
        this.specs = specs
    }

    init() {
        this.specs.forEach(element => {
            const cell = new Cell(element)
            this.cells.push(cell)
        })
    }

    pushValueTitle(title) {
        this.valueTitle.push(title)
    }
}

export {
    Fence
}
