// 拓展接口
declare namespace wx {
	/**
	 * 将 ArrayBuffer 数据转成 Base64 字符串
	 */
    function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
	/**
	 * 将 Base64 字符串转成 ArrayBuffer 数据
	 */
    function base64ToArrayBuffer(base64: string): ArrayBuffer;
}

declare namespace wx {
	/**
	 * 收起键盘。
	 */
    function hideKeyboard(): void;
}