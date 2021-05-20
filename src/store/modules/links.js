const state = () => ({
  links: []
})

const actions = {
  index ({ commit }) {
    let links = []

    if (localStorage.getItem('links')) {
      links = JSON.parse(localStorage.getItem('links'))
    }

    commit('SET_LINKS', links)
  },
  create ({ commit, state }, link) {
    commit('ADD_LINK', link)
    localStorage.setItem('links', JSON.stringify(state.links))
  },
  delete ({ commit, state }, link) {
    commit('DELETE_LINK', link)
    localStorage.setItem('links', JSON.stringify(state.links))
  },
  upVote ({ commit, state }, link) {
    commit('UP_VOTE', link)
    localStorage.setItem('links', JSON.stringify(state.links))
  },
  downVote ({ commit, state }, link) {
    commit('DOWN_VOTE', link)
    localStorage.setItem('links', JSON.stringify(state.links))
  },
  sort ({ commit }, type) {
    commit('SORT_LINKS', type)
  }
}

const mutations = {
  SET_LINKS (state, links) {
    state.links = links
  },
  ADD_LINK (state, link) {
    state.links.push(link)
  },
  DELETE_LINK (state, link) {
    state.links.splice(state.links.findIndex(item => item.title === link), 1)
  },
  UP_VOTE (state, linkTitle) {
    state.links
      .filter(link => link.title === linkTitle)
      .map(link => link.rating++)

    state.links.sort((a, b) => b.rating - a.rating)
  },
  DOWN_VOTE (state, linkTitle) {
    state.links
      .filter(link => link.title === linkTitle)
      .map(link => link.rating--)

    state.links.sort((a, b) => b.rating - a.rating)
  },
  SORT_LINKS (state, type) {
    if (type === 'most') {
      state.links.sort((a, b) => b.rating - a.rating)
    } else if (type === 'less') {
      state.links.sort((a, b) => a.rating - b.rating)
    } else {
      state.links.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
