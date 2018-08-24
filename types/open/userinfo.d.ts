// 开放接口-----用户信息
declare namespace wx {
  interface UserInfo {
    /**
     * 用户昵称
     */
    nickName: string;
    /**
     * 用户头像，最后一个数值代表正方形头像大小（
     * 有0、46、64、96、132数值可选，0代表132*132正方形头像），用户没有头像时该项为空。
     * 若用户更换头像，原有头像URL将失效。
     */
    avatarUrl: string;
    /**
     * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
     */
    gender: number;
    /**
     * 用户所在省份
     */
    province: string;
    /**
     * 用户所在城市
     */
    city: string;
    /**
     * 用户所在国家
     */
    country: string;
    /**
     * 用户的语言，简体中文为zh_CN
     */
    language: string;
  }
  interface UserInfoResponse {
    /** 用户信息对象，不包含 openid 等敏感信息 */
    userInfo: UserInfo;
    /** 不包括敏感信息的原始数据字符串，用于计算签名。 */
    rawData: string;
    /** 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。 */
    signature: string;
    /** 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法 */
    encryptData: string;
  }
  interface GetUserInfoOptions extends BaseOptions {
    withCredentials?: boolean; // 是否带上登录态信息
    lang?: string; // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。
    /** 接口调用成功的回调函数 */
    success?(res: UserInfoResponse): void;
  }
  /**
     * 
     * 注意：此接口有调整，使用该接口将不再出现授权弹窗，请使用 
     * `<button open-type="getUserInfo"></button>` 引导用户主动进行授权操作
        - 当用户未授权过，调用该接口将直接报错
        - 当用户授权过，可以使用该接口获取用户信息
     * 注：当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，
     * 此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false
     *  时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。
     * 
```html
<!--wxml-->
<!-- 如果只是展示用户头像昵称，可以使用 <open-data /> 组件 -->
<open-data type="userAvatarUrl"></open-data>
<open-data type="userNickName"></open-data>
<!-- 需要使用 button 来授权登录 -->
<button wx:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
<view wx:else>请升级微信版本</view>
```

```js
//js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
  }
})
```
encryptedData 解密后为以下 json 结构，详见 [加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)

```json
{
    "openId": "OPENID",
    "nickName": "NICKNAME",
    "gender": GENDER,
    "city": "CITY",
    "province": "PROVINCE",
    "country": "COUNTRY",
    "avatarUrl": "AVATARURL",
    "unionId": "UNIONID",
    "watermark":
    {
    	"appid":"APPID",
	"timestamp":TIMESTAMP
    }
}
```
	 */
  function getUserInfo(options: GetUserInfoOptions): void;

  /**
   * 获取微信用户绑定的手机号，需先调用login接口。
   * 因为需要用户主动触发才能发起获取手机号接口，所以该功能不由 API 来调用，需用 <button> 组件的点击来触发。
   * 注意：目前该接口针对非个人开发者，且完成了认证的小程序开放。需谨慎使用，若用户举报较多或被发现在不必要场景下使用，微信有权永久回收该小程序的该接口权限。
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/getPhoneNumber.html
   */
}
