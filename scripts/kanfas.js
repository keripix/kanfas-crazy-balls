define(function(){
  function Kanfas(ctx){
    this.ctx = ctx;
  }

  Kanfas.prototype.getContext = function() {
    return this.ctx;
  };

  return Kanfas;
});