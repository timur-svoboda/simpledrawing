import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ToolPanel from "@/components/ToolPanel.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ToolPanel.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      getCurrentTool() {
        return {
          toolControllers: ["IconControl"]
        };
      }
    };

    store = new Vuex.Store({
      getters
    });
  });

  it("Checks count of components", () => {
    const wrapper = shallowMount(ToolPanel, { store, localVue });
    const components = wrapper.findAll(".tool-panel__tool-item");
    expect(components.length).toBe(wrapper.vm.currentToolControllers.length);
  });
});
