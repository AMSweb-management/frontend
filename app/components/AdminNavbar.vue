<template>
    <header
        class="border-b border-blue-900/30 bg-gradient-to-r from-[#27439a] via-[#2d4fb0] to-[#335abf] px-6 py-4 text-white shadow-[0_18px_40px_-28px_rgba(37,69,154,0.9)]">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div class="flex items-start gap-3">
                <button type="button"
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
                <div ref="notifContainer" class="relative">
                    <button
                        type="button"
                        @click="openNotif = !openNotif"
                        class="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white text-slate-700 shadow-lg">

                        <!-- Bell Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
                        </svg>

                        <!-- Badge -->
                        <span v-if="total > 0"
                            class="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                            {{ total }}
                        </span>
                    </button>

                    <!-- Dropdown -->
                    <div
                        v-if="openNotif"
                        class="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/15 sm:left-auto sm:right-0 sm:w-80">

                        <div class="mb-2 flex items-center justify-between gap-3">
                            <p class="text-sm font-semibold text-slate-700">
                                Stok Menipis
                            </p>

                            <button
                                v-if="total > 0"
                                type="button"
                                @click="handleMarkAsRead"
                                class="shrink-0 text-xs font-medium text-blue-600 hover:underline">
                                Tandai dibaca
                            </button>
                        </div>

                        <div v-if="notifications.length === 0" class="text-sm text-slate-400">
                            Tidak ada notif
                        </div>

                        <div class="max-h-[min(22rem,60vh)] space-y-2 overflow-y-auto pr-1">
                            <div
                                v-for="item in notifications"
                                :key="item.id"
                                class="flex items-start justify-between gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50">

                                <div class="min-w-0 flex-1">
                                    <p class="truncate text-sm font-medium text-slate-700">
                                        {{ item.nama }}
                                    </p>

                                    <div class="mt-1 space-y-1 text-xs">
                                        <p v-for="(msg, i) in item.messages" :key="i" :class="item.types[i] === 'low_stock'
                                            ? 'text-red-500'
                                            : 'text-amber-500'">
                                            {{ msg }}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    v-if="item.types.includes('low_stock')"
                                    class="shrink-0 rounded-lg bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                                    {{ item.stok }}
                                </span>

                                <span
                                    v-else-if="item.types.includes('expired')"
                                    class="shrink-0 rounded-lg bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
                                    {{ formatDate(item.expired_date) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="flex items-center gap-3 rounded-2xl border border-white/20 bg-white px-3 py-2 shadow-lg shadow-blue-950/15">
                    <div class="text-right text-sm">
                        <p class="font-semibold text-slate-800">
                            {{ user?.name || 'Loading...' }}
                        </p>
                        <p class="text-slate-400">
                            Administrator
                        </p>
                    </div>

                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-orange-300 to-yellow-300 font-bold uppercase text-slate-900 shadow-md shadow-amber-200/60">
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
const notifContainer = ref<HTMLElement | null>(null)

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

const openNotif = ref(false)
const { notifications, total, fetchNotifications, markAsRead } = useNotification()

const handleMarkAsRead = async () => {
    await markAsRead()
    openNotif.value = false
}

const handleOutsideClick = (event: MouseEvent) => {
    if (!notifContainer.value) {
        return
    }

    if (!notifContainer.value.contains(event.target as Node)) {
        openNotif.value = false
    }
}

const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        openNotif.value = false
    }
}

onMounted(() => {
    fetchUser()
    fetchNotifications()
    window.addEventListener('click', handleOutsideClick)
    window.addEventListener('keydown', handleEscape)
})

const currentSection = computed(() => {
    return sectionMap[route.path] || {
        badge: 'Admin',
        title: 'Admin Panel',
        description: 'Kelola seluruh modul aplikasi dari satu tempat.'
    }
})

const formatDate = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('id-ID')
}

onBeforeUnmount(() => {
    window.removeEventListener('click', handleOutsideClick)
    window.removeEventListener('keydown', handleEscape)
})
</script>
