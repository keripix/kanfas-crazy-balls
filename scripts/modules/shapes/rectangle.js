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

    }
  };

  ObjectUtil.extend(Rectangle.prototype, Shape.prototype);

  return Rectangle;
});