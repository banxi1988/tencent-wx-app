// 设备-----蓝牙
declare namespace wx {
  interface OpenBluetoothAdapterOptions extends BaseOptions {
    success(res: any): void;
  }
  /**
	 * 初始化小程序蓝牙模块，生效周期为调用 `wx.openBluetoothAdapter` 至调用
	 * `wx.closeBluetoothAdapter` 或小程序被销毁为止。 在小程序蓝牙适配器模块生效期间，
	 * 开发者可以正常调用下面的小程序API，并会收到蓝牙模块相关的on回调。
	 * 
	 * @tip
	 * 1. 在没有调用 `wx.openBluetoothAdapter` 的情况下调用小程序其它蓝牙模块相关API，
	 *  API会返回错误，错误码为 `10000`
	   2. 在用户蓝牙开关未开启或者手机不支持蓝牙功能的情况下，调用 `wx.openBluetoothAdapter`
	   会返回错误，错误码为 `10001`，表示手机蓝牙功能不可用；此时小程序蓝牙模块已经初始化完成，
	   可通过 `wx.onBluetoothAdapterStateChange` 监听手机蓝牙状态的改变，也可以调用蓝牙模块的所有API。

	 */
  function openBluetoothAdapter(options: OpenBluetoothAdapterOptions): void;

  interface CloseBluetoothAdapterOptions extends BaseOptions {
    success(res: any): void;
  }
  /**
   * 关闭蓝牙模块，使其进入未初始化状态。调用该方法将断开所有已建立的链接并释放系统资源。
   * 建议在使用小程序蓝牙流程后调用，与 `wx.openBluetoothAdapter` 成对调用。
   */
  function closeBluetoothAdapter(options: CloseBluetoothAdapterOptions): void;
  interface BluetoothAdapterState {
    /**
     * 蓝牙适配器是否可用
     */
    available: boolean;
    /**
     * 蓝牙适配器是否处于搜索状态
     */
    discovering: boolean;
  }
  interface BluetoothAdapterStateResponse
    extends BluetoothAdapterState,
      ErrMsgResponse {}

  interface GetBluetoothAdapterStateOptions extends BaseOptions {
    success(res: BluetoothAdapterStateResponse): void;
  }
  /**
   * 获取本机蓝牙适配器状态
   */
  function getBluetoothAdapterState(
    options: GetBluetoothAdapterStateOptions
  ): void;
  /**
   * 监听蓝牙适配器状态变化事件
   */
  function onBluetoothAdapterStateChange(
    callback: (res: BluetoothAdapterState) => void
  ): void;
  interface StartBluetoothDevicesDiscoveryOptions extends BaseOptions {
    /**
     *  是否允许重复上报同一设备， 如果允许重复上报，则 `onDeviceFound` 方法会多次上报同一设备，
     * 但是 RSSI 值会有不同
     */
    allowDuplicatesKey?: boolean;
    /**
     *  上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
     */
    interval?: number;
    success(res: ErrMsgResponse): void;
    /**
     * 蓝牙设备主 service 的 uuid 列表
     * 某些蓝牙设备会广播自己的主 service 的 uuid。如果这里传入该数组，那么根据该 uuid 列表，
     * 只搜索有这个主服务的设备。
     */
    services?: string[];
  }
  /**
   * 开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
   * @example
   * // 以微信硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
   * wx.startBluetoothDevicesDiscovery({
   * 	services: ['FEE7'],
   * 	success: function (res) {
   * 		console.log(res)
   * 	}
   * });
   */
  function startBluetoothDevicesDiscovery(
    options: StartBluetoothDevicesDiscoveryOptions
  ): void;

  interface StopBluetoothDevicesDiscoveryOptions extends BaseOptions {
    success(res: ErrMsgResponse): void;
  }
  /**
   * 停止搜寻附近的蓝牙外围设备。请在确保找到需要连接的设备后调用该方法停止搜索。
   */
  function stopBluetoothDevicesDiscovery(
    options: StopBluetoothDevicesDiscoveryOptions
  ): void;

  /**
   * 蓝牙设备信息
   */
  interface BluetoothDevice {
    /**
     * 蓝牙设备名称，某些设备可能没有
     */
    name: string;
    /**
     * 用于区分设备的 id
     */
    deviceId: string;
    /**
     * int 当前蓝牙设备的信号强度
     */
    RSSI: number;
    /**
     * 当前蓝牙设备的广播数据段中的 `ManufacturerData` 数据段
     * （注意：vConsole 无法打印出 ArrayBuffer 类型数据）
     */
    advertisData: ArrayBuffer;

    /**
     *  当前蓝牙设备的广播数据段中的 `ServiceUUIDs` 数据段
     */
    advertisServiceUUIDs: string[];
    /**
     * 当前蓝牙设备的广播数据段中的 `LocalName` 数据段
     */
    localName: string;

    /**
     * 当前蓝牙设备的广播数据段中的 `ServiceData` 数据段
     */
    serviceData: ArrayBuffer;
  }

  interface GetBluetoothDevicesResponse extends ErrMsgResponse {
    devices: BluetoothDevice[];
  }

  interface GetBluetoothDevicesOptions extends BaseOptions {
    success(res: GetBluetoothDevicesResponse): void;
  }
  /**
   * 获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备
   * @tips 
1. tip: Mac系统可能无法获取 `advertisData` 及 `RSSI`，请使用真机调试
2. tip: 开发者工具和 Android 上获取到的 `deviceId` 为设备 MAC 地址，iOS 上则为设备 `uuid`。
因此deviceId不能硬编码到代码中
3. tip: 注意该接口获取到的设备列表为小程序蓝牙模块生效期间所有搜索到的蓝牙设备，
若在蓝牙模块使用流程结束后未及时调用 wx.closeBluetoothAdapter 释放资源，会存在调用该接口会
返回之前的蓝牙使用流程中搜索到的蓝牙设备，可能设备已经不在用户身边，无法连接。
4. tips: 蓝牙设备在被搜索到时，系统返回的 name 字段一般为广播包中的 `LocalName`字段中的设备名称，
而如果与蓝牙设备建立连接，系统返回的 name 字段会改为从蓝牙设备上获取到的 `GattName`。
若需要动态改变设备名称并展示，建议使用 `localName` 字段
   */
  function getBluetoothDevices(options: GetBluetoothDevicesOptions): void;

  interface OnBluetoothDeviceFoundResponse {
    devices: BluetoothDevice[];
  }

  /**
   * 监听寻找到新设备的事件
   @example
```js
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
wx.onBluetoothDeviceFound(function(devices) {
  console.log('new device list has founded')
  console.dir(devices)
  console.log(ab2hex(devices[0].advertisData))
})
```
  @tips
1. tip: Mac系统可能无法获取advertisData及RSSI，请使用真机调试
2. tip: 开发者工具和 Android 上获取到的deviceId为设备 MAC 地址，iOS 上则为设备 uuid。因此deviceId不能硬编码到代码中
3. tip: 若在onBluetoothDeviceFound回调了某个设备，则此设备会添加到 wx.getBluetoothDevices 接口获取到的数组中

   */
  function onBluetoothDeviceFound(
    callback: (res: OnBluetoothDeviceFoundResponse) => void
  ): void;

  interface ConnectedBluetoothDevice {
    /**
     * 蓝牙设备名称，某些设备可能没有
     */
    name: string;
    /**
     * 用于区分设备的 id
     */
    deviceId: string;
  }

  interface GetConnectedBluetoothDevicesResponse extends ErrMsgResponse {
    devices: ConnectedBluetoothDevice[];
  }

  interface GetConnectedBluetoothDevicesOptions extends BaseOptions {
    services: string[];
    success(res: GetConnectedBluetoothDevicesResponse): void;
  }
  /**
   * 根据 uuid 获取处于已连接状态的设备
   */
  function getConnectedBluetoothDevices(
    options: GetConnectedBluetoothDevicesOptions
  ): void;

  interface CreateBLEConnectionOptions extends BaseOptions {
    deviceId: string; // 蓝牙设备 id，参考 getDevices 接口
    success(res: ErrMsgResponse): void;
  }
  /**
   * 低功耗蓝牙接口
   *
   * 若小程序在之前已有搜索过某个蓝牙设备，并成功建立链接，可直接传入之前搜索获取的 `deviceId`
   * 直接尝试连接该设备，无需进行搜索操作。
1. tip: 安卓手机上如果多次调用create创建连接，有可能导致系统持有同一设备多个连接的实例，导致调用close的时候并不能真正的断开与设备的连接。因此请保证尽量成对的调用create和close接口
2. tip: 蓝牙链接随时可能断开，建议监听 wx.onBLEConnectionStateChange 回调事件，当蓝牙设备断开时按需执行重连操作
3. tip: 若对未连接的设备或已断开连接的设备调用数据读写操作的接口，会返回10006错误，详见错误码，建议进行重连操作
   */
  function createBLEConnection(options: CreateBLEConnectionOptions): void;

  interface CloseBLEConnectionOptions extends BaseOptions {
    /**
     * 蓝牙设备 id，参考 getDevices 接口
     */
    deviceId: string;
    success(res: ErrMsgResponse): void;
  }
  /**
   * 断开与低功耗蓝牙设备的连接
   */
  function closeBLEConnection(options: CloseBLEConnectionOptions): void;

  interface BLEDeviceService {
    /**
     * 蓝牙设备服务的 uuid
     */
    uuid: string;
    /**
     * 该服务是否为主服务
     */
    isPrimary: boolean;
  }

  interface GetBLEDeviceServicesResponse extends ErrMsgResponse {
    services: BLEDeviceService[];
  }

  interface GetBLEDeviceServicesOptions extends BaseOptions {
    /**
     * 蓝牙设备 id，参考 getDevices 接口
     */
    deviceId: string;
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    success(res: GetBLEDeviceServicesResponse): void;
  }
  /**
   * 获取蓝牙设备所有 service（服务）
@example

```js
wx.getBLEDeviceServices({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId: deviceId,
  success: function (res) {
    console.log('device services:', res.services)
  }
})
```
@tips
1. tip:iOS平台上后续对特征值的 `read、write、notify`，由于系统需要获取特征值实例，传入的 
`serviceId` 与 `characteristicId` 必须由 `getBLEDeviceServices` 与 `getBLEDeviceCharacteristics`
 中获取到后才能使用。建议双平台统一在建立链接后先执行 `getBLEDeviceServices` 与 
 `getBLEDeviceCharacteristics` 后再进行与蓝牙设备的数据交互 `BLEDeviceService[]`
   */
  function getBLEDeviceServices(options: GetBLEDeviceServicesOptions): void;

  interface BLEDeviceCharacteristicsProperties {
    /**
     * 该特征值是否支持 read 操作
     */
    read: boolean;
    /**
     * 该特征值是否支持 write 操作
     */
    write: boolean;
    /**
     * 该特征值是否支持 notify 操作
     */
    notify: boolean;
    /**
     * 该特征值是否支持 indicate 操作
     */
    indicate: boolean;
  }
  interface BLEDeviceCharacteristics {
    /**
     * 蓝牙设备特征值的 uuid
     */
    uuid: string;
    /**
     * 该特征值支持的操作类型
     */
    properties: BLEDeviceCharacteristicsProperties[];
  }
  interface GetBLEDeviceCharacteristicsReponse extends ErrMsgResponse {
    characteristics: BLEDeviceCharacteristics[];
  }

  interface GetBLEDeviceCharacteristicsOptions extends BaseOptions {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;
    /**
     * 蓝牙服务 uuid
     */
    serviceId: string;
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    success(res: GetBLEDeviceCharacteristicsReponse): void;
  }
  /**
   * 获取蓝牙设备所有 characteristic（特征值）
   * 
@example
```js
wx.getBLEDeviceCharacteristics({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId: deviceId,
  // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
  serviceId: serviceId,
  success: function (res) {
    console.log('device getBLEDeviceCharacteristics:', res.characteristics)
  }
})
```
@tips
1. tip:传入的 `serviceId` 需要在 `getBLEDeviceServices`获取到
2. tip:iOS平台上后续对特征值的`read、write、notify`，由于系统需要获取特征值实例，传入的 
`serviceId` 与 `characteristicId` 必须由 `getBLEDeviceServices` 与 
`getBLEDeviceCharacteristics` 中获取到后才能使用。建议双平台统一在建立链接后先执行 
`getBLEDeviceServices` 与 `getBLEDeviceCharacteristics` 后再进行与蓝牙设备的数据交互
   */
  function getBLEDeviceCharacteristics(
    options: GetBLEDeviceCharacteristicsOptions
  ): void;

  interface BLECharacteristicValueOptions extends BaseOptions {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;
    /**
     * 蓝牙特征值对应服务的 uuid
     */
    serviceId: string;
    /**
     * 蓝牙特征值的 uuid
     */
    characteristicId: string;
  }

  interface Characteristic {
    /**
     * 蓝牙设备特征值的 uuid
     */
    characteristicId: string;
    /**
     * 蓝牙设备特征值对应服务的 uuid
     */
    serviceId: string;
    /**
     * 蓝牙设备特征值对应的二进制值
     */
    value: ArrayBuffer;
  }

  interface ReadBLECharacteristicValueResponse extends ErrMsgResponse {
    characteristic: Characteristic;
  }

  interface ReadBLECharacteristicValueOptions
    extends BLECharacteristicValueOptions {
    success(res: ReadBLECharacteristicValueResponse): void;
  }
  /**
   * 读取低功耗蓝牙设备的特征值的二进制数据值。
   * 注意：必须设备的特征值支持read才可以成功调用，具体参照 characteristic 的 properties 属性
@tips
1. tip: 并行调用多次读写接口存在读写失败的可能性。
2. tip: read接口读取到的信息需要在 `onBLECharacteristicValueChange` 方法注册的回调中获取。

@example
```js
// 必须在这里的回调才能获取
wx.onBLECharacteristicValueChange(function(characteristic) {
  console.log('characteristic value comed:', characteristic)
})

wx.readBLECharacteristicValue({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  [**new**]
  deviceId: deviceId,
  // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
  serviceId: serviceId,
  // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
  characteristicId: characteristicId,
  success: function (res) {
    console.log('readBLECharacteristicValue:', res.errCode)
  }
})
```
   */
  function readBLECharacteristicValue(
    options: ReadBLECharacteristicValueOptions
  ): void;

  interface WriteBLECharacteristicValueOptions
    extends BLECharacteristicValueOptions {
    value: ArrayBuffer; // 蓝牙设备特征值对应的二进制值
    success(res: ErrMsgResponse): void;
  }
  /**
   * 向低功耗蓝牙设备特征值中写入二进制数据。
   * 注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
   * tips: 并行调用多次读写接口存在读写失败的可能性
   */
  function writeBLECharacteristicValue(
    options: WriteBLECharacteristicValueOptions
  ): void;

  interface NotifyBLECharacteristicValueChangeOptions
    extends BLECharacteristicValueOptions {
    state: boolean; // true: 启用 notify; false: 停用 notify
    success(ret: ErrMsgResponse): void; // 成功则返回本机蓝牙适配器状态
  }
  /**
   * 启用低功耗蓝牙设备特征值变化时的 notify 功能。
   * 注意：必须设备的特征值支持notify才可以成功调用，具体参照 characteristic 的 properties 属性
   * 另外，必须先启用notify才能监听到设备 characteristicValueChange 事件
   */
  function notifyBLECharacteristicValueChange(
    options: NotifyBLECharacteristicValueChangeOptions
  ): void;
  interface OnBLEConnectionStateChangeResponse {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;
    /**
     * 连接目前的状态
     */
    connected: boolean;
  }
  /**
   * 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
   */
  function onBLEConnectionStateChange(
    callback: (res: OnBLEConnectionStateChangeResponse) => void
  ): void;

  interface OnBLECharacteristicValueChangeResponse {
    /**
     * 蓝牙设备 id，参考 device 对象
     */
    deviceId: string;
    /**
     * 特征值所属服务 uuid
     */
    serviceId: string;
    /**
     * 特征值 uuid
     */
    characteristicId: string;
    /**
     * 特征值最新的值
     */
    value: ArrayBuffer;
  }

  /**
   * 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
   */
  function onBLECharacteristicValueChange(
    callback: (res: OnBLECharacteristicValueChangeResponse) => void
  ): void;
}
