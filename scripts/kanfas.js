define(function(){

  function Kanfas(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasObjects = [];
    this.selectedObjects = [];
  }

  Kanfas.prototype = {
    getCanvas: function(){
      return this.canvas;
    },

    getContext: function(){
      return this.ctx;
    },

    add: function(object){
      object.setContext(this.getContext());
      this.canvasObjects.push(object);
    },

    draw: function(){
      this.canvasObjects.forEach(function(o){
        o.draw();
      });
    },

    onMousePressed: function(point){
      this.canvasObjects.forEach(function(obj){
        if (obj.isPointInsideMe(point.x, point.y)){
          this.selectedObjects.push(obj);
          obj.selected();
        }
      }, this);

      console.log(this.selectedObjects);
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