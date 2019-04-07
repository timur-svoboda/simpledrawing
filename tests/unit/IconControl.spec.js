import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import IconControl from "./../../src/components/tool-controllers/IconControl.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("IconControl.vue", () => {
  let getters;
  let store;
  beforeEach(() => {
    getters = {
      getCurrentTool() {
        return {
          id: "select",
          iconName: "select.svg"
        };
      }
    };

    store = new Vuex.Store({
      getters
    });
  });

  it("Renders state.getCurrentToolIconPath in img tag in src attribute", () => {
    const wrapper = shallowMount(IconControl, { store, localVue });
    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe(wrapper.vm.getCurrentToolIconPath);
  });

  it("Renders state.getCurrentToolIconAlt in img tag in alt attribute", () => {
    const wrapper = shallowMount(IconControl, { store, localVue });
    const img = wrapper.find("img");
    expect(img.attributes("alt")).toBe(wrapper.vm.getCurrentToolIconAlt);
  });
});
