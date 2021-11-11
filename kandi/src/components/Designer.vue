<template>
  <div class="designer">
    <div class="canvas" v-if="$store.state.kandi.data.length > 1">
      <canvas id="canvas" @pointermove="canvasTouch($event)">
        Your browser does not support the canvas tag. And that is genuinely
        surprising, for the love of god how old is your browser? Unless you are
        running something cool like Qute, you should update for your own safety.
      </canvas>
    </div>
    <div v-else>
      <h2>Select your kandi measurements</h2>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
let store = useStore();
// Kandi canvas data
let size = 30,
  border = 5,
  shift = size / 2;
let kandiCompute = reactive(store.state.kandi);

// Creates canvas from kandi data
let genCanvas = (isNew) => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  switch (kandiCompute) {
    /*
     *  Perler - Square and Equal
     *  Ladder - Square
     *  Multi - Vertical Shift
     *  Peyote - Horizontal Shift
     */
    // Generates canvas based on kandi type
    /*
    case "multi":
      canvas.width = canvasWidth =
        kandiCompute.column * size + border * (store.state.kandi.column - 1);
      canvas.height = canvasHeight =
        kandiCompute.row * size + border * (store.state.kandi.row - 1) + shift;
      // Iterates through all the items in kandi.data and renders them
      for (let i = 0; i < kandiCompute.data.length; i++) {
        let point = kandiCompute.data[i];
        ctx.strokeStyle = "black";
        ctx.fillStyle = point.color;
        if (point.column % 2) {
          ctx.fillRect(
            point.column * size + border * point.column,
            point.row * size + border * point.row,
            size,
            size
          );
        } else {
          ctx.fillRect(
            point.column * size + border * point.column,
            point.row * size + border * point.row + shift,
            size,
            size
          );
        }
      }
      break;
    */
    case "peyote":
    default:
      canvas.width =
        kandiCompute.cols * size + border * (kandiCompute.cols - 1) + shift;
      canvas.height =
        kandiCompute.rows * size + border * (kandiCompute.rows - 1);
      for (let i = 0; i < kandiCompute.data.length; i++) {
        let point = kandiCompute.data[i];
        ctx.strokeStyle = "black";
        if (isNew) kandiCompute.data[i].color = store.state.selectedColor;
        ctx.fillStyle = point.color;
        if (point.row % 2) {
          ctx.fillRect(
            point.column * size + border * point.column,
            point.row * size + border * point.row,
            size,
            size
          );
        } else {
          ctx.fillRect(
            point.column * size + border * point.column + shift,
            point.row * size + border * point.row,
            size,
            size
          );
        }
      }
      break;
  }
};

onMounted(() => {
  if (store.state.isNewCanvas) {
    store.state.isNewCanvas = false;
    genCanvas(true);
  } else genCanvas(false);
});

/*
 * Canvas drawing functions
 *
 */

//let canvasX, canvasY;
let canvasTouch = (e) => {
  switch (
    () => {
      if (e.view.TouchList) return e.view.TouchList.length;
      else return 0;
    }
  ) {
    case 1:
      //You should scroll here
      break;
    default:
      if (e.buttons == 1) {
        let canvas = document.getElementById("canvas");
        let rect = canvas.getBoundingClientRect(), // abs. size of element
          scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
          scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y
        let res = canvasToPoint(
          (e.clientX - rect.left) * scaleX,
          (e.clientY - rect.top) * scaleY
        );
        editCanvas(res[0], res[1]);
      }
      break;
  }
};

// Takes canvas location and converts it to kandi point data
let canvasToPoint = (x, y) => {
  let xRes = Math.floor(x / (size + border)),
    yRes = Math.floor(y / (size + border));
  return [xRes, yRes];
};

// Takes point data and writes it to kandi object, then redraws canvas
let editCanvas = (x, y) => {
  kandiCompute.data.map((item) => {
    if (x == item.column && y == item.row) {
      item.color = store.state.selectedColor;
    }
  });
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = store.state.selectedColor;
  switch (kandiCompute.type) {
    case "multi":
      if (x % 2 && y < kandiCompute.rows)
        ctx.fillRect(x * size + border * x, y * size + border * y, size, size);
      else if (y < kandiCompute.cols)
        ctx.fillRect(
          x * size + border * x,
          y * size + border * y + shift,
          size,
          size
        );
      break;
    case "peyote":
      if (y % 2 && x < kandiCompute.rows)
        ctx.fillRect(x * size + border * x, y * size + border * y, size, size);
      else if (x < kandiCompute.cols)
        ctx.fillRect(
          x * size + border * x + shift,
          y * size + border * y,
          size,
          size
        );
      break;
    default:
      ctx.fillRect(x * size + border * x, y * size + border * y, size, size);
      break;
  }
};
</script>

<style lang="scss">
.designer {
  .canvas {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
  }
}
</style>
