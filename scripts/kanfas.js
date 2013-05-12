define(function(){

  function Kanfas(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasObjects = [];
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

    onMousePressed: function(e){
      var x = e.clientX,
          y = e.clientY;

      console.log(this.canvasObjects);
    },

    onMouseReleased: function(e){
      console.log("mouse released");
    },

    onMouseDrag: function(e){
      console.log("mouse drag");
    },

    onMouseDragged: function(e){
      console.log("mouse dragged");
    },

    getSubscriptions: function(){
      return {
        'canvas.pressed': {
          fn: this.onMousePressed,
          scope: this
        },
        'canvas.released': {
          fn: this.onMouseReleased,
          scope: this
        },
        'canvas.dragging': {
          fn: this.onMouseDrag,
          scope:this
        },
        'canvas.dragged': {
          fn: this.onMouseDragged,
          scope: this
        }
      };
    }
  };

  return Kanfas;
});