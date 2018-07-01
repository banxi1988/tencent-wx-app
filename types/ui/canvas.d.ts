// 界面-----绘图
declare namespace wx {
  interface CanvasAction {
    method: string;
    data: CanvasAction[] | Array<number | string>;
  }
  type LineCapType = "butt" | "round" | "square";
  type LineJoinType = "bevel" | "round" | "miter";

  interface TextMetrics {
    /**
     * 文本的宽度
     */
    width: number;
  }

  /**
   * 指定如何重复图像，有效值有: repeat, repeat-x, repeat-y, no-repeat
   */
  type Repetition = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";

  /**
   * context只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>
   * 不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
  ## 简介
  @example
  ```html
  <canvas canvas-id="myCanvas" style="border: 1px solid;"/>
  ```

  ```js
  const ctx = wx.createCanvasContext('myCanvas')
  ctx.setFillStyle('red')
  ctx.fillRect(10, 10, 150, 75)
  ctx.draw()
  ```
  ## 坐标
  canvas 是在一个二维的网格当中。
  左上角的坐标为(0, 0)。
  在之前的章节，我们用了这个方法 fillRect(0, 0, 150, 75)。
  它的含义为：从左上角(0, 0)开始，画一个150 x 75px 的矩形。
  @example 坐标系例子

  ```html
  <canvas canvas-id="myCanvas"
  style="margin: 5px; border:1px solid #d3d3d3;"
  bindtouchstart="start"
  bindtouchmove="move"
  bindtouchend="end"/>

<view hidden="{{hidden}}">
  Coordinates: ({{x}}, {{y}})
</view>
  ```
  ```js
Page({
  data: {
    x: 0,
    y: 0,
    hidden: true
  },
  start: function(e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  move: function(e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end: function(e) {
    this.setData({
      hidden: true
    })
  }
})
  ```
  当你把手指放到 canvas 中，就会在下边显示出触碰点的坐标. 
## 渐变
渐变能用于填充一个矩形，圆，线，文字等。填充色可以不固定位固定的一种颜色。
我们提供了两种颜色渐变的方式：
- `createLinearGradient(x, y, x1, y1)` - 创建一个线性的渐变
- `createCircularGradient(x, y, r)` - 创建一个从圆心开始的渐变
一旦我们创建了一个渐变对象，我们必须添加两个颜色渐变点。
`addColorStop(position, color)` 方法用于指定颜色渐变点的位置和颜色，位置必须位于0到1之间。
可以用 `setFillStyle()` 和 `setStrokeStyle()` 方法设置渐变，然后进行画图描述。

### 使用 createLinearGradient()

@example 
```js
const ctx = wx.createCanvasContext('myCanvas')

// Create linear gradient
const grd = ctx.createLinearGradient(0, 0, 200, 0)
grd.addColorStop(0, 'red')
grd.addColorStop(1, 'white')

// Fill with gradient
ctx.setFillStyle(grd)
ctx.fillRect(10, 10, 150, 80)
ctx.draw()
```

### 使用 createCircularGradient()

```js
const ctx = wx.createCanvasContext('myCanvas')

// Create circular gradient
const grd = ctx.createCircularGradient(75, 50, 50)
grd.addColorStop(0, 'red')
grd.addColorStop(1, 'white')

// Fill with gradient
ctx.setFillStyle(grd)
ctx.fillRect(10, 10, 150, 80)
ctx.draw()

```
   */
  interface CanvasContext {}

  // 颜色，样式，阴影
  interface CanvasContext {
    /**
     * 设置填充样式
     *
     * @param color 阴影的颜色。 同 CSS 一样，支持如下[格式颜色](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)
     *  - RGB 颜色 ：如 `rgb(255, 0, 0)`
     *  - RGBA 颜色: 如 `rgba(255, 0, 0, 0.6)`
     *  - HexColor: 如 `#ff0000`格式的颜色字符串
     *  - 预定义的颜色: 如 `red`
     *  @default black 如果没有设置 fillStyle，默认颜色为 black。
     */
    setFillStyle(color: string): void;

    /**
     * 设置填充色。
      @default black 如果没有设置 fillStyle，默认颜色为 black。
      @since 1.9.90
     */
    fillStyle: string;
    /**
     * 设置线条样式
     *
     * @param  color 阴影的颜色。 同 CSS 一样，支持如下[格式颜色](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)
     *  - RGB 颜色 ：如 `rgb(255, 0, 0)`
     *  - RGBA 颜色: 如 `rgba(255, 0, 0, 0.6)`
     *  - HexColor: 如 `#ff0000`格式的颜色字符串
     *  - 预定义的颜色: 如 `red`
     */
    setStrokeStyle(color: string): void;
    /**
     * 设置阴影
     *
     * @param  offsetX 阴影相对于形状在水平方向的偏移
     * @param  offsetY 阴影相对于形状在竖直方向的偏移
     * @param  blur 阴影的模糊级别，数值越大越模糊 0~100
     * @param  color 阴影的颜色。 同 CSS 一样，支持如下[格式颜色](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)
     *  - RGB 颜色 ：如 `rgb(255, 0, 0)`
     *  - RGBA 颜色: 如 `rgba(255, 0, 0, 0.6)`
     *  - HexColor: 如 `#ff0000`格式的颜色字符串
     *  - 预定义的颜色: 如 `red`
     */
    setShadow(
      offsetX: number,
      offsetY: number,
      blur: number,
      color: string
    ): void;

    /**
     * 设置阴影的模糊级别
     * @since 1.9.90
     */
    shadowBlur: number;

    /**
     * 设置阴影的颜色
     * 同 CSS 一样，支持如下[格式颜色](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/color.html)
     *  - RGB 颜色 ：如 `rgb(255, 0, 0)`
     *  - RGBA 颜色: 如 `rgba(255, 0, 0, 0.6)`
     *  - HexColor: 如 `#ff0000`格式的颜色字符串
     *  - 预定义的颜色: 如 `red`
     * @since 1.9.90
     */
    shadowColor: string;

    /**
     * 设置阴影相对于形状在水平方向的偏移
     * @since 1.9.90
     */
    shadowOffsetX: number;

    /**
     * 设置阴影相对于形状在竖直方向的偏移
     * @since 1.9.90
     */
    shadowOffsetY: number;
  }

  // 渐变
  interface CanvasContext {
    /**
     * 创建一个线性的渐变颜色。
     * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
     * @param  x0 起点的x坐标
     * @param  y0 起点的y坐标
     * @param  x1 终点的x坐标
     * @param  y1 终点的y坐标
     *
     * @memberOf CanvasContext
     */
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): void;

    /**
     * 创建一个颜色的渐变点。
     * Tip: 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。
     * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
     * @param  stop (0-1)	表示渐变点在起点和终点中的位置
     * @param  color 渐变点的颜色
     *
     * @memberOf CanvasContext
     */
    addColorStop(stop: number, color: string): void;

    /**
     * 创建一个圆形的渐变颜色。
     *
     * @param  x 圆心的x坐标
     * @param  y 圆心的y坐标
     * @param  r 圆的半径
     *
     * @memberOf CanvasContext
     */
    createCircularGradient(x: number, y: number, r: number): void;
  }

  // 线条样式
  interface CanvasContext {
    /**
     * 设置线条宽度
     *
     * @param  lineWidth 线条的宽度
     */
    setLineWidth(lineWidth: number): void;

    /**
     * 设置线条端点的样式
     *
     * @param  lineCap 线条的结束端点样式。 'butt'、'round'、'square'
     */
    setLineCap(lineCap: LineCapType): void;

    /**
     * 设置线条的交点样式。
     *
     *  @param  lineJoin  'bevel'、'round'、'miter' 两条线相交时，所创建的拐角类型
     */
    setLineJoin(lineJoin: LineJoinType): void;

    /** 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。
     * 当 setLineJoin为 miter 时才有效。
     * 超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
     *
     * @param  miterLimit 最大斜接长度
     */
    setMiterLimit(miterLimit: number): void;

    /**
     * 设置虚线偏移量的属性
     * @default 0
     * @since 1.9.90
     */
    lineDashOffset: number;
  }

  // 矩形
  interface CanvasContext {
    /**
     * 添加一个矩形路径到当前路径。
     *
     * @param  x 矩形路径左上角的x坐标
     * @param  y 矩形路径左上角的y坐标
     * @param  width 矩形路径的宽度
     * @param  height 矩形路径的高度
     */
    rect(x: number, y: number, width: number, height: number): void;

    /**
     * 填充一个矩形。
     * Tip: 用 setFillStyle() 设置矩形的填充色，如果没设置默认是黑色。
     * @param  x 矩形路径左上角的x坐标
     * @param  y 矩形路径左上角的y坐标
     * @param  width 矩形路径的宽度
     * @param  height 矩形路径的高度
     *
     * @memberOf CanvasContext
     */
    fillRect(x: number, y: number, width: number, height: number): void;
    /**
     * 画一个矩形(非填充)。
     * Tip: 用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。
     * @param  x 矩形路径左上角的x坐标
     * @param  y 矩形路径左上角的y坐标
     * @param  width 矩形路径的宽度
     * @param  height 矩形路径的高度
     *
     * @memberOf CanvasContext
     */
    strokeRect(x: number, y: number, width: number, height: number): void;

    /**
     *
     * 清除画布上在该矩形区域内的内容。
     * Tip: clearRect 并非画一个白色的矩形在地址区域，而是清空, 可能最终对应区域显示的是
     * canvas 元素的样式。
     * @param  x 矩形路径左上角的x坐标
     * @param  y 矩形路径左上角的y坐标
     * @param  width 矩形路径的宽度
     * @param  height 矩形路径的高度
     *
     * @memberOf CanvasContext
     */
    clearRect(x: number, y: number, width: number, height: number): void;
  }

  // 路径
  interface CanvasContext {
    /**
     * 对当前路径中的内容进行填充。默认的填充色为黑色。
     * Tip: 如果当前路径没有闭合，`fill()` 方法会将起点和终点进行连接，然后填充，详情见例一。
     * Tip: `fill()` 填充的的路径是从 `beginPath()` 开始计算，但是不会将 `fillRect()` 包含进
     * 去，详情见例二。
     */
    fill(): void;

    /**
     * 画出当前路径的边框。默认颜色色为黑色。
     * Tip: `stroke()` 描绘的的路径是从 `beginPath()` 开始计算，但是不会将 `strokeRect()`
     * 包含进去，详情见例二。
     */
    stroke(): void;

    /**
     * 开始创建一个路径，需要调用 `fill` 或者 `stroke` 才会使用路径进行填充或描边。
     * Tip: 在最开始的时候相当于调用了一次 `beginPath()`。
     * Tip: 同一个路径内的多次 `setFillStyle`、`setStrokeStyle`、`setLineWidth` 等设置，
     * 以最后一次设置为准。
     */
    beginPath(): void;

    /**
     * 关闭一个路径
     * Tip: 关闭路径会连接起点和终点。
     * Tip: 如果关闭路径后没有调用 `fill()` 或者 `stroke()` 并开启了新的路径，那之前的路径将不会被渲染。
     */
    closePath(): void;

    /**
     * 把路径移动到画布中的指定点，但不创建线条。
     *
     * @param  x 目标位置的x坐标
     * @param  y 目标位置的y坐标
     */
    moveTo(x: number, y: number): void;
    /**
     * 在当前位置添加一个新点，然后在画布中创建从该点到最后指定点的路径。
     *
     * @param  x 目标位置的x坐标
     * @param  y 目标位置的y坐标
     */
    lineTo(x: number, y: number): void;

    /**
     * 添加一个弧形路径到当前路径，顺时针绘制。
     *
     * Tip: 创建一个圆可以用 arc() 方法指定起始弧度为0，终止弧度为 2 * Math.PI。
     * Tip: 用 stroke() 或者 fill() 方法来在 canvas 中画弧线。
     *
     * @param  x 圆的x坐标
     * @param  y 圆的y坐标
     * @param  radius 圆的半径
     * @param  startAngle 起始弧度，单位弧度（在3点钟方向）
     * @param  endAngle 终止弧度
     * @param  counterclockwise 指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
     */
    arc(
      x: number,
      y: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      counterclockwise?: boolean
    ): void;

    /**
     * 根据控制点和半径绘制圆弧路径。
     *
     * @param x1 第一个控制点的 x 轴坐标
     * @param y1 第一个控制点的 y 轴坐标
     * @param x2 第二个控制点的 x 轴坐标
     * @param y2 第二个控制点的 y 轴坐标
     * @param radius 圆弧的半径
     * @since 1.9.90
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

    /**
     * 创建二次方贝塞尔曲线
     *
     * Tip: 曲线的起始点为路径中前一个点。
     *
     * @param  cpx 贝塞尔控制点的x坐标
     * @param  cpy 贝塞尔控制点的y坐标
     * @param  x 结束点的x坐标
     * @param  y 结束点的y坐标
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    /**
     * 创建三次方贝塞尔曲线
     *
     * Tip: 曲线的起始点为路径中前一个点。
     *
     * @param  cp1x 第一个贝塞尔控制点的 x 坐标
     * @param  cp1y 第一个贝塞尔控制点的 y 坐标
     * @param  cp2x 第二个贝塞尔控制点的 x 坐标
     * @param  cp2y 第二个贝塞尔控制点的 y 坐标
     * @param  x 结束点的x坐标
     * @param  y 结束点的y坐标
     */
    bezierCurveTo(
      cp1x: number,
      cp1y: number,
      cp2x: number,
      cp2y: number,
      x: number,
      y: number
    ): void;
  }

  // 变形
  interface CanvasContext {
    /**
     * 对横纵坐标进行缩放
     * 在调用 `scale` 方法后，之后创建的路径其横纵坐标会被缩放。多次调用 `scale`，倍数会相乘。
     *
     * @param  scaleWidth 横坐标缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
     * @param  scaleHeight 纵坐标轴缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
     */
    scale(scaleWidth: number, scaleHeight?: number): void;

    /**
     * 对坐标轴进行顺时针旋转
     * 以原点为中心，原点可以用 `translate`方法修改。
     * 顺时针旋转当前坐标轴。多次调用 `rotate`，旋转的角度会叠加。
     *
     * @param  rotate 旋转角度，以弧度计。(`degrees * Math.PI/180`；degrees范围为0~360)
     */
    rotate(rotate: number): void;

    /**
     * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
     *
     * @param  x 水平坐标平移量
     * @param  y 竖直坐标平移量
     */
    translate(x: number, y: number): void;

    /**
     * `clip()` 方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都
     * 会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 `clip()` 方法前通过
     * 使用 `save()` 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过
     * `restore()` 方法）。
      @example
 ```js
  const ctx = wx.createCanvasContext('myCanvas')

wx.downloadFile({
  url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
  success: function(res) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(50, 50, 25, 0, 2*Math.PI)
      ctx.clip()
      ctx.drawImage(res.tempFilePath, 25, 25)
      ctx.restore()
      ctx.draw()
  }
}
```
     */
    clip(): void;

    /**
     * 使用矩阵重新设置（覆盖）当前变换的方法
     *
     * @param scaleX 水平缩放
     * @param skewX 水平倾斜
     * @param skewY 垂直倾斜
     * @param scaleY 垂直缩放
     * @param translateX 水平移动
     * @param translateY 垂直移动
     *
     * @since 1.9.90
     */
    setTransform(
      scaleX: number,
      skewX: number,
      skewY: number,
      scaleY: number,
      translateX: number,
      translateY: number
    ): void;
  }

  type TextAlign = "left" | "center" | "right";
  type TextBaseline = "top" | "bottom" | "middle" | "normal";
  // 文字
  interface CanvasContext {
    /**
     * 在画布上绘制被填充的文本
     *
     * @param  text 在画布上输出的文本
     * @param  x 绘制文本的左上角x坐标位置
     * @param  y 绘制文本的左上角y坐标位置
     * @param maxWidth		需要绘制的最大宽度，可选
     */
    fillText(text: string, x: number, y: number, maxWidth?: number): void;

    /**
     * 用于设置文字的对齐
     *
     * @param  align 可选值 'left'、'center'、'right'
     *
     */
    setTextAlign(align: TextAlign): void;

    /**
     * 设置文字的对齐
     * @since 1.9.90
     */
    textAlign: TextAlign;

    /**
     * 设置字体大小
     *
     * @param  fontSize 字体的字号
     */
    setFontSize(fontSize: number): void;

    /**
     *
     * 用于设置文字的水平对齐
     *
     * @param textBaseline 可选值 'top'、'bottom'、'middle'、'normal'
     */
    setTextBaseline(textBaseline: string): void;

    /**
     * 设置文字的水平对齐
     * @since 1.9.90
     */
    textBaseline: TextBaseline;

    /**
     * 测量文本尺寸信息，目前仅返回文本宽度。同步接口。
     *
     * @param text 要测量的文本
     * @since 1.9.90
     */
    measureText(text: string): TextMetrics;

    /**
     * 给定的 (x, y) 位置绘制文本描边的方法
     *
     * @param text 要绘制的文本
     * @param x 文本起始点的 x 轴坐标
     * @param y 文本起始点的 y 轴坐标
     * @param maxWidth 需要绘制的最大宽度，可选
     * @since 1.9.90
     */
    strokeText(text: string, x: number, y: number, maxWidth: number): void;

    /**
     * 设置当前字体样式的属性
     * 符合 CSS font 语法的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
     *  - *style* 字体样式。仅支持 italic, oblique, normal
     *  - *weight* 字体粗细。仅支持 normal, bold
     *  - *size* 字体大小
     *  - *family* 字体族名。注意确认各平台所支持的字体
     * @since 1.9.90
     */
    font: string;
  }

  // 图片
  interface CanvasContext {
    /**
     * 绘制图像到画布。
     *
     * @param  imageResource 所要绘制的图片资源。
     * @param  dx 图像的左上角在目标canvas上 X 轴的位置
     * @param  dy 图像的左上角在目标canvas上 Y 轴的位置
     *
     */
    drawImage(imageResource: string, dx: number, dy: number): void;

    /**
     * 绘制图像到画布。
     *
     * @param  imageResource 所要绘制的图片资源。
     * @param  dx 图像的左上角在目标canvas上 X 轴的位置
     * @param  dy 图像的左上角在目标canvas上 Y 轴的位置
     * @param  dWidth 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
     * @param  dHeight 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
     */
    drawImage(
      imageResource: string,
      dx: number,
      dy: number,
      dWidth: number,
      dHeight: number
    ): void;

    /**
     * 绘制图像到画布。
     *
     * @param  imageResource 所要绘制的图片资源。
     * @param sx 源图像的矩形选择框的左上角 X 坐标
     * @param sy 源图像的矩形选择框的左上角 Y 坐标
     * @param sWidth 源图像的矩形选择框的宽度
     * @param sHeight 源图像的矩形选择框的高度
     * @param  dx 图像的左上角在目标canvas上 X 轴的位置
     * @param  dy 图像的左上角在目标canvas上 Y 轴的位置
     * @param  dWidth 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
     * @param  dHeight 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
     *
     */
    drawImage(
      imageResource: string,
      sx: number,
      sy: number,
      sWidth: number,
      sHeight: number,
      dx: number,
      dy: number,
      dWidth: number,
      dHeight: number
    ): void;

    /**
 *
 * @param image 重复的图像源，仅支持包内路径和临时路径
 * @param repetition 指定如何重复图像，有效值有: repeat, repeat-x, repeat-y, 
 * no-repeat
 * @since 1.9.90
 * @example
```js
const ctx = wx.createCanvasContext('myCanvas')
const pattern = ctx.createPattern('/path/to/image', 'repeat-x')
ctx.fillStyle = pattern
ctx.fillRect(0, 0, 300, 150)
ctx.draw()
```
 */
    createPattern(image: string, repetition: Repetition): void;
  }

  type AndroidSupportedComposeType =
    | "xor"
    | "source-over"
    | "source-atop"
    | "destination-out"
    | "lighter"
    | "overlay"
    | "darken"
    | "lighten"
    | "hard-light";

  type iOSSupportedComposeType =
    | "xor"
    | "source-over"
    | "source-atop"
    | "destination-over"
    | "destination-out"
    | "lighter"
    | "multiply"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "saturation"
    | "hard-light"
    | "luminosity";

  interface CanvasContext {
    /**
     * 设置全局画笔透明度。
     *
     * @param  alpha 0~1	透明度，0 表示完全透明，1 表示完全不透明
     *
     * @memberOf CanvasContext
     */
    setGlobalAlpha(alpha: number): void;

    /**
     * 该属性是设置要在绘制新形状时应用的合成操作的类型。
     * @bug 目前安卓版本只适用于 fill 填充块的合成，用于 stroke 线段的合成效果都是 source-over
     * @since 1.9.90
     */
    globalCompositeOperation:
      | AndroidSupportedComposeType
      | iOSSupportedComposeType;
  }

  // 其他
  interface CanvasContext {
    /**
     * 获取当前context上存储的绘图动作(不推荐使用)
     * @deprecated
     */
    getActions(): CanvasAction[];

    /**
     * 清空当前的存储绘图动作(不推荐使用)
     * @deprecated
     */
    clearActions(): void;

    /**
     * 保存当前的绘图上下文。
     */
    save(): void;

    /**
     * 恢复之前保存的绘图上下文。
     */
    restore(): void;

    /**
     * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
     * Tip: 绘图上下文需要由 `wx.createCanvasContext(canvasId)` 来创建。
     * @param  reserve 非必填。本次绘制是否接着上一次绘制，即 `reserve`参数为 `false`，
     * 则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若 ``reserver`参数
     * 为`true`，则保留当前画布上的内容，本次调用 `drawCanvas`绘制的内容覆盖在上面，默认
     * `false`
     */
    draw(reserve?: boolean): void;
  }
  /**
   * 创建并返回绘图上下文context对象。
   * context只是一个记录方法调用的容器，
   * 用于生成记录绘制行为的actions数组。c
   * ontext跟<canvas/>不存在对应关系，
   * 一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
   * @deprecated
   */
  function createContext(): CanvasContext;

  /**
   *
   * 创建 `canvas` 绘图上下文（指定 `canvasId`）。在自定义组件下，第二个参数传入组件实例 `this`，
   * 以操作组件内 `<canvas/>` 组件
   * Tip: 需要指定 canvasId，该绘图上下文只作用于对应的 <canvas/>
   * @param canvasId 画布表示，传入定义在 <canvas/> 的 canvas-id
   * @param componentInstance 自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/> ，如果省略，则不在任何自定义组件内查找
   */
  function createCanvasContext(
    canvasId: string,
    componentInstance?: object
  ): CanvasContext;

  interface DrawCanvasOptions {
    /** 画布标识，传入 <canvas/> 的 cavas-id */
    canvasId: number | string;
    /**
     * 绘图动作数组，由 wx.createContext 创建的 context，
     * 调用 getActions 方法导出绘图动作数组。
     */
    actions: CanvasAction[];

    /**
     * (可选)本次绘制是否接着上一次绘制，即 `reserve`参数为false，则在本次调用 `drawCanvas`
     * 绘制之前 `native` 层应先清空画布再继续绘制；若 `reserve`
     * 参数为 `true`，则保留当前画布上的内容，本次调用 `drawCanvas`绘制的内容覆盖在上面，
     * 默认 `false`
     */
    reserve?: boolean;
  }
  /**
   * 绘制画布
   * 用所提供的 actions 在所给的 canvas-id 对应的 canvas 上进行绘图。
   * @deprecated
   */
  function drawCanvas(options: DrawCanvasOptions): void;

  interface CanvasToTempFilePathOptions extends BaseOptions {
    /**
     * 画布标识，传入 <canvas/> 的 cavas-id
     */
    canvasId: string;
    /**
     * 画布x轴起点（默认0）
     * @since 1.2.0
     */
    x: number;

    /**
     * 画布y轴起点（默认0）
     * @since 1.2.0
     */
    y: number;

    /**
     * 画布宽度（默认为canvas宽度-x）
     * @since 1.2.0
     */
    width: number;

    /**
     * 画布高度（默认为canvas高度-y）
     * @since 1.2.0
     */
    height: number;

    /**
     * 输出图片宽度（默认为 width * 屏幕像素密度）
     * @since 1.2.0
     */
    destWidth: number;

    /**
     * 输出图片高度（默认为 height * 屏幕像素密度）
     * @since 1.2.0
     */
    destHeight: number;

    /**
     * 目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png'
     * @default "png"
     * @since 1.7.0
     */
    fileType: "jpg" | "png";

    /**
     * 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
     * @since 1.7.0
     */
    quality: number;
  }
  /**
   * 把当前画布的内容导出生成图片，并返回文件路径
   * Tips:
   * 1. 在 draw 回调里调用该方法才能保证图片导出成功。
   */
  function canvasToTempFilePath(
    options: CanvasToTempFilePathOptions,
    componentInstance?: object
  ): void;

  interface CanvasGetImageDataOptions extends BaseOptions {
    /**
     * 画布标识，传入 <canvas/> 的 cavas-id
     */
    canvasId: string;

    /**
     * 将要被提取的图像数据矩形区域的左上角 x 坐标
     */
    x: number;

    /**
     * 将要被提取的图像数据矩形区域的左上角 y 坐标
     */
    y: number;

    /**
     * 将要被提取的图像数据矩形区域的宽度
     */
    width: number;

    /**
     * 将要被提取的图像数据矩形区域的高度
     */
    height: number;
  }

  /**
   * 返回一个数组，用来描述 `canvas` 区域隐含的像素数据。在自定义组件下，第二个参数传入组件实例
   * `this`，以操作组件内 `<canvas/>` 组件
   *
   * @param options
   * @param componentInstance
   *
   * @since 1.9.0
   */
  function canvasGetImageData(
    options: CanvasGetImageDataOptions,
    componentInstance?: object
  ): void;

  interface CanvasPutImageDataOptions {
    /**
     * 画布标识，传入 <canvas/> 的 cavas-id
     */
    canvasId: string;

    /**
     * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
     * @example const data = new Uint8ClampedArray([255, 0, 0, 1])
     */
    data: Uint8ClampedArray;

    /**
     *源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）
     */
    x: number;

    /**
     * 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）
     */
    y: number;

    /**
     * 源图像数据矩形区域的宽度
     */
    width: number;

    /**
     * 源图像数据矩形区域的高度
     */
    height?: number;
  }
  /**
   * 将像素数据绘制到画布的方法。在自定义组件下，第二个参数传入组件实例 `this`，以操作组件内
   * `<canvas/>` 组件
   * @param options
   * @param componentInstance
   * @since 1.9.0
   * @example
```js
const data = new Uint8ClampedArray([255, 0, 0, 1])
wx.canvasPutImageData({
  canvasId: 'myCanvas',
  x: 0,
  y: 0,
  width: 1,
  data: data,
  success(res) {}
})
```
   */
  function canvasPutImageData(
    options: CanvasGetImageDataOptions,
    componentInstance?: object
  ): void;
}
