/**
 * This module acts as an Event Aggregator
 */
define(function(){
  function Events(){
    this.handlers = {};
  }

  Events.prototype.addSubscriber = function(obj){
    var interests = obj.getSubscriptions && obj.getSubscriptions() || undefined;

    if (!interests) {
      return;
    }

    var scope = interests.scope || this;

    for(var e in interests){
      if (e === 'scope') continue;

      this.on(e, interests[e], scope);
    }

    return this;
  };

  // TODO callbackOpt tidak memaksakan struktur. Ia bisa menerima sebuah
  // callback, dan juga objek yang mengandung konfigurasi callback
  Events.prototype.on = function(eventName, callbackFn, scope){
    scope = scope || this;

    (this.handlers[eventName] || (this.handlers[eventName] = [])).push({
      fn: callbackFn,
      scope: scope
    });

    return this;
  };

  Events.prototype.fireEvent = function(eventName, e){
    if (!this.handlers[eventName]){
      return;
    }

    this.handlers[eventName].forEach(function(callback){
      return callback.fn && callback.fn.call(callback.scope, e);
    });

    return this;
  };

  Events.prototype.off = function(eventName, callbackFn){
    var index = this.findListener(eventName, callbackFn);

    if (index === -1){
      return;
    }

    this.handlers[eventName].splice(index, 1);
    return this;
  };

  Events.prototype.findListener = function(eventName, callbackFn){
    var length = this.handlers[eventName],
        index = -1;

    for(var i = length; i>=0;i--){
      if (this.handlers[eventName][i].fn === callbackFn){
        index = i;
        break;
      }
    }

    return index;
  };

  return {
    init: function(){
      return new Events();
    }
  };
});