export const useDashboard = () => {
    const config = useRuntimeConfig()

    const stats = useState<any>('dashboard_stats', () => ({
        totalObat: 0,
        keluarHariIni: 0,
        stokMenipis: []
    }))

    const loading = useState<boolean>('dashboard_loading', () => false)

    const fetchDashboard = async () => {
        loading.value = true

        try {
            const res: any = await $fetch(`${config.public.apiBase}/dashboard`)

            stats.value = res
        } catch (err) {
            console.error('ERROR DASHBOARD:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        stats,
        loading,
        fetchDashboard
    }
}