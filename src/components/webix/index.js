export default {
  data () {
    return {
      prefix: 'webix',
      suffix: ''
    }
  },
  computed: {
    id () {
      return this.prefix + '-' + this.suffix
    }
  },
  created () {
    this.webix = window.webix
  },
  beforeMount () {
    const SUFFIX_LENGTH = 8
    const SUFFIX_TOKENS = 'abcdefghijklmnopqrstuvwxyz0123456789'

    let suffix = []
    for (let i = 0; i < SUFFIX_LENGTH; i++) {
      suffix.push(SUFFIX_TOKENS.charAt(Math.floor(Math.random() * SUFFIX_TOKENS.length)))
    }
    this.suffix = suffix.join('')
  }
}
