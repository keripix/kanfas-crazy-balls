define(['shapes/rectangle'],
function(Rectangle){
  var shapes = arguments;

  function Shape(ctx){
    this.shapes = shapes;
    this.ctx = ctx;
  }

  Shape.prototype.getCtx = function(){
    return this.ctx;
  };

  for (var i = shapes.length - 1; i >= 0; i--) {
    var index = i;
    Shape.prototype[shapes[i].name] = function(config){
      return new shapes[index](config, Shape.getCtx());
    };
  }

  return Shape;
});