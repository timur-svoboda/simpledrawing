<template>
  <div class="tool-item">
    <select v-model="currentLineType">
      <option
        v-for="lineType of lineTypes"
        :value="lineType.id"
        :key="lineType.id"
        >{{ lineType.label }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    currentLineType: {
      get() {
        return this.$store.getters.getCurrentTool.lineType;
      },
      set(value) {
        this.$store.commit("setLineType", value);
      }
    },
    lineTypes() {
      return this.$store.getters.getLineTypes;
    }
  }
};
</script>
