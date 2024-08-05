<script setup>
import DeviceTable from './components/DeviceTable.vue';
import Header from '../public/Header.vue'
</script>
<template>
  <Header></Header>
  <div style="min-width: 650px;">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
</style>
