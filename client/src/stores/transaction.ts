import { defineStore } from 'pinia'
import { useApiPrivate, useApi } from '../composable/useApi'
import { useAuthStore } from './auth'

export interface TransModel {
    id: number,
    bankOrAccount: string,
    transType: String,
    amount: Number,
    accountNo: Number,

}

export interface StateModel {
    transfer: TransModel

}


export const useTranStore = defineStore('transfer', {
    state: (): StateModel => {
        return {
            transfer: {} as TransModel,

        }
    },
    getters: {
        transferDetail: (state: StateModel) => state.transfer

    },
    actions: {
        async deposit() {
            try {
                const { data } = await useApi().post(`/transfer/deposit`)
                // Not done

            } catch (error: Error | any) {
                throw error.response.message
            }
        },
        async withdraw() {
            try {
                const { data } = await useApi().post(`/transfer/withdraw`)
                //
            } catch (error) {

            }
        },
        async transfer() {
            try {
                const { data } = await useApiPrivate().post(`/transfer/transfer`)
                //

            } catch (error) {

            }
        },
        async history(accNo: StateModel) {
            try {
                const { data } = await useApiPrivate().get(`/transfer/history/` + accNo)
                //
            } catch (error) {

            }
        },
    }
})