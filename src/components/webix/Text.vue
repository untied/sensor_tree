<template>
  <div :id="id"></div>
</template>

<script>
  import webix from '@/components/webix'

  export default {
    name: 'WebixText',
    mixins: [webix],
    props: {
      value: {
        type: [Number, String],
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      },
      allow: {
        type: [String, Object],
        default: null
      },
      inputAlign: {
        type: String,
        default: 'left'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        prefix: 'webix-text'
      }
    },
    mounted () {
      this.text = this.webix.ui({
        container: this.id,
        view: 'text',
        type: this.type,
        value: this.value,
        placeholder: this.placeholder,
        inputAlign: this.inputAlign,
        disabled: this.disabled,
        keyPressTimeout: 100
      })
      this.text.attachEvent('onTimedKeyPress', () => {
        this.$emit('input', this.text.getValue())
      })
      if (this.allow) {
        let allow = typeof this.allow === 'string' ? new RegExp(this.allow, 'g') : this.allow
        this.text.attachEvent('onKeyPress', (code, evt) => {
          if ([8, 9, 13, 16, 17, 18, 35, 36, 37, 38, 39, 40, 46].indexOf(code) === -1 && !String.fromCharCode(code).match(allow)) {
            evt.preventDefault()
            evt.stopPropagation()
            return false
          }
        })
      }
    }
  }
</script>
