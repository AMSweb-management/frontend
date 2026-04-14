export const useDistributor = () => {
    const config = useRuntimeConfig()

    const distributors = useState<any[]>('distributors', () => [])

    const fetchDistributor = async () => {
        distributors.value = await $fetch(`${config.public.apiBase}/distributor`)
    }

    const createDistributor = async (payload: any) => {
        await $fetch(`${config.public.apiBase}/distributor`, {
            method: 'POST',
            body: payload
        })
        await fetchDistributor()
    }

    const updateDistributor = async (id: string, payload: any) => {
        await $fetch(`${config.public.apiBase}/distributor/${id}`, {
            method: 'PUT',
            body: payload
        })
        await fetchDistributor()
    }

    const deleteDistributor = async (id: string) => {
        await $fetch(`${config.public.apiBase}/distributor/${id}`, {
            method: 'DELETE'
        })
        await fetchDistributor()
    }

    return {
        distributors,
        fetchDistributor,
        createDistributor,
        updateDistributor,
        deleteDistributor
    }
}