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
import LineTypeControl from "./tool-controllers/LineTypeControl.vue";

/**
 * @vue-computed {Array} currentToolControllers Returns the list of the current tool controllers
 */
export default {
  name: "tool-panel",
  components: {
    IconControl,
    RailTypeControl,
    LineTypeControl
  },
  computed: {
    currentToolControllers() {
      return this.$store.getters.getCurrentTool.toolControllers;
    }
  }
};
</script>

<style lang="stylus" scoped>
.tool-panel
  display flex
  align-items center
  padding 15px 20px
  border-bottom 1px solid rgba(0,0,0,0.5)
  user-select none

.tool-panel__tool-item
  display flex
  align-items center
  margin-right 20px
</style>
