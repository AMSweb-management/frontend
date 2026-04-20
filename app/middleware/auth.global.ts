export default defineNuxtRouteMiddleware((to) => {
    const { token } = useAuth()

    if (to.path === '/') return

    if (!token.value) {
        return navigateTo('/')
    }
})
