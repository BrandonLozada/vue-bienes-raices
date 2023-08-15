import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref({})

    const errorMsg = ref('')
    const errorCode = {
        'auth/user-not-found' : 'Usuario no encontrado',
        'auth/wrong-password' : 'La contraseña es incorrecta'
    }

    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            authUser.value = user
            console.log('authUser.value: ', authUser.value)
        })
        .catch(error => {
            console.log(error)
            errorMsg.value = errorCode[error.code]
        })
    }

    const hasError = computed(() => {
        return errorMsg.value
    })

    return {
        login,
        hasError,
        errorMsg
    }
})