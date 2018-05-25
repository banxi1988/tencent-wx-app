
// 设备-----iBeacon
declare namespace wx {
    interface StartBeaconOptions extends BaseOptions {
        uuids: string[];	// iBeacon设备广播的 uuids
        success?(ret: { errMsg: string; }): void;
    }
	/**
	 * 开始搜索附近的iBeacon设备
	 */
    function startBeaconDiscovery(options: StartBeaconOptions): void;

    interface StopBeaconOptions extends BaseOptions {
        success?(ret: { errMsg: string; }): void;
    }
	/**
	 * 停止搜索附近的iBeacon设备
	 */
    function stopBeaconDiscovery(options: StopBeaconOptions): void;

    interface Beacon {
        uuid?: string;	// iBeacon 设备广播的 uuid
        major?: string;	// iBeacon 设备的主 id
        minor?: string;	// iBeacon 设备的次 id
        proximity: number;	// 表示设备距离的枚举值
        accuracy: number;	// iBeacon 设备的距离
        rssi: number;	// 表示设备的信号强度
    }

    interface GetBeaconOptions extends BaseOptions {
        success?(ret: { beacons: Beacon[]; errMsg?: string; }): void;
    }
	/**
	 * 获取所有已搜索到的iBeacon设备
	 */
    function getBeacons(options: GetBeaconOptions): void;

    function onBeaconUpdate(callback: (beacons: Beacon[]) => void): void;
    function onBeaconServiceChange(callback: (res: {
        available: boolean;
        discovering: boolean;
    }) => void): void;
}
