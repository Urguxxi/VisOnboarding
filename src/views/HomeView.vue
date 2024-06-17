<template>
  <div class="home">
    <img alt="SHA logo" src="../assets/SHA.png">
    <HelloWorld msg="Welcome to Shannon's Altas Onboarding App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
.home{
  margin-top: 100px;
}
</style>
