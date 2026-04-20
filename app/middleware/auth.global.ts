export default defineNuxtRouteMiddleware(async (to) => {
    const { user, token, fetchUser } = useAuth()

    if (to.path === '/') return

    // kalau ada token tapi user belum ada → ambil user
    if (!user.value && token.value) {
        try {
            await fetchUser()
        } catch {
            return navigateTo('/')
        }
    }

    
    if (!token.value) {
        return navigateTo('/')
    }
})