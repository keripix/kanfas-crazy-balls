/**
 * This is a rectangle :D
 */
define(["shape",
        "utils/object"],
function(Shape, ObjectUtil){

  function Rectangle(config){
    Shape.call(this, config);
  }


  Rectangle.prototype = {
    /**
     * Draw me
     */
    draw: function(ctx){
      ctx.fillStyle = this.fillStyle;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    drawSelect: function(ctx){
      ctx.strokeStyle = this.strokeStyle;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    },

    clear: function(ctx){
      ctx.clearRect(this.x, this.y, this.width, this.height);
    },

    /**
     * Check wether the points are inside of this object
     *
     * @param  {float} x Mouse X position
     * @param  {float} y Mouse y position
     * @return {bool}
     */
    isPointInsideMe: function(x, y){
      return (x >= this.x) && (x <= (this.x + this.width))
              && (y >= this.y) && (y <= (this.y + this.height));
    },

    move: function(x, y){
      this.x = x - this.offsetX;
      this.y = y - this.offsetY;
      this.redraw = true;
    },

    select: function(ctx, x, y){
      this.offsetX = x - this.x;
      this.offsetY = y - this.y;
      this.strokeStyle = this.selectedStyle;
    },

    deselect: function(ctx){
      this.offsetX = 0;
      this.offsetY = 0;
      this.strokeStyle = this.normalStyle;
    }
  };

  ObjectUtil.extend(Rectangle.prototype, Shape.prototype);

  return Rectangle;
});