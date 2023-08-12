import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()

    const errorCode = {
        'auth/user-not-found' : 'Usuario no encontrado',
        'auth/wrong-password' : 'La contraseña es incorrecta'
    }

    const login = ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch(error => {
            console.log( errorCode[error.code])
        })
    }



    return {
        login,
    }
})