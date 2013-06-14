/**
 * This is a rectangle :D
 */
define([
  "shape",
  "events",
  "utils/objectutil"
  ],
function(Shape, Events, ObjectUtil){

  function Rectangle(config){
    Shape.call(this, config);
  }

  ObjectUtil.addMethods(Rectangle, {
    /**
     * Draw the Rectangle
     */
    draw: function(ctx){
      ctx.fillStyle = this.fillStyle;
      ctx.globalAlpha = this.alpha;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      if (this.selected) {
        ctx.strokeStyle = this.strokeStyle;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }

      return this;
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

    setDimension: function(width, height){
      this.width = width;
      this.height = height;
      return this;
    }
  })
  .inherits(Rectangle, Shape);

  return Rectangle;
});