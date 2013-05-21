define(function(){
  function Boundaries(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.objects = [];

    this.lineColor = "#CC0000";
    this.lineWidth = 1;

    this.edgeColor = "#CC0000";
    this.edgeHeight = 4;
    this.edgetWidth = 4;
  }

  Boundaries.prototype.addTo = function(){
    var length = arguments.length;

    for(var i = length - 1;i >= 0;i--){
      this.createBoundaries(arguments[i]);
    }
  };

  Boundaries.prototype.createBoundaries = function(obj){
    var me = this,
        ctx = me.ctx,
        objDraw = obj.draw;

    obj.draw = function(){
      objDraw.call(obj, ctx);

      var topLeft = obj.getTopLeft(),
          topRight = obj.getTopRight(),
          bottomLeft = obj.getBottomLeft(),
          bottomRight = obj.getBottomRight();

      ctx.fillStyle = me.edgeColor;
      ctx.fillRect(topLeft.x - 2, topLeft.y - 2, 4, 4);
      ctx.fillRect(topRight.x - 2, topRight.y - 2, 4, 4);
      ctx.fillRect(bottomLeft.x - 2, bottomLeft.y - 2, 4, 4);
      ctx.fillRect(bottomRight.x - 2, bottomRight.y - 2, 4, 4);

      ctx.strokeStyle = me.lineColor;
      ctx.beginPath();
      ctx.moveTo(topLeft.x + 2, topLeft.y);
      ctx.lineTo(topRight.x - 2, topRight.y);
      ctx.moveTo(topRight.x, topLeft.y + 2);
      ctx.lineTo(bottomRight.x, bottomRight.y - 2);
      ctx.moveTo(bottomRight.x - 2, bottomRight.y);
      ctx.lineTo(bottomLeft.x + 2, bottomLeft.y);
      ctx.moveTo(bottomLeft.x, bottomLeft.y - 2);
      ctx.lineTo(topLeft.x, topLeft.y + 2);
      ctx.stroke();
    };
  };

  return Boundaries;
});