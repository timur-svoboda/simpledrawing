<template>
  <div class="tool-item">
    Distance: <span class="dist">{{ distToBaseRail / scale }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    distToBaseRail() {
      return this.$store.getters.getDistToBaseRail;
    },
    scale() {
      return this.$store.getters.getScale;
    }
  }
};
</script>
