<template>
  <div class="maker">
    <div class="kandiData">
      <select v-model="type">
        <!-- 
          Perler - Square and Equal
          Multi - Vertical Shift
          Peyote - Horizontal Shift
        -->
        <option value="perler">Perler - Square</option>
        <option value="multi">Multi - Vertical</option>
        <option value="peyote" selected>Peyote - Horizontal</option>
      </select>
      <input 
        type="number"
        v-model="width"
        placeholder="columns"
        min="1"
        max="100"
      />
      <input
        type="number"
        v-model="height"
        placeholder="rows"
        min="1"
        max="100"
      />
      <button type="button" @click="genData">Create!</button>
      <br>`
      <input id="color" type="color" v-model="color" />
    </div>
    <Designer
      class="designer"
      :width="width"
      :height="height"
      :selectedColor="color"
      :type="type"
      :kandi="kandi"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Designer from "@/components/Designer.vue";

let height = ref();
let width = ref();
let color = ref("#FFFFFF")
let type = ref("multi");

/* Builds an Array of Arrays. Inside are objects containing point and color data.
 *
 * Array 1 (Row) [
 *   Array 2 (Column) [
 *     Objects (Row, Column, and Color)
 * ]]
 */
let kandi = ref(new Object());
const genData = () => {
  console.log(kandi.value);
  kandi.value.type = type;
  kandi.value.data = [];
  for (let w = 0; w < width.value; w++) {
    kandi.value.data.push([]);
    kandi.value.data[w] = [];
    for (let h = 0; h < height.value; h++) {
      kandi.value.data[w].push({
        row: h,
        column: w,
        color: color.value,
      });
    }
  }
};
</script>

<style lang="scss">
.maker {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  .kandiData {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-bottom: 1em;
    #color {
      flex-basis: 100%;
    }
  }
  .designer {
    max-width: 100%;
    overflow: auto;
  }
}
</style>
