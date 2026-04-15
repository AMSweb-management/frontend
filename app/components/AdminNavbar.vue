<template>
    <header class="border-b border-blue-900/30 bg-gradient-to-r from-[#27439a] via-[#2d4fb0] to-[#335abf] px-6 py-4 text-white shadow-[0_18px_40px_-28px_rgba(37,69,154,0.9)]">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div class="flex items-start gap-3">
                <button
                    type="button"
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition hover:bg-white/15 lg:hidden"
                    @click="sidebarOpen = true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 12h16" />
                        <path d="M4 6h16" />
                        <path d="M4 18h16" />
                    </svg>
                </button>

                <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/80">
                        {{ currentSection.badge }}
                    </p>
                    <h1 class="mt-2 text-2xl font-bold text-white">
                        {{ currentSection.title }}
                    </h1>
                    <p class="mt-1 text-sm text-blue-100/80">
                        {{ currentSection.description }}
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-3 md:justify-end">
                <div class="hidden rounded-2xl border border-white/20 bg-white px-4 py-3 text-right shadow-lg shadow-blue-950/15 md:block">
                    <p class="text-xs uppercase tracking-[0.18em] text-slate-400">
                        Status
                    </p>
                    <div class="mt-1 flex items-center justify-end gap-2 text-sm font-semibold text-slate-700">
                        <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                        Sistem aktif
                    </div>
                </div>

                <div class="flex items-center gap-3 rounded-2xl border border-white/20 bg-white px-3 py-2 shadow-lg shadow-blue-950/15">
                    <div class="text-right text-sm">
                        <p class="font-semibold text-slate-800">
                            {{ user?.name || 'Loading...' }}
                        </p>
                        <p class="text-slate-400">
                            Administrator
                        </p>
                    </div>

                    <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-orange-300 to-yellow-300 font-bold uppercase text-slate-900 shadow-md shadow-amber-200/60">
                        {{ user?.name?.charAt(0) || 'A' }}
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const route = useRoute()
const sidebarOpen = useState('admin-sidebar-open', () => false)
const { user, fetchUser } = useAuth()

const sectionMap: Record<string, { badge: string; title: string; description: string }> = {
    '/dashboard': {
        badge: 'Overview',
        title: 'Dashboard Admin',
        description: 'Pantau aktivitas inventori, transaksi, dan performa sistem secara cepat.'
    },
    '/obat': {
        badge: 'Inventori',
        title: 'Data Obat',
        description: 'Kelola stok, harga, dan informasi obat dengan tampilan yang terstruktur.'
    },
    '/barang': {
        badge: 'Transaksi',
        title: 'Barang Keluar',
        description: 'Catat pergerakan barang keluar dan pantau riwayat transaksi inventori.'
    },
    '/distributor': {
        badge: 'Mitra',
        title: 'Data Distributor',
        description: 'Atur distributor dan lengkapi informasi pemasok yang terhubung ke inventori.'
    },
    '/laporan': {
        badge: 'Insight',
        title: 'Laporan',
        description: 'Lihat ringkasan performa harian dan bulanan serta cetak laporan PDF.'
    }
}

const currentSection = computed(() => {
    return sectionMap[route.path] || {
        badge: 'Admin',
        title: 'Admin Panel',
        description: 'Kelola seluruh modul aplikasi dari satu tempat.'
    }
})

onMounted(() => {
    fetchUser()
})
</script>
