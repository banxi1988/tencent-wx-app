declare namespace wx {
    interface SetTopBarTextOptions extends BaseOptions {
        text: string;	// 置顶栏文字内容
    }
    function setTopBarText(options: SetTopBarTextOptions): void;
}