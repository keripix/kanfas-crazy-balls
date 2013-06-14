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
      state.selections.length = 0;
    });

    it("Should add object and save it", function(){
      expect(state.objects.length).toEqual(3);
    });

    it("Should returns the correct position of object on findObject", function(){
      expect(state.findObjectPos(obj, state.objects)).toEqual(1);
    });

    describe("Deleting object", function(){
      it("Should remove the correct object", function(){
        var removed = state.removeObject(obj);

        expect(state.objects.length).toEqual(2);
        expect(removed).toEqual(obj);
      });

      it("Should returns the correct value on nonexisting object", function(){
        expect(state.removeObject({x:5})).toBeUndefined();
      });
    });

    describe("Selections", function(){
      it("Should add object to selections property", function(){
        state.addSelected(obj);
        expect(state.selections.length).toEqual(1);

        state.addSelected({x:5});
        expect(state.selections.length).toEqual(2);
      });

      it("Should remove selected object", function(){
        var obj2 = {x:5};
        state.addSelected(obj).addSelected(obj2);

        var removed = state.removeSelected(obj);
        expect(removed).toEqual(obj);
        expect(state.selections.length).toEqual(1);

        expect(state.removeSelected({x:10})).toBeUndefined();
        expect(state.selections.length).toEqual(1);

        removed = state.removeSelected(obj2);
        expect(removed).toEqual({x:5});
        expect(state.selections.length).toEqual(0);
      });
    });
  });
});