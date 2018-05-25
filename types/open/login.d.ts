// 开放接口-----登陆
// [签名加密](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)
declare namespace wx {
	/**
	 * 登录态维护
	 * 通过 wx.login() 获取到用户登录态之后，需要维护登录态。
	 * 开发者要注意不应该直接把 session_key、openid 等字段作为用户的标识
	 * 或者 session 的标识，而应该自己派发一个 session 登录态（请参考登录时序图）。
	 * 对于开发者自己生成的 session，应该保证其安全性且不应该设置较长的过期时间。
	 * session 派发到小程序客户端之后，可将其存储在 storage ，用于后续通信使用。
	 * 通过wx.checkSession() 检测用户登录态是否失效。并决定是否调用wx.login()
	 * 重新获取登录态
	 */
    interface LoginResponse {
        /** 调用结果 */
        errMsg: string;
		/** 用户允许登录后，回调内容会带上 code（有效期五分钟），
		 * 开发者需要将 code 发送到开发者服务器后台，
		 * 使用code 换取 session_key api，
		 * 将 code 换成 openid 和 session_key
		 */
        code: string;
    }
    interface LoginOptions extends BaseOptions {
        /** 接口调用成功的回调函数 */
        success?(res: LoginResponse): void;
    }

	/**
	 * 调用接口获取登录凭证（code）进而换取用户登录态信息，
	 * 包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）。
	 * 用户数据的加解密通讯需要依赖会话密钥完成。
	 */
    function login(option: LoginOptions): void;
    type CheckSessionOption = BaseOptions;
	/**
	 * 检测当前用户登录态是否有效。
	 * 通过wx.login获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用wx.checkSession接口检测当前用户登录态是否有效。登录态过期后开发者可以再调用wx.login获取新的用户登录态。
	 *
	 * @param {CheckSessionOption} options
	 */
    function checkSession(options: CheckSessionOption): void;
}
