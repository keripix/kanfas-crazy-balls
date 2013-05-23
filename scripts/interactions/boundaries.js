define([
  "interactions/boundedrectangle"
  ],
function(BoundedRectangle){
  function Boundaries(kanfas, events){
    this.events = events;
    this.kanfas = kanfas;

    this.canvas = kanfas.getCanvas();
    this.ctx = kanfas.getContext();

    this.objects = [];

    this.captured = false;
    this.capturedObjects = [];
  }

  Boundaries.prototype = {
    addTo: function(){
      var length = arguments.length;

      for(var i = length - 1;i >= 0;i--){
        this.objects.push(arguments[i]);
        this.createBoundaries(arguments[i]);
      }
    },

    /**
     * Create boundary controls for object
     */
    createBoundaries: function(obj){
      var me = this,
          ctx = me.ctx,
          objDraw = obj['draw'],
          objMove = obj['move'],
          boundedRects = new BoundedRectangle(obj);

      obj.draw = function(){
        obj.selected = false; // dont draw selection line for object
        objDraw.call(obj, ctx);

        boundedRects.draw(ctx);
      };

      obj.move = function(){
        obj.selected = false;
        objMove.apply(obj, arguments);

        boundedRects.move(arguments);
      };
    },

    isPointInsideMe: function(x, y){
      return false;
    },

    onMouseMove: function(point){
      if (this.isPointInsideMe(point.x, point.y) === true && this.captured === false) {
        this.captured = true;
        this.canvas.style.cursor = 'nw-resize';
      } else {
        this.captured = false;
        this.canvas.style.cursor = 'auto';
      }
    },

    getSubscriptions: function(){
      var me = this;

      return {
        scope: this,
        'mouse.move': this.onMouseMove
      };
    }
  };

  return Boundaries;
});