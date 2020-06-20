import {Spu} from "../model/spu";

class Paging {
    url
    count
    start
    total = -1
    locker = false

    constructor(url, count = 7, start = 1) {
        this.url = url;
        this.count = count;
        this.start = start;
    }

    next(callback) {
        this._showLoading()
        if (!this._getLocker())
            return
        if (this.total !== -1 && this.start * this.count > this.total) {
            this._showNoMore()
            return
        }

        const data = Spu.getHomeList(this.start, this.count);
        this.total = data.total
        if (data.length <= 0) {
            callback.fail()
        } else {
            callback.success(data)
        }

        this.start += 1
        this._releaseLocker()
        this._hideLoading()
    }

    _showNoMore() {
        console.log("_showNoMore")
    }

    _showLoading() {
        console.log("_showLoading")
    }

    _hideLoading() {
        console.log("_hideLoading")
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
}
