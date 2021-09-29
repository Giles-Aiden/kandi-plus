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
  canvasWidth = props.width * size + border * (props.width - 1),
  canvasHeight = props.height * size + border * (props.height - 1);

let genCanvas = () => {
  let canvas = document.getElementById("canvas");
  canvas.width = canvasWidth = props.width * size + border * (props.width - 1);
  canvas.height = canvasHeight =
    props.height * size + border * (props.height - 1);
  let ctx = canvas.getContext("2d");
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
};

//let canvasX, canvasY;
let canvasTouch = (e) => {
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
  ctx.fillRect(x * size + border * x, y * size + border * y, size, size);
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
