define([
  "state"
  ],
function(State){
  var state = State.init(),
      obj = {x:2};

  describe("State", function(){
    beforeEach(function(){
      state.addObject({x:1}).addObject(obj).addObject({x:3});
    });

    afterEach(function(){
      state.objects.length = 0;
    });

    it("Should add object and save it", function(){
      expect(state.objects.length).toEqual(3);
    });

    it("Should returns the correct position of object on findObject", function(){
      expect(state.findObjectPos(obj, state.objects)).toEqual(1);
    });

    it("Should remove the correct object", function(){
      var removed = state.removeObject(obj);

      expect(state.objects.length).toEqual(2);
      expect(removed).toEqual(obj);
    });
  });
});