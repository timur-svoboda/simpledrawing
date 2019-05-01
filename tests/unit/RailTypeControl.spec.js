import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import RailTypeControl from "./../../src/components/tool-controllers/RailTypeControl.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("RailTypeControl.vue", () => {
  let state;
  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    state = {
      currentTool: {
        railType: "vertical"
      }
    };

    getters = {
      getRailTypes() {
        return [
          {
            label: "Vertical rail",
            id: "vertical"
          },
          {
            label: "Horizontal rail",
            id: "horizontal"
          }
        ];
      },
      getCurrentTool(state) {
        return state.currentTool;
      }
    };

    mutations = {
      setRailType(state, payload) {
        const curTool = state.currentTool;

        if (curTool.railType !== payload) {
          curTool.railType = payload;
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
    const wrapper = shallowMount(RailTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    expect(optionsWrapper.length).toBe(store.getters.getRailTypes.length);
  });

  it("checks the value of each option", () => {
    const wrapper = shallowMount(RailTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    const railTypes = store.getters.getRailTypes;

    optionsWrapper.wrappers.forEach((optionWrapper, i) => {
      expect(optionWrapper.attributes().value).toBe(railTypes[i].id);
    });
  });

  it("checks the text of each option", () => {
    const wrapper = shallowMount(RailTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    const railTypes = store.getters.getRailTypes;

    optionsWrapper.wrappers.forEach((optionWrapper, i) => {
      expect(optionWrapper.text()).toBe(railTypes[i].label);
    });
  });

  it("checks the change of rail type", () => {
    const wrapper = shallowMount(RailTypeControl, { store, localVue });
    const selectWrapper = wrapper.find("select");
    const value = store.getters.getRailTypes[1].id;

    selectWrapper.setValue(value);

    expect(store.getters.getCurrentTool.railType).toBe(value);
  });
});
