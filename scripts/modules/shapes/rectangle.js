define(["kanfas",
        "shape",
        "modules/utils/object"],
function(Kanfas, Shape, ObjectUtil){

  function Rectangle(config){
    Shape.call(this, config);
  }


  Rectangle.prototype = {
    draw: function(){
      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    },

    isPointInsideMe: function(x, y){
      return x <= (this.x + this.width) && y <= (this.y + this.height);
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