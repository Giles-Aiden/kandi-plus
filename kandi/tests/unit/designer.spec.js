import { shallowMount } from "@vue/test-utils";
import Maker from "@/views/Maker.vue";

const wrapper = shallowMount(Maker);
const [width, height] = [3, 2];
wrapper.vm.width = width;
wrapper.vm.height = height;
let kandi = wrapper.vm.genData();

describe("Kandi designer data creation", () => {
  test("Input width and height returns array of obj", () => {
    expect(kandi.data).toHaveLength(width * height);
  });

  let cords = [];
  test.each(kandi.data)("Checking for duplicate cords in, %O", (item) => {
    expect(cords).not.toContainEqual({ row: item.row, column: item.column });
    cords.push({ row: item.row, column: item.column });
  });
});
