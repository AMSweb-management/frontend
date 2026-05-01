<template>
    <div v-if="loadingPage" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
            <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm font-medium">Memuat data...</span>
        </div>
    </div>

    <div class="p-6 space-y-6">
        <section
            class="relative overflow-hidden rounded-[28px] bg-white/95 shadow-xl shadow-slate-900/10 ring-1 ring-white/60">
            <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.14),_transparent_32%)]">
            </div>

            <div class="relative p-6 md:p-8">
                <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div class="max-w-2xl">
                        <p class="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
                            Inventori Obat
                        </p>
                        <h1 class="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                            Kelola data obat dengan tampilan yang lebih nyaman dan terstruktur
                        </h1>
                        <p class="mt-3 text-sm leading-6 text-slate-500 md:text-base">
                            Cari obat lebih cepat, pantau stok yang mulai menipis, dan tambah atau ubah data dari satu
                            halaman yang konsisten dengan modul barang keluar.
                        </p>
                    </div>

                    <button @click="openCreate"
                        class="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800">
                        + Tambah Obat
                    </button>
                </div>

                <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div class="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                        <p class="text-sm text-slate-500">Total Obat</p>
                        <p class="mt-2 text-3xl font-bold text-slate-900">
                            {{ obats.length }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Seluruh data obat yang tersedia
                        </p>
                    </div>

                    <div class="rounded-2xl border border-amber-100 bg-amber-50/80 p-4">
                        <p class="text-sm text-slate-500">Stok Menipis</p>
                        <p class="mt-2 text-3xl font-bold text-amber-600">
                            {{ lowStockCount }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Obat dengan stok di bawah 10 item
                        </p>
                    </div>

                    <div class="rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
                        <p class="text-sm text-slate-500">Hasil Pencarian</p>
                        <p class="mt-2 text-3xl font-bold text-sky-700">
                            {{ filteredObat.length }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Data yang cocok dengan kata kunci saat ini
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/70">
            <div
                class="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 class="text-xl font-bold text-slate-900">Daftar Obat</h2>
                    <p class="mt-1 text-sm text-slate-500">
                        Kelola stok, harga, dan distributor untuk setiap obat yang tersimpan.
                    </p>
                </div>

                <div class="relative w-full lg:max-w-sm">
                    <input v-model="search" placeholder="Cari nama obat..."
                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100" />
                    <span class="absolute left-4 top-3.5 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="m19.6 20.4l-5.3-5.3q-.6.45-1.325.675T11.5 16q-2.3 0-3.9-1.6T6 10.5t1.6-3.9T11.5 5t3.9 1.6t1.6 3.9q0 .75-.225 1.475T16.1 13.3l5.3 5.3q.15.15.15.35t-.15.35t-.35.15t-.35-.15M11.5 15q1.875 0 3.188-1.312T16 10.5t-1.312-3.187T11.5 6T8.313 7.313T7 10.5t1.313 3.188T11.5 15" />
                        </svg>
                    </span>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                    <thead class="bg-slate-50 text-slate-500">
                        <tr class="text-left">
                            <th class="px-6 py-4 font-semibold">Obat</th>
                            <th class="px-6 py-4 font-semibold">Tipe</th>
                            <th class="px-6 py-4 font-semibold">Stok</th>
                            <th class="px-6 py-4 font-semibold">Distributor</th>
                            <th class="px-6 py-4 font-semibold">Harga</th>
                            <th class="px-6 py-4 font-semibold">Expired</th>
                            <th class="px-6 py-4 font-semibold">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in paginatedObat" :key="item.id"
                            class="border-t border-slate-100 transition hover:bg-slate-50/80">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-bold text-emerald-700">
                                        {{ getInitial(item.nama) }}
                                    </div>

                                    <div>
                                        <p class="font-semibold text-slate-800">
                                            {{ item.nama }}
                                        </p>
                                        <p class="text-xs text-slate-400">
                                            Obat terdaftar
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td class="px-6 py-4">
                                <span
                                    class="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                    {{ item.tipe || '-' }}
                                </span>
                            </td>

                            <td class="px-6 py-4">
                                <span :class="[
                                    'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                                    item.stok < 10 ? 'bg-red-100 text-red-600' :
                                        item.stok < 50 ? 'bg-amber-100 text-amber-700' :
                                            'bg-emerald-100 text-emerald-700'
                                ]">
                                    {{ item.stok }} item
                                </span>
                            </td>

                            <td class="px-6 py-4 text-slate-600">
                                {{ item.distributor?.nama || '-' }}
                            </td>

                            <td class="px-6 py-4 font-medium text-slate-700">
                                Rp {{ formatRupiah(item.harga) }}
                            </td>

                            <td class="px-6 py-4">
                                <span :class="[
                                    'text-xs font-semibold px-3 py-1 rounded-full',
                                    isExpired(item.expired_date)
                                        ? 'bg-red-100 text-red-600'
                                        : isNearExpired(item.expired_date)
                                            ? 'bg-amber-100 text-amber-700'
                                            : 'bg-emerald-100 text-emerald-700'
                                ]">
                                    {{ formatDate(item.expired_date) }}
                                </span>
                            </td>

                            <td class="px-6 py-4">
                                <div class="flex items-center gap-2">
                                    <button @click="openEdit(item)"
                                        class="inline-flex items-center rounded-xl border border-sky-200 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-50">
                                        Edit
                                    </button>

                                    <button @click="openDelete(item)"
                                        class="inline-flex items-center rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr v-if="!paginatedObat.length">
                            <td colspan="6" class="px-6 py-14 text-center">
                                <div class="mx-auto max-w-md">
                                    <div
                                        class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-2xl">
                                        +
                                    </div>
                                    <h3 class="mt-4 text-lg font-semibold text-slate-800">
                                        Data obat belum tersedia
                                    </h3>
                                    <p class="mt-2 text-sm text-slate-500">
                                        Tambahkan data obat baru atau ubah kata kunci pencarian untuk melihat hasil
                                        lain.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                class="flex flex-col gap-4 border-t border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <p class="text-sm text-slate-500">
                    Navigasi halaman untuk melihat data obat lainnya.
                </p>

                <div class="flex items-center gap-3">
                    <button @click="page--" :disabled="page === 1"
                        class="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
                        Sebelumnya
                    </button>

                    <span class="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                        Halaman {{ page }} / {{ totalPage || 1 }}
                    </span>

                    <button @click="page++" :disabled="page >= totalPage"
                        class="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
                        Berikutnya
                    </button>
                </div>
            </div>
        </section>

        <div v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
            <div class="w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-950/20">
                <div class="border-b border-slate-100 bg-slate-50/80 px-6 py-5">
                    <h2 class="text-xl font-bold text-slate-900">
                        {{ isEdit ? 'Edit Obat' : 'Tambah Obat' }}
                    </h2>
                    <p class="mt-1 text-sm text-slate-500">
                        Lengkapi informasi obat untuk menjaga data inventori tetap akurat.
                    </p>
                </div>

                <div class="space-y-4 px-6 py-6">
                    <div
                        v-if="errorMsg"
                        class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {{ errorMsg }}
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700">Nama Obat</label>
                        <input v-model="form.nama" placeholder="Masukkan nama obat"
                            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700">Tipe Obat</label>
                            <select v-model="form.tipe"
                                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100">
                                <option value="">Pilih Tipe</option>
                                <option>Tablet Bebas</option>
                                <option>Sirup Bebas</option>
                                <option>Obat Bebas</option>
                                <option>Alat Kesehatan</option>
                                <option>Madu</option>
                                <option>Vitamin</option>
                                <option>Obat Keras Tablet</option>
                                <option>Obat Keras Sirup</option>
                                <option>Salep</option>
                            </select>
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700">Distributor</label>
                            <select v-model="form.distributor_id"
                                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100">
                                <option value="">Pilih Distributor</option>
                                <option v-for="d in distributors" :key="d.id" :value="d.id">
                                    {{ d.nama }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700">Stok</label>
                            <input v-model="form.stok" type="number" min="0" step="1" @input="sanitizeStok"
                                placeholder="Masukkan stok"
                                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
                        </div>

                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-700">Harga</label>
                            <input v-model="form.harga" type="number" min="0" step="1" @input="sanitizeHarga"
                                placeholder="Masukkan harga"
                                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
                        </div>
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700">
                            Expired Date
                        </label>
                        <input v-model="form.expired_date" type="date"
                            class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
                    </div>
                </div>

                <div class="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 md:flex-row md:justify-end">
                    <button @click="closeModal"
                        class="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                        Batal
                    </button>

                    <button @click="submitForm"
                        :disabled="submitting || !canSubmit"
                        class="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50">
                        {{ submitting ? 'Menyimpan...' : 'Simpan Data' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showDelete"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
            <div class="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl shadow-slate-950/20">
                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-600">
                    !
                </div>

                <h3 class="mt-4 text-lg font-bold text-slate-900">
                    Hapus data obat?
                </h3>
                <p class="mt-2 text-sm text-slate-500">
                    Tindakan ini akan menghapus data obat yang dipilih dari daftar inventori.
                </p>

                <div class="mt-6 flex justify-center gap-3">
                    <button @click="showDelete = false"
                        class="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                        Batal
                    </button>

                    <button @click="confirmDelete"
                        class="inline-flex items-center justify-center rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600">
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "admin" })
useHead({ title: "Data Obat" })

const loadingPage = ref(true)
const search = ref('')
const page = ref(1)
const perPage = 5
const showModal = ref(false)
const showDelete = ref(false)
const isEdit = ref(false)
const submitting = ref(false)
const errorMsg = ref('')
const selectedId = ref<string | null>(null)
const { getFriendlyErrorMessage } = useFriendlyError()

const { distributors, fetchDistributor } = useDistributor()
const {
    obats,
    fetchObat,
    createObat,
    updateObat,
    deleteObat
} = useObat()

const form = ref({
    nama: '',
    tipe: '',
    stok: 0,
    harga: 0,
    distributor_id: '',
    expired_date: ''
})

const filteredObat = computed(() => {
    return obats.value.filter((item: any) =>
        item.nama.toLowerCase().includes(search.value.toLowerCase())
    )
})

const totalPage = computed(() => {
    return Math.ceil(filteredObat.value.length / perPage)
})

const paginatedObat = computed(() => {
    const start = (page.value - 1) * perPage
    return filteredObat.value.slice(start, start + perPage)
})

const lowStockCount = computed(() => {
    return obats.value.filter((item: any) => Number(item.stok || 0) < 10).length
})

watch(search, () => {
    page.value = 1
})

watch(totalPage, (value) => {
    if (!value) {
        page.value = 1
        return
    }

    if (page.value > value) {
        page.value = value
    }
})

const formatRupiah = (value: number | string) => {
    return new Intl.NumberFormat('id-ID').format(Number(value || 0))
}

const getInitial = (value?: string) => {
    return value?.charAt(0).toUpperCase() || '?'
}

const normalizedStok = computed(() => Math.trunc(Number(form.value.stok || 0)))
const normalizedHarga = computed(() => Math.trunc(Number(form.value.harga || 0)))

const canSubmit = computed(() => {
    return !!form.value.nama.trim()
        && !!form.value.tipe
        && normalizedStok.value >= 0
        && normalizedHarga.value >= 0
})

const sanitizeStok = () => {
    const parsedValue = Math.trunc(Number(form.value.stok || 0))
    form.value.stok = Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0
}

const sanitizeHarga = () => {
    const parsedValue = Math.trunc(Number(form.value.harga || 0))
    form.value.harga = Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0
}

const resetForm = () => {
    form.value = {
        nama: '',
        tipe: '',
        stok: 0,
        harga: 0,
        distributor_id: '',
        expired_date: ''
    }
}

onMounted(async () => {
    await fetchObat()
    await fetchDistributor()
    setTimeout(() => {
        loadingPage.value = false
    }, 500)
})

const openCreate = () => {
    isEdit.value = false
    selectedId.value = null
    errorMsg.value = ''
    resetForm()
    showModal.value = true
}

const openEdit = (item: any) => {
    isEdit.value = true
    selectedId.value = item.id
    errorMsg.value = ''
    showModal.value = true

    form.value = {
        nama: item.nama,
        tipe: item.tipe,
        stok: item.stok,
        harga: item.harga,
        distributor_id: item.distributor_id,
        expired_date: item.expired_date
    }
}

const openDelete = (item: any) => {
    selectedId.value = item.id
    showDelete.value = true
}

const closeModal = () => {
    showModal.value = false
    errorMsg.value = ''
    resetForm()
}

const submitForm = async () => {
    errorMsg.value = ''
    sanitizeStok()
    sanitizeHarga()

    if (!canSubmit.value) {
        errorMsg.value = 'Nama, tipe, stok, dan harga harus valid. Stok serta harga tidak boleh minus.'
        return
    }

    submitting.value = true

    try {
        const payload = {
            ...form.value,
            stok: normalizedStok.value,
            harga: normalizedHarga.value
        }

        if (isEdit.value && selectedId.value) {
            await updateObat(selectedId.value, payload)
        } else {
            await createObat(payload)
        }

        showModal.value = false
        resetForm()
    } catch (error) {
        errorMsg.value = getFriendlyErrorMessage(error, 'Data obat belum berhasil disimpan.')
    } finally {
        submitting.value = false
    }
}

const confirmDelete = async () => {
    if (selectedId.value) {
        await deleteObat(selectedId.value)
    }

    showDelete.value = false
    selectedId.value = null
}

const formatDate = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('id-ID')
}

const isExpired = (date: string) => {
    if (!date) return false
    return new Date(date) < new Date()
}

const isNearExpired = (date: string) => {
    if (!date) return false
    const now = new Date()
    const exp = new Date(date)

    const diff = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 30 && diff > 0
}
</script>
