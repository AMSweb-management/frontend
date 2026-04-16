export const useNotification = () => {
    const config = useRuntimeConfig()

    const notifications = ref<any[]>([])
    const total = ref(0)

    type NotificationResponse = {
        total: number
        data: {
            id: number
            nama: string
            stok: number
            expired_date: string
            type: 'low_stock' | 'expired'
            message: string
        }[]
    }
    const fetchNotifications = async () => {
        const res = await $fetch<NotificationResponse>(
            `${config.public.apiBase}/notifications`
        )

        notifications.value = res.data
        total.value = res.total
    }

    const markAsRead = async () => {
        await $fetch(`${config.public.apiBase}/notifications/mark-read`, {
            method: 'POST'
        })

        // refresh data
        await fetchNotifications()
    }

    return {
        notifications,
        total,
        fetchNotifications,
        markAsRead
    }
}

