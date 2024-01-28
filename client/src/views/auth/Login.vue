<template>
  <div id="login">
    <div class="container">
      <div class="card card-body mt-5">
        <h5 class="text-center">Login</h5>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              v-model="loginData.username"
              type="username"
              class="form-control"
              id="username"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="loginData.password"
              type="password"
              class="form-control"
              id="password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore, type LoginData } from '../../stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive<LoginData>({
  username: '',
  password: ''
})

const errorMessage = ref<string>('')

const submit = async () =>{

    await authStore.login(loginData)
    .then( res => {
        router.replace({name:"user"})
    })
    .catch(err => {
        console.log("Error");

    })
}


</script>
<style scoped>
#login .card {
  max-width: 15vw;
  margin: auto;
}
</style>