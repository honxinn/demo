<template>
  <div class="apex-chart">
    <VueApexCharts
      :options="chartOptions"
      :series="chartSeries"
      :type="chartType"
      :height="chartHeight"
      :width="chartWidth"
    />
  </div>
</template>
<script setup>
import VueApexCharts from "vue3-apexcharts";
</script>
<script>

export default {
  props: {
    chartOptions: {
      type: Object,
      default: {}
    },
    chartSeries: {
      type: Array,
      default: []
    },
    chartType: {
      type: String,
      default: 'area'
    },
    chartHeight: {
      type: Number,
      default: 100
    },
    chartWidth: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {

    }
  },
  mounted() {
  }
}
</script>

<style>
</style>