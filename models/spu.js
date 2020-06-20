import {Http} from "../utils/http";

const data = require('../data/spu')

const spuData = data.local_spu

class Spu {
    static getDetail(id) {
        return Http.request({
            url: `spu/id/${id}/detail`
        })
    }

    static getLocalSpu(start, count) {
        let realCount = 0
        if (start > spuData.total) {
            return null
        }
        if (start + count > spuData.total) {
            realCount = spuData.total - start
        } else {
            realCount = count
        }
        const page = Math.floor((start + count) / count - 1)
        const totalPage = Math.floor(spuData.total / count)
        return {
            "total": spuData.total,
            "count": realCount,
            "page": page,
            "total_page": spuData.total % count === 0 ? totalPage : totalPage + 1,
            "items": spuData.items.slice(start, start + count)
        }
    }
}

export {
    Spu
}
