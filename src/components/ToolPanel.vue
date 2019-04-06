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

/**
 * @vue-computed {Array} currentToolControllers Returns the list of the current tool controllers
 */
export default {
  name: "tool-panel",
  components: {
    IconControl
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
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2)

.tool-panel__tool-item
  display flex
  align-items center
  margin-right 20px
</style>
