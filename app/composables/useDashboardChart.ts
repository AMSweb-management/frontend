type BarangKeluarItem = {
    id?: number | string
    tanggal: string
    jumlah: number | string
    created_at?: string
    obat?: {
        nama?: string
        harga?: number | string
    }
}

type WeeklySeriesItem = {
    key: string
    label: string
    dateLabel: string
    total: number
    height: string
}

type RevenueSeriesItem = WeeklySeriesItem & {
    point: string
    linePoint: string
}

export const useDashboardChart = (source: Ref<BarangKeluarItem[] | undefined>) => {
    const currencyFormatter = new Intl.NumberFormat('id-ID')

    const buildWeeklyBaseDays = () => {
        const formatter = new Intl.DateTimeFormat('id-ID', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit'
        })

        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date()
            date.setDate(date.getDate() - (6 - index))

            const iso = date.toISOString().split('T')[0]
            const [label = '', dateLabel = ''] = formatter.format(date).split(', ')

            return {
                key: iso,
                label,
                dateLabel,
                total: 0
            }
        })
    }

    const formatTransactionTime = (value?: string) => {
        if (!value) {
            return '-'
        }

        return new Date(value).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const todayData = computed(() => {
        const today = new Date().toISOString().split('T')[0]

        return source.value
            ?.filter((item) => item.tanggal === today)
            ?.slice(0, 5) || []
    })

    const weeklySeries = computed<WeeklySeriesItem[]>(() => {
        const baseDays = buildWeeklyBaseDays()

        for (const item of source.value || []) {
            const targetDay = baseDays.find((day) => day.key === item.tanggal)
            if (targetDay) {
                targetDay.total += Number(item.jumlah || 0)
            }
        }

        const maxValue = Math.max(...baseDays.map((item) => item.total), 0)

        return baseDays.map((item) => ({
            ...item,
            height: maxValue > 0
                ? `${Math.max((item.total / maxValue) * 100, item.total > 0 ? 16 : 0)}%`
                : '0%'
        }))
    })

    const revenueSeries = computed<RevenueSeriesItem[]>(() => {
        const baseDays = buildWeeklyBaseDays()

        for (const item of source.value || []) {
            const targetDay = baseDays.find((day) => day.key === item.tanggal)
            if (targetDay) {
                targetDay.total += Number(item.jumlah || 0) * Number(item.obat?.harga || 0)
            }
        }

        const maxValue = Math.max(...baseDays.map((item) => item.total), 0)
        const chartWidth = 600
        const chartHeight = 220
        const horizontalPadding = 28
        const verticalPadding = 22
        const step = (chartWidth - horizontalPadding * 2) / Math.max(baseDays.length - 1, 1)

        return baseDays.map((item, index) => {
            const x = horizontalPadding + step * index
            const ratio = maxValue > 0 ? item.total / maxValue : 0
            const y = chartHeight - verticalPadding - (chartHeight - verticalPadding * 2) * ratio

            return {
                ...item,
                height: maxValue > 0 ? `${Math.max(ratio * 100, item.total > 0 ? 12 : 0)}%` : '0%',
                point: `${x},${y}`,
                linePoint: `${x} ${y}`
            }
        })
    })

    const revenueSummary = computed(() => {
        const total = revenueSeries.value.reduce((sum, item) => sum + item.total, 0)
        const average = total / Math.max(revenueSeries.value.length, 1)
        const peakItem = [...revenueSeries.value].sort((a, b) => b.total - a.total)[0]

        return {
            total,
            average,
            peak: peakItem?.total
                ? `Rp ${currencyFormatter.format(peakItem.total)}`
                : '-'
        }
    })

    const weeklySummary = computed(() => {
        const total = weeklySeries.value.reduce((sum, item) => sum + item.total, 0)
        const peakItem = [...weeklySeries.value].sort((a, b) => b.total - a.total)[0]

        return {
            total,
            peak: peakItem?.total
                ? `${peakItem.total} item`
                : '-'
        }
    })

    return {
        formatTransactionTime,
        todayData,
        weeklySeries,
        weeklySummary,
        revenueSeries,
        revenueSummary
    }
}
