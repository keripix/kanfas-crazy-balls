/**
 * TODO define the proper responsibility for this module
 */
define(["utils/objectutil"],
function(ObjectUtil){

  function Kanfas(canvas, state){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = state;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  ObjectUtil.addMethods(Kanfas, {
    add: function(){
      var args = Array.prototype.slice.call(arguments, 0);

      args.forEach(function(o){
        this.state.addObject(o);
      }, this);

      return this;
    },

    remove: function(obj){
      return this.state.removeObject(obj);
    },

    clear: function(){
      this.ctx.clearRect(0, 0, this.width, this.height);
      return this;
    },

    draw: function(){
      var objects = this.state.objects;

      objects.forEach(function(o){
        o.draw(this.ctx);
      }, this);
      return this;
    },

    onMousePressed: function(point){
      var canvasObjects = this.state.objects,
          length = canvasObjects.length,
          o;

      while(length--){
        o = canvasObjects[length];

        if (o.isPointInsideMe(point.x, point.y)){
          this.state.addSelected(o);
          o.select(this.ctx, point.x, point.y);
        } else {
          this.state.removeSelected(o);
          o.deselect(this.ctx);
        }
      }

      o.draw(this.ctx);


      // canvasObjects.forEach(function(obj){

      // }, this);
    },

    onMouseReleased: function(point){
    },

    onMouseDrag: function(point){
      var objects = this.state.selections;

      objects.forEach(function(obj){
        obj.clear(this.ctx).setPosition(point.x, point.y);
      }, this);

      this.draw(this.ctx);
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
  });

  return Kanfas;
});