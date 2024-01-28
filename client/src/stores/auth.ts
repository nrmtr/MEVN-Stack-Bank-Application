import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composable/useApi'

export interface UserModel {
  id: number,
  username: string,
  name: String,
  surname: String,
  accountNo: Number,
  balance: Number

}
export interface TransModel {
  id: number,
  bankOrAccount: string,
  transType: String,
  amount: Number,
  accountNo: Number,

}
export interface StateModel {
  user: UserModel
  accessToken: string

}

export interface LoginData {
  username: string
  password: string
}
// state management
export const useAuthStore = defineStore('auth', {

  state: (): StateModel => {
    return {
      user: {} as UserModel,
      accessToken: "" as string,

    }
  },
  getters: {
    userDetail: (state: StateModel) => state.user,
    isAuthenticated: (state: StateModel) => (state.user?.id ? true : false),

  },
  actions: {
    async attempt() {
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },
    async login(payload: LoginData) {
      try {
        const { data } = await useApi().post(`/api/login`, payload)
        this.accessToken = data?.access_token
        await this.getUser()
        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },
    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/api/user`)
        this.user = data
        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },
    async logout() {
      try {
        const { data } = await useApiPrivate().post(`/api/logout`)
        this.accessToken = ''
        this.user = {} as UserModel
        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },
    async refresh() {
      try {
        const { data } = await useApi().post(`/api/refresh`)
        this.accessToken = data?.access_token
        return data
      } catch (error: Error | any) {
        throw error.response.message
      }
    },
    async deposit() {
      try {
        const { data } = await useApi().post(`/transfer/deposit`)
        this.user = data
        return data
      } catch (error) {

      }
    }
  }
})
