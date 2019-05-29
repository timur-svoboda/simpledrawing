import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import StrokeTypeControl from "@/components/tool-controllers/StrokeTypeControl.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("StrokeTypeControl.vue", () => {
  let state;
  let getters;
  let mutations;
  let store;

  beforeEach(() => {
    state = {
      currentTool: {
        strokeType: "solid-bold"
      }
    };

    getters = {
      getStrokeTypes() {
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
      setStrokeType(state, payload) {
        const curTool = state.currentTool;

        if (curTool.strokeType !== payload) {
          curTool.strokeType = payload;
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
    const wrapper = shallowMount(StrokeTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    expect(optionsWrapper.length).toBe(store.getters.getStrokeTypes.length);
  });

  it("checks the value of each option", () => {
    const wrapper = shallowMount(StrokeTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    const strokeTypes = store.getters.getStrokeTypes;

    optionsWrapper.wrappers.forEach((optionWrapper, i) => {
      expect(optionWrapper.attributes().value).toBe(strokeTypes[i].id);
    });
  });

  it("checks the text of each option", () => {
    const wrapper = shallowMount(StrokeTypeControl, { store, localVue });
    const optionsWrapper = wrapper.findAll("option");
    const strokeTypes = store.getters.getStrokeTypes;

    optionsWrapper.wrappers.forEach((optionWrapper, i) => {
      expect(optionWrapper.text()).toBe(strokeTypes[i].label);
    });
  });

  it("checks the change of arc type", () => {
    const wrapper = shallowMount(StrokeTypeControl, { store, localVue });
    const selectWrapper = wrapper.find("select");
    const value = store.getters.getStrokeTypes[1].id;

    selectWrapper.setValue(value);

    expect(store.getters.getCurrentTool.strokeType).toBe(value);
  });
});
