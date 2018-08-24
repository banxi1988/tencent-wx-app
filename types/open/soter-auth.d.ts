// 开放接口-----生物认证
declare namespace wx {
  type AuthModes = "fingerPrint" | "facial" | "speech";
  interface CheckIsSupportSoterAuthenticationResponse extends BaseResponse {
    /**
     * 该设备支持的可被SOTER识别的生物识别方式
     *  其中 facial(人脸识别) 暂未支持,
     *  speech(声纹识别) 暂未支持
     */
    supportMode: AuthModes[];
  }
  interface CheckIsSupportSoterAuthenticationOptions extends BaseOptions {
    success?(res: CheckIsSupportSoterAuthenticationResponse): void;
  }
  /**
   * 获取本机支持的 SOTER 生物认证方式 (Soter 是腾讯的一个生物认证标准)
   * @since 1.5.0
   */
  function checkIsSupportSoterAuthentication(
    options: CheckIsSupportSoterAuthenticationOptions
  ): void;

  interface SoterAuthenticationResultJSON {
    /**
     * 调用者传入的challenge
     */
    raw: string;
    /**
     * （仅Android支持）本次生物识别认证的生物信息编号（如指纹识别则是指纹信息在本设备内部编号）
     */
    fid: string;
    /**
     * 防重放特征参数
     */
    counter: number;
    /**
     * TEE名称（如高通或者trustonic等）
     */
    tee_n: string;
    /**
     * TEE版本号
     */
    tee_v: string;
    /**
     * 指纹以及相关逻辑模块提供商（如FPC等）
     */
    fp_n: string;
    /**
     * 指纹以及相关模块版本号
     */
    fp_v: string;
    /**
     * 机器唯一识别ID
     */
    cpu_id: string;
    /**
     * 概念同Android系统定义uid，即应用程序编号
     */
    uid: string;
  }

  interface StartSoterAuthenticationResponse extends BaseResponse {
    /**
     * 错误码
     */
    errCode: number;
    /**
     * 生物认证方式
     */
    authMode: string;
    /**
     * 在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及
     * 本次认证信息（仅Android支持，本次认证的指纹ID）（仅Android支持，本次认证的指纹ID）
     * 
     * @example SoterAuthenticationResultJSON
```json
{
    "raw":"msg",
    "fid":"2",
    "counter":123,
    "tee_n":"TEE Name",
    "tee_v":"TEE Version",
    "fp_n":"Fingerprint Sensor Name",
    "fp_v":"Fingerprint Sensor Version",
    "cpu_id":"CPU Id",
    "uid":"21"
}
```
     */
    resultJSON: string;
    /**
     *  用SOTER安全密钥对 result_json的签名(SHA256withRSA / PSS, saltlen =
     * 20)
     */
    resultJSONSignature: string;
  }

  interface StartSoterAuthenticationOptions extends BaseOptions {
    /**
     * 请求使用的可接受的生物认证方式
     */
    requestAuthModes: AuthModes[];
    /**
     * 挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键是别信息，将作为
     * `result_json` 的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行
     * 授权确认，则可以将订单号填入此参数。
     */
    challenge: string;
    /**
     * 验证描述，即识别过程中显示在界面上的对话框提示内容
     */
    authContent?: string;
    success?(res: StartSoterAuthenticationResponse): void;
  }
  /**
   * 开始 SOTER 生物认证
   * 详情参考： [SOTER 生物认证 流程](https://developers.weixin.qq.com/miniprogram/dev/api/startSoterAuthentication.html)
   * @since 1.5.0
   * @example
   * 
```js
wx.startSoterAuthentication({
  requestAuthModes: ['fingerPrint'],
  challenge: '123456',
  authContent: '请用指纹解锁',
  success(res) {
  }
})
```
   */
  function startSoterAuthentication(
    options: StartSoterAuthenticationOptions
  ): void;

  interface CheckIsSoterEnrolledInDeviceResponse extends BaseResponse {
    /**
     * 是否已录入信息
     */
    isEnrolled: boolean;
  }

  interface CheckIsSoterEnrolledInDeviceOptions extends BaseOptions {
    /**
     * 认证方式
     */
    checkAuthMode: AuthModes;
    success?(res: CheckIsSoterEnrolledInDeviceResponse): void;
  }
  /**
   * 获取设备内是否录入如指纹等生物信息的接口
   * @since 1.6.0
   * @example
```js
wx.checkIsSoterEnrolledInDevice({
    checkAuthMode: 'fingerPrint',
    success(res) {
        console.log(res.isEnrolled)
    }
})
```
   */
  function checkIsSoterEnrolledInDevice(
    options: CheckIsSoterEnrolledInDeviceOptions
  ): void;
}
