// 第三方平台
declare namespace wx {
    interface GetExtConfigOption extends BaseOptions {
        success?(ret: {
            errMsg: string; extConfig?: any;
        }): void;
    }
	/**
	 * 获取第三方平台自定义的数据字段。
	 */
    function getExtConfig(options: GetExtConfigOption): void;

	/**
	 * 获取第三方平台自定义的数据字段的同步接口。
	 * 暂时无法通过 wx.canIUse 判断是否兼容，开发者需要自行判断 wx.getExtConfigSync 是否存在来兼容
	 */
    function getExtConfigSync(options: GetExtConfigOption): any;
}
