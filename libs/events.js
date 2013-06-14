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

  Events.prototype.on = function(eventName, callbackFn, scope){
    scope = scope || this;

    (this.handlers[eventName] || (this.handlers[eventName] = [])).push({
      fn: callbackFn,
      scope: scope
    });

    return this;
  };

  // TODO use arguments object
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
    if (this.handlers[eventName].length === 0) {
      return;
    }

    var eventHandlers = this.handlers[eventName],
        i = 0;

    this.handlers[eventName] = eventHandlers.filter(function(callback){
      return (callback.fn !== callbackFn);
    });

    return this;
  };

  Events.prototype.findListenerPos = function(eventName, callbackFn){
    var eventHandlers = this.handlers[eventName],
        length = eventHandlers.length,
        index = -1;

    while(length>0){
      if (eventHandlers[length-1].fn === callbackFn) {
        index = length-1;
        break;
      }

      length--;
    }

    return index;
  };

  return Events;
});