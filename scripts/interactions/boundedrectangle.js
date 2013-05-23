define(["shapes/rectangle"],
function(Rectangle){

  function BoundedRectangle(obj, config){
    this.boundedRects=[];
    this.object = obj;

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


    this.boundedRects.push(new Rectangle(topLeft));
    this.boundedRects.push(new Rectangle(topRight));
    this.boundedRects.push(new Rectangle(bottomLeft));
    this.boundedRects.push(new Rectangle(bottomRight));
    this.boundedRects.push(new Rectangle(topMiddle));
    this.boundedRects.push(new Rectangle(rightMiddle));
    this.boundedRects.push(new Rectangle(bottomMiddle));
    this.boundedRects.push(new Rectangle(leftMiddle));

    return this;
  };

  BoundedRectangle.prototype.getBoundedRectangles = function(){
    return this.boundedRects;
  },

  BoundedRectangle.prototype.draw = function(ctx) {
    this.boundedRects.forEach(function(obj){
      obj.draw(ctx);
    });
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