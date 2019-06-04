<template>
  <div id="app">
    <guide></guide>
    <tool-panel></tool-panel>
    <drawing-window></drawing-window>
  </div>
</template>

<script>
import ToolPanel from "./components/ToolPanel.vue";
import DrawingWindow from "./components/DrawingWindow.vue";
import Guide from "./components/Guide.vue";

export default {
  name: "app",
  components: {
    ToolPanel,
    DrawingWindow,
    Guide
  }
};
</script>

<style lang="stylus">
html
  overflow hidden

body
  margin 0

#app
  display flex
  flex-direction column
  height 100vh
  width 100vw
</style>
