import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ArcTypeControl from "@/components/tool-controllers/ArcTypeControl.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ArcTypeControl.vue", () => {
  let state;
  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    state = {
      currentTool: {
        arcType: "circle"
      }
    };

    getters = {
      getArcTypes() {
        return [
          {
            label: "Circle",
            id: "circle"
          },
          {
            label: "Circular Arc",
            id: "circular-arc"
          }
        ];
      },
      getCurrentTool(state) {
        return state.currentTool;
      }
    };

    mutations = {
      setArcType(state, payload) {
        const curTool = state.currentTool;

        if (curTool.arcType !== payload) {
          curTool.arcType = payload;
        }
      }
    };

    store = new Vuex.Store({
      state,
      getters,
      mutations
    });
  });

  it("checks the count of options", () => {
    const wrapper = shallowMount(ArcTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    expect(optionsWrapper.length).toBe(store.getters.getArcTypes.length);
  });

  it("checks the value of each option", () => {
    const wrapper = shallowMount(ArcTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    const arcTypes = store.getters.getArcTypes;

    optionsWrapper.wrappers.forEach((optionWrapper, i) => {
      expect(optionWrapper.attributes().value).toBe(arcTypes[i].id);
    });
  });

  it("checks the text of each option", () => {
    const wrapper = shallowMount(ArcTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    const arcTypes = store.getters.getArcTypes;

    optionsWrapper.wrappers.forEach((optionWrapper, i) => {
      expect(optionWrapper.text()).toBe(arcTypes[i].label);
    });
  });

  it("checks the change of arc type", () => {
    const wrapper = shallowMount(ArcTypeControl, { store, localVue });
    const selectWrapper = wrapper.find("select");
    const value = store.getters.getArcTypes[1].id;

    selectWrapper.setValue(value);

    expect(store.getters.getCurrentTool.arcType).toBe(value);
  });
});
