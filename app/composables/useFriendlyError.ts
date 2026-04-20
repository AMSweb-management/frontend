type ApiErrorShape = {
    status?: number
    statusCode?: number
    message?: string
    data?: {
        message?: string
        errors?: Record<string, string[]>
    }
}

const technicalErrorPatterns = [
    'fetch failed',
    'failed to fetch',
    'networkerror',
    'load failed',
    'econnrefused',
    'etimedout',
    'network request failed',
    'internal server error'
]

export const useFriendlyError = () => {
    const getFriendlyErrorMessage = (error: unknown, fallback = 'Maaf, terjadi kendala. Silakan coba lagi beberapa saat lagi.') => {
        const err = error as ApiErrorShape
        const status = err?.statusCode || err?.status
        const apiMessage = err?.data?.message || err?.message || ''
        const validationErrors = err?.data?.errors

        if (validationErrors) {
            const firstError = Object.values(validationErrors).flat()[0]
            if (firstError) {
                return firstError
            }
        }

        if (status === 401 || status === 422) {
            return 'Email atau password belum sesuai. Silakan periksa kembali dan coba lagi.'
        }

        if (status === 403) {
            return 'Akun Anda belum memiliki akses ke halaman ini.'
        }

        if (status === 404) {
            return 'Data yang Anda cari belum ditemukan.'
        }

        if (status && status >= 500) {
            return 'Server sedang mengalami kendala. Silakan coba lagi beberapa saat lagi.'
        }

        const normalizedMessage = apiMessage.toLowerCase()
        const isTechnicalMessage = technicalErrorPatterns.some((pattern) => normalizedMessage.includes(pattern))

        if (isTechnicalMessage) {
            return 'Koneksi ke server belum tersambung. Periksa koneksi atau coba lagi sebentar lagi.'
        }

        return apiMessage || fallback
    }

    return {
        getFriendlyErrorMessage
    }
}
