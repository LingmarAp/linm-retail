class Matrix {
    m

    constructor(matrix) {
        this.m = matrix
    }

    get rowNum() {
        return this.m.length
    }

    get colsNum() {
        return this.m[0].length
    }

    forEach(callback) {
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowNum; i++) {
                callback(this.m[i][j], i, j)
            }
        }
    }

    transpose() {
        const aT = []
        for (let j = 0; j < this.colsNum; j++) {
            aT[j] = []
            for (let i = 0; i < this.rowNum; i++) {
                aT[j].push(this.m[i][j])
            }
        }
        return aT
    }

}

export {
    Matrix
}
