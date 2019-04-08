<template>
  <svg
    id="drawing-window"
    class="drawing-window"
    viewBox="0 500 1366 500"
  ></svg>
</template>

<script>
import GUI from "./../classes/GUI.js";

export default {
  name: "drawing-window",
  mounted() {
    const gui = new GUI(this.$store);
    gui.init();
  }
};
</script>

<style lang="stylus">
.drawing-window
  height 100%
  width 100%
  background-color rgba( 0, 0, 0, 0.8 )
  cursor crosshair
  overflow hidden
  user-select none

.canvas
  fill #fff

.canvas__border
  fill transparent
  stroke #000
  stroke-width 2

.main-inscription__field
  cursor text

.main-inscription__field rect
  fill transparent
  stroke #000
  stroke-width 2

.main-inscription__field text
  text-anchor middle
  fill #000
  font bold 12px Arial, sans-serif

.inscription__field_highlighted
  outline none
  rect
    fill #41b883
</style>
