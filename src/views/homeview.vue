<script setup>
import HeaderVue from '../components/Header.vue';
import HeroVue from '../components/Hero.vue';
import FooterVue from '../components/Footer.vue';

</script>

<template>
  <div class="Homepage">
    <HeaderVue v-bind:Login="false" />
    <HeroVue />
    <FooterVue />
    <Router-View />
  </div>

</template>

<style scoped>
.Homepage {
  background-color: gray;
}
</style>