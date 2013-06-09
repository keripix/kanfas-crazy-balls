/**
 * This is a rectangle :D
 */
define([
  "shape",
  "utils/objectutil"
  ],
function(Shape, ObjectUtil){

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
     * Clear me out of this canvas
     */
    clear: function(ctx){
      ctx.clearRect(this.x, this.y, this.width, this.height);
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
  });

  ObjectUtil.inherits(Rectangle, Shape);

  return {
    create: function(config){
      return new Rectangle(config);
    }
  };
});