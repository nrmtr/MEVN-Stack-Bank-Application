import { useAuthStore } from "@/stores/auth"

export const authen = {
    async install(){
        const store = useAuthStore()
        try{
            await store.attempt()
            
        }catch(error){

        }
    }
}