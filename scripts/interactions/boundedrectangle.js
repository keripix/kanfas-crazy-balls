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

    return this.createBoundedRectangles(config || {});
  }

  BoundedRectangle.prototype = {
    createBoundedRectangles: function(config){
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
    },

    getBoundedRectangles: function(){
      return this.boundedRects;
    },

    draw: function(ctx) {
      for (var i in this.boundedRects){
        this.boundedRects[i].draw(ctx);
      }
    },

    move: function(){
      // get the position of the object first
      var x = this.object.x-this.ofh,
          y = this.object.y-this.ofh,
          width = this.object.width,
          height = this.object.height,
          midX = width/2,
          midY = height/2;

      this.boundedRects.topLeft.move(x,y);
      this.boundedRects.topRight.move(x+width,y);
      this.boundedRects.bottomLeft.move(x,y+height);
      this.boundedRects.bottomRight.move(x+width,y+height);
      this.boundedRects.topMiddle.move(x+midX,y);
      this.boundedRects.rightMiddle.move(x+width,y+midY);
      this.boundedRects.bottomMiddle.move(x+midX,y+height);
      this.boundedRects.leftMiddle.move(x,y+midY);
    },

    resize: function(x, y){
      var oX = this.object.x,
          oY = this.object.y;
      this.object.disableMove(true);
      this.object.width = x - oX;
      this.object.height = y - oY;
      this.object.draw(this.ctx);
    },

    isPointInsideMe: function(x, y) {
      var overBound = undefined;

      for (var i in this.boundedRects){
        if (this.boundedRects[i].isPointInsideMe(x, y)){
          overBound = i;
          break;
        }
      }

      return overBound;
    },

    onMouseMove: function(point) {
      var ob = this.overBound = this.isPointInsideMe(point.x, point.y);

      if (ob !== undefined){
        this.captured = true;
        switch(ob){
        case 'topLeft':
          this.canvas.style.cursor = 'nw-resize';
          break;
        case 'topRight':
          this.canvas.style.cursor = 'ne-resize';
          break;
        case 'bottomRight':
          this.canvas.style.cursor = 'se-resize';
          break;
        case 'bottomLeft':
          this.canvas.style.cursor = 'sw-resize';
          break;
        case 'topMiddle':
          this.canvas.style.cursor = 'n-resize';
          break;
        case 'rightMiddle':
          this.canvas.style.cursor = 'e-resize';
          break;
        case 'bottomMiddle':
          this.canvas.style.cursor = 's-resize';
          break;
        case 'leftMiddle':
          this.canvas.style.cursor = 'w-resize';
          break;
        }

        if (this.mouseDown && !this.object.isMoving()) {
          this.resize(point.x, point.y);
        }

      } else {
        if (this.captured && this.mouseDown) {
          this.resize(point.x, point.y);
        } else {
          this.canvas.style.cursor = 'auto';
        }
      }
    },

    onMouseDown: function(point){
      this.mouseDown = true;
    },

    onMouseUp: function(point) {
      this.drag = false;
      this.mouseDown = false;
      if (this.captured){
        this.captured = false;
      }
      this.object.disableMove(false);
    },

    getSubscriptions: function(){
      return {
        scope: this,
        'mouse.move': this.onMouseMove,
        'mouse.down': this.onMouseDown,
        'mouse.up': this.onMouseUp
      };
    }
  };

  return BoundedRectangle;
});