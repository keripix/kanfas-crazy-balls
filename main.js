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

  // add background circles
  for(i = 40; i <= 560; i+=80){
    for(j = 40; j <=560; j+=80){
      bgCanvas.add(new Circle({x:i,y:j,radius:30}));
    }
  }

  // pollyfill untuk requestAnimationFrame. Dari Paul Irish
  (function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }());

  var balls = [],
      bCounter, b;

  for (bCounter=0;bCounter<=25;bCounter++){
    b = new Circle({x:30+Math.random()*60,y:30+Math.random()*60,fillStyle:"#27AE60"});
    b.dX = Math.random() * 10;
    b.dY = Math.random() * 10;

    balls.push(b);
    fgCanvas.add(b);
  }

  bgCanvas.draw();
  fgCanvas.draw();

  function animate(){
    var ball,
        length = balls.length;

    while(length--){
      ball = balls[length];

      ball.setPosition(ball.x + ball.dX, ball.y + ball.dY);

      if (ball.x <= 30 || ball.x >= fgCanvas.width-30){
        ball.dX *= -1;
      }

      if (ball.y <= 30 || ball.y >= fgCanvas.height-30){
        ball.dY *= -1;
      }
    }

    fgCanvas.clear();
    fgCanvas.draw();

    requestAnimationFrame(animate);
  }

  animate();
});