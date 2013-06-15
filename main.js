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

  for(i = 40; i <= 560; i+=80){
    for(j = 40; j <=560; j+=80){
      bgCanvas.add(new Circle({x:i,y:j,radius:30}));
    }
  }

  var moving = new Circle({x:0,y:0,radius:15,fillStyle:"#27AE60"}),
      dX = 3,
      dY = 5;

  fgCanvas.add(moving);

  bgCanvas.draw();
  fgCanvas.draw();

  (function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
  }());


  function animate(){
    moving.setPosition(moving.x + dX, moving.y + dY);

    if (moving.x <= 0 || moving.x >= fgCanvas.width){
      dX *= -1;
    }

    if (moving.y <= 0 || moving.y >= fgCanvas.height){
      dY *= -1;
    }

    fgCanvas.clear();
    fgCanvas.draw();

    requestAnimationFrame(animate);
  }

  animate();
});