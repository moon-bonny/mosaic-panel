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
  for (var i = 0; i < 3; i++) color += parseInt(Math.random() * 255) + ",";
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
  var indexObj = {
    i: parseInt(x / width),
    j: parseInt(y / height),
  };
  var pos = {
    x: indexObj.i * width,
    y: indexObj.j * height,
  };
  return {
    indexObj,
    pos,
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
  ctx.closePath();
}

/**
 * @func
 * @desc 矩形颜色渐变动画
 * @param {object} startColor 颜色渐变起始色值
 * @param {number} rect.pos 绘制矩形的坐标
 * @param {number} rect.size 绘制矩形的大小
 */
function rectColorGradientAnimation(startColor, rect) {
  return new Promise(function (resolve, reject) {
    // 动画执行的帧数
    var start = 0,
      frames = 100;
    // 过渡颜色
    var _startColor = startColor;
    var _endColor = getRandomColor().split(",");
    // 动画算法，这里使用Cubic.easeOut算法
    var cubicEaseOut = function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    };

    // 绘制方法
    var draw = function () {
      // 计算此时r, g, b数值
      var r = cubicEaseOut(
        start,
        +_startColor[0],
        _endColor[0] - _startColor[0],
        frames
      );
      var g = cubicEaseOut(
        start,
        +_startColor[1],
        _endColor[1] - _startColor[1],
        frames
      );
      var b = cubicEaseOut(
        start,
        +_startColor[2],
        _endColor[2] - _startColor[2],
        frames
      );

      drawRect(rect.pos, rect.size, "rgb(" + [r, g, b].join() + ")");
      // 持续变化
      start++;
      if (start <= frames) {
        requestAnimationFrame(draw);
      } else {
        drawRect(rect.pos, rect.size, `rgb(${_endColor.toString()})`);
        resolve(_endColor.toString());
      }
    };
    draw();
  });
}
