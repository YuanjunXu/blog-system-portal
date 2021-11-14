export const state = () => ({
  currentActivatedTab: 'index',
  currentUserId: ''
});

export const mutations = {
  setCurrentActivatedTab(state, currentActivatedTab) {
    state.currentActivatedTab = currentActivatedTab;
  },
  setCurrentUserId(state, currentUserId) {
    state.currentUserId = currentUserId;
  }
}
