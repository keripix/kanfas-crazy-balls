/**
 * Ini module untuk apa?
 */
define(function(){

  function Kanfas(canvas, state){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = state;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  Kanfas.prototype.getCanvas = function(){
    return this.canvas;
  };

  Kanfas.prototype.getContext = function(){
    return this.ctx;
  };

  Kanfas.prototype.add = function(){
    var args = Array.prototype.slice.call(arguments, 0);

    args.forEach(function(o){
      this.state.addObject(o);
    }, this);

    return this;
  };

  Kanfas.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
    return this;
  };

  Kanfas.prototype.draw = function(){
    var objects = this.state.getObjects();

    objects.forEach(function(o){
      o.draw(this.ctx);
    }, this);
    return this;
  };

  Kanfas.prototype.onMousePressed = function(point){
    var canvasObjects = this.state.getObjects();

    canvasObjects.forEach(function(obj){
      if (obj.isPointInsideMe(point.x, point.y)){
        this.state.addSelected(obj);
        obj.select(this.ctx, point.x, point.y);
      } else {
        this.state.removeSelected(obj);
        obj.deselect(this.ctx);
      }
      obj.draw(this.ctx);
    }, this);
  };

  Kanfas.prototype.onMouseReleased = function(point){
  };

  Kanfas.prototype.onMouseDrag = function(point){
    var objects = this.state.getSelected();

    objects.forEach(function(obj){
      obj.clear(this.ctx).setPosition(point.x, point.y);
    }, this);

    this.draw(this.ctx);
  };

  Kanfas.prototype.onMouseDragged = function(point){
  };

  Kanfas.prototype.getSubscriptions = function(){
    return {
      scope: this,
      'mouse.down': this.onMousePressed,
      'mouse.up': this.onMouseReleased,
      'mouse.drag': this.onMouseDrag,
      'mouse.moved': this.onMouseDragged
    };
  };

  return {
    create: function(canvas, state){
      return new Kanfas(canvas, state);
    }
  };
});