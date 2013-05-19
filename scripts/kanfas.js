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
    },

    clear: function(){
      this.ctx.clearRect(0, 0, this.width, this.height);
    },

    draw: function(){
      var objects = this.state.drawAll() ? this.state.getObjects() : this.state.getSelected();

      objects.forEach(function(o){
        o.draw(this.ctx);
      }, this);
    },

    onMousePressed: function(point){
      var canvasObjects = this.state.getObjects();

      canvasObjects.forEach(function(obj){
        if (obj.isPointInsideMe(point.x, point.y)){
          this.state.addSelected(obj);
          obj.select(this.ctx);
        } else {
          obj.deselect(this.ctx);
        }
      }, this);

      this.draw();
    },

    onMouseReleased: function(point){
      console.log("mouse released");
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
      console.log("mouse dragged");
    },

    getSubscriptions: function(){
      return {
        'mouse.down': {
          fn: this.onMousePressed,
          scope: this
        },
        'mouse.up': {
          fn: this.onMouseReleased,
          scope: this
        },
        'mouse.move': {
          fn: this.onMouseDrag,
          scope:this
        },
        'mouse.moved': {
          fn: this.onMouseDragged,
          scope: this
        }
      };
    }
  };

  return Kanfas;
});