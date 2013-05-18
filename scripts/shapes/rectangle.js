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
      ctx.strokeRect(this.x, this.y, this.width, this.height);
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
      console.log("moving to: ", x, y);
    },

    selected: function(){
      this.ctx.strokeStyle = "red";
      this.ctx.stroke();
    }
  };

  ObjectUtil.extend(Rectangle.prototype, Shape.prototype);

  return Rectangle;
});