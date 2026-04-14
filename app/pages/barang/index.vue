<template>
    <div v-if="loadingPage" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
            <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm font-medium">Memuat data...</span>
        </div>
    </div>

    <div class="p-6 space-y-6">
        <section class="relative overflow-hidden rounded-[28px] bg-white/95 shadow-xl shadow-slate-900/10 ring-1 ring-white/60">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.18),_transparent_32%)]"></div>

            <div class="relative p-6 md:p-8">
                <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div class="max-w-2xl">
                        <p class="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                            Inventori Keluar
                        </p>
                        <h1 class="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                            Kelola transaksi barang keluar dengan tampilan yang lebih rapi
                        </h1>
                        <p class="mt-3 text-sm leading-6 text-slate-500 md:text-base">
                            Pantau pergerakan stok, lihat total transaksi terbaru, dan tambah data baru dari satu halaman
                            yang lebih nyaman dibaca.
                        </p>
                    </div>

                    <button
                        @click="showModal = true"
                        class="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800">
                        + Tambah Barang Keluar
                    </button>
                </div>

                <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div class="rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
                        <p class="text-sm text-slate-500">Total Data Ditampilkan</p>
                        <p class="mt-2 text-3xl font-bold text-slate-900">
                            {{ displayedData.length }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Transaksi pada halaman saat ini
                        </p>
                    </div>

                    <div class="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                        <p class="text-sm text-slate-500">Total Item Keluar</p>
                        <p class="mt-2 text-3xl font-bold text-emerald-700">
                            {{ totalJumlah }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Akumulasi jumlah dari daftar yang tampil
                        </p>
                    </div>

                    <div class="rounded-2xl border border-violet-100 bg-violet-50/80 p-4">
                        <p class="text-sm text-slate-500">Periode Terbaru</p>
                        <p class="mt-2 text-xl font-bold text-slate-900">
                            {{ latestDateLabel }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Berdasarkan transaksi paling baru di tabel
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/70">
            <div class="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 class="text-xl font-bold text-slate-900">Daftar Barang Keluar</h2>
                    <p class="mt-1 text-sm text-slate-500">
                        Menampilkan riwayat transaksi obat yang sudah keluar dari inventori.
                    </p>
                </div>

                <div class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                    <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    Halaman {{ safePagination.current_page }} dari {{ safePagination.last_page }}
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead class="bg-slate-50 text-slate-500">
                        <tr class="text-left">
                            <th class="px-6 py-4 font-semibold">Obat</th>
                            <th class="px-6 py-4 font-semibold">Jumlah</th>
                            <th class="px-6 py-4 font-semibold">Tanggal</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in displayedData" :key="item.id" class="border-t border-slate-100 transition hover:bg-slate-50/80">
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
                                            Barang keluar
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td class="px-6 py-4">
                                <span class="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                                    {{ item.jumlah }} item
                                </span>
                            </td>

                            <td class="px-6 py-4">
                                <span class="text-slate-600">
                                    {{ formatDate(item.tanggal) }}
                                </span>
                            </td>
                        </tr>

                        <tr v-if="!displayedData.length">
                            <td colspan="3" class="px-6 py-14 text-center">
                                <div class="mx-auto max-w-md">
                                    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-2xl">
                                        +
                                    </div>
                                    <h3 class="mt-4 text-lg font-semibold text-slate-800">
                                        Belum ada transaksi barang keluar
                                    </h3>
                                    <p class="mt-2 text-sm text-slate-500">
                                        Tambahkan data pertama untuk mulai memantau barang yang keluar dari inventori.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex flex-col gap-4 border-t border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <p class="text-sm text-slate-500">
                    Navigasi halaman untuk melihat riwayat transaksi lainnya.
                </p>

                <div class="flex items-center gap-3">
                    <button
                        @click="fetchData(safePagination.current_page - 1)"
                        :disabled="!safePagination.prev_page_url"
                        class="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
                        Sebelumnya
                    </button>

                    <button
                        @click="fetchData(safePagination.current_page + 1)"
                        :disabled="!safePagination.next_page_url"
                        class="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
                        Berikutnya
                    </button>
                </div>
            </div>
        </section>

        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
            <div class="w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-950/20">
                <div class="border-b border-slate-100 bg-slate-50/80 px-6 py-5">
                    <h2 class="text-xl font-bold text-slate-900">Tambah Barang Keluar</h2>
                    <p class="mt-1 text-sm text-slate-500">
                        Isi detail transaksi untuk mengurangi stok obat secara tercatat.
                    </p>
                </div>

                <div class="space-y-4 px-6 py-6">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700">Pilih Obat</label>
                        <select
                            v-model="form.obat_id"
                            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100">
                            <option value="">Pilih Obat</option>
                            <option v-for="item in obats" :key="item.id" :value="item.id">
                                {{ item.nama }}
                            </option>
                        </select>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700">Jumlah</label>
                            <input
                                v-model="form.jumlah"
                                type="number"
                                min="1"
                                placeholder="Masukkan jumlah"
                                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700">Tanggal</label>
                            <input
                                v-model="form.tanggal"
                                type="date"
                                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
                        </div>
                    </div>
                </div>

                <div class="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 md:flex-row md:justify-end">
                    <button
                        @click="showModal = false"
                        class="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                        Batal
                    </button>
                    <button
                        @click="submit"
                        class="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                        Simpan Data
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "admin" })

useHead({
    title: "Barang Keluar"
})

const { data, fetchData, createData, pagination } = useBarangKeluar()
const { obats, fetchObat } = useObat()
const loadingPage = ref(true)

const safePagination = computed(() => ({
    current_page: pagination.value?.current_page || 1,
    last_page: pagination.value?.last_page || 1,
    next_page_url: pagination.value?.next_page_url,
    prev_page_url: pagination.value?.prev_page_url
}))

const displayedData = computed(() => {
    return data.value.slice(0, 5)
})

const totalJumlah = computed(() => {
    return displayedData.value.reduce((sum, item) => sum + Number(item.jumlah || 0), 0)
})

const formatDate = (value?: string) => {
    if (!value) {
        return '-'
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(value))
}

const latestDateLabel = computed(() => {
    if (!displayedData.value.length) {
        return 'Belum ada data'
    }

    return formatDate(displayedData.value[0]?.tanggal)
})

const getInitial = (value?: string) => {
    return value?.charAt(0).toUpperCase() || '?'
}

onMounted(async () => {
    await fetchData(1)
    await fetchObat()
    setTimeout(() => {
        loadingPage.value = false
    }, 500)
})

const showModal = ref(false)

const form = ref({
    obat_id: '',
    jumlah: 0,
    tanggal: ''
})

const submit = async () => {
    await createData(form.value)
    showModal.value = false
    form.value = {
        obat_id: '',
        jumlah: 0,
        tanggal: ''
    }
}
</script>
