<template>
  <div class="tool-item">
    <img
      :src="getCurrentToolIconPath"
      :alt="getCurrentToolIconAlt"
      class="tool-item__tool-icon tool-icon"
    />
  </div>
</template>

<script>
export default {
  computed: {
    getCurrentToolIconPath() {
      const iconName = this.$store.getters.getCurrentTool.iconName;
      return iconName ? require(`@/assets/${iconName}`) : "";
    },
    getCurrentToolIconAlt() {
      const toolId = this.$store.getters.getCurrentTool.id;
      return toolId ? `${toolId}-tool-icon` : "";
    }
  }
};
</script>

<style lang="stylus">
.tool-item__tool-icon
  display inline-block
  height auto
  width 24px
</style>
