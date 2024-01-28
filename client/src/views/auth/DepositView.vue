<template>
  <div id="deposit">
    <div class="container">
      <div class="card card-body mt-5">
        <h5 class="text-center">Deposit</h5>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="bankOrAccount" class="form-label">FROM:</label>
          </div>
          <div class="mb-3">
            <label for="accountNo" class="form-label">TO:</label>
            <input
              v-model="user.accountNo"
              type="text"
              class="form-control"
              id="accountNo"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="amount" class="form-label">AMOUNT</label>
            <input
              
              type="text"
              class="form-control"
              id="amount"
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
import { computed, onMounted,reactive,ref } from 'vue'
import { useRouter } from 'vue-router';
const authStore = useAuthStore()

const router = useRouter()

const user = computed(() => {
  return authStore.userDetail
})

const getUser = async () => {
  await authStore.getUser()
}

//not done yet
const loginData = reactive<LoginData>({
  username: '',
  password: ''
})

const errorMessage = ref<string>('')


onMounted(async () => {
  await getUser()
})
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
#deposit .card {
  max-width: 20vw;
  margin: auto;
}
</style>