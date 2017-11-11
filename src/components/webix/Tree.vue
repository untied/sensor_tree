<style>
  .webix_tree {
    height: auto !important;
  }
  .webix_tree, .webix_tree_blank, .webix_tree_open, .webix_tree_close, .webix_tree_line1, .webix_tree_line2, .webix_tree_line3 {
    background-color: transparent;
  }
</style>

<template>
  <div :id="id"></div>
</template>

<script>
  import webix from '@/components/webix'

  export default {
    name: 'WebixTree',
    mixins: [webix],
    props: {
      data: Array,
      template: {
        type: [String, Function],
        default: '{common.icon()} {common.folder()}<span>#value#<span>'
      }
    },
    data () {
      return {
        prefix: 'webix-tree'
      }
    },
    mounted () {
      this.tree = this.webix.ui({
        container: this.id,
        view: 'tree',
        type: 'lineTree',
        select: true,
        scroll: false,
        borderless: true,
        // template: this.template,
        data: this.data
      })
      this.tree.attachEvent('onItemClick', id => {
        this.$emit('click', id)
      })
    }
  }
</script>
