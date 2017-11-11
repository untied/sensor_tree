<template>
  <div :id="id"></div>
</template>

<script>
  import webix from '@/components/webix'

  const DEFAULT_VALUE = 'OK'
  const DEFAULT_WIDTH = 100

  export default {
    name: 'WebixButton',
    mixins: [webix],
    props: {
      type: String,
      width: [String, Number]
    },
    data () {
      return {
        prefix: 'webix-button'
      }
    },
    mounted () {
      this.button = this.webix.ui({
        container: this.id,
        view: 'button',
        value: this.$slots.default && this.$slots.default.length > 0 ? this.$slots.default[0].text : DEFAULT_VALUE,
        type: this.type === 'form' || this.type === 'danger' ? this.type : null,
        width: this.width ? this.width : DEFAULT_WIDTH
      })
      this.button.attachEvent('onItemClick', () => {
        this.$emit('click')
      })
    }
  }
</script>
