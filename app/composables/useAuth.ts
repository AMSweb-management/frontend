import { $fetch } from 'ofetch'

export const useAuth = () => {
    const config = useRuntimeConfig()

    const user = useState<any>('auth_user', () => null)

    const token = useCookie<string | null>('auth_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: true
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

    const logout = () => {
        token.value = null
        user.value = null
        navigateTo('/')
    }

    return {
        user,
        token,
        login,
        fetchUser,
        logout
    }
}