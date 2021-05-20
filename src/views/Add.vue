<template>
  <div class="add-form">
    <p>
      <router-link to="/" class="flex items-center mb-10 text-sm">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
        </svg>
        Return to Link
      </router-link>
    </p>
    <h1 class="text-xl font-bold mb-10">Add A New Link</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-5">
        <label for="title" class="block text-sm font-medium text-gray-700">Link Name:</label>
        <input
          type="text"
          v-model.trim="form.title"
          id="title"
          name="title"
          placeholder="e.g Alphabet"
          class="p-3 mt-1 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
        >
      </div>
      <div class="mb-5">
        <label for="url" class="block text-sm font-medium text-gray-700">Link URL:</label>
        <input
          type="text"
          v-model.trim="form.url"
          id="url"
          name="url"
          placeholder="e.g https://www.abc.com/"
          class="p-3 mt-1 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
        >
      </div>
      <div class="py-3 text-right">
        <button type="submit" class="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          ADD
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        title: '',
        url: ''
      }
    }
  },
  methods: {
    ...mapActions({
      create: 'links/create'
    }),
    handleSubmit () {
      if (!this.isFormValid()) {
        return
      }

      const link = {
        ...this.form,
        rating: 0,
        date: new Date()
      }

      this.create(link)

      this.$toast.success(`${this.form.title} added.`, {
        position: 'top',
        duration: 3000
      })

      this.form.title = ''
      this.form.url = ''
    },
    isFormValid () {
      if (this.form.title && this.form.url) {
        return true
      }

      this.$toast.error('Please do not leave fields blank!', {
        position: 'top',
        duration: 2000
      })

      return false
    }
  }
}
</script>
