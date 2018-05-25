// 开放接口-----收货地址
declare namespace wx {
    interface ChooseAddressOptions extends BaseOptions {
        success?(res: {
            errMsg: string;	// 调用结果
            userName: string;	// 收货人姓名
            postalCode: string;	// 邮编
            provinceName: string;	// 国标收货地址第一级地址
            cityName: string;	// 国标收货地址第二级地址
            countyName: string;	// 国标收货地址第三级地址
            detailInfo: string;	// 详细收货地址信息
            nationalCode: string;	// 收货地址国家码
            telNumber: string;	// 收货人手机号码
        }): void;
    }
    function chooseAddress(options: ChooseAddressOptions): void;
}