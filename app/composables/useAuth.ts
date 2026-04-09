import { $fetch } from 'ofetch'

export const useAuth = () => {
    const config = useRuntimeConfig()

    const user = useState<any>('auth_user', () => null)

    const login = async (email: string, password: string) => {
        try {
            const res = await $fetch(`${config.public.apiBase}/login`, {
                method: 'POST',
                body: { email, password }
            })

            user.value = res.user
            localStorage.setItem('user', JSON.stringify(res.user))

            return res
        } catch (err: any) {
            throw new Error(err?.data?.message || 'Login gagal')
        }
    }

    const logout = () => {
        user.value = null
        localStorage.removeItem('user')
        navigateTo('/')
    }

    const initAuth = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('user')
            if (stored) {
                user.value = JSON.parse(stored)
            }
        }
    }

    return {
        user,
        login,
        logout,
        initAuth
    }
}