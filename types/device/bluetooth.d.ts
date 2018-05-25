// 设备-----蓝牙
declare namespace wx {
    interface OpenBluetoothAdapterOptions extends BaseOptions {
        success(res: any): void;
    }
	/**
	 * 初始化蓝牙适配器
	 */
    function openBluetoothAdapter(options: OpenBluetoothAdapterOptions): void;
    interface CloseBluetoothAdapterOptions extends BaseOptions {
        success(res: any): void;
    }
	/**
	 * 关闭蓝牙模块。调用该方法将断开所有已建立的链接并释放系统资源
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
    interface BluetoothAdapterStateData extends ErrMsgResponse {
		/**
		 * 蓝牙适配器信息
		 */
        adapterState: BluetoothAdapterState;
    }
    interface GetBluetoothAdapterStateOptions extends BaseOptions {
        success(res: BluetoothAdapterStateData): void;
    }
	/**
	 * 获取本机蓝牙适配器状态
	 */
    function getBluetoothAdapterState(options: GetBluetoothAdapterStateOptions): void;
	/**
	 * 监听蓝牙适配器状态变化事件
	 */
    function onBluetoothAdapterStateChange(callback: (res: BluetoothAdapterState) => void): void;
    interface StartBluetoothDevicesDiscoveryOptions extends BaseOptions {
        allowDuplicatesKey?: boolean;	// 是否允许重复上报同一设备， 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
        interval?: number;	// 上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
        success(res: ErrMsgResponse): void;
		/**
		 * 蓝牙设备主 service 的 uuid 列表
		 * 某些蓝牙设备会广播自己的主 service 的 uuid。如果这里传入该数组，那么根据该 uuid 列表，只搜索有这个主服务的设备。
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
    function startBluetoothDevicesDiscovery(options: StartBluetoothDevicesDiscoveryOptions): void;
    interface StopBluetoothDevicesDiscoveryOptions extends BaseOptions {
        success(res: ErrMsgResponse): void;
    }
	/**
	 * 停止搜寻附近的蓝牙外围设备。请在确保找到需要连接的设备后调用该方法停止搜索。
	 */
    function stopBluetoothDevicesDiscovery(options: StopBluetoothDevicesDiscoveryOptions): void;

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
		 * 当前蓝牙设备的广播内容
		 */
        advertisData: ArrayBuffer;
        advertisServiceUUIDs: string[];	// 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段
        localName: string;	//	当前蓝牙设备的广播数据段中的LocalName数据段
    }

    interface GetBluetoothDevicesResponse extends ErrMsgResponse {
        devices: BluetoothDevice[];
    }

    interface GetBluetoothDevicesOptions extends BaseOptions {
        success(res: GetBluetoothDevicesResponse): void;
    }
	/**
	 * 获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备
	 */
    function getBluetoothDevices(options: GetBluetoothDevicesOptions): void;
	/**
	 * 监听寻找到新设备的事件
	 */
    function onBluetoothDeviceFound(callback: (res: {
        devices: BluetoothDevice[];
    }) => void): void;

    interface GetConnectedBluetoothDevicesResponse extends ErrMsgResponse {
        devices: BluetoothDevice[];
    }

    interface GetConnectedBluetoothDevicesOptions extends BaseOptions {
        services: string[];
        success(res: GetConnectedBluetoothDevicesResponse): void;
    }
	/**
	 * 根据 uuid 获取处于已连接状态的设备
	 */
    function getConnectedBluetoothDevices(options: GetConnectedBluetoothDevicesOptions): void;

    interface CreateBLEConnectionOptions extends BaseOptions {
        deviceId: string;	// 蓝牙设备 id，参考 getDevices 接口
        success(res: ErrMsgResponse): void;
    }
	/**
	 * 低功耗蓝牙接口
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

    interface GetBLEDeviceServicesResponse extends ErrMsgResponse {
        services: Array<{
            uuid: string;
            isPrimary: boolean;
        }>;
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
	 */
    function getBLEDeviceServices(options: GetBLEDeviceServicesOptions): void;

    interface GetBLEDeviceCharacteristicsReponse extends ErrMsgResponse {
        characteristics: Array<{
            uuid: string;
            properties: Array<{
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
            }>;
        }>;
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
	 */
    function getBLEDeviceCharacteristics(options: GetBLEDeviceCharacteristicsOptions): void;

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

    interface ReadBLECharacteristicValueOptions extends BLECharacteristicValueOptions {
        success(res: ReadBLECharacteristicValueResponse): void;
    }
	/**
	 * 读取低功耗蓝牙设备的特征值的二进制数据值。
	 * 注意：必须设备的特征值支持read才可以成功调用，具体参照 characteristic 的 properties 属性
	 */
    function readBLECharacteristicValue(options: ReadBLECharacteristicValueOptions): void;

    interface WriteBLECharacteristicValueOptions extends BLECharacteristicValueOptions {
        value: ArrayBuffer;	// 蓝牙设备特征值对应的二进制值
        success(res: ErrMsgResponse): void;
    }
	/**
	 * 向低功耗蓝牙设备特征值中写入二进制数据。
	 * 注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
	 * tips: 并行调用多次读写接口存在读写失败的可能性
	 */
    function writeBLECharacteristicValue(options: WriteBLECharacteristicValueOptions): void;

    interface NotifyBLECharacteristicValueChangeOptions extends BLECharacteristicValueOptions {
        state: boolean;	// true: 启用 notify; false: 停用 notify
        success(ret: ErrMsgResponse): void;	// 成功则返回本机蓝牙适配器状态
    }
	/**
	 * 启用低功耗蓝牙设备特征值变化时的 notify 功能。
	 * 注意：必须设备的特征值支持notify才可以成功调用，具体参照 characteristic 的 properties 属性
	 * 另外，必须先启用notify才能监听到设备 characteristicValueChange 事件
	 */
    function notifyBLECharacteristicValueChange(options: NotifyBLECharacteristicValueChangeOptions): void;
	/**
	 * 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
	 */
    function onBLEConnectionStateChange(callback: (res: {
		/**
		 * 蓝牙设备 id，参考 device 对象
		 */
        deviceId: string;
		/**
		 * 连接目前的状态
		 */
        connected: boolean;
    }) => void): void;
	/**
	 * 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
	 */
    function onBLECharacteristicValueChange(callback: (
        res: {
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
    ) => void): void;
}
