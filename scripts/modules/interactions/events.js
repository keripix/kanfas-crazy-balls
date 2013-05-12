define(function(){
  function Events(canvas){
    this.canvas = canvas;
    this.down = false;
    this.init();
    this.handlers = [];
  }

  Events.prototype = {
    init: function(){
      this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
      this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    },

    addSubscriber: function(obj){
      var interests = obj.getSubscriptions();
      console.log(interests);

      for(var e in interests){
        this.on(e, interests[e]);
      }
    },

    on: function(eventName, callbackOpt){
      if (!this.handlers[eventName]) {
        this.handlers[eventName] = [];
      }

      this.handlers[eventName].push(function(e){
        return callbackOpt.fn.call(callbackOpt.scope || this, e);
      });
    },

    fireEvent: function(eventName, e){
      if (!this.handlers[eventName]){
        return;
      }

      this.handlers[eventName].forEach(function(callback){
        callback(e);
      });
    },

    onMouseDown: function(e){
      this.down = true;
      this.fireEvent('canvas.pressed', e);
    },

    onMouseUp: function(e){
      this.down = false;
      this.fireEvent('canvas.released', e);
    }
  };

  return Events;
});