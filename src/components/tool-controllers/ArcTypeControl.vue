<template>
  <div class="tool-item">
    <select v-model="currentArcType">
      <option
        v-for="arcType of arcTypes"
        :value="arcType.id"
        :key="arcType.id"
        >{{ arcType.label }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    currentArcType: {
      get() {
        return this.$store.getters.getCurrentTool.arcType;
      },
      set(value) {
        this.$store.commit("setArcType", value);
      }
    },
    arcTypes() {
      return this.$store.getters.getArcTypes;
    }
  }
};
</script>
