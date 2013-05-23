define(["shapes/rectangle"],
function(Rectangle){

  function BoundedRectangle(obj, config){
    this.boundedRects={};
    this.object = obj;
    this.ofh = 0;

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
        ow = this.object.getWidth(),
        oh = this.object.getHeight(),
        topLeft = {x: tl.x-ofh, y: tl.y-ofh, width: h, height: h,fillStyle: fs},
        topRight = {x: tr.x-ofh, y: tr.y-ofh, width: h, height: h, fillStyle: fs},
        bottomLeft = {x: bl.x-ofh, y: bl.y-ofh,width: h, height: h, fillStyle: fs},
        bottomRight = {x: br.x-ofh, y:br.y-ofh,width:h, height:h,fillStyle: fs},
        topMiddle = {x: tl.x-ofh+ow/2,y:tl.y-ofh,width:h,height:h,fillStyle:fs},
        rightMiddle = {x: tr.x-ofh,y:tr.y-ofh+oh/2,width:h,height:h,fillStyle:fs},
        bottomMiddle = {x: bl.x-ofh+ow/2,y:bl.y-ofh,width:h,height:h,fillStyle:fs},
        leftMiddle = {x: tl.x-ofh,y:tl.y-ofh+oh/2,width:h,height:h,fillStyle:fs};

    this.boundedRects['topLeft'] = new Rectangle(topLeft);
    this.boundedRects['topRight'] = new Rectangle(topRight);
    this.boundedRects['bottomLeft'] = new Rectangle(bottomLeft);
    this.boundedRects['bottomRight'] = new Rectangle(bottomRight);
    this.boundedRects['topMiddle'] = new Rectangle(topMiddle);
    this.boundedRects['rightMiddle'] = new Rectangle(rightMiddle);
    this.boundedRects['bottomMiddle'] = new Rectangle(bottomMiddle);
    this.boundedRects['leftMiddle'] = new Rectangle(leftMiddle);
    this.ofh = ofh;

    return this;
  };

  BoundedRectangle.prototype.getBoundedRectangles = function(){
    return this.boundedRects;
  },

  BoundedRectangle.prototype.draw = function(ctx) {
    for (var i in this.boundedRects){
      this.boundedRects[i].draw(ctx);
    }
  };

  BoundedRectangle.prototype.move = function(x, y){
    // get the position of the object first
    var x = this.object.getX()-this.ofh,
        y = this.object.getY()-this.ofh,
        width = this.object.getWidth();
        height = this.object.getHeight(),
        midX = width/2,
        midY = height/2;

    this.boundedRects.topLeft.move(x,y);
    this.boundedRects.topRight.move(x+width,y);
    this.boundedRects.bottomLeft.move(x,y+height)
    this.boundedRects.bottomRight.move(x+width,y+height);
    this.boundedRects.topMiddle.move(x+midX,y);
    this.boundedRects.rightMiddle.move(x+width,y+midY);
    this.boundedRects.bottomMiddle.move(x+midX,y+height);
    this.boundedRects.leftMiddle.move(x,y+midY);
  };

  BoundedRectangle.prototype.isPointInsideMe = function(x, y) {
    return true;
  };

  BoundedRectangle.prototype.onMouseMove = function(point) {
    if (this.isPointInsideMe(point.x, point.y)){
      return true;
    }
    return false;
  };

  BoundedRectangle.prototype.getSubscriptions = function(){
    return {
      'mouse.move': this.onMouseMove
    }
  };

  return BoundedRectangle;
});