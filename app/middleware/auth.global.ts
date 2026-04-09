export default defineNuxtRouteMiddleware((to) => {
    const user = useState<any>('auth_user')

    if (to.path === '/') return

    if (!user.value) {
        return navigateTo('/')
    }
})