<template>
  <div class="tool-item">
    <select v-model="currentRailType">
      <option v-for="railType of railTypes" :value="railType.id" :key="railType.id" >{{railType.label}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    computed: {
      currentRailType: {
        get() {
          return this.$store.getters.getCurrentTool.railType;
        },
        set(value) {
          this.$store.commit("setRailType", value);
        }
      },
      railTypes() {
        return this.$store.getters.getRailTypes;
      }
    }
  }
</script>