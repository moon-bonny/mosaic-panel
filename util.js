/**
 * @func
 * @desc 验证数字
 * @param {string} obj 校验值
 */
function checkNumber(obj) {
  var reg = /^[1-9]\d*$/;
  var flag = obj != "" && reg.test(obj);
  return flag;
}

/**
 * @func
 * @desc 获取随机颜色值
 */
function getRandomColor() {
  var color = "";
  for (var i = 0; i < 3; i++) color += parseInt(Math.random() * 256) + ",";
  //去除最后一个逗号
  color = color.slice(0, -1);
  return color;
}

/**
 * @func
 * @desc 获取绘制的矩形位置
 * @param {number} x 绘制矩形的x坐标
 * @param {number} y 绘制矩形的y坐标
 * @param {object} size 绘制矩形大小数据
 * @param {number} size.w 绘制矩形的宽度
 * @param {number} size.h 绘制矩形的高度
 */
function getRectPosition(x, y, size) {
  var width = size.w;
  var height = size.h;
  var x = parseInt(x / width) * width;
  var y = parseInt(y / height) * height;
  return {
    x,
    y,
  };
}

/**
 * @func
 * @desc 绘制矩形
 * @param {object} pos 绘制矩形坐标数据
 * @param {number} pos.x 绘制矩形的x坐标
 * @param {number} pos.y 绘制矩形的y坐标
 * @param {object} size 绘制矩形大小数据
 * @param {number} size.w 绘制矩形的宽度
 * @param {number} size.h 绘制矩形的高度
 * @param {boolean} [isStroke] 是否描边
 */
function drawRect(pos, size, fillStyle, isStroke) {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.rect(pos.x, pos.y, size.w, size.h);
  ctx.fill();
  isStroke && ctx.stroke();
}

// color: {from, to} rect: {x,y,width,height}
function rectColorGradientAnimation(colorFrom, rect) {
  // 动画执行的帧数
  var start = 0,
    frames = 200;
  // 过渡颜色 蓝色 到 红色
  var from = [0, 0, 255];
  var to = getRandomColor().split(",");
  // 动画算法，这里使用Cubic.easeOut算法
  var cubicEaseOut = function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  };

  // 绘制方法
  var draw = function () {
    let { x, y, width, height } = rect;
    context.clearRect(x, y, width, height);
    // 计算此时r, g, b数值
    var r = cubicEaseOut(start, from[0], to[0] - from[0], frames);
    var g = cubicEaseOut(start, from[1], to[1] - from[1], frames);
    var b = cubicEaseOut(start, from[2], to[2] - from[2], frames);
    // 可以确定色值
    context.fillStyle = "rgb(" + [r, g, b].join() + ")";
    context.arc(width / 2, height / 2, height / 2, 0, 2 * Math.PI);
    context.fill();
    // 持续变化
    start++;
    if (start <= frames) {
      requestAnimationFrame(draw);
    }
  };
  draw();
}
