<template>
  <nav id="tool-panel" class="tool-panel">
    <div class="tool-panel__tool-item tool-item">
      <img
        src="../assets/move.svg"
        alt="move-tool-icon"
        class="tool-item__tool-icon tool-icon"
      />
    </div>
  </nav>
</template>

<script>
export default {
  name: "tool-panel"
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
  margin-right 10px

.tool-item__tool-icon
  display inline-block
  height auto
  width 24px
  
  
</style>
