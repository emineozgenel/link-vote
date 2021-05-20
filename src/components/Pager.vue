<template>
    <ul v-if="pager.pages && pager.pages.length" class="pagination" :style="ulStyles">
        <li class="page-item previous" :class="{'disabled': pager.currentPage === 1}" :style="liStyles">
            <a class="page-link" @click="setPage(pager.currentPage - 1)" :style="aStyles">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </a>
        </li>
        <li v-for="page in pager.pages" :key="page" class="page-item page-number" :class="{'active': pager.currentPage === page}" :style="liStyles">
            <a class="page-link" @click="setPage(page)" :style="aStyles">{{page}}</a>
        </li>
        <li class="page-item next" :class="{'disabled': pager.currentPage === pager.totalPages}" :style="liStyles">
            <a class="page-link" @click="setPage(pager.currentPage + 1)" :style="aStyles">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
        </li>
    </ul>
</template>

<script>
import paginate from 'jw-paginate'
const defaultLabels = {
  first: 'First',
  last: 'Last',
  previous: 'Previous',
  next: 'Next'
}
const defaultStyles = {
  ul: {
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  li: {
    listStyle: 'none',
    display: 'inline',
    textAlign: 'center'
  },
  a: {
    cursor: 'pointer',
    padding: '3px 12px',
    display: 'block',
    float: 'left'
  }
}
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    initialPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 5
    },
    maxPages: {
      type: Number,
      default: 10
    },
    labels: {
      type: Object,
      default: () => defaultLabels
    },
    styles: {
      type: Object
    },
    disableDefaultStyles: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pager: {},
      ulStyles: {},
      liStyles: {},
      aStyles: {}
    }
  },
  created () {
    // set default styles unless disabled
    if (!this.disableDefaultStyles) {
      this.ulStyles = defaultStyles.ul
      this.liStyles = defaultStyles.li
      this.aStyles = defaultStyles.a
    }
    // merge custom styles with default styles
    if (this.styles) {
      this.ulStyles = { ...this.ulStyles, ...this.styles.ul }
      this.liStyles = { ...this.liStyles, ...this.styles.li }
      this.aStyles = { ...this.aStyles, ...this.styles.a }
    }
    // set to initial page
    this.setPage(this.initialPage)
  },
  methods: {
    setPage (page) {
      const { items, pageSize, maxPages } = this
      // get new pager object for specified page
      const pager = paginate(items.length, page, pageSize, maxPages)
      // get new page of items from items array
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1)
      // update pager
      this.pager = pager
      // emit change page event to parent component
      this.$emit('changePage', pageOfItems)
    }
  },
  watch: {
    items () {
      console.log(this.items)
      this.setPage(this.initialPage)
    }
  }
}
</script>

<style lang="scss">
.page-item.active {
  .page-link {
    border: 1px solid #000;
  }
}
</style>
