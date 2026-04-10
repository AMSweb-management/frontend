export const useObat = () => {
    const config = useRuntimeConfig()

    const obats = useState<any[]>('obats', () => [])
    const loading = useState<boolean>('obat_loading', () => false)

    // 🔥 GET ALL
    const fetchObat = async () => {
        loading.value = true
        try {
            const res: any = await $fetch(`${config.public.apiBase}/obat`)
            obats.value = res.data || res
        } catch (err) {
            console.error('ERROR FETCH OBAT:', err)
        } finally {
            loading.value = false
        }
    }

    // 🔥 CREATE
    const createObat = async (data: any) => {
        await $fetch(`${config.public.apiBase}/obat`, {
            method: 'POST',
            body: data
        })

        await fetchObat()
    }

    // 🔥 UPDATE
    const updateObat = async (id: string, data: any) => {
        await $fetch(`${config.public.apiBase}/obat/${id}`, {
            method: 'PUT',
            body: data
        })

        await fetchObat()
    }

    // 🔥 DELETE
    const deleteObat = async (id: string) => {
        await $fetch(`${config.public.apiBase}/obat/${id}`, {
            method: 'DELETE'
        })

        await fetchObat()
    }

    return {
        obats,
        loading,
        fetchObat,
        createObat,
        updateObat,
        deleteObat
    }
}