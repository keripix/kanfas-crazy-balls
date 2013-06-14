define(["kanfas", "state","shapes/shapefactory"],
function(Kanfas, State,ShapeFactory){
  var canvas = {
    getContext: function(){
      return true;
    }
  };

  var state = new State(canvas, {}),
      kanfas = new Kanfas(canvas, state);

  describe("Kanfas", function(){
    describe("Adding objects to kanfas", function(){
      it("Should have the correct number of items", function(){
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