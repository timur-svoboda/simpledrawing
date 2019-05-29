import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import DistToBaseRailControl from "@/components/tool-controllers/DistToBaseRailControl.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("DistToBaseRailControl.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      getDistToBaseRail() {
        return 40;
      },
      getScale() {
        return 4;
      }
    };

    store = new Vuex.Store({
      getters
    });
  });

  it("checks distance", () => {
    const wrapper = shallowMount(DistToBaseRailControl, { store, localVue });
    const distWrapper = wrapper.find(".dist");
    expect(distWrapper.text()).toBe("10");
  });
});
