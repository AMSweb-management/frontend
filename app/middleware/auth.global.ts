export default defineNuxtRouteMiddleware(async (to) => {
    const { user, token, fetchUser } = useAuth()
    const isAuthReady = useState('auth_ready')

    // 🔥 tunggu auth siap
    if (!isAuthReady.value) {
        await fetchUser()
    }

    // halaman login
    if (to.path === '/') {
        if (token.value) {
            return navigateTo('/dashboard')
        }
        return
    }

    // protected
    if (!token.value) {
        return navigateTo('/')
    }
})