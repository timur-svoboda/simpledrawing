<template>
  <nav id="tool-panel" class="tool-panel">
    <component
      class="tool-panel__tool-item"
      v-for="controller of currentToolControllers"
      :is="controller"
      :key="controller.id"
    ></component>
  </nav>
</template>

<script>
import IconControl from "./tool-controllers/IconControl.vue";
import RailTypeControl from "./tool-controllers/RailTypeControl.vue";
import DistToBaseRailControl from "./tool-controllers/DistToBaseRailControl.vue";
import StrokeTypeControl from "./tool-controllers/StrokeTypeControl.vue";
import ArcTypeControl from "./tool-controllers/ArcTypeControl.vue";
import RadiusControl from "./tool-controllers/RadiusControl.vue";

/**
 * @vue-computed {Array} currentToolControllers Returns the list of the current tool controllers
 */
export default {
  name: "tool-panel",
  components: {
    IconControl,
    RailTypeControl,
    DistToBaseRailControl,
    StrokeTypeControl,
    ArcTypeControl,
    RadiusControl
  },
  computed: {
    currentToolControllers() {
      return this.$store.getters.getCurrentTool.toolControllers;
    }
  }
};
</script>

<style lang="stylus">
.tool-panel
  display flex
  align-items center
  padding 0 20px
  border-bottom 1px solid rgba(0,0,0,0.5)
  user-select none
  height 60px

.tool-panel__tool-item
  display flex
  align-items center
  margin-right 20px

.tool-panel__select
  border-radius 3px
  padding 5px
  font-family: Arial, sans-serif
  &:focus
    outline none
</style>
