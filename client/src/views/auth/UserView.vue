<template>
  <div id="user">
    <div class="container">
      <Suspense>
        <template #default>
          <div class="container">
            <div v-if="user" class="card card-body mt-5">
              <h3 class="card-title text-end">Current balance: &nbsp;{{ user.balance }}<i class="bi bi-currency-dollar"></i></h3>
              <br>
              <h6 class="card-subtitle mb-2 text-muted text-end">Account no: &nbsp; {{ user.accountNo }}</h6>
            </div>
          </div>
        </template>
        <template #fallback>
          <p>Lodaing..</p>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useAuthStore } from '../../stores/auth'
import { computed, onMounted } from 'vue'

const authStore = useAuthStore()

const user = computed(() => {
  return authStore.userDetail
})

const getUser = async () => {
  await authStore.getUser()
}

onMounted(async () => {
  await getUser()
})
</script>

<style scoped>
#user .card {
  max-width: 20vw;
  margin: auto;
}
</style>