export const useBarangKeluar = () => {
    const config = useRuntimeConfig()

    const data = useState<any[]>('barang_keluar', () => [])

    const fetchData = async () => {
        const res: any = await $fetch(`${config.public.apiBase}/barang-keluar`)
        data.value = res.data || res
    }

    const createData = async (payload: any) => {
        await $fetch(`${config.public.apiBase}/barang-keluar`, {
            method: 'POST',
            body: payload
        })

        await fetchData()
    }

    return {
        data,
        fetchData,
        createData
    }
}
