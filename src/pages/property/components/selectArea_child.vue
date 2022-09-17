<template>
  <a-select v-model="index" default-value="0" @change="onSelect">
    <a-select-option
      :key="index"
      v-for="(item, index) in options"
      :value="index"
    >
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: "Select",
  props: ["value", "options"],
  methods: {
    onSelect(value) {
      // this.$emit(value);
    },
  },
  computed: {
    index: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
