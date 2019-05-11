<template>
  <div class="tool-item">
    <span>Radius: {{radius / getScale}}</span>
  </div>
</template>

<script>
  export default {
    computed: {
      radius() {
        return this.$store.getters.getRadius;
      },
      getScale() {
        return this.$store.getters.getScale
      }
    }
  };
</script>