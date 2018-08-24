// 开放接口-----卡券
declare namespace wx {
  interface CardExt {
    /**
     *  参与签名	用户领取的 code，仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写，详情
     */
    code?: string;
    /**
     *  参与签名	指定领取者的openid，只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。
     */
    openid?: string;
    /**
     *  参与签名	时间戳，东八区时间,UTC+8，单位为秒
     */
    timestamp: number;
    /**
     *  参与签名	随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。随机字符串，不长于 32 位。推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。
     */
    nonce_str?: string;
    /**
     *  不参与签名	卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。
     */
    fixed_begintimestamp?: number;
    /**
     *  不参与签名	领取渠道参数，用于标识本次领取的渠道值。
     */
    outer_str?: string;
    /**
     * 	签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1，具体签名方案参见：卡券签名
     */
    signature: string;
  }
  interface Card {
    /**
     * 卡券 Id
     */
    cardId: string;
    /**
     * 卡券的扩展参数
     */
    cardExt: string;
  }
  interface CardResult {
    /**
     * 加密 code，为用户领取到卡券的code加密后的字符串，解密请参照：[code 解码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239)
     */
    code: string;

    /**
     * 用户领取到卡券的Id
     */
    cardId: string;

    /**
     * 用户领取到卡券的扩展参数，与调用时传入的参数相同
     */
    cardExt: string;

    /**
     * 是否成功
     */
    isSuccess: boolean;
  }

  interface AddCardResponse {
    cardList: CardResult[];
  }
  interface CardOptions extends BaseOptions {
    /**
     * 需要添加的卡券列表，
     */
    cardList: Card[];
    success(res: AddCardResponse): void;
  }
  /**
   * 批量添加卡券。
   */
  function addCard(options: CardOptions): void;

  interface OpenCardItem {
    /**
     * 需要打开的卡券 Id
     */
    cardId: string;
    /**
     * 由 addCard 的返回对象中的加密 code 通过解密后得到
     * 解密请参照：[code 解码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239)
     */
    code: string;
  }

  interface OpenCardOptions extends BaseOptions {
    cardList: OpenCardItem[];
  }
  /**
   * 查看微信卡包中的卡券。
   */
  function openCard(options: OpenCardOptions): void;
}
