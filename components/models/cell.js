import {CellStatus} from "../../core/enum";

class Cell {
    id
    title
    status = CellStatus.WAITING
    element

    constructor() {
        const element = arguments[0]
        this.id = element.value_id
        this.title = element.value
        this.element = element

        if (arguments.length === 2) {
            this.status = arguments[1]
        }
    }

    getCellCode() {
        return this.element.key_id + "-" + this.element.value_id
    }
}

export {
    Cell
}
