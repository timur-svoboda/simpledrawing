<template>
  <svg id="drawing-window" class="drawing-window"></svg>
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

.hide
  display: none

.canvas__sheet
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

.radialnav
  user-select none
  &-sector
    fill rgba( 65, 184, 131, 1 )
    stroke rgba( 255, 255, 255, 0.1 )
    stroke-width 1px
    transition all 0.4s
    &.active
      fill rgba( 255, 255, 255, 0.9 )
  &-icon
    pointer-events none
    fill #eee
    transition all 0.4s
    &.active
      fill #333
  &-hint
    -webkit-font-smoothing antialiased
    text-anchor middle
    font: bold 14px Arial, sans-serif
    fill #41b883
    transition all 0.4s
    opacity 0
    &_hide
      display none
    &.active
      opacity 1

.canvas__rail
  stroke #35495e
  stroke-width 1
  &.highlighted
    stroke #41b883

.canvas__line
  stroke #000
  &.highlighted
    stroke #41b883
  &_solid-bold
    stroke-width 2
  &_solid-thin
    stroke-width 1
  &_dashed
    stroke-width 1
    stroke-dasharray 16,8
  &_dashed-dotted-thin
    stroke-width 1
    stroke-dasharray 80,16,1,16
</style>
