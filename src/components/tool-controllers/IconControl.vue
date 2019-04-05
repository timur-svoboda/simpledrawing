<template>
  <div class="tool-item">
    <img
    :src="currentToolIconPath"
    :alt="currentToolIconAlt"
    class="tool-item__tool-icon tool-icon"
    />
  </div>
</template>

<script>
/**
 * @vue-computed {string} currentToolIconPath Returns the path to the current tool icon
 * @vue-computed {string} currentToolIconAlt Returns the string for the alt attribute
 */
export default {
  computed: {
    currentToolIconPath() {
      const iconName = this.$store.getters.getCurrentTool.icon;
      return iconName ? require(`./../../assets/${iconName}`) : ''
    },
    currentToolIconAlt() {
      return `${this.$store.getters.getCurrentTool.id}-tool-icon`;
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

