<template>
    <div v-if="loadingPage" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
            <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm font-medium">Memuat data...</span>
        </div>
    </div>
    <div class="p-6 space-y-6">

        <!-- 🔥 KPI CARDS -->
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

        <!-- 🔥 CONTENT GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <!-- 📊 TABLE TRANSAKSI -->
            <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow">
                <h3 class="font-semibold text-gray-700 mb-4">
                    Barang Keluar Hari Ini
                </h3>

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
                            <td class="py-2">
                                {{ item.obat?.nama }}
                            </td>

                            <td>
                                <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                    {{ item.jumlah }}
                                </span>
                            </td>

                            <td>
                                {{
                                    new Date(item.created_at).toLocaleTimeString('id-ID', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                })
                                }}
                            </td>
                        </tr>

                        <!-- EMPTY STATE -->
                        <tr v-if="!todayData?.length">
                            <td colspan="3" class="text-center text-gray-400 py-4">
                                Belum ada transaksi hari ini
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- ⚠️ ALERT STOK -->
            <div class="bg-white p-6 rounded-xl shadow">
                <h3 class="font-semibold text-gray-700 mb-4">
                    ⚠️ Stok Menipis
                </h3>

                <div class="space-y-3">
                    <div v-for="item in stats.stokMenipis" :key="item.id"
                        class="flex justify-between bg-red-50 p-3 rounded-lg">
                        <span>{{ item.nama }}</span>
                        <span class="text-red-500 font-semibold">
                            Sisa {{ item.stok }}
                        </span>
                    </div>
                </div>
            </div>

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

const { stats, loading, fetchDashboard } = useDashboard()
const loadingPage = ref(true)
const { data, fetchData } = useBarangKeluar()

const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID').format(val)
}

onMounted(async () => {
    fetchData(1)
    await fetchDashboard()
    setTimeout(() => {
        loadingPage.value = false
    }, 500) // biar smooth
})

const todayData = computed(() => {
    const today = new Date().toISOString().split('T')[0]

    return data.value
        ?.filter((item: any) => item.tanggal === today)
        ?.slice(0, 5) // ambil 5 terbaru
})
</script>