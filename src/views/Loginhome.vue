<script setup>
import HeaderVue from '../components/Header.vue';
import HeroVue from '../components/Hero.vue';
import FooterVue from '../components/Footer.vue';

</script>

<template>
  <div class="Homepage2">
    <HeaderVue v-bind:Login="true" />
    <HeroVue />
    <FooterVue />
    <Router-View />
  </div>

</template>

<style scoped>
.Homepage2 {
  background-color: gray;
}
</style>