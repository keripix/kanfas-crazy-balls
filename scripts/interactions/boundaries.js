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
          boundedRects = new BoundedRectangle(obj, this.canvas);

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

      this.events.addSubscriber(boundedRects);
    },

    isPointInsideMe: function(x, y){
      return false;
    }
  };

  return Boundaries;
});