import {Http} from "./http";
import {Spu} from "../models/spu";

class Paging {
    start
    count
    url
    locker = false
    req
    moreData = true
    accumulator = []

    constructor(req, count = 10, start = 0) {
        this.req = req
        this.url = req.url
        this.count = count
        this.start = start
    }

    async next() {
        if (!this.moreData) {
            return
        }
        if (!this._getLocker()) {
            return
        }
        const data = await this._actualGetData()
        this._releaseLocker()
        return data
    }

    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }

    async _actualGetData() {
        const req = this._getCurrentReq()
        const page = await Http.request(req)
        // // 模拟网络加载
        // const page = Spu.getLocalSpu(this.start, this.count)
        if (!page) {
            return null
        }
        if (page.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        this.moreData = this._moreData(page.total_page, page.page)
        if (this.moreData) {
            this.start += this.count
        }
        this._accumulator(page.items)
        return {
            empty: false,
            items: page.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    _getCurrentReq() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if (url.includes('?')) {
            url += '&' + params
        } else {
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    _moreData(total_page, pageNum) {
        return total_page > pageNum + 1;
    }

    _accumulator(items) {
        this.accumulator = this.accumulator.concat(items)
    }
}

export {
    Paging
}
