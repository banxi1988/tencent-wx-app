// 开放接口-----生物认证
declare namespace wx {
    type AuthModes = 'fingerPrint' | 'facial' | 'speech';
    interface CheckIsSupportSoterAuthenticationOptions extends BaseOptions {
        success?(res: {
            supportMode: AuthModes[];	// 该设备支持的可被SOTER识别的生物识别方式
            errMsg: string;	// 接口调用结果
        }): void;
    }
	/**
	 * 获取本机支持的 SOTER 生物认证方式
	 */
    function checkIsSupportSoterAuthentication(options: CheckIsSupportSoterAuthenticationOptions): void;
    interface StartSoterAuthenticationOptions extends BaseOptions {
        requestAuthModes: AuthModes[];	// 请求使用的可接受的生物认证方式
        challenge: string;		// 挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键是别信息，将作为result_json的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行授权确认，则可以将订单号填入此参数。
        authContent?: string;	// 验证描述，即识别过程中显示在界面上的对话框提示内容
        success?(res: {
            errCode: number;	// 错误码
            authMode: string;	// 生物认证方式
            resultJSON: string;	// 在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）（仅Android支持，本次认证的指纹ID）
            resultJSONSignature: string;	// 用SOTER安全密钥对result_json的签名(SHA256withRSA / PSS, saltlen = 20)
            errMsg: string;	// 接口调用结果
        }): void;
    }
	/**
	 * 开始 SOTER 生物认证
	 */
    function startSoterAuthentication(options: StartSoterAuthenticationOptions): void;

    interface CheckIsSoterEnrolledInDeviceOptions extends BaseOptions {
        checkAuthMode: AuthModes;	// 认证方式
        success?(res: {
            isEnrolled: boolean;	// 是否已录入信息
            errMsg: string;	// 接口调用结果
        }): void;
    }
	/**
	 * 获取设备内是否录入如指纹等生物信息的接口
	 */
    function checkIsSoterEnrolledInDevice(options: CheckIsSoterEnrolledInDeviceOptions): void;
}
