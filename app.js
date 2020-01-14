//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var _this = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        _this.globalData.isIPX = res.model.indexOf('iPhone X') > -1 || res.model.indexOf('iPhone 11') > -1;
      }
    })
  },
  globalData: {
    keepscreenon: false,
    systeminfo: {},
    isIPX: false,
    weatherTxtMap: {
      100: "qing", // 晴
      101: "duoyun", // 多云
      102: "duoyun", // 少云
      103: "duoyun", // 晴间多云
      104: "yin", // 阴
      200: "fengxiang", // 有风
      201: "fengxiang", // 平静
      202: "fengxiang", // 微风
      203: "fengxiang", // 和风
      204: "fengxiang", // 清风
      205: "fengxiang", // 强风/劲风
      206: "fengxiang", // 疾风
      207: "fengxiang", // 大风
      208: "fengxiang", // 烈风
      209: "fengxiang", // 风暴
      210: "fengxiang", // 狂暴风
      211: "fengxiang", // 飓风
      212: "fengxiang", // 龙卷风
      213: "fengxiang", // 热带风暴
      300: "zhenyu", // 阵雨
      301: "zhenyu", // 强阵雨
      302: "leizhenyu", // 雷阵雨
      303: "leizhenyu", // 强雷阵雨
      304: "leiyunbingbao", // 雷阵雨伴有冰雹
      305: "xiaoyu", // 小雨
      306: "zhongyu", // 中雨
      307: "dayu", // 大雨
      308: "baoyu", // 极端降雨
      309: "yu", // 细雨
      310: "baoyu", // 暴雨
      311: "tedabaoyu", // 大暴雨
      312: "tedabaoyu", // 特大暴雨
      313: "dongyu", // 冻雨
      314: "xiaoyuzhuanzhongyu", // 小到中雨
      315: "zhongyuzhuandayu",// 中到大雨
      316: "dayuzhuanbaoyu",// 大到暴雨
      317: "dayuzhuantedabaoyu",// 暴雨到大暴雨
      318: "da",// 大暴雨到特大暴雨
      399: "yu",// 雨
      400: "xiaoxue",// 小雪
      401: "zhongxue",// 中雪
      402: "daxue",// 大雪
      403: "baoxue",// 暴雪
      404: "yujiaxue",// 雨夹雪
      405: "yujiaxue",// 雨雪天气
      406: "yujiaxue",// 阵雨夹雪
      407: "zhenxue",// 阵雪
      408: "xiaoxuezhuanzhongxue",// 小到中雪
      409: "zhongxuezhuandaxue",// 中到大雪
      410: "daxuezhuanbaoxue",// 大到暴雪
      499: "xue",// 雪
      500: "wu",// 薄雾
      501: "wu",// 雾
      502: "wu",// 霾
      503: "yangsha",// 扬沙
      504: "fuchen",// 浮尘
      507: "shachenbao",// 沙尘暴
      508: "tedashachenbao",// 强沙尘暴
      509: "wu",// 浓雾
      510: "wu",// 强浓雾
      511: "wumai",// 中度霾
      512: "wumai",// 重度霾
      513: "wumai",// 严重霾
      514: "wu",// 大雾
      515: "wu",// 特强浓雾
      900: "",// 热
      901: "",// 冷
      999: ""// 未知

    },
    height: 0,
    key: '04e28e74a3394e928d84e16104c77ac1',
    requestUrl: {
      weather: 'https://free-api.heweather.com/s6/weather',
      hourly: 'https://free-api.heweather.com/s6/weather/hourly',
    },
  }
})