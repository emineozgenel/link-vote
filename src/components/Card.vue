<template>
  <div class="card flex p-2 mb-3 relative rounded h-28">
    <button class="remove absolute -right-1 -top-3 bg-red-500 rounded-full text-white p-1 shadow-lg hidden"  @click="showConfirmDeleteModal()">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    <modal
      v-show="isConfirmDeleteModalVisible"
      modalHeadline="Do you want to remove:"
      :deleteMessage="link.title"
      @deleteRecordEvent="deleteCustomers(link.title)"
      @close="closeConfirmDeleteModal"
    />
    <div class="flex items-center justify-center flex-col flex-shrink-0 h-full w-20 lg:w-24 rounded-md border border-gray-400 bg-gray-200">
      <div class="font-black text-xl">{{ link.rating }}</div>
      <div class="text-xs lg:text-base">POINTS</div>
    </div>
    <div class="ml-4 flex flex-col justify-between w-full overflow-hidden">
      <div class="flex flex-col">
        <span class="font-bold lg:text-2xl">{{ link.title }}</span>
        <p class="overflow-hidden whitespace-nowrap overflow-ellipsis hover:underline hover:text-blue-500">
          <a href="{{ link.url }}" class="text-gray-400 text-sm" target="blank">({{ link.url }})</a>
        </p>
      </div>
      <div class="flex flex-row justify-between items-end">
        <button class="flex items-center py-1 pr-3 focus:outline-none text-sm text-gray-500 font-semibold" @click="upVote(link.title)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          Up Vote
        </button>
        <button class="flex items-center py-1 pr-3 focus:outline-none text-sm text-gray-500 font-semibold" @click="downVote(link.title)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          Down Vote
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from './Modal'

export default {
  components: { Modal },
  data () {
    return {
      isConfirmDeleteModalVisible: false
    }
  },
  props: {
    link: Object
  },
  methods: {
    ...mapActions({
      upVote: 'links/upVote',
      downVote: 'links/downVote',
      delete: 'links/delete'
    }),
    showConfirmDeleteModal () {
      this.isConfirmDeleteModalVisible = true
    },
    closeConfirmDeleteModal () {
      this.isConfirmDeleteModalVisible = false
    },
    deleteCustomers (title) {
      this.delete(title)
      this.isConfirmDeleteModalVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  &:hover {
    @apply bg-gray-100;
    .remove {
      display: block;
    }
  }
}
</style>
