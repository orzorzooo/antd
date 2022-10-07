<template>
  <vue-editor
    v-model="form.description"
    :editor-toolbar="customToolbar"
  ></vue-editor>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  computed: {
    ...mapGetters("property", ["form"]),
  },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
    };
  },
};
</script>
