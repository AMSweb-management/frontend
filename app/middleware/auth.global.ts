export default defineNuxtRouteMiddleware(async (to) => {
    const { user, token, fetchUser } = useAuth()

    if (to.path === '/') return

    // kalau ada token tapi user kosong → fetch ulang
    if (!user.value && token.value) {
        try {
            await fetchUser()
        } catch {
            return navigateTo('/')
        }
    }

    // kalau tetap kosong → logout
    if (!user.value) {
        return navigateTo('/')
    }
})