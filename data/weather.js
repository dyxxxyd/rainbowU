let weather = [{
  "HeWeather6": [
    {
      "basic": {
        "cid": "CN101010100",
        "location": "北京",
        "parent_city": "北京",
        "admin_area": "北京",
        "cnty": "中国",
        "lat": "39.90498734",
        "lon": "116.4052887",
        "tz": "+8.00"
      },
      "update": {
        "loc": "2019-12-12 12:33",
        "utc": "2019-12-12 04:33"
      },
      "status": "ok",
      "now": {
        "cloud": "0",
        "cond_code": "100",
        "cond_txt": "晴",
        "fl": "-3",
        "hum": "19",
        "pcpn": "0.0",
        "pres": "1024",
        "tmp": "2",
        "vis": "16",
        "wind_deg": "238",
        "wind_dir": "西南风",
        "wind_sc": "3",
        "wind_spd": "15"
      }
    }
  ]
}];

module.exports = {
  weather: weather
}