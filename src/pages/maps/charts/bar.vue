<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from "vue-chartjs";
import { mapGetters } from "vuex";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  computed: {
    ...mapGetters("map", ["shopNames"]),
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: ["test01", "test02", "test03"],
          datasets: [{ data: [40, 20, 12] }],
        };
      },
    },
  },
  data() {
    return {
      // chartData: {
      //   labels: this.shopNames,
      //   datasets: [{ data: [40, 20, 12] }],
      // },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    };
  },
};
</script>
