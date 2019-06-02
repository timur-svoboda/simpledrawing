/*--------------------------------------------------------------
>>> Navigation:
----------------------------------------------------------------
#removeSelectedObjects
#_removeControlPoints
  - checks controlPoints initial length
  - checks controlPoints length
  - checks the existance of the second control point
  - checks that no control point has a rail
--------------------------------------------------------------*/
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Trash from "@/classes/Trash.js";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("#removeSelectedObjects", () => {
  let store;
  let objects;
  let removedObjectsCount;
  let trash;

  beforeEach(() => {
    store = new Vuex.Store();
    store.getters.getObjects = [
      { selected: false, types: [""] },
      { selected: true, types: [""] },
      { selected: false, types: ["rail"] },
      { selected: true, types: ["rail"] },
      { selected: true, types: [""] },
      { selected: false, types: [""] }
    ];
    removedObjectsCount = 0;
    store.getters.getObjects.forEach(obj => {
      obj.el = {};
      obj.el.remove = jest.fn(() => {
        removedObjectsCount += 1;
      });
    });
    objects = store.getters.getObjects;

    trash = new Trash(store);
    trash._removeControlPoints = jest.fn();
  });

  it("calls _removeControlPoints once", () => {
    trash.removeSelectedObjects(objects);

    expect(trash._removeControlPoints.mock.calls.length).toBe(1);
  });

  it("calls obj.el.remove 3 times", () => {
    trash.removeSelectedObjects(objects);

    expect(removedObjectsCount).toBe(3);
  });

  it("checks if objects length equals 3", () => {
    trash.removeSelectedObjects(objects);

    expect(objects.length).toBe(3);
  });

  it("checks if there are not selected objects", () => {
    trash.removeSelectedObjects(objects);

    objects.forEach(obj => {
      expect(obj.selected).toBeFalsy();
    });
  });
});

describe("#_removeControlPoints", () => {
  let rails;
  let state;
  let getters;
  let store;
  let trash;

  beforeEach(() => {
    rails = [];

    for (let i = 0; i < 6; i++) {
      rails[i] = { x: i };
    }

    state = {
      controlPoints: [
        { rails: [rails[0], rails[1]] },
        { rails: [rails[2], rails[3]] },
        { rails: [rails[4], rails[5]] }
      ]
    };

    getters = {
      getControlPoints(state) {
        return state.controlPoints;
      }
    };

    store = new Vuex.Store({
      state,
      getters
    });

    trash = new Trash(store);
  });

  it("checks controlPoints initial length", () => {
    const controlPointsLength = store.getters.getControlPoints.length;
    expect(controlPointsLength).toBe(3);
  });

  it("checks controlPoints length", () => {
    trash._removeControlPoints(rails[2]);
    const controlPointsLength = store.getters.getControlPoints.length;

    expect(controlPointsLength).toBe(2);
  });

  it("checks the existance of the second control point", () => {
    trash._removeControlPoints(rails[2]);
    const controlPoints = store.getters.getControlPoints;

    expect(controlPoints[1]).toBeDefined();
  });

  it("checks that no control point has a rail", () => {
    const rail = rails[2];
    trash._removeControlPoints(rail);
    store.getters.getControlPoints.forEach(cp => {
      expect(cp.rails.indexOf(rail)).toBe(-1);
    });
  });
});
