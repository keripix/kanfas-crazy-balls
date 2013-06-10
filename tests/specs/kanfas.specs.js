define(["kanfas", "state","shapes/shapefactory"],
function(Kanfas, State,ShapeFactory){
  var canvas = document.getElementById('testcanvas'),
      state = State.init(canvas, {}),
      kanfas = Kanfas.create(canvas, state);

  describe("Kanfas", function(){
    describe("Adding objects to kanfas", function(){
      it("Should have the corect number of items", function(){
        kanfas.add(ShapeFactory.create("Rectangle",{
          x: 0,y:0
        }));
        kanfas.add(ShapeFactory.create("Rectangle",{
          x: 0,y:0
        }));
        kanfas.add(ShapeFactory.create("Rectangle",{
          x: 0,y:0
        }));

        expect(kanfas.state.objects.length).toEqual(3);
      });
    });
  });
});