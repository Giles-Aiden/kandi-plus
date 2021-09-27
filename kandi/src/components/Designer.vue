<template>
  <div
    class="designer"
    @pointerdown="onTouch($event, true)"
    @pointerup="onTouch($event, false)"
    @pointerleave="onTouch($event, false)"
    @pointermove="onTouch($event)"
  >
    <div class="kandi perler" v-if="kandi.data != null && kandi.data.length > 0 && kandi.type == 'perler'">
      <div class="column" v-for="(i, column) in kandi.data" :key="column">
        <div class="row" v-for="(x, row) in i" :id="row" :key="row">
          <button
            :style="{ backgroundColor: x.color }"
            class="button"
            :data-col="column"
            :data-row="row"
          >
            {{ i.length - row }}
          </button>
        </div>
      </div>
    </div>
    <div class="kandi multi" v-else-if="kandi.data != null && kandi.data.length > 0 && kandi.type == 'multi'">
      <div class="column" v-for="(i, column) in kandi.data" :key="column">
        <div v-if="!(column % 2)">
          <div class="row" v-for="(x, row) in i" :id="row" :key="row">
            <button
              :style="{ backgroundColor: x.color }"
              class="button"
              :data-col="column"
              :data-row="row"
            >
              {{ multiCalc(i.length - row, false) }}
            </button>
          </div>
        </div>
        <div class="shift" v-else>
          <div class="row" v-for="(x, row) in i" :id="row" :key="row">
            <button
              :style="{ backgroundColor: x.color }"
              class="button"
              :data-col="column"
              :data-row="row"
            >
              {{ multiCalc(i.length - row, true) }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="kandi peyote" v-else-if="kandi.data != null && kandi.data.length > 0 && kandi.type == 'peyote'">
      <div class="column" v-for="(i, column) in kandi.data" :key="column">
        <div v-if="!(column % 2)">
          <div class="row" v-for="(x, row) in i" :id="row" :key="row">
            <button
              :style="{ backgroundColor: x.color }"
              class="button"
              :data-col="column"
              :data-row="row"
            >
              {{ multiCalc(i.length - row, false) }}
            </button>
          </div>
        </div>
        <div class="shift" v-else>
          <div class="row" v-for="(x, row) in i" :id="row" :key="row">
            <button
              :style="{ backgroundColor: x.color }"
              class="button"
              :data-col="column"
              :data-row="row"
            >
              {{ multiCalc(i.length - row, true) }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Select your kandi measurements</h2>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, computed } from "vue";

let props = defineProps({
  width: Number,
  height: Number,
  selectedColor: String,
  type: String,
  kandi: Object,
});
let kandi = computed(() => {
  return props.kandi;
});

let active = false;
/*
let kandi = reactive({
  type: "",
  title: "",
  description: "",
  author: "",
  data: [],
});
*/
// Calculates the numbers displayed on each button.
// Takes an input number and bool stating if it's on an even or odd row
const multiCalc = (val, even) => {
  if (!even && val > 1) return val * 2 - 1;
  else if (val > 1) return (val - 1) * 2;
  else return val;
};

// Edits point data
const editData = (x, y, color) => {
  kandi.value.data[x][y].color = color;
};

const onTouch = (e, toggle) => {
  if (toggle != undefined) active = toggle;
  switch (e.pointerType) {
    case "touch":
      // If using the default target method, only the first target is registered with touch.
      // Here we instead take the current touch location and try to find the element below that.
      if (active && e.target.nodeName == "BUTTON") {
        let ele = document.elementFromPoint(e.clientX, e.clientY);
        editData(
          ele.attributes["data-col"].value,
          ele.attributes["data-row"].value,
          props.selectedColor
        );
      }
      break;
    default:
      if (active && e.target.nodeName == "BUTTON") {
        editData(
          e.target.attributes["data-col"].value,
          e.target.attributes["data-row"].value,
          props.selectedColor
        );
      }
  }
};

defineExpose({});
</script>

<style lang="scss">
/*
 *  Perler - Square and Equal
 *  Multi - Vertical Shift
 *  Peyote - Horizontal Shift
*/
.kandi.perler {
  touch-action: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  .column {
    display: flex;
    flex-flow: column nowrap;
    .row > button {
      width: 2em;
      height: 2em;
      border: 1px solid black;
      border-radius: 0.5em;
      color: purple;
    }
  }
}
.kandi.multi {
  touch-action: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  .column {
    display: flex;
    flex-flow: column nowrap;
    .row > button {
      width: 2em;
      height: 2em;
      border: 1px solid black;
      border-radius: 0.5em;
    }
  }
  .shift {
    padding-top: 0.9em;
  }
}
.kandi.peyote {
  touch-action: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  .column > div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    .row > button {
      width: 2em;
      height: 2em;
      border: 1px solid black;
      border-radius: 0.5em;
    }
  }
  .shift {
    padding-left: 1.5em;
  }
}
</style>
