<script>
import Vue from 'vue';
import StudentConclusionsGraph from '@/student-conclusions-graph.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    StudentConclusionsGraph
  }
});
</script>

<template>
  <div id="app">
    <student-conclusions-graph />
  </div>
</template>
