
// 设备-----拨打电话
declare namespace wx {
    interface MakePhoneCallOptions extends BaseOptions {
		/**
		 * 需要拨打的电话号码
		 */
        phoneNumber: string;
    }
	/**
	 * 拨打电话
	 */
    function makePhoneCall(options: MakePhoneCallOptions): void;
}
