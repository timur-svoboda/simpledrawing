<template>
  <div class="tool-item">
    <select v-model="currentStrokeType">
      <option
        v-for="strokeType of strokeTypes"
        :value="strokeType.id"
        :key="strokeType.id"
        >{{ strokeType.label }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    currentStrokeType: {
      get() {
        return this.$store.getters.getCurrentTool.strokeType;
      },
      set(value) {
        this.$store.commit("setStrokeType", value);
      }
    },
    strokeTypes() {
      return this.$store.getters.getStrokeTypes;
    }
  }
};
</script>
