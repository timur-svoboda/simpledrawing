<template>
  <div class="tool-item">
    <span>Distance: {{getDistToBaseRail / getScale}}</span>
  </div>
</template>

<script>
  export default {
    computed: {
      getDistToBaseRail() {
        return this.$store.getters.getDistToBaseRail;
      },
      getScale() {
        return this.$store.getters.getScale
      }
    }
  };
</script>