function showToast(title) {
    wx.showToast({
        title: title,
        icon: 'none',
        duration: 2000
    })
}

export {
    showToast
}