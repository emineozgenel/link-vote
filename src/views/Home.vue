<template>
  <div class="home">
    <div class="mb-4 pb-4 border-b border-gray-300">
      <router-link to="/add" class="flex items-center bg-gray-100 rounded p-2">
        <span class="bg-gray-200 border border-gray-400 rounded p-3">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </span>
        <span class="text-xl font-bold ml-6">SUBMIT A LINK</span>
      </router-link>
    </div>
    <Filter v-if="links.length > 0" />
    <div class="mb-8" v-for="(link, index) in pageOfItems" :key="index">
      <Card :link="link" />
    </div>
    <Pager :key="parentKey" :items="links" @changePage="onChangePage" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Filter from '../components/Filter.vue'
import Card from '../components/Card.vue'
import Pager from '../components/Pager.vue'

export default {
  name: 'Home',
  components: {
    Filter,
    Card,
    Pager
  },
  data () {
    return {
      pageOfItems: [],
      parentKey: 'first'
    }
  },
  computed: {
    ...mapState({
      links: state => state.links.links
    })
  },
  watch: {
    links: {
      deep: true,
      handler () {
        this.parentKey = Math.random()
      }
    }
  },
  methods: {
    ...mapActions({
      index: 'links/index'
    }),
    onChangePage (pageOfItems) {
      this.pageOfItems = pageOfItems
    }
  },
  created () {
    this.index()
  }
}
</script>
