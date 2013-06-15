requirejs.config({
  baseUrl: "libs"
});

requirejs([
  "kanfas",
  "state",
  "shapes/circle"
  ],
function(Kanfas, State, Circle){
  var fg = document.getElementById('foreground'),
      bg = document.getElementById('background'),
      fgCanvas = new Kanfas(fg, new State),
      bgCanvas = new Kanfas(bg, new State),
      i = 0,
      j = 0;

  fgCanvas.setGlobalAlpha(0);
  bgCanvas.setGlobalAlpha(1);

  for(i = 40; i <= 560; i+=80){
    for(j = 40; j <=560; j+=80){
      fgCanvas.add(new Circle({x:i,y:j,radius:30}));
    }
  }

  bgCanvas.draw();
  fgCanvas.draw();
});