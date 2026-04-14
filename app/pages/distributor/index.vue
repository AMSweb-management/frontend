<template>
    <div v-if="loadingPage" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
            <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm font-medium">Memuat data...</span>
        </div>
    </div>

    <div class="p-6 space-y-6">
        <section class="relative overflow-hidden rounded-[28px] bg-white/95 shadow-xl shadow-slate-900/10 ring-1 ring-white/60">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.14),_transparent_32%)]"></div>

            <div class="relative p-6 md:p-8">
                <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div class="max-w-2xl">
                        <p class="text-sm font-semibold uppercase tracking-[0.28em] text-sky-600">
                            Mitra Distribusi
                        </p>
                        <h1 class="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                            Kelola data distributor dengan tampilan yang lebih rapi dan konsisten
                        </h1>
                        <p class="mt-3 text-sm leading-6 text-slate-500 md:text-base">
                            Simpan informasi distributor, cari data lebih cepat, dan perbarui alamat mitra dari satu
                            halaman yang selaras dengan modul admin lainnya.
                        </p>
                    </div>

                    <button
                        @click="openCreate"
                        class="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800">
                        + Tambah Distributor
                    </button>
                </div>

                <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div class="rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
                        <p class="text-sm text-slate-500">Total Distributor</p>
                        <p class="mt-2 text-3xl font-bold text-slate-900">
                            {{ distributors.length }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Seluruh mitra yang sudah terdaftar
                        </p>
                    </div>

                    <div class="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                        <p class="text-sm text-slate-500">Hasil Pencarian</p>
                        <p class="mt-2 text-3xl font-bold text-emerald-700">
                            {{ filteredData.length }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Data yang cocok dengan kata kunci saat ini
                        </p>
                    </div>

                    <div class="rounded-2xl border border-violet-100 bg-violet-50/80 p-4">
                        <p class="text-sm text-slate-500">Alamat Terisi</p>
                        <p class="mt-2 text-3xl font-bold text-violet-700">
                            {{ addressCount }}
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            Distributor yang sudah memiliki alamat
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/70">
            <div class="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 class="text-xl font-bold text-slate-900">Daftar Distributor</h2>
                    <p class="mt-1 text-sm text-slate-500">
                        Kelola nama dan alamat distributor yang terhubung dengan data obat.
                    </p>
                </div>

                <div class="relative w-full lg:max-w-sm">
                    <input
                        v-model="search"
                        placeholder="Cari distributor..."
                        class="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100" />
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
                            <th class="px-6 py-4 font-semibold">Distributor</th>
                            <th class="px-6 py-4 font-semibold">Alamat</th>
                            <th class="px-6 py-4 font-semibold">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="item in paginatedData"
                            :key="item.id"
                            class="border-t border-slate-100 transition hover:bg-slate-50/80">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-3">
                                    <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sm font-bold text-sky-700">
                                        {{ getInitial(item.nama) }}
                                    </div>

                                    <div>
                                        <p class="font-semibold text-slate-800">
                                            {{ item.nama }}
                                        </p>
                                        <p class="text-xs text-slate-400">
                                            Mitra distributor
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td class="px-6 py-4 text-slate-600">
                                {{ item.alamat || '-' }}
                            </td>

                            <td class="px-6 py-4">
                                <div class="flex items-center gap-2">
                                    <button
                                        @click="openEdit(item)"
                                        class="inline-flex items-center rounded-xl border border-sky-200 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-50">
                                        Edit
                                    </button>
                                    <button
                                        @click="openDelete(item)"
                                        class="inline-flex items-center rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>

                        <tr v-if="!paginatedData.length">
                            <td colspan="3" class="px-6 py-14 text-center">
                                <div class="mx-auto max-w-md">
                                    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-2xl">
                                        +
                                    </div>
                                    <h3 class="mt-4 text-lg font-semibold text-slate-800">
                                        Data distributor belum tersedia
                                    </h3>
                                    <p class="mt-2 text-sm text-slate-500">
                                        Tambahkan distributor baru atau ubah kata kunci pencarian untuk melihat hasil lain.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex flex-col gap-4 border-t border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <p class="text-sm text-slate-500">
                    Navigasi halaman untuk melihat data distributor lainnya.
                </p>

                <div class="flex items-center gap-3">
                    <button
                        @click="page--"
                        :disabled="page === 1"
                        class="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">
                        Sebelumnya
                    </button>

                    <span class="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                        Halaman {{ page }} / {{ totalPage || 1 }}
                    </span>

                    <button
                        @click="page++"
                        :disabled="page >= totalPage"
                        class="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
                        Berikutnya
                    </button>
                </div>
            </div>
        </section>

        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
            <div class="w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-950/20">
                <div class="border-b border-slate-100 bg-slate-50/80 px-6 py-5">
                    <h2 class="text-xl font-bold text-slate-900">
                        {{ isEdit ? 'Edit Distributor' : 'Tambah Distributor' }}
                    </h2>
                    <p class="mt-1 text-sm text-slate-500">
                        Lengkapi informasi distributor agar data pemasok tetap tersusun rapi.
                    </p>
                </div>

                <div class="space-y-4 px-6 py-6">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700">Nama Distributor</label>
                        <input
                            v-model="form.nama"
                            placeholder="Masukkan nama distributor"
                            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
                    </div>

                    <div>
                        <label class="mb-2 block text-sm font-medium text-slate-700">Alamat</label>
                        <textarea
                            v-model="form.alamat"
                            rows="4"
                            placeholder="Masukkan alamat distributor"
                            class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"></textarea>
                    </div>
                </div>

                <div class="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 md:flex-row md:justify-end">
                    <button
                        @click="closeModal"
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

        <div v-if="showDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
            <div class="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl shadow-slate-950/20">
                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-red-600">
                    !
                </div>

                <h3 class="mt-4 text-lg font-bold text-slate-900">
                    Hapus distributor?
                </h3>
                <p class="mt-2 text-sm text-slate-500">
                    Tindakan ini akan menghapus distributor yang dipilih dari daftar.
                </p>

                <div class="mt-6 flex justify-center gap-3">
                    <button
                        @click="showDelete = false"
                        class="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                        Batal
                    </button>
                    <button
                        @click="confirmDelete"
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
useHead({ title: "Distributor" })

const {
    distributors,
    fetchDistributor,
    createDistributor,
    updateDistributor,
    deleteDistributor
} = useDistributor()

const loadingPage = ref(true)
const search = ref('')
const page = ref(1)
const perPage = 5
const showModal = ref(false)
const showDelete = ref(false)
const isEdit = ref(false)
const selectedId = ref<string | null>(null)

const form = ref({
    nama: '',
    alamat: ''
})

const filteredData = computed(() =>
    distributors.value.filter((d: any) =>
        d.nama.toLowerCase().includes(search.value.toLowerCase())
    )
)

const totalPage = computed(() => {
    return Math.ceil(filteredData.value.length / perPage)
})

const paginatedData = computed(() => {
    const start = (page.value - 1) * perPage
    return filteredData.value.slice(start, start + perPage)
})

const addressCount = computed(() => {
    return distributors.value.filter((item: any) => item.alamat?.trim()).length
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

const getInitial = (value?: string) => {
    return value?.charAt(0).toUpperCase() || '?'
}

const resetForm = () => {
    form.value = {
        nama: '',
        alamat: ''
    }
}

onMounted(async () => {
    await fetchDistributor()
    setTimeout(() => {
        loadingPage.value = false
    }, 500)
})

const openCreate = () => {
    isEdit.value = false
    selectedId.value = null
    resetForm()
    showModal.value = true
}

const openEdit = (item: any) => {
    isEdit.value = true
    selectedId.value = item.id
    form.value = {
        nama: item.nama,
        alamat: item.alamat
    }
    showModal.value = true
}

const openDelete = (item: any) => {
    selectedId.value = item.id
    showDelete.value = true
}

const closeModal = () => {
    showModal.value = false
    resetForm()
}

const submit = async () => {
    if (isEdit.value && selectedId.value) {
        await updateDistributor(selectedId.value, form.value)
    } else {
        await createDistributor(form.value)
    }

    showModal.value = false
    resetForm()
}

const confirmDelete = async () => {
    if (selectedId.value) {
        await deleteDistributor(selectedId.value)
    }

    showDelete.value = false
    selectedId.value = null
}
</script>
