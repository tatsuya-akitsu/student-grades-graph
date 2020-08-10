<template>
  <div>
    <template v-if="!state.isMobile">
      <line-chart
        :chart-data="chartData"
        :options="options"
        :width="422"
        :height="height"
      ></line-chart>
    </template>
    <template v-else>
      <line-chart
        :chart-data="chartData"
        :options="options"
        :height="height"
      ></line-chart>
    </template>
  </div>
</template>

<script>
import { defineComponent, reactive, computed } from '@vue/composition-api'
import LineChart from '@/LineChart'
import { variables } from '@/config/variables.js'

export default defineComponent({
  components: {
    LineChart
  },

  props: {
    chartData: { type: Array, required: true, default: () => [] }
  },

  setup(props, context) {
    const state = reactive({
      options: {},
      mql: window.matchMedia('(max-width: 768px)'),
      height: 0,
      isMobile: false
    })

    state.myData = createGraphData(
      props.summaryData,
      props.monthlyData,
      contLabel.value,
      contKey.value
    )

    state.options = variables.OPTIONS

    if (state.mql.matches) {
      state.height = 126
      state.isMobile = true
    } else {
      state.height = 124
      state.isMobile = false
    }

    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped>
div {
  width: 57%;

  @media screen and(max-width: 768px) {
    width: 100%;
  }
}
</style>
