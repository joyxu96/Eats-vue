export default {
  positiveSize(state) {
    return state.comment.reduce((newValue,oldValue) => {
      return newValue+(oldValue.rateType?0:1)
    },0)
  }
}
