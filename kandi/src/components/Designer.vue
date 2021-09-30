<template>
  <div class="designer">
    <button @click="genCanvas">Generate Canvas</button>
    <div class="canvas" v-if="props.kandi">
      <canvas id="canvas" @pointermove="canvasTouch($event)"
        >Your browser doesn't support the canvas tag. And that is genuinely
        surprising, for the love of god how old is your browser? You should
        update for your own safety.
      </canvas>
    </div>
    <div v-else>
      <h2>Select your kandi measurements</h2>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

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

let size = 30,
  border = 5,
  shift = size / 2,
  canvasWidth = props.width * size + border * (props.width - 1),
  canvasHeight = props.height * size + border * (props.height - 1);

let genCanvas = () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  switch (props.type) {
    case "multi":
      canvas.width = canvasWidth =
        props.width * size + border * (props.width - 1);
      canvas.height = canvasHeight =
        props.height * size + border * (props.height - 1) + shift;
      for (let i = 0; i < kandi.value.data.length; i++) {
        let point = kandi.value.data[i];
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
    case "peyote":
      canvas.width = canvasWidth =
        props.width * size + border * (props.width - 1) + shift;
      canvas.height = canvasHeight =
        props.height * size + border * (props.height - 1);
      for (let i = 0; i < kandi.value.data.length; i++) {
        let point = kandi.value.data[i];
        ctx.strokeStyle = "black";
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
    default:
      canvas.width = canvasWidth =
        props.width * size + border * (props.width - 1);
      canvas.height = canvasHeight =
        props.height * size + border * (props.height - 1);
      for (let i = 0; i < kandi.value.data.length; i++) {
        let point = kandi.value.data[i];
        ctx.strokeStyle = "black";
        ctx.fillStyle = point.color;
        ctx.fillRect(
          point.column * size + border * point.column,
          point.row * size + border * point.row,
          size,
          size
        );
      }
      break;
  }
};

//let canvasX, canvasY;
let canvasTouch = (e) => {
  switch (e.view.TouchList.length) {
    case 1:
      console.log("You should scroll here");
      break;
    default:
      if (e.buttons == 1) {
        let canvas = document.getElementById("canvas");
        let rect = canvas.getBoundingClientRect(), // abs. size of element
          scaleX = canvasWidth / rect.width, // relationship bitmap vs. element for X
          scaleY = canvasHeight / rect.height; // relationship bitmap vs. element for Y
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
  kandi.value.data.map((item) => {
    if (x == item.column && y == item.row) {
      item.color = props.selectedColor;
    }
  });
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = props.selectedColor;
  switch (props.type) {
    case "multi":
      if (x % 2 && y < props.height)
        ctx.fillRect(x * size + border * x, y * size + border * y, size, size);
      else if (y < props.height)
        ctx.fillRect(
          x * size + border * x,
          y * size + border * y + shift,
          size,
          size
        );
      break;
    case "peyote":
      if (y % 2 && x < props.width)
        ctx.fillRect(x * size + border * x, y * size + border * y, size, size);
      else if (x < props.width)
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
/*
 *  Perler - Square and Equal
 *  Multi - Vertical Shift
 *  Peyote - Horizontal Shift
*/
.designer {
  .canvas {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    #canvas {
    }
  }
}
</style>
