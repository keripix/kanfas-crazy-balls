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

    /**
     * Move me somewhere
     * @param  {float} x X Coordinate
     * @param  {float} y Y Coordinate
     */
    move: function(x, y){
      if (this.canMove) {
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
      }
      return this;
    },

    select: function(ctx, x, y){
      this.offsetX = x - this.x;
      this.offsetY = y - this.y;
      this.strokeStyle = this.selectedStyle;
      this.selected = true;
      return this;
    },

    deselect: function(ctx){
      this.offsetX = 0;
      this.offsetY = 0;
      this.strokeStyle = this.normalStyle;
      this.selected = false;
      return this;
    }
  };

  ObjectUtil.extend(Rectangle.prototype, Shape.prototype);

  return Rectangle;
});