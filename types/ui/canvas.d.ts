// 界面-----绘图
declare namespace wx {
    interface CanvasAction {
        method: string;
        data: CanvasAction[] | Array<number | string>;
    }
    type LineCapType = 'butt' | 'round' | 'square';
    type LineJoinType = 'bevel' | 'round' | 'miter';
	/**
	 * context只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
	 */
    interface CanvasContext {
        /** 获取当前context上存储的绘图动作(不推荐使用) */
        getActions(): CanvasAction[];
        /** 清空当前的存储绘图动作(不推荐使用) */
        clearActions(): void;
		/**
		 * 对横纵坐标进行缩放
		 * 在调用scale方法后，之后创建的路径其横纵坐标会被缩放。
		 * 多次调用scale，倍数会相乘。
		 *
		 * @param {number} scaleWidth 横坐标缩放的倍数
		 * @param {number} scaleHeight 纵坐标轴缩放的倍数
		 */
        scale(scaleWidth: number, scaleHeight?: number): void;
		/**
		 * 对坐标轴进行顺时针旋转
		 * 以原点为中心，原点可以用 translate方法修改。
		 * 顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
		 *
		 * @param {number} rotate 旋转角度，以弧度计。
		 */
        rotate(rotate: number): void;
		/**
		 * 对坐标原点进行缩放
		 * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
		 *
		 * @param {number} x 水平坐标平移量
		 * @param {number} y 竖直坐标平移量
		 */
        translate(x: number, y: number): void;
		/**
		 * 保存当前的绘图上下文。
		 */
        save(): void;
		/**
		 * 恢复之前保存的绘图上下文。
		 */
        restore(): void;
		/**
		 * 在给定的矩形区域内，清除画布上的像素
		 * 清除画布上在该矩形区域内的内容。
		 *
		 * @param {number} x 矩形区域左上角的x坐标
		 * @param {number} y 矩形区域左上角的y坐标
		 * @param {number} width 矩形区域的宽度
		 * @param {number} height 矩形区域的高度
		 */
        clearRect(x: number, y: number, width: number, height: number): void;
		/**
		 * 在画布上绘制被填充的文本
		 *
		 * @param {string} text 在画布上输出的文本
		 * @param {number} x 绘制文本的左上角x坐标位置
		 * @param {number} y 绘制文本的左上角y坐标位置
		 */
        fillText(text: string, x: number, y: number): void;
		/**
		 * 用于设置文字的对齐
		 *
		 * @param {('left' | 'center' | 'right')} align
		 *
		 * @memberOf CanvasContext
		 */
        setTextAlign(align: 'left' | 'center' | 'right'): void;
		/**
		 * 绘制图像，图像保持原始尺寸。
		 *
		 * @param {string} imageResource 所要绘制的图片资源。 通过chooseImage得到一个文件路径或者一个项目目录内的图片
		 * @param {number} x 图像左上角的x坐标
		 * @param {number} y 图像左上角的y坐标
		 * @param {number} width 图像宽度
		 * @param {number} height 图像高度
		 *
		 * @memberOf CanvasContext
		 */
        drawImage(imageResource: string, x: number, y: number, width: number, height: number): void;
		/**
		 * 设置全局画笔透明度。
		 *
		 * @param {number} alpha 0~1	透明度，0 表示完全透明，1 表示完全不透明
		 *
		 * @memberOf CanvasContext
		 */
        setGlobalAlpha(alpha: number): void;
		/**
		 * 对当前路径进行填充
		 */
        fill(): void;
		/**
		 * 对当前路径进行描边
		 */
        stroke(): void;
		/**
		 * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
		 * Tip: 在最开始的时候相当于调用了一次 beginPath()。
		 * Tip: 同一个路径内的多次setFillStyle、setStrokeStyle、setLineWidth等设置，
		 * 以最后一次设置为准。
		 */
        beginPath(): void;
		/**
		 * 关闭一个路径
		 * Tip: 关闭路径会连接起点和终点。
		 * Tip: 如果关闭路径后没有调用 fill() 或者 stroke() 并开启了新的路径，那之前的路径将不会被渲染。
		 */
        closePath(): void;
		/**
		 * 把路径移动到画布中的指定点，但不创建线条。
		 *
		 * @param {number} x 目标位置的x坐标
		 * @param {number} y 目标位置的y坐标
		 */
        moveTo(x: number, y: number): void;
		/**
		 * 在当前位置添加一个新点，然后在画布中创建从该点到最后指定点的路径。
		 *
		 * @param {number} x 目标位置的x坐标
		 * @param {number} y 目标位置的y坐标
		 */
        lineTo(x: number, y: number): void;
		/**
		 * 添加一个矩形路径到当前路径。
		 *
		 * @param {number} x 矩形路径左上角的x坐标
		 * @param {number} y 矩形路径左上角的y坐标
		 * @param {number} width 矩形路径的宽度
		 * @param {number} height 矩形路径的高度
		 */
        rect(x: number, y: number, width: number, height: number): void;

		/**
		 * 填充一个矩形。
		 * Tip: 用 setFillStyle() 设置矩形的填充色，如果没设置默认是黑色。
		 * @param {number} x 矩形路径左上角的x坐标
		 * @param {number} y 矩形路径左上角的y坐标
		 * @param {number} width 矩形路径的宽度
		 * @param {number} height 矩形路径的高度
		 *
		 * @memberOf CanvasContext
		 */
        fillRect(x: number, y: number, width: number, height: number): void;
		/**
		 * 画一个矩形(非填充)。
		 * Tip: 用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。
		 * @param {number} x 矩形路径左上角的x坐标
		 * @param {number} y 矩形路径左上角的y坐标
		 * @param {number} width 矩形路径的宽度
		 * @param {number} height 矩形路径的高度
		 *
		 * @memberOf CanvasContext
		 */
        strokeRect(x: number, y: number, width: number, height: number): void;
		/**
		 * 添加一个弧形路径到当前路径，顺时针绘制。
		 *
		 * @param {number} x 圆的x坐标
		 * @param {number} y 圆的y坐标
		 * @param {number} radius 圆的半径
		 * @param {number} startAngle 起始弧度，单位弧度（在3点钟方向）
		 * @param {number} endAngle 终止弧度
		 * @param {boolean} counterclockwise 指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
		 */
        arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
		/**
		 * 创建二次方贝塞尔曲线
		 *
		 * @param {number} cpx 贝塞尔控制点的x坐标
		 * @param {number} cpy 贝塞尔控制点的y坐标
		 * @param {number} x 结束点的x坐标
		 * @param {number} y 结束点的y坐标
		 */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
		/**
		 * 创建三次方贝塞尔曲线
		 *
		 * @param {number} cp1x 第一个贝塞尔控制点的 x 坐标
		 * @param {number} cp1y 第一个贝塞尔控制点的 y 坐标
		 * @param {number} cp2x 第二个贝塞尔控制点的 x 坐标
		 * @param {number} cp2y 第二个贝塞尔控制点的 y 坐标
		 * @param {number} x 结束点的x坐标
		 * @param {number} y 结束点的y坐标
		 */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
		/**
		 * 设置填充样式
		 *
		 * @param {string} color 设置为填充样式的颜色。'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
		 */
        setFillStyle(color: string): void;
		/**
		 * 设置线条样式
		 *
		 * @param {string} color 设置为填充样式的颜色。'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
		 */
        setStrokeStyle(color: string): void;
		/**
		 * 设置阴影
		 *
		 * @param {number} offsetX 阴影相对于形状在水平方向的偏移
		 * @param {number} offsetY 阴影相对于形状在竖直方向的偏移
		 * @param {number} blur 阴影的模糊级别，数值越大越模糊 0~100
		 * @param {string} color 阴影的颜色。 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
		 */
        setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;

		/**
		 * 创建一个线性的渐变颜色。
		 * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
		 * @param {number} x0 起点的x坐标
		 * @param {number} y0 起点的y坐标
		 * @param {number} x1 终点的x坐标
		 * @param {number} y1 终点的y坐标
		 *
		 * @memberOf CanvasContext
		 */
        createLinearGradient(x0: number, y0: number, x1: number, y1: number): void;

		/**
		 * 创建一个颜色的渐变点。
		 * Tip: 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。
		 * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
		 * @param {number} stop (0-1)	表示渐变点在起点和终点中的位置
		 * @param {string} color 渐变点的颜色
		 *
		 * @memberOf CanvasContext
		 */
        addColorStop(stop: number, color: string): void;

		/**
		 * 创建一个圆形的渐变颜色。
		 *
		 * @param {number} x 圆心的x坐标
		 * @param {number} y 圆心的y坐标
		 * @param {number} r 圆的半径
		 *
		 * @memberOf CanvasContext
		 */
        createCircularGradient(x: number, y: number, r: number): void;
		/**
		 * 设置字体大小
		 *
		 * @param {number} fontSize 字体的字号
		 */
        setFontSize(fontSize: number): void;
		/**
		 * 设置线条端点的样式
		 *
		 * @param {LineCapType} lineCap 线条的结束端点样式。 'butt'、'round'、'square'
		 */
        setLineCap(lineCap: LineCapType): void;
		/**
		 * 设置两线相交处的样式
		 *  @param {LineJoinType} lineJoin 两条线相交时，所创建的拐角类型
		 */
        setLineJoin(lineJoin: LineJoinType): void;
		/**
		 * 设置线条宽度
		 *
		 * @param {number} lineWidth 线条的宽度
		 */
        setLineWidth(lineWidth: number): void;
		/** 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。
		 * 当 setLineJoin为 miter 时才有效。
		 * 超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
		 *
		 * @param {number} miterLimit 最大斜接长度
		 */
        setMiterLimit(miterLimit: number): void;
		/**
		 * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
		 * Tip: 绘图上下文需要由 wx.createCanvasContext(canvasId) 来创建。
		 * @param {boolean} [reserve] 非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false
		 *
		 * @memberOf CanvasContext
		 */
        draw(reserve?: boolean): void;
    }
	/**
	 * 创建并返回绘图上下文context对象。
	 * context只是一个记录方法调用的容器，
	 * 用于生成记录绘制行为的actions数组。c
	 * ontext跟<canvas/>不存在对应关系，
	 * 一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
	 */
    function createContext(): CanvasContext;

    interface DrawCanvasOptions {
        /** 画布标识，传入 <canvas/> 的 cavas-id */
        canvasId: number | string;
		/**
		 * 绘图动作数组，由 wx.createContext 创建的 context，
		 * 调用 getActions 方法导出绘图动作数组。
		 */
        actions: CanvasAction[];
    }
	/**
	 * 绘制画布
	 */
    function drawCanvas(options: DrawCanvasOptions): void;

    interface CanvasToTempFilePathOptions extends BaseOptions {
		/**
		 * 画布标识，传入 <canvas/> 的 cavas-id
		 */
        canvasId: string;
    }
	/**
	 * 把当前画布的内容导出生成图片，并返回文件路径
	 */
    function canvasToTempFilePath(options: CanvasToTempFilePathOptions): void;
}