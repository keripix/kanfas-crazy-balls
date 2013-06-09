/**
 * Responsible for creating Rectangular Boundaries around an object. This
 * module also manages the interactions between these rectangles with the
 * bounded objects.
 *
 * The interactions are:
 * 1. Resizing the object
 * 2. The rectangles updates its position according to the bounded object
 */
define(["shapes/rectangle"],
function(Rectangle){

  function BoundedRectangle(obj, canvas, config){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.boundedRects={};
    this.object = obj;

    this.ofh = 0;

    this.captured = false;
    this.drag = false;
    this.mouseDown = false;
    this.overBound = undefined;

    this.needsToResize = false;

    obj.boundedRectangles = this;

    return this.createBoundedRectangles(config || {});
  }

  BoundedRectangle.prototype.createBoundedRectangles = function(config){
    var h = config.size || 8,
        ofh = h/2,
        fs = config.fillStyle || "#C3C3C3",
        tl = this.object.getTopLeft(),
        tr = this.object.getTopRight(),
        bl = this.object.getBottomLeft(),
        br = this.object.getBottomRight(),
        ow = this.object.width,
        oh = this.object.height,
        alpha = 0.2,
        topLeft = {x: tl.x-ofh, y: tl.y-ofh, width: h, height: h,fillStyle: fs,alpha: alpha},
        topRight = {x: tr.x-ofh, y: tr.y-ofh, width: h, height: h, fillStyle: fs,alpha:alpha},
        bottomLeft = {x: bl.x-ofh, y: bl.y-ofh,width: h, height: h, fillStyle: fs,alpha:alpha},
        bottomRight = {x: br.x-ofh, y:br.y-ofh,width:h, height:h,fillStyle: fs,alpha:alpha},
        topMiddle = {x: tl.x-ofh+ow/2,y:tl.y-ofh,width:h,height:h,fillStyle:fs,alpha:alpha},
        rightMiddle = {x: tr.x-ofh,y:tr.y-ofh+oh/2,width:h,height:h,fillStyle:fs,alpha:alpha},
        bottomMiddle = {x: bl.x-ofh+ow/2,y:bl.y-ofh,width:h,height:h,fillStyle:fs,alpha:alpha},
        leftMiddle = {x: tl.x-ofh,y:tl.y-ofh+oh/2,width:h,height:h,fillStyle:fs,alpha:alpha};

    this.boundedRects['topLeft'] = Rectangle.create(topLeft);
    this.boundedRects['topRight'] = Rectangle.create(topRight);
    this.boundedRects['bottomLeft'] = Rectangle.create(bottomLeft);
    this.boundedRects['bottomRight'] = Rectangle.create(bottomRight);
    this.boundedRects['topMiddle'] = Rectangle.create(topMiddle);
    this.boundedRects['rightMiddle'] = Rectangle.create(rightMiddle);
    this.boundedRects['bottomMiddle'] = Rectangle.create(bottomMiddle);
    this.boundedRects['leftMiddle'] = Rectangle.create(leftMiddle);
    this.ofh = ofh;

    return this;
  };

  BoundedRectangle.prototype.getBoundedRectangles = function(){
    return this.boundedRects;
  };

  BoundedRectangle.prototype.draw = function(ctx) {
    for (var i in this.boundedRects){
      this.boundedRects[i].draw(ctx);
    }

    return this;
  };

  BoundedRectangle.prototype.flip = function(type){
    var temp1, temp2, temp3;

    if (type === "horizontal") {
      temp1 = this.boundedRects.bottomLeft;
      temp2 = this.boundedRects.bottomMiddle;
      temp3 = this.boundedRects.bottomRight;

      this.boundedRects.bottomLeft = this.boundedRects.topLeft;
      this.boundedRects.bottomMiddle = this.boundedRects.topMiddle;
      this.boundedRects.bottomRight = this.boundedRects.topRight;

      this.boundedRects.topLeft = temp1;
      this.boundedRects.topMiddle = temp2;
      this.boundedRects.topRight = temp3;
    } else if (type === "vertical") {
      temp1 = this.boundedRects.topLeft;
      temp2 = this.boundedRects.leftMiddle;
      temp3 = this.boundedRects.bottomLeft;

      this.boundedRects.topLeft = this.boundedRects.topRight;
      this.boundedRects.leftMiddle = this.boundedRects.rightMiddle;
      this.boundedRects.bottomLeft = this.boundedRects.bottomRight;

      this.boundedRects.topRight = temp1;
      this.boundedRects.rightMiddle = temp2;
      this.boundedRects.bottomRight = temp3;
    }

    return this;
  };

  BoundedRectangle.prototype.setPosition = function(newX, newY){
    // get the position of the object first
    var x = newX || this.object.x,
        y = newY || this.object.y,
        width = this.object.width,
        height = this.object.height,
        midX = width/2,
        midY = height/2;

    x -= this.ofh;
    y -= this.ofh;

    this.boundedRects.topLeft.setPosition(x,y);
    this.boundedRects.topRight.setPosition(x+width,y);
    this.boundedRects.bottomLeft.setPosition(x,y+height);
    this.boundedRects.bottomRight.setPosition(x+width,y+height);
    this.boundedRects.topMiddle.setPosition(x+midX,y);
    this.boundedRects.rightMiddle.setPosition(x+width,y+midY);
    this.boundedRects.bottomMiddle.setPosition(x+midX,y+height);
    this.boundedRects.leftMiddle.setPosition(x,y+midY);

    return this;
  };

  BoundedRectangle.prototype.resize = function(x, y){
    var oX = this.object.x,
        oY = this.object.y;

    this.object.disableMove()
               .setDimension(x - oX, y - oY);
    this.setPosition();
    this.object.clear();

    return this;
  };

  BoundedRectangle.prototype.isPointInsideMe = function(x, y) {
    var overBound;

    for (var i in this.boundedRects){
      if (this.boundedRects[i].isPointInsideMe(x, y)){
        overBound = i;
        break;
      }
    }

    return overBound;
  };

  BoundedRectangle.prototype.topLeftCaptured = function(x, y) {
    this.canvas.style.cursor = 'nw-resize';
  };

  BoundedRectangle.prototype.topRightCaptured = function(x, y) {
    this.canvas.style.cursor = 'ne-resize';

    if (this.needsToResize){
      this.object.enableMove();
      this.object.setPosition(this.object.x, y);
      this.resize(x);
        // .setDimension(this.object.width + (x - this.object.x - this.object.width), this.object.height + (y - this.object.y - this.object.height));
      // this.resize(x, y);
      this.object.draw(this.ctx);
    }
  };

  BoundedRectangle.prototype.bottomRightCaptured = function(x, y) {
    this.canvas.style.cursor = 'se-resize';

    this.needsToResize && this.resize(x, y);
    this.object.draw(this.ctx);
  };

  BoundedRectangle.prototype.bottomLeftCaptured = function(x, y) {
    this.canvas.style.cursor = 'sw-resize';
  };

  BoundedRectangle.prototype.topMiddleCaptured = function(x, y) {
    this.canvas.style.cursor = 'n-resize';
  };

  BoundedRectangle.prototype.rightMiddleCaptured = function(x, y) {
    this.canvas.style.cursor = 'e-resize';
  };

  BoundedRectangle.prototype.bottomMiddleCaptured = function(x, y) {
    this.canvas.style.cursor = 's-resize';
  };

  BoundedRectangle.prototype.leftMiddleCaptured = function(x, y) {
    this.canvas.style.cursor = 'w-resize';
  };

  BoundedRectangle.prototype.onMouseMove = function(point) {
    var ob = this.isPointInsideMe(point.x, point.y);

    if (ob !== undefined){
      this.captured = true;

      if (this.mouseDown && this.object.isMoving() === false) {
        this.needsToResize = true;
      }

      this.overBound = ob;
      this[ob + 'Captured'](point.x, point.y);

    } else if (this.captured && this.mouseDown && this.object.isMoving() === false) {
      this[this.overBound + 'Captured'](point.x, point.y);
    }
    else {
      this.resetState();
    }
  };

  BoundedRectangle.prototype.onMouseDown = function(point){
    this.mouseDown = true;
  };

  BoundedRectangle.prototype.onMouseUp = function(point) {
    this.resetState();
  };

  BoundedRectangle.prototype.resetState = function(){
    this.canvas.style.cursor = 'auto';

    this.drag = false;
    this.mouseDown = false;
    if (this.captured){
      this.captured = false;
    }

    this.needsToResize = false;

    this.object.enableMove();
  };

  BoundedRectangle.prototype.getSubscriptions = function(){
    return {
      scope: this,
      'mouse.move': this.onMouseMove,
      'mouse.down': this.onMouseDown,
      'mouse.up': this.onMouseUp
    };
  };

  return {
    create: function(obj, canvas, config){
      return new BoundedRectangle(obj, canvas, config);
    }
  };
});