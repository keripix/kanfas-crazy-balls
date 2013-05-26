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

  Kanfas.prototype = {
    getCanvas: function(){
      return this.canvas;
    },

    getContext: function(){
      return this.ctx;
    },

    add: function(object){
      this.state.addObject(object);
      return this;
    },

    clear: function(){
      this.ctx.clearRect(0, 0, this.width, this.height);
      return this;
    },

    draw: function(){
      var objects = this.state.getObjects();

      objects.forEach(function(o){
        o.draw(this.ctx);
      }, this);
      return this;
    },

    onMousePressed: function(point){
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
    },

    onMouseReleased: function(point){
    },

    // TODO not working on chrome
    onMouseDrag: function(point){
      var objects = this.state.getSelected();

      objects.forEach(function(obj){
        obj.move(point.x, point.y);
      }, this);

      this.clear();
      this.draw();
    },

    onMouseDragged: function(point){
    },

    getSubscriptions: function(){
      return {
        scope: this,
        'mouse.down': this.onMousePressed,
        'mouse.up': this.onMouseReleased,
        'mouse.drag': this.onMouseDrag,
        'mouse.moved': this.onMouseDragged
      };
    }
  };

  return Kanfas;
});