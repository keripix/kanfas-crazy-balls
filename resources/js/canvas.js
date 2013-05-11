requirejs.config({
  baseUrl: "resources/js/modules"
});

requirejs(["shape"],
function(shape){
  var canvas = document.getElementById("paintarea"),
      ctx = canvas.getContext('2d');
});