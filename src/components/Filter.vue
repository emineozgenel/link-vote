<template>
  <div class="mb-4 w-1/2">
    <select
      v-model="order"
      class="mt-1 block w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="">Order by</option>
      <option value="most">Most Voted (Z->A)</option>
      <option value="less">Less Voted (A->Z)</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right .5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
</style>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      order: ''
    }
  },
  methods: {
    ...mapActions({
      sort: 'links/sort'
    })
  },
  watch: {
    order: function (val) {
      this.sort(val)
    }
  }
}
</script>
