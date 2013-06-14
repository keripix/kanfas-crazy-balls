define(["kanfas", "state","shapes/shapefactory"],
function(Kanfas, State,ShapeFactory){
  // manually mock
  var canvas = {
    getContext: function(){
      return true;
    }
  };

  var state = new State(canvas, {}),
      kanfas = new Kanfas(canvas, state),
      s1 = ShapeFactory.create("Rectangle", {x:0,y:0}),
      s2 = ShapeFactory.create("Rectangle", {x:10,y:10}),
      s3 = ShapeFactory.create("Rectangle", {x:50,y:50});

  describe("Kanfas", function(){
    describe("Object collections", function(){
      it("Should be able to add properly", function(){
        kanfas.add(s1, s2, s3);

        expect(kanfas.state.objects.length).toEqual(3);
      });

      it("Should be able to remove properly", function(){
        kanfas.remove(s2);

        expect(kanfas.state.objects.length).toEqual(2);

        kanfas.remove(s3);
        kanfas.remove(s1);
        expect(kanfas.state.objects.length).toEqual(0);
      });
    });
  });
});