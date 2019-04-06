import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ToolPanel from "./../../src/components/ToolPanel.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ToolPanel.vue", () => {
  beforeEach(() => {
    const getters = {
      getCurrentTool() {
        return {
          toolControllers: ["IconControl"]
        };
      }
    };

    const store = new Vuex.Store({
      getters
    });
  });

  it("Checks count of components", () => {
    const wrapper = shallowMount(ToolPanel, { store, localVue });
    const components = wrapper.findAll(".tool-panel__tool-item");
    expect(components.length).toBe(wrapper.vm.currentToolControllers.length);
  });
});
