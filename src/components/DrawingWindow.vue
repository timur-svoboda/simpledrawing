<template>
  <svg id="drawing-window" class="drawing-window"></svg>
</template>

<script>
export default {
  name: "drawing-window"
}
</script>

<style lang="stylus">
.drawing-window
  height 100%
  width 100%
  background-color rgba( 0, 0, 0, 0.8 )
  cursor crosshair
  overflow hidden
</style>