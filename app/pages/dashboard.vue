<template>
    <div v-if="loadingPage" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
            <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm font-medium">Memuat data...</span>
        </div>
    </div>

    <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-xl shadow">
                <p class="text-sm text-gray-400">Total Obat</p>
                <h2 class="text-2xl font-bold text-blue-900">
                    {{ stats.totalObat }}
                </h2>
            </div>

            <div class="bg-white p-4 rounded-xl shadow">
                <p class="text-sm text-gray-400">Barang Keluar (Hari Ini)</p>
                <h2 class="text-2xl font-bold text-red-500">
                    {{ stats.keluarHariIni }}
                </h2>
            </div>

            <div class="bg-white p-4 rounded-xl shadow">
                <p class="text-sm text-gray-400">Pendapatan Hari Ini</p>
                <h2 class="text-2xl font-bold text-green-600">
                    Rp {{ formatRupiah(stats.pendapatanHariIni) }}
                </h2>
            </div>

            <div class="bg-white p-4 rounded-xl shadow">
                <p class="text-sm text-gray-400">Stok Menipis</p>
                <h2 class="text-2xl font-bold text-yellow-500">
                    {{ stats.stokMenipis.length }} Item
                </h2>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div class="xl:col-span-2 bg-white p-6 rounded-2xl shadow border border-slate-100 overflow-hidden relative">
                <div
                    class="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 opacity-10">
                </div>

                <div class="relative space-y-6">
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
                                Grafik Pendapatan
                            </p>
                            <h3 class="text-xl font-bold text-slate-800 mt-2">
                                Pendapatan 7 Hari Terakhir
                            </h3>
                            <p class="text-sm text-slate-500 mt-1">
                                Estimasi pendapatan harian dari jumlah barang keluar dikalikan harga obat.
                            </p>
                        </div>

                        <div class="grid grid-cols-2 gap-3 md:min-w-[260px]">
                            <div class="rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                                <p class="text-xs text-emerald-700">Total 7 Hari</p>
                                <p class="text-lg font-bold text-emerald-800">
                                    Rp {{ formatRupiah(revenueSummary.total) }}
                                </p>
                            </div>
                            <div class="rounded-xl bg-sky-50 border border-sky-100 p-3">
                                <p class="text-xs text-sky-700">Tertinggi</p>
                                <p class="text-lg font-bold text-sky-800">{{ revenueSummary.peak }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="h-80">
                        <div v-if="revenueSeries.some((item) => item.total > 0)"
                            class="h-full rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                            <svg viewBox="0 0 600 220" class="h-[220px] w-full overflow-visible">
                                <line
                                    v-for="line in 4"
                                    :key="line"
                                    x1="28"
                                    x2="572"
                                    :y1="22 + (line - 1) * 58"
                                    :y2="22 + (line - 1) * 58"
                                    class="stroke-slate-200"
                                    stroke-width="1" />
                                <polyline
                                    :points="revenueLinePoints"
                                    fill="none"
                                    stroke="#10b981"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="5" />
                                <circle
                                    v-for="item in revenueSeries"
                                    :key="item.key"
                                    :cx="item.point.split(',')[0]"
                                    :cy="item.point.split(',')[1]"
                                    r="6"
                                    class="fill-white stroke-emerald-500"
                                    stroke-width="4" />
                            </svg>

                            <div class="grid grid-cols-7 gap-2">
                                <div v-for="item in revenueSeries" :key="`${item.key}-label`" class="text-center">
                                    <p class="text-xs font-semibold text-slate-700">{{ item.label }}</p>
                                    <p class="text-[11px] text-slate-400">{{ item.dateLabel }}</p>
                                    <p class="mt-1 text-[11px] font-semibold text-emerald-700">
                                        Rp {{ compactRupiah(item.total) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div v-else
                            class="h-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center px-6">
                            <p class="text-base font-semibold text-slate-700">
                                Belum ada pendapatan untuk ditampilkan
                            </p>
                            <p class="text-sm text-slate-500 mt-1">
                                Chart akan terisi setelah transaksi barang keluar memiliki data harga obat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow border border-slate-100">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
                            Peringatan
                        </p>
                        <h3 class="font-semibold text-gray-700 mt-2">
                            Obat Mendekati Kadaluarsa
                        </h3>
                    </div>

                    <span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        {{ expiringMedicines.length }} item
                    </span>
                </div>

                <div v-if="expiringMedicines.length" class="mt-5 space-y-3">
                    <div
                        v-for="item in expiringMedicines"
                        :key="item.id"
                        class="rounded-2xl border p-4"
                        :class="item.isExpired ? 'border-red-100 bg-red-50' : 'border-amber-100 bg-amber-50'">
                        <div class="flex items-start justify-between gap-3">
                            <div>
                                <p class="font-semibold text-slate-800">{{ item.nama }}</p>
                                <p class="mt-1 text-xs text-slate-500">
                                    Expired: {{ formatDate(item.expired_date) }}
                                </p>
                            </div>
                            <span
                                class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                                :class="item.isExpired ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'">
                                {{ item.statusLabel }}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    v-else
                    class="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    Tidak ada obat yang kadaluarsa atau mendekati kadaluarsa dalam 30 hari ke depan.
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white p-6 rounded-2xl shadow border border-slate-100 overflow-hidden relative">
                <div
                    class="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 opacity-10">
                </div>

                <div class="relative flex flex-col gap-6">
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                                Grafik Aktivitas
                            </p>
                            <h3 class="text-xl font-bold text-slate-800 mt-2">
                                Barang Keluar 7 Hari Terakhir
                            </h3>
                            <p class="text-sm text-slate-500 mt-1">
                                Ringkasan jumlah item yang keluar per hari berdasarkan data transaksi terbaru.
                            </p>
                        </div>

                        <div class="grid grid-cols-2 gap-3 md:min-w-[240px]">
                            <div class="rounded-xl bg-slate-50 border border-slate-100 p-3">
                                <p class="text-xs text-slate-500">Total 7 Hari</p>
                                <p class="text-lg font-bold text-slate-800">{{ weeklySummary.total }}</p>
                            </div>
                            <div class="rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                                <p class="text-xs text-emerald-700">Hari Tertinggi</p>
                                <p class="text-lg font-bold text-emerald-800">{{ weeklySummary.peak }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="h-72">
                        <div v-if="weeklySeries.some((item) => item.total > 0)"
                            class="h-full grid grid-cols-7 gap-3 items-end">
                            <div v-for="item in weeklySeries" :key="item.key" class="h-full flex flex-col justify-end">
                                <div class="text-center text-xs font-semibold text-slate-700 mb-3">
                                    {{ item.total }}
                                </div>

                                <div class="relative flex-1 flex items-end rounded-2xl bg-slate-50 px-2 py-3">
                                    <div class="w-full rounded-xl bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-300 shadow-lg shadow-cyan-200/60 transition-all duration-500"
                                        :style="{ height: item.height }"></div>
                                </div>

                                <div class="mt-3 text-center">
                                    <p class="text-sm font-semibold text-slate-700">{{ item.label }}</p>
                                    <p class="text-xs text-slate-400">{{ item.dateLabel }}</p>
                                </div>
                            </div>
                        </div>

                        <div v-else
                            class="h-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center px-6">
                            <p class="text-base font-semibold text-slate-700">
                                Belum ada data yang cukup untuk ditampilkan
                            </p>
                            <p class="text-sm text-slate-500 mt-1">
                                Chart akan otomatis terisi setelah transaksi barang keluar mulai tercatat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow border border-slate-100">
                <h3 class="font-semibold text-gray-700 mb-4">
                    Stok Menipis
                </h3>

                <div v-if="stats.stokMenipis.length" class="space-y-3">
                    <div v-for="item in stats.stokMenipis" :key="item.id"
                        class="flex justify-between bg-red-50 p-3 rounded-lg">
                        <span>{{ item.nama }}</span>
                        <span class="text-red-500 font-semibold">
                            Sisa {{ item.stok }}
                        </span>
                    </div>
                </div>

                <div
                    v-else
                    class="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    Tidak ada stok yang berada di ambang minimum saat ini.
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow border border-slate-100">
            <div class="flex items-center justify-between gap-4 mb-4">
                <div>
                    <h3 class="font-semibold text-gray-700">
                        Barang Keluar Hari Ini
                    </h3>
                    <p class="text-sm text-slate-400 mt-1">
                        Menampilkan 5 transaksi terbaru untuk hari ini.
                    </p>
                </div>

                <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                    {{ todayData.length }} transaksi
                </span>
            </div>

            <table class="w-full text-sm">
                <thead>
                    <tr class="text-left text-gray-400 border-b">
                        <th class="py-2">Nama Obat</th>
                        <th>Jumlah</th>
                        <th>Waktu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in todayData" :key="item.id" class="border-b hover:bg-gray-50 transition">
                        <td class="py-3">
                            {{ item.obat?.nama }}
                        </td>

                        <td>
                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                {{ item.jumlah }}
                            </span>
                        </td>

                        <td>
                            {{ formatTransactionTime(item.created_at) }}
                        </td>
                    </tr>

                    <tr v-if="!todayData?.length">
                        <td colspan="3" class="text-center text-gray-400 py-6">
                            Belum ada transaksi hari ini
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin",
})

useHead({
    title: "Dashboard"
})

const { stats, fetchDashboard } = useDashboard()
const loadingPage = ref(true)
const { data, fetchData } = useBarangKeluar()
const { obats, fetchObat } = useObat()
const {
    formatTransactionTime,
    todayData,
    weeklySeries,
    weeklySummary,
    revenueSeries,
    revenueSummary
} = useDashboardChart(data)

const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID').format(val)
}

const compactRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(value)
}

const revenueLinePoints = computed(() => {
    return revenueSeries.value.map((item) => item.linePoint).join(' ')
})

const formatDate = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

const expiringMedicines = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return obats.value
        .filter((item: any) => item.expired_date)
        .map((item: any) => {
            const expiredDate = new Date(item.expired_date)
            expiredDate.setHours(0, 0, 0, 0)

            const daysLeft = Math.ceil((expiredDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
            const isExpired = daysLeft < 0

            return {
                ...item,
                daysLeft,
                isExpired,
                statusLabel: isExpired
                    ? 'Sudah expired'
                    : `${daysLeft} hari lagi`
            }
        })
        .filter((item: any) => item.isExpired || item.daysLeft <= 30)
        .sort((a: any, b: any) => a.daysLeft - b.daysLeft)
        .slice(0, 5)
})

onMounted(async () => {
    await Promise.all([
        fetchData(),
        fetchDashboard(),
        fetchObat()
    ])

    setTimeout(() => {
        loadingPage.value = false
    }, 500)
})

</script>
