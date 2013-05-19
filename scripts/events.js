/**
 * This module acts as an Event Aggregator
 */
define(function(){
  function Events(){
    this.handlers = [];
  }

  Events.prototype = {
    // TODO struktur obj yang lebih fleksibel
    addSubscriber: function(obj){
      var interests = obj.getSubscriptions && obj.getSubscriptions() || undefined;

      if (!interests) {
        return;
      }

      for(var e in interests){
        this.on(e, interests[e]);
      }
    },

    // TODO callbackOpt tidak memaksakan struktur. Ia bisa menerima sebuah
    // callback, dan juga objek yang mengandung konfigurasi callback
    on: function(eventName, callbackOpt){
      (this.handlers[eventName] || (this.handlers[eventName] = [])).push(function(e){
        return callbackOpt.fn.call(callbackOpt.scope || this, e);
      });
    },

    fireEvent: function(eventName, e){
      if (!this.handlers[eventName]){
        return;
      }

      this.handlers[eventName].forEach(function(callback){
        return callback(e);
      });
    }
  };

  return Events;
});