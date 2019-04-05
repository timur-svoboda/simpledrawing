<template>
  <div id="app">
    <tool-panel></tool-panel>
  </div>
</template>

<script>
import ToolPanel from "./components/ToolPanel.vue";

export default {
  name:"app",
  components: {
    ToolPanel
  }
};
</script>

<style lang="stylus">
html
  overflow hidden

body
  margin 0
</style>
