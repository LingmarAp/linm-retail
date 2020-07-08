import {CellStatus} from "../../core/enum";

class Cell {
    id
    title
    status = CellStatus.WAITING

    constructor(element) {
        this.id = element.value_id
        this.title = element.value
    }
}

export {
    Cell
}
