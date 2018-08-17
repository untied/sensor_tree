<style>
  html, body {
    height: 100%;
    width: 100%;
  }
  body {
    padding-top: 20px;
  }
  #app {
    position: relative;
    padding: 50px 10px 0 10px;
    background-color: white;
    min-height: 100%;
  }
</style>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-expand-md navbar-expand-lg navbar-expand-xl navbar-dark bg-success fixed-top">
      <a class="navbar-brand" href="javascript:void(0)">
        <i class="fa fa-tasks" aria-hidden="true"></i> Sensor Tree
      </a>
      <div class="navbar-collapse collapse" id="navbarNav">
        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
          <li class="nav-item" v-if="is_authorized">
            <a class="nav-link" href="javascript:void(0)" @click="logout()"><i class="fa fa-sign-out fa-lg" aria-hidden="true"></i> Выход</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
  const XML_DATA = '/static/driver.description.xml' // путь к XML-документу с описанием устройства

  export default {
    name: 'app',
    computed: {
      is_authorized () {
        return this.$store.getters.is_authorized
      }
    },
    methods: {
      logout () {
        this.$store.commit('unauthorize')
        this.$router.push('/')
      }
    },
    created () {
      $.ajax(XML_DATA, {
        method: 'GET',
        dataType: 'text',
        success: data => {
          this.$store.commit('set_xml_data', data) // отправляем XML-данные в хранилище
        }
      })
    }
  }
</script>