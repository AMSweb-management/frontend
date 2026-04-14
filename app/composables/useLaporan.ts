export const useLaporan = () => {
    const config = useRuntimeConfig()

    const harian = ref<any>(null)
    const bulanan = ref<any>(null)

    const fetchHarian = async () => {
        harian.value = await $fetch(`${config.public.apiBase}/laporan/harian`)
    }

    const fetchBulanan = async () => {
        bulanan.value = await $fetch(`${config.public.apiBase}/laporan/bulanan`)
    }

    return {
        harian,
        bulanan,
        fetchHarian,
        fetchBulanan
    }
}