<template>
  <div class="MakerArea">
    {{selectedColor}}
    <Designer />
    <ColorPicker v-model="selectedColor" :inline="false" />
  </div>
</template>

<script setup>
import ColorPicker from "primevue/colorpicker";
// @ is an alias to /src
import Designer from "@/components/Designer.vue";
import { useStore } from "vuex";
import { computed } from "vue";
let store = useStore();
let selectedColor = computed({
  get: () => store.state.selectedColor,
  set: (nval) => store.state.selectedColor = "#" + nval,
});
</script>
