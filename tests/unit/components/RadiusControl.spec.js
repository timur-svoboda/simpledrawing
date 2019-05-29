import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import RadiusControl from "@/components/tool-controllers/RadiusControl.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("RadiusControl.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      getRadius() {
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
    const wrapper = shallowMount(RadiusControl, { store, localVue });
    const distWrapper = wrapper.find(".radius");
    expect(distWrapper.text()).toBe("10");
  });
});
