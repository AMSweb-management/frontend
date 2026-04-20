import { $fetch } from 'ofetch'

export const useAuth = () => {
    const config = useRuntimeConfig()

    const user = useState<any>('auth_user', () => null)

    const isProd =
        typeof window !== 'undefined' &&
        window.location.hostname !== 'localhost'

    const token = useCookie<string | null>('auth_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: false,
        path: '/' // 🔥 WAJIB TAMBAH
    })

    const login = async (email: string, password: string) => {
        const res = await $fetch(`${config.public.apiBase}/login`, {
            method: 'POST',
            body: { email, password },
            headers: {
                Accept: 'application/json'
            }
        })

        token.value = res.token
        user.value = res.user

        return res
    }

    const fetchUser = async () => {
        if (!token.value) return

        try {
            const res = await $fetch(`${config.public.apiBase}/me`, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            user.value = res.user
        } catch {
            logout()
        }
    }

    const isLoggingOut = useState('is_logging_out', () => false)

    const logout = () => {
        const cookie = useCookie('auth_token')

        // hapus via Nuxt
        cookie.value = null

        // 🔥 paksa hapus manual semua kemungkinan
        document.cookie = "auth_token=; Max-Age=0; path=/;"
        document.cookie = "auth_token=; Max-Age=0; path=/; domain=.assetmanagementsystem.web.id"

        // reset state
        user.value = null

        // 🔥 hard redirect (hindari middleware race)
        window.location.href = '/'
    }

    return {
        user,
        token,
        login,
        fetchUser,
        logout
    }
}