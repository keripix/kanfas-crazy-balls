/**
 * Responsible for adding boundaries for canvas objects.
 *
 * Supports just Rectangle at the moment.
 */
define([
  "interactions/boundedrectangle"
  ],
function(BoundedRectangle){
  function Boundaries(canvas, events){
    this.events = events;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

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
          boundedRects = new BoundedRectangle(obj, me.canvas);

      obj.draw = function(){
        obj.selected = false; // dont draw selection line for object
        objDraw.apply(obj, Array.prototype.slice.call(arguments, 0));

        boundedRects.draw(ctx);
      };

      obj.move = function(){
        obj.selected = false;
        objMove.apply(obj, Array.prototype.slice.call(arguments, 0));

        boundedRects.move(arguments);
      };

      this.events.addSubscriber(boundedRects);
    }
  };

  return Boundaries;
});