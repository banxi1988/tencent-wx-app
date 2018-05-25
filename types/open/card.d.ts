// 开放接口-----卡券
declare namespace wx {
    interface CardExt {
        code?: string	// 参与签名	用户领取的 code，仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写，详情
        openid?: string	// 参与签名	指定领取者的openid，只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。
        timestamp: number;	// 参与签名	时间戳，东八区时间,UTC+8，单位为秒
        nonce_str?: string	// 参与签名	随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。随机字符串，不长于 32 位。推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。
        fixed_begintimestamp?: number;	// 不参与签名	卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。
        outer_str?: string	// 不参与签名	领取渠道参数，用于标识本次领取的渠道值。
        signature: string;	//	签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1，具体签名方案参见：卡券签名
    }
    interface Card {
        cardId: string;
        cardExt: string;
    }
    interface CardOptions extends BaseOptions {
        cardList: Card[];
    }
	/**
	 * 批量添加卡券。
	 */
    function addCard(options: CardOptions): void;
    interface OpenCardOptions extends BaseOptions {
        cardList: {
            cardId: string;
            code: string;
        }[];
    }
	/**
	 * 查看微信卡包中的卡券。
	 *
	 * @param {OpenCardOptions} options
	 */
    function openCard(options: OpenCardOptions): void;
}
