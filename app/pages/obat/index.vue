<template>
    <div v-if="loadingPage" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
            <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm font-medium">Memuat data...</span>
        </div>
    </div>
    <div class="p-6">

        <!-- HEADER -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-white tracking-wide">
                Data Obat
            </h1>

            <button @click="openCreate"
                class="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <path fill="currentColor"
                        d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2" />
                </svg>
                Tambah
            </button>
        </div>

        <!-- 🔍 SEARCH -->
        <div class="relative mb-5">
            <input v-model="search" placeholder="Cari obat..."
                class="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" />
            <span class="absolute left-3 top-2.5 text-gray-400">
                🔍
            </span>
        </div>

        <!-- TABLE -->
        <table class="w-full rounded-xl overflow-hidden shadow-lg">
            <thead class="bg-gray-100">
                <tr>
                    <th class="p-3 text-left">Nama</th>
                    <th class="p-3 text-left">Tipe</th>
                    <th class="p-3 text-left">Stok</th>
                    <th class="p-3 text-left">Harga</th>
                    <th class="p-3 text-left">Aksi</th>
                </tr>
            </thead>

            <tbody class="bg-white">
                <tr v-for="item in paginatedObat" :key="item.id" class="border-t hover:bg-gray-50 transition">
                    <td class="p-3">{{ item.nama }}</td>
                    <td class="p-3">{{ item.tipe }}</td>

                    <!-- 🔥 BADGE STOK -->
                    <td class="p-3">
                        <span :class="[
                            'px-3 py-1 rounded-full text-white text-xs font-semibold shadow-sm',
                            item.stok < 10 ? 'bg-red-500' :
                                item.stok < 50 ? 'bg-yellow-500 text-black' :
                                    'bg-green-500'
                        ]">
                            {{ item.stok }}
                        </span>
                    </td>

                    <td class="p-3">Rp {{ item.harga }}</td>

                    <td class="p-3 space-x-2 flex items-center gap-1">
                        <button @click="openEdit(item)" class="text-blue-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <g fill="currentColor">
                                    <path
                                        d="M8 7a1 1 0 0 1-1 1H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1a1 1 0 0 1 2 0v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h1a1 1 0 0 1 1 1" />
                                    <path
                                        d="m14.596 5.011l4.392 4.392l-6.28 6.303A1 1 0 0 1 12 16H9a1 1 0 0 1-1-1v-3a1 1 0 0 1 .294-.708z" />
                                </g>
                            </svg>

                            <span>Edit</span>
                        </button>
                        <button @click="openDelete(item)" class="text-red-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3.713-4.288Q11 16.426 11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17t.713-.288m4 0Q15 16.426 15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17t.713-.288" />
                            </svg>

                            <span>Hapus</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 📦 PAGINATION -->
        <div class="flex justify-center mt-6 gap-3 text-white items-center">

            <button @click="page--" :disabled="page === 1"
                class="px-4 py-1 rounded-lg border hover:bg-white/10 disabled:opacity-40">
                ←
            </button>

            <span class="text-sm">
                Halaman <b>{{ page }}</b> / {{ totalPage }}
            </span>

            <button @click="page++" :disabled="page >= totalPage"
                class="px-4 py-1 rounded-lg border hover:bg-white/10 disabled:opacity-40">
                →
            </button>

        </div>

        <!-- ================= MODAL ================= -->
        <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
            <div class="bg-white p-6 rounded-xl w-full max-w-md">
                <h2 class="text-lg font-bold mb-4">
                    {{ isEdit ? 'Edit Obat' : 'Tambah Obat' }}
                </h2>

                <div class="space-y-3">

                    <label class="block text-sm font-medium text-gray-600">
                        Nama Obat
                    </label>
                    <input v-model="form.nama" placeholder="Nama" class="w-full border p-2 rounded" />

                    <label class="block text-sm font-medium text-gray-600">
                        Tipe Obat
                    </label>
                    <select v-model="form.tipe" class="w-full border p-2 rounded">
                        <option value="">Pilih Tipe</option>
                        <option>Tablet</option>
                        <option>Sirup</option>
                        <option>Kapsul</option>
                    </select>

                    <label class="block text-sm font-medium text-gray-600">
                        Stok
                    </label>
                    <input v-model="form.stok" type="number" placeholder="Stok" class="w-full border p-2 rounded" />

                    <label class="block text-sm font-medium text-gray-600">
                        Harga
                    </label>
                    <input v-model="form.harga" type="number" placeholder="Harga" class="w-full border p-2 rounded" />
                </div>

                <div class="flex justify-end gap-2 mt-4">
                    <button @click="closeModal" class="px-4 py-2 border rounded">
                        Batal
                    </button>

                    <button @click="submitForm" class="px-4 py-2 bg-blue-500 text-white rounded">
                        Simpan
                    </button>
                </div>
            </div>
        </div>

        <!-- DELETE -->
        <div v-if="showDelete" class="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div class="bg-white p-6 rounded-xl w-full max-w-sm text-center">
                <p class="mb-4">Yakin hapus data ini?</p>

                <div class="flex justify-center gap-2">
                    <button @click="showDelete = false" class="px-4 py-2 border rounded">
                        Batal
                    </button>

                    <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded">
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

onMounted(async () => {
    await fetchObat()
    setTimeout(() => {
        loadingPage.value = false
    }, 500) // biar smooth
})

const {
    obats,
    fetchObat,
    createObat,
    updateObat,
    deleteObat
} = useObat()

onMounted(fetchObat)

/* ================= SEARCH ================= */
const search = ref('')

const filteredObat = computed(() => {
    return obats.value.filter((item: any) =>
        item.nama.toLowerCase().includes(search.value.toLowerCase())
    )
})

/* ================= PAGINATION ================= */
const page = ref(1)
const perPage = 5

const totalPage = computed(() =>
    Math.ceil(filteredObat.value.length / perPage)
)

const paginatedObat = computed(() => {
    const start = (page.value - 1) * perPage
    return filteredObat.value.slice(start, start + perPage)
})

/* ================= STATE ================= */
const showModal = ref(false)
const showDelete = ref(false)
const isEdit = ref(false)
const selectedId = ref<string | null>(null)

const form = ref({
    nama: '',
    tipe: '',
    stok: 0,
    harga: 0
})

/* ================= ACTION ================= */
const openCreate = () => {
    isEdit.value = false
    showModal.value = true
    form.value = { nama: '', tipe: '', stok: 0, harga: 0 }
}

const openEdit = (item: any) => {
    isEdit.value = true
    selectedId.value = item.id
    showModal.value = true
    form.value = { ...item }
}

const openDelete = (item: any) => {
    selectedId.value = item.id
    showDelete.value = true
}

const closeModal = () => {
    showModal.value = false
}

/* ================= SUBMIT ================= */
const submitForm = async () => {
    if (isEdit.value && selectedId.value) {
        await updateObat(selectedId.value, form.value)
    } else {
        await createObat(form.value)
    }
    showModal.value = false
}

/* ================= DELETE ================= */
const confirmDelete = async () => {
    if (selectedId.value) {
        await deleteObat(selectedId.value)
    }
    showDelete.value = false
}
</script>