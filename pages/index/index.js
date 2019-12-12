//index.js
//获取应用实例
const app = getApp()
const key = app.globalData.key
let weather = require('../../data/weather.js');

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
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getWeather: function (location) {
    let resp = weather.weather;
    let data = resp[0]['HeWeather6'][0];
    if (data.status === 'ok') {
      this.setData({
        cityData: data,
      });
    } else {
      wx.showToast({
        title: '查询失败',
        icon: 'none',
      });
    }


    // wx.request({
    //   url: `${app.globalData.requestUrl.weather}`,
    //   data: {
    //     location,
    //     key
    //   },
    //   success: (resp) => {
    //     if (resp.statusCode === 200) {
    //       let data = resp.data.HeWeather6[0];
    //       if (data.status === 'ok') {
    //         this.success(data, location);
    //       } else {
    //         wx.showToast({
    //           title: '查询失败',
    //           icon: 'none',
    //         });
    //       }
    //     }
    //   },
    //   fail: () => {
    //     wx.showToast({
    //       title: '查询失败',
    //       icon: 'none',
    //     });
    //   }
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
    console.log(this.cityData);
  },
  getUserInfo: function (e) {
    console.log(e)
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

  // reloadPage() {
  //   // this.setBcgImg()
  //   // this.getCityDatas()
  //   // this.reloadInitSetting()
  //   this.reloadWeather();
  //   // this.reloadGetBroadcast()
  // },

  // init(params, callback) {
  //   wx.getLocation({
  //     success: function (res) {
  //       this.getWeather(`${res.latitude},${res.longitude}`);
  //       console.log(res);
  //       // this.getHourly(`${res.latitude},${res.longitude}`);
  //       callback && callback();
  //     },
  //     fail: (res) => {
  //       this.fail(res);
  //     }
  //   });
  // },
  // reloadWeather() {
  //   this.init({});
  // },
});
