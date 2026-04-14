<template>
    <div v-if="loadingPage" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
            <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm font-medium">Memuat data...</span>
        </div>
    </div>

    <div class="p-6 space-y-6">
        <section class="relative overflow-hidden rounded-[28px] bg-white/95 shadow-xl shadow-slate-900/10 ring-1 ring-white/60">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.15),_transparent_32%)]"></div>

            <div class="relative p-6 md:p-8">
                <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div class="max-w-2xl">
                        <p class="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                            Laporan Inventori
                        </p>
                        <h1 class="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                            Pantau performa transaksi harian dan bulanan dalam satu tampilan
                        </h1>
                        <p class="mt-3 text-sm leading-6 text-slate-500 md:text-base">
                            Lihat ringkasan pendapatan, jumlah transaksi, stok menipis, dan cetak laporan PDF dengan
                            tampilan yang lebih rapi dan mudah dibaca.
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <button
                            @click="downloadHarianPdf"
                            class="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600">
                            Cetak Harian
                        </button>
                        <button
                            @click="downloadBulananPdf"
                            class="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800">
                            Cetak Bulanan
                        </button>
                    </div>
                </div>

                <div class="mt-8 inline-flex rounded-2xl bg-slate-100 p-1">
                    <button
                        @click="mode = 'harian'"
                        :class="tabClass(mode === 'harian')">
                        Harian
                    </button>
                    <button
                        @click="mode = 'bulanan'"
                        :class="tabClass(mode === 'bulanan')">
                        Bulanan
                    </button>
                </div>
            </div>
        </section>

        <template v-if="mode === 'harian' && harian">
            <section class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-lg shadow-slate-900/5">
                    <p class="text-sm text-slate-500">Total Pendapatan</p>
                    <h2 class="mt-2 text-3xl font-bold text-emerald-600">
                        Rp {{ formatRupiah(harian.total_pendapatan) }}
                    </h2>
                    <p class="mt-1 text-xs text-slate-500">
                        Total pemasukan dari transaksi harian
                    </p>
                </div>

                <div class="rounded-[24px] border border-sky-100 bg-white p-5 shadow-lg shadow-slate-900/5">
                    <p class="text-sm text-slate-500">Barang Keluar</p>
                    <h2 class="mt-2 text-3xl font-bold text-slate-900">
                        {{ harian.barang_keluar.length }}
                    </h2>
                    <p class="mt-1 text-xs text-slate-500">
                        Jumlah transaksi yang tercatat hari ini
                    </p>
                </div>

                <div class="rounded-[24px] border border-red-100 bg-white p-5 shadow-lg shadow-slate-900/5">
                    <p class="text-sm text-slate-500">Stok Menipis</p>
                    <h2 class="mt-2 text-3xl font-bold text-red-500">
                        {{ harian.stok_menipis.length }}
                    </h2>
                    <p class="mt-1 text-xs text-slate-500">
                        Item yang perlu segera diperhatikan
                    </p>
                </div>
            </section>

            <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div class="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/70 xl:col-span-2">
                    <div class="border-b border-slate-100 px-6 py-5">
                        <h2 class="text-xl font-bold text-slate-900">Detail Barang Keluar</h2>
                        <p class="mt-1 text-sm text-slate-500">
                            Daftar transaksi yang membentuk laporan harian saat ini.
                        </p>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm">
                            <thead class="bg-slate-50 text-slate-500">
                                <tr class="text-left">
                                    <th class="px-6 py-4 font-semibold">Obat</th>
                                    <th class="px-6 py-4 font-semibold">Jumlah</th>
                                    <th class="px-6 py-4 font-semibold">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr
                                    v-for="item in harian.barang_keluar"
                                    :key="item.id"
                                    class="border-t border-slate-100 transition hover:bg-slate-50/80">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sm font-bold text-sky-700">
                                                {{ getInitial(item.obat?.nama) }}
                                            </div>

                                            <div>
                                                <p class="font-semibold text-slate-800">
                                                    {{ item.obat?.nama || '-' }}
                                                </p>
                                                <p class="text-xs text-slate-400">
                                                    Transaksi harian
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td class="px-6 py-4">
                                        <span class="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                                            {{ item.jumlah }} item
                                        </span>
                                    </td>

                                    <td class="px-6 py-4 font-medium text-slate-700">
                                        Rp {{ formatRupiah(item.total) }}
                                    </td>
                                </tr>

                                <tr v-if="!harian.barang_keluar.length">
                                    <td colspan="3" class="px-6 py-14 text-center text-slate-500">
                                        Belum ada data barang keluar untuk laporan harian.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/70">
                    <div class="border-b border-slate-100 px-6 py-5">
                        <h2 class="text-xl font-bold text-slate-900">Stok Menipis</h2>
                        <p class="mt-1 text-sm text-slate-500">
                            Item yang perlu segera direstock berdasarkan laporan harian.
                        </p>
                    </div>

                    <div class="space-y-3 px-6 py-5">
                        <div
                            v-for="item in harian.stok_menipis"
                            :key="item.id"
                            class="flex items-center justify-between rounded-2xl bg-red-50 px-4 py-3">
                            <div>
                                <p class="font-semibold text-slate-800">
                                    {{ item.nama }}
                                </p>
                                <p class="text-xs text-slate-500">
                                    Perlu penambahan stok
                                </p>
                            </div>

                            <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-red-600">
                                Sisa {{ item.stok }}
                            </span>
                        </div>

                        <div
                            v-if="!harian.stok_menipis.length"
                            class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                            Tidak ada stok menipis pada laporan harian.
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <template v-if="mode === 'bulanan' && bulanan">
            <section class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-lg shadow-slate-900/5">
                    <p class="text-sm text-slate-500">Pendapatan Bulan Ini</p>
                    <h2 class="mt-2 text-3xl font-bold text-emerald-600">
                        Rp {{ formatRupiah(bulanan.total_pendapatan) }}
                    </h2>
                    <p class="mt-1 text-xs text-slate-500">
                        Total akumulasi pendapatan bulan berjalan
                    </p>
                </div>

                <div class="rounded-[24px] border border-sky-100 bg-white p-5 shadow-lg shadow-slate-900/5">
                    <p class="text-sm text-slate-500">Total Transaksi</p>
                    <h2 class="mt-2 text-3xl font-bold text-slate-900">
                        {{ bulanan.total_transaksi }}
                    </h2>
                    <p class="mt-1 text-xs text-slate-500">
                        Jumlah transaksi yang tercatat sepanjang bulan
                    </p>
                </div>

                <div class="rounded-[24px] border border-violet-100 bg-white p-5 shadow-lg shadow-slate-900/5">
                    <p class="text-sm text-slate-500">Rata-rata Nilai Transaksi</p>
                    <h2 class="mt-2 text-3xl font-bold text-violet-600">
                        Rp {{ averageBulanan }}
                    </h2>
                    <p class="mt-1 text-xs text-slate-500">
                        Estimasi nilai per transaksi pada bulan ini
                    </p>
                </div>
            </section>

            <section class="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/70">
                <div class="border-b border-slate-100 px-6 py-5">
                    <h2 class="text-xl font-bold text-slate-900">Ringkasan Bulanan</h2>
                    <p class="mt-1 text-sm text-slate-500">
                        Gambaran performa laporan bulanan yang siap dicetak ke PDF.
                    </p>
                </div>

                <div class="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-2">
                    <div class="rounded-2xl bg-slate-50 p-5">
                        <p class="text-sm text-slate-500">Status Laporan</p>
                        <p class="mt-2 text-lg font-semibold text-slate-900">
                            Laporan bulanan siap diunduh
                        </p>
                        <p class="mt-2 text-sm text-slate-500">
                            Gunakan tombol cetak bulanan pada bagian atas untuk membuka file PDF.
                        </p>
                    </div>

                    <div class="rounded-2xl bg-slate-50 p-5">
                        <p class="text-sm text-slate-500">Performa Bulan Ini</p>
                        <p class="mt-2 text-lg font-semibold text-slate-900">
                            {{ bulanan.total_transaksi }} transaksi dengan total Rp {{ formatRupiah(bulanan.total_pendapatan) }}
                        </p>
                        <p class="mt-2 text-sm text-slate-500">
                            Ringkasan ini membantu memantau pergerakan transaksi secara cepat tanpa membuka detail PDF.
                        </p>
                    </div>
                </div>
            </section>
        </template>
    </div>
</template>

<script setup>
useHead({
    title: "Laporan"
})

definePageMeta({ layout: 'admin' })

const { harian, bulanan, fetchHarian, fetchBulanan } = useLaporan()
const mode = ref('harian')
const loadingPage = ref(true)
const config = useRuntimeConfig()

onMounted(async () => {
    await Promise.all([
        fetchHarian(),
        fetchBulanan()
    ])

    setTimeout(() => {
        loadingPage.value = false
    }, 500)
})

const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID').format(Number(value || 0))
}

const averageBulanan = computed(() => {
    const totalPendapatan = Number(bulanan.value?.total_pendapatan || 0)
    const totalTransaksi = Number(bulanan.value?.total_transaksi || 0)

    if (!totalTransaksi) {
        return '0'
    }

    return formatRupiah(Math.round(totalPendapatan / totalTransaksi))
})

const getInitial = (value) => {
    return value?.charAt(0).toUpperCase() || '?'
}

const downloadHarianPdf = () => {
    window.open(`${config.public.apiBase}/laporan/harian/pdf`, '_blank')
}

const downloadBulananPdf = () => {
    window.open(`${config.public.apiBase}/laporan/bulanan/pdf`, '_blank')
}

const tabClass = (active) => {
    return [
        'rounded-xl px-5 py-2.5 text-sm font-semibold transition',
        active
            ? 'bg-white text-slate-900 shadow'
            : 'text-slate-500 hover:text-slate-700'
    ]
}
</script>
