//index.js
//获取应用实例
const app = getApp()
const key = app.globalData.key
let utils = require('../../utils/util');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    message: '',
    cityData: {},
    hourlyData: {}
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  success(data, location) {
    wx.stopPullDownRefresh();
    let now = new Date();
    // 存下来源数据
    data.updateTime = now.getTime();
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm");
    wx.setStorage({
      key: 'cityData',
      data,
    });
    this.setData({
      cityData: data,
    });
  },
  fail(res) {
    wx.stopPullDownRefresh()
    let errMsg = res.errMsg || ''
    // 拒绝授权地理位置权限
    if (errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1) {
      wx.showToast({
        title: '需要开启地理位置权限',
        icon: 'none',
        duration: 2500,
        success: (res) => {
          if (this.canUseOpenSettingApi()) {
            let timer = setTimeout(() => {
              clearTimeout(timer)
              wx.openSetting({})
            }, 2500)
          } else {
            this.setData({
              openSettingButtonShow: true,
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '网络不给力，请稍后再试',
        icon: 'none',
      })
    }
  },
  getWeather: function (location) {
    let _this = this;
    wx.request({
      url: `${app.globalData.requestUrl.weather}`,
      data: {
        location,
        key
      },
      success: (resp) => {
        console.log(resp);
        if (resp.statusCode === 200) {
          let data = resp.data.HeWeather6[0];
          if (data.status === 'ok') {
            this.success(data, location);
          } else {
            wx.showToast({
              title: '查询失败',
              icon: 'none',
            });
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        });
      }
    })
  },
  onLoad: function () {
    let _this = this
    wx.getLocation({
      success: function (res) {
        _this.getWeather(`${res.latitude},${res.longitude}`);
        // this.getHourly(`${res.latitude},${res.longitude}`);
      },
      fail: (res) => {
        this.fail(res);
      }
    });
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 获取小时天气
  getHourly(location) {
    wx.request({
      url: `${globalData.requestUrl.hourly}`,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0]
          if (data.status === 'ok') {
            this.setData({
              hourlyDatas: data.hourly || []
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
        })
      },
    })
  },
  onPullDownRefresh(res) {
    this.reloadPage();
  },
  getCityDatas() {
    let cityDatas = wx.getStorage({
      key: 'cityDatas',
      success: (res) => {
        this.setData({
          cityDatas: res.data,
        })
      },
    })
  },

  reloadPage() {
    // this.setBcgImg()
    // this.getCityDatas()
    // this.reloadInitSetting()
    this.reloadWeather();
    // this.reloadGetBroadcast()
  },
  reloadWeather: function () {
    console.log('reload');
    let _this = this
    wx.getLocation({
      success: function (res) {
        _this.getWeather(`${res.latitude},${res.longitude}`);
        // this.getHourly(`${res.latitude},${res.longitude}`);
      },
      fail: (res) => {
        this.fail(res);
      }
    });
  },
});
