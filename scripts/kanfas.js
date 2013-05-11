define(["modules/utils/object",
        "modules/interactions/events"],
function(ObjectUtil, Events){

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

    onMouseEnter: function(){
      console.log("mouse enter");
    },

    onMouseClick: function(){
      console.log("mouse click");
    },

    getSubscriptions: function(){
      return {
        'mouse.enter': this.onMouseEnter,
        'mouse.click': this.onMouseClick
      };
    }
  };

  Events.subscribe(Kanfas);

  return Kanfas;
});