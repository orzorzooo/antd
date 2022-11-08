<template>
  <div>
    <slot name="badge"> </slot>
    <div class="orz-img mb-3" slot="cover" @click="modal = true">
      <img
        :src="img[customID ? customID : 'id'] | thumbnail"
        alt=""
        class="orz-img-wrapper object-cover w-full h-full rounded-2xl"
      />
    </div>
    <slot name="actions"></slot>
  </div>
</template>
<script>
import { URL, ASSETS_URL, findAll, create, remove } from "@/api/files";
export default {
  props: ["img", "customID"],
  filters: {
    thumbnail(id) {
      return `${ASSETS_URL}/${id}?quality=25&width=300`;
    },
    title(value) {
      return value.length > 8 ? value.substring(0, 8) + "..." : value;
    },
  },
};
</script>
<style scoped>
.orz-img {
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative;
}
.orz-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
