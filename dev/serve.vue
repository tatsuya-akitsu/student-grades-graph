<script>
import Vue from 'vue';
import StudentGradesGraph from '@/student-grades-graph.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    StudentGradesGraph
  }
});
</script>

<template>
  <div id="app">
    <student-grades-graph />
  </div>
</template>
