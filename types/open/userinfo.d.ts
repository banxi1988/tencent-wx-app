// 开放接口-----用户信息
 declare namespace wx {
    interface UserInfo {
        nickName: string;
        avatarUrl: string;
        gender: number;
        province: string;
        city: string;
        country: string;
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
        withCredentials?: boolean;	// 是否带上登录态信息
        lang?: string;	// 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。
        /** 接口调用成功的回调函数 */
        success?(res: UserInfoResponse): void;
    }
	/**
	 * 获取用户信息，需要先调用 wx.login 接口。
	 * 注：当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息。
	 */
    function getUserInfo(options: GetUserInfoOptions): void;

	/**
	 * 获取微信用户绑定的手机号，需先调用login接口。
	 * 因为需要用户主动触发才能发起获取手机号接口，所以该功能不由 API 来调用，需用 <button> 组件的点击来触发。
	 * 注意：目前该接口针对非个人开发者，且完成了认证的小程序开放。需谨慎使用，若用户举报较多或被发现在不必要场景下使用，微信有权永久回收该小程序的该接口权限。
	 * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/getPhoneNumber.html
	 */
}
