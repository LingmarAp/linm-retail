import * as spuData from "../../../data/spu";

class Spu {
    static getHomeList(index, pageSize) {
        let data = spuData.local_spu
        const items = spuData.local_spu.items
        const total = spuData.local_spu.total

        let list = []
        const currentIndex = (index - 1) * pageSize
        const nextIndex = index * pageSize - 1
        if (currentIndex + 1 < total) {
            list = items.slice(currentIndex, nextIndex + 1 > total ? total : nextIndex + 1)
        }

        data.items = list
        return data
    }
}

export {
    Spu
}
