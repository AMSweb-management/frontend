<template>
    <div v-if="loadingPage" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg">
            <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm font-medium">Memuat data...</span>
        </div>
    </div>
    <div class="p-6">

        <!-- HEADER -->
        <div class="flex justify-between mb-4">
            <h1 class="text-xl font-bold text-white">Barang Keluar</h1>

            <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded">
                + Tambah
            </button>
        </div>

        <!-- TABLE -->
        <table class="w-full bg-white rounded shadow">
            <thead>
                <tr class="text-left border-b">
                    <th class="p-3">Obat</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in data" :key="item.id" class="border-b">
                    <td class="p-3">{{ item.obat.nama }}</td>
                    <td>{{ item.jumlah }}</td>
                    <td>{{ item.tanggal }}</td>
                </tr>
            </tbody>
        </table>

        <div class="flex justify-center mt-6 gap-3 text-white items-center">

            <!-- PREV -->
            <button @click="fetchData(pagination.current_page - 1)" :disabled="!pagination.prev_page_url"
                class="px-4 py-1 rounded-lg border hover:bg-white/10 disabled:opacity-40">
                ←
            </button>

            <!-- INFO -->
            <span class="text-sm">
                Halaman
                <b>{{ safePagination.current_page }}</b>
                dari
                <b>{{ safePagination.last_page }}</b>
            </span>

            <!-- NEXT -->
            <button @click="fetchData(pagination.current_page + 1)" :disabled="!pagination.next_page_url"
                class="px-4 py-1 rounded-lg border hover:bg-white/10 disabled:opacity-40">
                →
            </button>

        </div>

        <!-- MODAL -->
        <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div class="bg-white p-6 rounded-xl w-full max-w-md">

                <h2 class="font-bold mb-4">Tambah Barang Keluar</h2>

                <select v-model="form.obat_id" class="w-full border p-2 rounded mb-2">
                    <option value="">Pilih Obat</option>
                    <option v-for="item in obats" :value="item.id" :key="item.id">
                        {{ item.nama }}
                    </option>
                </select>

                <input v-model="form.jumlah" type="number" placeholder="Jumlah"
                    class="w-full border p-2 rounded mb-2" />

                <input v-model="form.tanggal" type="date" class="w-full border p-2 rounded mb-2" />

                <div class="flex justify-end gap-2">
                    <button @click="showModal = false">Batal</button>
                    <button @click="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
                        Simpan
                    </button>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "admin" })

const { data, fetchData, createData, pagination } = useBarangKeluar()
const { obats, fetchObat } = useObat()
const loadingPage = ref(true)

const safePagination = computed(() => ({
    current_page: pagination.value?.current_page || 1,
    last_page: pagination.value?.last_page || 1,
    next_page_url: pagination.value?.next_page_url,
    prev_page_url: pagination.value?.prev_page_url
}))

onMounted(async () => {
    fetchData(1)
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
}
</script>