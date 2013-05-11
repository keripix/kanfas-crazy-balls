requirejs.config({
  baseUrl: "scripts",
});

requirejs(["kanfas"],
function(Kanfas){
  var canvas = document.getElementById("paintarea"),
      ctx = canvas.getContext("2d");

  var k = new Kanfas(ctx);
});