<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  mixins: [Line, mixins.reactiveProp],
  props: {
    chartData: { type: Object, required: true, default: () => {} },
    options: { type: Object, required: true, default: () => {} }
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart(this.chartData, this.options)
    })
  }
}
</script>
