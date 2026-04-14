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
const { formatTransactionTime, todayData, weeklySeries, weeklySummary } = useDashboardChart(data)

const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID').format(val)
}

onMounted(async () => {
    await fetchData(1)
    await fetchDashboard()
    setTimeout(() => {
        loadingPage.value = false
    }, 500)
})

</script>
