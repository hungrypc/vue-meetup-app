<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         placeholder="Username"
                         v-model="form.username">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         placeholder="Name"
                         v-model="form.name">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="email"
                         placeholder="Your Email"
                         v-model="form.email">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="text"
                         placeholder="Avatar"
                         autocomplete=""
                         v-model="form.avatar">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="password"
                         placeholder="Your Password"
                         autocomplete="new-password"
                         v-model="form.password">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                         type="password"
                         placeholder="Password Confirmation"
                         autocomplete="off"
                         v-model="form.passwordConfirmation">
                </div>
              </div>
              <button @click.prevent="register" type="submit" class="button is-block is-info is-large is-fullwidth">Register</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{name: 'Login'}" href="../">Login</router-link> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: null,
          name: null,
          email: null,
          avatar: null,
          password: null,
          passwordConfirmation: null
        }
      }
    },
    methods: {
      register() {
        console.log(this.form)
      }
    }
  }
</script>

<style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>