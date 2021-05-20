<template>
  <Header />
  <main class="max-w-md mx-auto px-2 pb-10">
    <router-view/>
  </main>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
