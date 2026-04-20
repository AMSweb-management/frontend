export default defineNuxtRouteMiddleware(async (to) => {
    const { user, token, fetchUser } = useAuth()

    // kalau halaman login
    if (to.path === '/') {
        // kalau sudah login → lempar ke dashboard
        if (token.value) {
            try {
                if (!user.value) {
                    await fetchUser()
                }
                return navigateTo('/dashboard')
            } catch {
                return
            }
        }
        return
    }

    // halaman selain login (protected)

    // kalau tidak ada token → balik login
    if (!token.value) {
        return navigateTo('/')
    }

    // kalau ada token tapi user kosong → ambil user
    if (!user.value) {
        try {
            await fetchUser()
        } catch {
            return navigateTo('/')
        }
    }
})