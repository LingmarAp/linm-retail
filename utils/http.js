import {config} from "../config/config";
import {promisic} from "../miniprogram_npm/lin-ui/utils/util";

class Http {
    static async request({url, data, method = 'GET'}) {
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}?appkey=${config.appkey}`,
            data,
            method
        })
        return res.data
    }
}

export {
    Http
}
