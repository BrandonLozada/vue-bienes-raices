import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/propiedades/:id',
      name: 'propiedad',
      component: () => import('../views/PropiedadView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true},
      children: [
        {
          // Si tiene diagonal al inicio sin el admin quiere decir que es la página principal.
          // Cuando es hijo no es necesario poner '/admin/propiedades' solo 'propiedades'.
          path: 'propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: 'nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue')
        },
        {
          path: 'editar/:id',
          name: 'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue')
        }
      ]
    }
  ]
})

// Guard de Navegación.
router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  // Comprobar que el usuario esté autenticado.
  if(requiresAuth) {
    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({name: 'login'})
    }
  } else {
    // No está protegido, mostramos la vista.
    next()
  }
})

function authenticateUser() {
  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    // Esta función una vez que observa el cambio ya no es necesario de escuchar más cambios,
    // con una sola vez que ya obtuvimos una respuesta.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if(user) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

export default router
