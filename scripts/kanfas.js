/**
 * Ini module untuk apa?
 */
define(function(){

  function Kanfas(canvas, state){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = state;
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
          obj.selected(this.ctx);
          // should I publish an event here?
        }
      }, this);

      this.draw();
    },

    onMouseReleased: function(point){
      console.log("mouse released");
    },

    onMouseDrag: function(point){
      this.selectedObjects.forEach(function(obj){
        obj.move(point.x, point.y);
      });
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