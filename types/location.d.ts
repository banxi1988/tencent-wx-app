// 位置-----获取位置
declare namespace wx {
  interface Position {
    /**
     * 纬度，浮点数，范围为`-90~90`，负数表示南纬
     */
    latitude: number;

    /**
     * 经度，浮点数，范围为`-180~180`，负数表示西经
     */
    longitude: number;
  }

  interface LocationData extends Position {
    /**
     * 速度，浮点数，单位 `m/s`
     */
    speed: number;

    /**
     * 位置的精确度
     */
    accuracy: number;

    /**
     * 高度，单位 m
     */
    altitude: number;

    /**
     * 垂直精度，单位 m（Android 无法获取，返回 0）
     */
    verticalAccuracy: number;

    /**
     * 水平精度，单位 m
     */
    horizontalAccuracy: number;
  }

  interface GetLocationOptions extends BaseOptions {
    /**
     * 默认为 `wgs84` 返回 gps 坐标，`gcj02` 返回可用于 `wx.openLocation` 的坐标
     */
    type?: "wgs84" | "gcj02";

    /**
     * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
     */
    altitude?: boolean;

    success?(res: LocationData): void;
  }
  /**
   * 获取当前的地理位置、速度。
   * 当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
   *
   * bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息
   */
  function getLocation(options: GetLocationOptions): void;

  interface ChooseLocationData extends Position {
    /**
     * 位置名称
     */
    name: string;

    /**
     * 详细地址
     */
    address: string;
  }

  interface ChooseLocationOptions extends BaseOptions {
    success?(res: ChooseLocationData): void;
  }
  /**
   * 打开地图选择位置
   */
  function chooseLocation(options: ChooseLocationOptions): void;
}

// 位置-----查看位置
declare namespace wx {
  interface OpenLocationOptions extends BaseOptions, Position {
    /**
     * 缩放比例，范围 `1~28`，默认为 28
     * @default 28
     */
    scale?: number;

    /**
     * 位置名
     */
    name?: string;

    /**
     * 地址的详细说明
     */
    address?: string;
  }

  /**
   * 使用微信内置地图查看位置
   */
  function openLocation(options: OpenLocationOptions): void;
}

// 位置-----地图组件控制
declare namespace wx {
  interface GetCenterLocationOptions extends BaseOptions {
    success?(res: Position): void;
  }

  interface TranslateMarkerOptions {
    /**
     * 指定marker
     */
    markerId: number;

    /**
     * 指定marker移动到的目标点
     */
    destination: Position;

    /**
     * 移动过程中是否自动旋转marker
     */
    autoRotate: boolean;

    /**
     *  marker的旋转角度
     */
    rotate: number;

    /**
     * 动画持续时长，默认值1000ms，平移与旋转分别计算
     */
    duration?: number;

    /**
     * 动画结束回调函数
     */
    animationEnd?(): void;

    /**
     * 接口调用失败的回调函数
     */
    fail?(): void;
  }

  interface IncludePointsOptions {
    /**
     * 要显示在可视区域内的坐标点列表，[{latitude, longitude}]
     */
    points: Position[];

    /**
     * 坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上,右,下,左]，安卓上只能识别数组
     * 第一项，上下左右的 `padding`一致。开发者工具暂不支持 `padding` 参数。
     */
    padding?: [number, number, number, number];
  }

  interface GetRegionResponse {
    /**
     * 西南角的经纬度
     */
    southwest: number;

    /**
     * 东北角的经纬度
     */
    northeast: number;
  }

  interface GetRegionOptions extends BaseOptions {
    success?(res: GetRegionResponse): void;
  }

  interface GetScaleResponse {
    scale: number;
  }

  interface GetScaleOptions extends BaseOptions {
    success?(res: GetScaleResponse): void;
  }

  /**
   * mapContext 通过 mapId 跟一个 <map/> 组件绑定，通过它可以操作对应的 <map/> 组件。
   */
  interface MapContext {
    /**
     * 获取当前地图中心的经纬度，返回的是 `gcj02` 坐标系，可以用于 `wx.openLocation`
     */
    getCenterLocation(options: GetCenterLocationOptions): void;

    /**
     * 将地图中心移动到当前定位点，需要配合 `map`组件的 `show-location` 使用
     */
    moveToLocation(): void;

    /**
     * 平移 `marker`，带动画
     * @since 1.2.0
     */
    translateMarker(options: TranslateMarkerOptions): void;

    /**
     * 缩放视野展示所有经纬度
     * @since 1.2.0
     */
    includePoints(options: IncludePointsOptions): void;

    /**
     * 获取当前地图的视野范围
     * @since 1.4.0
     */
    getRegion(options: GetRegionOptions): void;

    /**
     * 获取当前地图的缩放级别
     * @since 1.4.0
     */
    getScale(options: GetScaleOptions): void;
  }
  /**
   * 创建并返回 map 上下文 mapContext 对象
   * 在自定义组件下，第二个参数传入组件实例this，以操作组件内 <map/> 组件
   @example

```html
<!-- map.wxml -->
<map id="myMap" show-location />

<button type="primary" bindtap="getCenterLocation">获取位置</button>
<button type="primary" bindtap="moveToLocation">移动位置</button>
<button type="primary" bindtap="translateMarker">移动标注</button>
<button type="primary" bindtap="includePoints">缩放视野展示所有经纬度</button>
```


```js
// map.js
Page({
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:23.10229,
        longitude:113.3345211,
      }, {
        latitude:23.00229,
        longitude:113.3345211,
      }]
    })
  }
})
```
   */
  function createMapContext(
    mapId: string,
    componentInstance?: object
  ): MapContext;
}
