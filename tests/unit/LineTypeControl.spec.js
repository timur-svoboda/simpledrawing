import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LineTypeControl from "./../../src/components/tool-controllers/LineTypeControl.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("LineTypeControl.vue", () => {
  let state;
  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    state = {
      currentTool: {
        lineType: "solid-bold"
      }
    };

    getters = {
      getLineTypes() {
        return [
          {
            label: "Solid bold line",
            id: "solid-bold"
          },
          {
            label: "Dashed line",
            id: "dashed"
          },
          {
            label: "Solid thin line",
            id: "solid-thin"
          },
          {
            label: "Dashed dotted thin line",
            id: "dashed-dotted-thin"
          }
        ];
      },
      getCurrentTool(state) {
        return state.currentTool;
      }
    };

    mutations = {
      setLineType(state, payload) {
        const curTool = state.currentTool;

        if (curTool.lineType !== payload) {
          curTool.lineType = payload;
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
    const wrapper = shallowMount(LineTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    expect(optionsWrapper.length).toBe(store.getters.getLineTypes.length);
  });

  it("checks the value of each option", () => {
    const wrapper = shallowMount(LineTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    const lineTypes = store.getters.getLineTypes;

    optionsWrapper.wrappers.forEach((optionWrapper, i) => {
      expect(optionWrapper.attributes().value).toBe(lineTypes[i].id);
    });
  });

  it("checks the text of each option", () => {
    const wrapper = shallowMount(LineTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    const lineTypes = store.getters.getLineTypes;

    optionsWrapper.wrappers.forEach((optionWrapper, i) => {
      expect(optionWrapper.text()).toBe(lineTypes[i].label);
    });
  });

  it("checks the change of line type", () => {
    const wrapper = shallowMount(LineTypeControl, { store, localVue });
    const selectWrapper = wrapper.find("select");
    const value = store.getters.getLineTypes[1].id;

    selectWrapper.setValue(value);

    expect(store.getters.getCurrentTool.lineType).toBe(value);
  });
});
