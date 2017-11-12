<style scoped>
  #login {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-card {
    width: 300px;
    height: 280px;
    background-color: #f5f5f5;
  }
  #input-passw {
    margin-bottom: 30px;
  }
  .form-button {
    margin-top: 25px;
  }
</style>

<template>
  <div id="login">
    <div class="card login-card">
      <div class="card-body">
        <h4 class="card-title"><i class="fa fa-lock" aria-hidden="true"></i> Авторизация</h4>
        <form autocomplete="off">
          <small class="text-danger" :style="{visibility: errors.login ? 'visible' : 'hidden'}">
            <strong>Пожалуйста, укажите логин</strong>
          </small>
          <webix-text v-model="login" type="text" placeholder="Логин"></webix-text>
          <small class="text-danger" :style="{visibility: !errors.login && errors.passw ? 'visible' : 'hidden'}">
            <strong>Пожалуйста, укажите пароль</strong>
          </small>
          <webix-text v-model="passw" type="password" placeholder="Пароль"></webix-text>
          <div class="form-button text-center">
            <webix-button width="100%" @click="authorize">Вход</webix-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import webixButton from '@/components/webix/Button'
  import webixText from '@/components/webix/Text'

  export default {
    name: 'Login',
    data () {
      return {
        login: '',
        passw: '',
        errors: {
          login: false,
          passw: false
        }
      }
    },
    components: {
      'webix-button': webixButton,
      'webix-text': webixText
    },
    methods: {
      authorize () {
        if (!this.login) {
          this.errors.login = true
          return
        } else {
          this.errors.login = false
        }
        if (!this.passw) {
          this.errors.passw = true
          return
        } else {
          this.errors.passw = false
        }
        if (this.login === 'guest' && this.passw === 'guest') {
          this.$store.commit('authorize')
          this.$router.push('/device')
        } else {
          window.alert('Было задано неправильное сочетание логина и пароля!')
        }
      }
    },
    beforeMount () {
      if (this.$store.getters.is_authorized) {
        this.$router.push('/device')
      }
    }
  }
</script>
