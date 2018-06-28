// 位置-----获取位置
declare namespace wx {
  interface LocationData {
    /** 纬度，浮点数，范围为-90~90，负数表示南纬 */
    latitude: number;
    /** 经度，浮点数，范围为-180~180，负数表示西经 */
    longitude: number;
    /** 速度，浮点数，单位m/s */
    speed: number;
    /** 位置的精确度 */
    accuracy: number;
    altitude: number; // 高度，单位 m
    verticalAccuracy: number; // 垂直精度，单位 m（Android 无法获取，返回 0）
    horizontalAccuracy: number; // 水平精度，单位 m
  }

  interface GetLocationOptions extends BaseOptions {
    /** 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标 */
    type?: "wgs84" | "gcj02";
    altitude?: boolean; // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
    /** 接口调用成功的回调函数，返回内容详见返回参数说明。 */
    success?(res: LocationData): void;
  }
  /**
   * 获取当前的地理位置、速度。
   */
  function getLocation(options: GetLocationOptions): void;

  interface ChooseLocationData {
    /**
     * 位置名称
     */
    name: string;
    /**
     * 详细地址
     */
    address: string;
    /**
     * 纬度，浮点数，范围为-90~90，负数表示南纬
     */
    latitude: number;
    /**
     * 经度，浮点数，范围为-180~180，负数表示西经
     */
    longitude: number;
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
  interface OpenLocationOptions extends BaseOptions {
    /** 纬度，范围为-90~90，负数表示南纬 */
    latitude: number;
    /** 经度，范围为-180~180，负数表示西经 */
    longitude: number;
    /** 缩放比例，范围1~28，默认为28 */
    scale?: number;
    /** 位置名 */
    name?: string;
    /** 地址的详细说明 */
    address?: string;
  }
  /**
   * 使用微信内置地图查看位置
   */
  function openLocation(options: OpenLocationOptions): void;
}

// 位置-----地图组件控制
declare namespace wx {
  interface Position {
    longitude: number;
    latitude: number;
  }
  interface GetCenterLocationOptions extends BaseOptions {
    success?(res: Position): void;
  }

  interface TranslateMarkerOptions extends BaseOptions {
    markerId: number; // 指定marker
    destination: Position; // 指定marker移动到的目标点
    autoRotate: boolean; // 移动过程中是否自动旋转marker
    rotate: number; // marker的旋转角度
    duration?: number; // 动画持续时长，默认值1000ms，平移与旋转分别计算
    animationEnd?(): void; // 动画结束回调函数
  }

  interface IncludePointsOptions extends BaseOptions {
    points: Position[]; // 要显示在可视区域内的坐标点列表，[{latitude, longitude}]
    padding?: [number, number, number, number]; // 坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上,右,下,左]，安卓上只能识别数组第一项，上下左右的padding一致。开发者工具暂不支持padding参数。
  }

  interface GetRegionResponse {
    southwest: number; // 西南角的经纬度
    northeast: number; // 东北角的经纬度
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
     * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
     */
    getCenterLocation(options: GetCenterLocationOptions): OpenLocationOptions;
    /**
     * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
     */
    moveToLocation(): void;
    translateMarker(options: TranslateMarkerOptions): void; // 平移marker，带动画
    includePoints(options: IncludePointsOptions): void; // 缩放视野展示所有经纬度
    getRegion(options: GetRegionOptions): void; // 获取当前地图的视野范围
    getScale(options: GetScaleOptions): void; // 获取当前地图的缩放级别
  }
  /**
   * 创建并返回 map 上下文 mapContext 对象
   */
  function createMapContext(mapId: string, _this?: any): MapContext;
}
