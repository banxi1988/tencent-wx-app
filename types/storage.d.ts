// 数据缓存
declare namespace wx {
    interface SetStorageOptions extends BaseOptions {
        /** 本地缓存中的指定的 key */
        key: string;
        /** 需要存储的内容 */
        data: any | string;
    }
	/**
	 * 将数据存储在本地缓存中指定的 key 中，
	 * 会覆盖掉原来该 key 对应的内容，这是一个异步接口。
	 */
    function setStorage(options: SetStorageOptions): void;
	/**
	 * 将 data 存储在本地缓存中指定的 key 中，
	 * 会覆盖掉原来该 key 对应的内容，这是一个同步接口。
	 *
	 * @param {string} key 本地缓存中的指定的 key
	 * @param {(Object | string)} data 需要存储的内容
	 */
    function setStorageSync(key: string, data: any | string): void;

    interface GetStorageOptions extends BaseOptions {
        /** 本地缓存中的指定的 key */
        key: string;
        /** 接口调用的回调函数,res = {data: key对应的内容} */
        success(res: DataResponse): void;
    }
	/**
	 * 从本地缓存中异步获取指定 key 对应的内容。
	 */
    function getStorage(options: GetStorageOptions): void;

	/**
	 * 从本地缓存中同步获取指定 key 对应的内容。
	 *
	 * @param {string} key
	 * @returns {(Object | string)}
	 */
    function getStorageSync(key: string): any | string;

    interface StorageInfo {
		/**
		 * 当前storage中所有的key
		 */
        keys: string[];
		/**
		 * 当前占用的空间大小, 单位kb
		 */
        currentSize: number;
		/**
		 * 限制的空间大小，单位kb
		 */
        limitSize: number;
    }
    interface GetStorageInfoOptions extends BaseOptions {
        success(res: StorageInfo): void;
    }
	/**
	 * 异步获取当前storage的相关信息
	 */
    function getStorageInfo(options: GetStorageInfoOptions): void;
    function getStorageInfoSync(): GetStorageInfoOptions;
    interface RemoveStorageOptions extends BaseOptions {
        key: string;
        success?(res: DataResponse): void;
    }
    function removeStorage(options: RemoveStorageOptions): void;
    function removeStorageSync(key: string): DataResponse;

	/**
	 * 清理本地数据缓存。
	 */
    function clearStorage(): void;
	/**
	 * 同步清理本地数据缓存
	 */
    function clearStorageSync(): void;
}