/**
 * This module acts as an Event Aggregator
 */
define(function(){
  function Events(){
    this.handlers = {};
  }

  Events.prototype = {
    // TODO test
    addSubscriber: function(obj){
      var interests = obj.getSubscriptions && obj.getSubscriptions() || undefined;

      if (!interests) {
        return;
      }

      var scope = interests.scope || this;

      for(var e in interests){
        if (e === 'scope') continue;

        this.on(e, interests[e], scope);
      }
    },

    // TODO callbackOpt tidak memaksakan struktur. Ia bisa menerima sebuah
    // callback, dan juga objek yang mengandung konfigurasi callback
    on: function(eventName, callbackFn, scope){
      scope = scope || this;

      (this.handlers[eventName] || (this.handlers[eventName] = [])).push({
        fn: callbackFn,
        scope: scope
      });
    },

    fireEvent: function(eventName, e){
      if (!this.handlers[eventName]){
        return;
      }

      this.handlers[eventName].forEach(function(callback){
        return callback.fn && callback.fn.call(callback.scope, e);
      });
    },

    removeListener: function(eventName, callbackFn){
      var listener = this.findListener(eventName, callbackFn);
    },

    findListener: function(eventName, callbackFn){

    }
  };

  return Events;
});