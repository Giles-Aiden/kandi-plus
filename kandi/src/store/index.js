import { createStore } from "vuex";

const generateKandi = (kandi, color) => {
  kandi.data = [];
  if (kandi.rows > 3 && kandi.cols > 3) {
    for (let w = 0; w < kandi.cols; w++) {
      for (let h = 0; h < kandi.rows; h++) {
        kandi.data.push({
          row: h,
          column: w,
          color: color,
        });
      }
    }
  }
  return kandi;
};

export default createStore({
  state: {
    selectedColor: "000000",
    kandi: {
      rows: 4,
      cols: 4,
      type: "peyote",
      data: [],
    },
    isNewCanvas: false,
    darkMode: false,
  },
  mutations: {
    setKandi(state, payload) {
      state.kandi = payload;
    },
    genKandi(state) {
      state.kandi = generateKandi(state.kandi, state.selectedColor);
    },
  },
  // Actions can be called async, mutations cant
  actions: {
    editKandiPoint(state, payload) {
      state.kandi.data.map((point) => {
        if (point.row == payload.row && point.column == payload.column)
          return payload;
        else return point;
      });
    },
  },
  modules: {},
});
