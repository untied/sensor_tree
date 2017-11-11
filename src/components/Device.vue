<style scoped>
  #device {
    min-height: calc(100vh - 55px) !important;
  }
  .left-panel {
    background-color: white;
    min-height: calc(100vh - 55px) !important;
    border-right: 1px solid #eee;
  }
  .right-panel {
    background-color: white;
    min-height: calc(100vh - 55px) !important;
    padding-bottom: 30px;
  }
  .table thead th {
    border-top: none !important;
  }
  .prop-button {
    clear: both;
  }
  .prop-button * {
    float: right !important;
    margin-right: 40px;
  }
  .success-alert {
    clear: both;
  }
  .success-alert > div {
    padding-right: 55px;
    padding-top: 20px;
  }
</style>

<template>
  <div id="device" class="container-fluid">
    <div class="row">
      <div class="left-panel col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
        <h5>Структура системы</h5>
        <webix-tree :data="deviceData" @click="itemClick"></webix-tree>
      </div>
      <div class="right-panel col-xs-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
        <div class="alert alert-success" role="alert" v-if="selectedId === null" style="margin-top:5px">
          Пожалуйста, выберите один из сенсоров в левой панели!
        </div>
        <table class="table" v-if="attributes !== null && attributes.length > 0">
          <thead>
            <tr class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <th colspan="2" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">Атрибуты</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" v-for="attr in attributes">
              <td class="col-xs-8 col-sm-8 col-md-9 col-lg-9 col-xl-9">{{attr.name}}</td>
              <th class="col-xs-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 text-right" scope="row">{{attr.value}}</th>
            </tr>
          </tbody>
        </table>
        <table class="table" v-if="properties !== null && properties.length > 0">
          <thead>
            <tr class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <th colspan="2" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">Свойства</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" v-for="prop in properties">
              <td class="col-xs-7 col-sm-7 col-md-8 col-lg-8 col-xl-8">
                {{prop.name}}
                <span v-if="prop.min && prop.max">(min. {{prop.min}}, max. {{prop.max}})</span>
              </td>
              <td class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 text-right">
                <span class="badge badge-pill badge-danger" v-if="prop.type === 'xs:int' && prop.min && prop.value !== '' && parseInt(prop.value) < parseInt(prop.min)"><i class="fa fa-chevron-left" aria-hidden="true"></i> min</span>
                <span class="badge badge-pill badge-danger" v-if="prop.type === 'xs:int' && prop.max && prop.value !== '' && parseInt(prop.value) > parseInt(prop.max)"><i class="fa fa-chevron-right" aria-hidden="true"></i> max</span>
              </td>
              <th class="col-xs-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 text-right" scope="row">
                <webix-text v-model="prop.value" :disabled="prop.type !== 'xs:int'" allow="[0-9]"></webix-text>
              </th>
            </tr>
          </tbody>
        </table>
        <div class="prop-button" v-if="properties !== null && properties.length > 0">
          <webix-button type="form" @click="buttonClick">Сохранить</webix-button>
        </div>
        <div class="row success-alert" v-if="showAlert">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              Значения свойств были успешно сохранены!
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixins from '@/mixins'

  import webixButton from '@/components/webix/Button'
  import webixText from '@/components/webix/Text'
  import webixTree from '@/components/webix/Tree'

  export default {
    name: 'Device',
    mixins: [mixins.checkAuth, mixins.nextId],
    data () {
      return {
        deviceData: [],
        deviceDataHash: {},
        attributes: null,
        properties: null,
        selectedId: null,
        showAlert: false
      }
    },
    components: {
      'webix-button': webixButton,
      'webix-text': webixText,
      'webix-tree': webixTree
    },
    methods: {
      itemClick (id) {
        this.attributes = []
        this.properties = []
        this.selectedId = id
        this.showAlert = false
        this.$nextTick(() => {
          let item = this.deviceDataHash[id]
          if (item) {
            if (item.attr) {
              let names = Object.keys(item.attr).sort()
              for (let i in names) {
                this.attributes.push({
                  name: names[i],
                  value: item.attr[names[i]]
                })
              }
            }
            if (item.prop) {
              let prop

              for (let i = 0; i < item.prop.length; i++) {
                prop = {
                  id: item.prop[i].id,
                  name: item.prop[i].name,
                  value: item.prop[i].value
                }
                if (item.prop[i].type) {
                  prop.type = item.prop[i].type
                }
                if (item.prop[i].min) {
                  prop.min = item.prop[i].min
                }
                if (item.prop[i].max) {
                  prop.max = item.prop[i].max
                }
                this.properties.push(prop)
              }
              this.properties.sort((a, b) => {
                return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0)
              })
            }
          }
        })
      },
      buttonClick () {
        let map = {}
        let val, min, max

        for (let i = 0; i < this.properties.length; i++) {
          val = parseInt(this.properties[i].value)
          if (this.properties[i].min) {
            min = parseInt(this.properties[i].min)
            if (val < min) {
              window.alert('Значение одного из свойств меньше возможного минимума!')
              return
            }
          }
          if (this.properties[i].max) {
            max = parseInt(this.properties[i].max)
            if (val > max) {
              window.alert('Значение одного из свойств больше возможного максимума!')
              return
            }
          }

          map[this.properties[i].id] = this.properties[i]
        }
        let item = this.deviceDataHash[this.selectedId]
        if (item && item.prop) {
          for (let i = 0; i < item.prop.length; i++) {
            if (map[item.prop[i].id]) {
              item.prop[i].value = map[item.prop[i].id].value
            }
          }
          this.showAlert = true
          setTimeout(() => {
            this.showAlert = false
          }, 3000)
        }
      }
    },
    created () {
      let self = this
      let xmlData = self.$store.getters.xml_data
      if (xmlData) {
        let attributes = function (el) {
          let attr = {}
          $.each(el[0].attributes, function () {
            if (this.specified) {
              attr[this.name] = this.value
            }
          })
          return attr
        }
        let idPool = { // пул идентификаторов
          device: [],
          unit: [],
          event: []
        }
        let idCurr = { // текущий идентификатор
          driver: null,
          device: null,
          unit: null,
          event: null
        }
        let treeNode
        let xmlDoc = $($.parseXML(xmlData))
        let driver = xmlDoc.find('driver')

        if (driver.length === 1) { // найден узел <driver>
          idCurr.driver = 'driver'
          treeNode = {
            id: idCurr.driver,
            open: true,
            value: driver.attr('name') + ' ' + driver.attr('version')
          }
          self.deviceData.push(treeNode)
          self.deviceDataHash[idCurr.driver] = {
            id: idCurr.driver,
            node: treeNode,
            attr: attributes(driver)
          }
          driver.children('interfaces').each(function () { // ищем узлы <interface>
            let iface = $(this)
            iface.children('factory').each(function () { // ищем узлы <factory>
              let factory = $(this)
              factory.children('device').each(function () { // ищем узлы <device>
                let device = $(this)
                idCurr.device = 'device.' + self.nextId(idPool.device)
                treeNode = {
                  id: idCurr.device,
                  open: true,
                  value: device.attr('name')
                }
                if (self.deviceDataHash[idCurr.driver].node.data && typeof self.deviceDataHash[idCurr.driver].node.data.length !== 'undefined') {
                  self.deviceDataHash[idCurr.driver].node.data.push(treeNode)
                } else {
                  self.deviceDataHash[idCurr.driver].node.data = [treeNode]
                }
                self.deviceDataHash[idCurr.device] = {
                  id: idCurr.device,
                  node: treeNode,
                  attr: attributes(device)
                }
                device.children('interfaces').each(function () { // ищем узлы <interface>
                  let iface = $(this)
                  iface.children('factory').each(function () { // ищем узлы <factory>
                    let factory = $(this)
                    factory.children('unit').each(function () { // ищем узлы <unit>
                      let unit = $(this)
                      idCurr.unit = 'unit.' + self.nextId(idPool.unit)
                      treeNode = {
                        id: idCurr.unit,
                        open: false,
                        value: unit.attr('name')
                      }
                      if (self.deviceDataHash[idCurr.device].node.data && typeof self.deviceDataHash[idCurr.device].node.data.length !== 'undefined') {
                        self.deviceDataHash[idCurr.device].node.data.push(treeNode)
                      } else {
                        self.deviceDataHash[idCurr.device].node.data = [treeNode]
                      }
                      self.deviceDataHash[idCurr.unit] = {
                        id: idCurr.unit,
                        node: treeNode,
                        attr: attributes(unit),
                        prop: []
                      }
                      unit.children('properties').each(function () {
                        let props = $(this)
                        props.children('property').each(function () {
                          let prop = $(this)
                          let p = {
                            id: prop.attr('id'),
                            name: prop.attr('name'),
                            value: prop.attr('value'),
                            attr: attributes(prop)
                          }
                          prop.children('constraints').each(function () {
                            let constr = $(this)
                            if (constr.attr('propertyType')) {
                              p.type = constr.attr('propertyType')
                            }
                            let range = constr.find('range')
                            if (range.length > 0) {
                              let min = range.find('min')
                              if (min.length > 0) {
                                p.min = min.text()
                              }
                              let max = range.find('max')
                              if (max.length > 0) {
                                p.max = max.text()
                              }
                            }
                          })
                          self.deviceDataHash[idCurr.unit].prop.push(p)
                        })
                      })
                      unit.children('interfaces').each(function () { // ищем узлы <interface>
                        let iface = $(this)
                        iface.children('eventSource').each(function () { // ищем узлы <eventSource>
                          let evtsrc = $(this)
                          evtsrc.children('events').each(function () { // ищем узлы <events>
                            let events = $(this)
                            events.children('event').each(function () { // ищем узлы <event>
                              let event = $(this)
                              idCurr.event = 'event.' + self.nextId(idPool.event)
                              treeNode = {
                                id: idCurr.event,
                                open: false,
                                value: event.attr('name'),
                                css: '_event'
                              }
                              if (self.deviceDataHash[idCurr.unit].node.data && typeof self.deviceDataHash[idCurr.unit].node.data.length !== 'undefined') {
                                self.deviceDataHash[idCurr.unit].node.data.push(treeNode)
                              } else {
                                self.deviceDataHash[idCurr.unit].node.data = [treeNode]
                              }
                              self.deviceDataHash[idCurr.event] = {
                                id: idCurr.event,
                                node: treeNode,
                                attr: attributes(event),
                                prop: []
                              }
                              event.children('properties').each(function () {
                                let props = $(this)
                                props.children('property').each(function () {
                                  let prop = $(this)
                                  let p = {
                                    id: prop.attr('id'),
                                    name: prop.attr('name'),
                                    value: prop.attr('value'),
                                    attr: attributes(prop)
                                  }
                                  prop.children('constraints').each(function () {
                                    let constr = $(this)
                                    if (constr.attr('propertyType')) {
                                      p.type = constr.attr('propertyType')
                                    }
                                    let range = constr.find('range')
                                    if (range.length > 0) {
                                      let min = range.find('min')
                                      if (min.length > 0) {
                                        p.min = min.text()
                                      }
                                      let max = range.find('max')
                                      if (max.length > 0) {
                                        p.max = max.text()
                                      }
                                    }
                                  })
                                  self.deviceDataHash[idCurr.event].prop.push(p)
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        }
      }
    }
  }
</script>
