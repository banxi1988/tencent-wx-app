// 开放接口-----收货地址
declare namespace wx {
  interface ChooseAddressResponse extends BaseResponse {
    /**
     *  收货人姓名
     */
    userName: string;
    /**
     *  邮编
     */
    postalCode: string;
    /**
     *  国标收货地址第一级地址
     */
    provinceName: string;
    /**
     *  国标收货地址第二级地址
     */
    cityName: string;
    /**
     *
     *  国标收货地址第三级地址
     */
    countyName: string;
    /**
     *  详细收货地址信息
     */
    detailInfo: string;
    /**
     *  收货地址国家码
     */
    nationalCode: string;
    /**
     *  收货人手机号码
     */
    telNumber: string;
  }
  interface ChooseAddressOptions extends BaseOptions {
    success?(res: ChooseAddressResponse): void;
  }

  /**
   * 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
   * 需要用户授权 scope.address
   * @param options ChooseAddressOptions
   * @since 1.1.0
   */
  function chooseAddress(options: ChooseAddressOptions): void;
}
