
// Page
declare namespace wx {
    interface Page {
		/**
		 * setData 函数用于将数据从逻辑层发送到视图层，
		 * 同时改变对应的 this.data 的值。
		 * 注意：
		 *    1. 直接修改 this.data 无效，无法改变页面的状态，还会造成数据不一致。
		 *    2. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
		 */
        setData(data: any): void;
        data: any;
    }
	/**
	 * Page() 函数用来注册一个页面。
	 * 接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
	 */
    type PageConstructor = (options: wx.PageOptions) => void;
}
declare var Page: wx.PageConstructor;

// App
declare namespace wx {
    interface App {
		/**
		 * getCurrentPage() 函数用户获取当前页面的实例。
		 * @deprecated
		 */
        getCurrentPage(): Page;
    }
	/**
	 * App() 函数用来注册一个小程序。
	 * 接受一个 object 参数，其指定小程序的生命周期函数等。
	 */
    type AppConstructor = (options: wx.AppOptions) => void;
}

declare namespace wx {
    interface EventTarget {
        id: string;
        tagName: string;
        dataset: { [name: string]: string; };
    }
    interface BaseEvent {
        type: 'tap' | 'touchstart' | 'touchmove' | 'touchcancel' | 'touchend' | 'tap' | 'longtap';
        timeStamp: number;
        currentTarget: EventTarget;
        target: EventTarget;
    }
}

declare namespace wx {
    interface InputEvent extends BaseEvent {
        detail: {
            target: EventTarget;
            value: string;
        };
    }
}

declare namespace wx {
    interface FormEvent extends BaseEvent {
        detail: {
            target: EventTarget;
            value: { [name: string]: string | boolean | number; };
        };
    }
}

declare namespace wx {
    interface Touch {
        identifier: number;
        pageX: number;
        pageY: number;
        clientX: number;
        clientY: number;
    }
    interface TouchEvent extends BaseEvent {
        detail: {
            x: number;
            y: number;
        };
        touches: Touch[];
        changedTouches: Touch[];
    }
}

declare var App: wx.AppConstructor;

/**
 * 我们提供了全局的 getApp() 函数，可以获取到小程序实例。
 */
declare function getApp(): wx.App;

declare function getCurrentPages(): wx.Page[];


declare namespace wx {
    interface DataResponse {
        /** 回调函数返回的内容 */
        data: any;
    }
    interface ErrMsgResponse {
        /** 成功：ok，错误：详细信息 */
        errMsg: 'ok' | string;
    }

    interface ShareMessageResponse{
        shareTickets: string[];
    }

    interface ShareMessage extends BaseOptions {
        title?: string;	// 转发标题	当前小程序名称
        path?: string;	// 转发路径	当前页面 path ，必须是以 / 开头的完整路径
        imageUrl?: string;	// 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。iOS 显示图片长宽比是 5:4，Android 显示图片长宽比是 215:168。高度超出部分会从底部裁剪。推荐使用 Android 图片长宽比，可保证图片在两个平台都完整显示，其中 iOS 底部会出现一小段白色		1.5.0
        success?(res: ShareMessageResponse): void;
    }

    interface PageOptions {
        /** 页面的初始数据 */
        data?: any;
        /** 生命周期函数--监听页面加载 */
        onLoad?(this: Page, options: any): void;
        /** 生命周期函数--监听页面渲染完成 */
        onReady?(this: Page): void;
        /** 生命周期函数--监听页面显示 */
        onShow?(this: Page): void;
        /** 生命周期函数--监听页面隐藏 */
        onHide?(this: Page): void;
        /** 生命周期函数--监听页面卸载 */
        onUnload?(this: Page): void;
        getPhoneNumber?(e: {
            detail: {
                errMsg: string;
                iv: string;
                encryptedData: string;
            }
        }): void;
        onShareAppMessage?(options: {
            from: 'button' | 'menu';	// 转发事件来源。button：页面内转发按钮；menu：右上角转发菜单
            target?: any;	// 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
        }): ShareMessage;
        [key: string]: any;
    }

    interface AppOptions {
		/**
		 * 生命周期函数--监听小程序初始化
		 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
		 */
        onLaunch?(this: App): void;
		/**
		 * 生命周期函数--监听小程序显示
		 * 当小程序启动，或从后台进入前台显示，会触发 onShow
		 */
        onShow?(this: App): void;
		/**
		 * 生命周期函数--监听小程序隐藏
		 * 当小程序从前台进入后台，会触发 onHide
		 */
        onHide?(this: App): void;
        [key: string]: any;
    }

   
}
