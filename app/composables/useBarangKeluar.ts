export const useBarangKeluar = () => {
    const config = useRuntimeConfig()

    const data = useState<any[]>('barang_keluar', () => [])
    const pagination = useState<any>('bk_pagination', () => ({}))

    const fetchData = async (page = 1) => {
        const res: any = await $fetch(`${config.public.apiBase}/barang-keluar?page=${page}`)

        data.value = res.data
        pagination.value = res
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
        pagination,
        fetchData,
        createData
    }
}