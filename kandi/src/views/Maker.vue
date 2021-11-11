<template>
  <div class="maker">
    {{ store.state.selectedColor }}
    <div class="col-contain">
      <div class="col">
        <p>{{ store.state.kandi.rows }}<br />beads<br />tall</p>
        <Slider
          v-model="store.state.kandi.rows"
          orientation="vertical"
          :min="4"
          :max="100"
          style="height: 5em"
          @slideend="store.commit('genKandi')"
        />
      </div>
      <div class="col">
        <p>{{ store.state.kandi.cols }}<br />beads long</p>
        <Slider
          v-model="store.state.kandi.cols"
          :min="4"
          :max="100"
          style="width: 5em"
          @slideend="store.commit('genKandi')"
        />
        <img
          v-if="store.state.kandi.type == 'peyote'"
          src="@/assets/peyote_kandi.svg"
          :style="{ width: '10em' }"
        />
      </div>
      <div class="col">
        <p>Color</p>
        <ColorPicker v-model="selectedColor" :inline="false" />
      </div>
    </div>
    <div>
      <transition
        enter-active-class="animate__animated animate__jackInTheBox"
      >
        <Button v-if="store.state.kandi.data.length > 0" icon="pi pi-check" @click="gotoDesigner(true)" />
      </transition>
    </div>
  </div>
</template>

<script setup>
//import Designer from "@/components/Designer.vue";
import Slider from "primevue/slider";
import Button from "primevue/button";
import ColorPicker from "primevue/colorpicker";
import { useStore } from "vuex";
import { useRouter } from "vue-router"; 
import { computed } from "vue";
let router = useRouter();
let store = useStore();
let selectedColor = computed({
  get: () => store.state.selectedColor,
  set: (nval) => store.state.selectedColor = "#" + nval,
});
let gotoDesigner = (isNew) => {
  store.state.isNewCanvas = isNew;
  router.push({
    name: 'designer',
  });
}
</script>

<style lang="scss">
.maker {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  overflow: hidden;
  .col-contain {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    .col,
    .row {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      & > * {
        margin: 0.2em;
      }
    }
    .row {
      flex-flow: row nowrap;
    }
  }
}
</style>
