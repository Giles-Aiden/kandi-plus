<template>
  <div class="maker">
    <div class="kandiData">
      <form @keyup.enter="genData">
        <select v-model="type">
          <!-- 
            Perler - Square and Equal
            Multi - Vertical Shift
            Peyote - Horizontal Shift
          -->
          <option value="perler">Perler - Square</option>
          <option value="ladder">Ladder - Square</option>
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
        <input id="color" type="color" v-model="color" />
        <button type="button" @click="genData">Create!</button>
      </form>
    </div>
    <div class="designContain">
      <Designer
        class="designer"
        :width="parseInt(width)"
        :height="parseInt(height)"
        :selectedColor="color"
        :type="type"
        :kandi="kandi"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Designer from "@/components/Designer.vue";

let height = ref();
let width = ref();
let color = ref("#FFFFFF");
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
  kandi.value.type = type;
  kandi.value.data = [];
  for (let w = 0; w < width.value; w++) {
    for (let h = 0; h < height.value; h++) {
      kandi.value.data.push({
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
  overflow-x: hidden;
  .kandiData {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding-bottom: 1em;
    #color {
      flex-basis: 100%;
    }
  }
  .designContain {
    overflow: auto;
    border: 1px solid blue;
    touch-action: none;
  }
}
</style>
