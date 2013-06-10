define(["kanfas"],
function(Kanfas){
  var canvas = document.getElementById('testcanvas'),
      kanfas = Kanfas.create(canvas);

  describe("Kanfas", function(){
    it("Should", function(){
      expect(kanfas instanceof Kanfas).toBe(true);
    });
  });
});