<template>
    <aside v-bind="$attrs" :class="[
        'flex h-[100dvh] flex-col overflow-hidden border-r border-slate-200 bg-white text-slate-900 shadow-[18px_0_48px_-42px_rgba(15,23,42,0.35)] transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
        <div class="flex min-h-0 flex-1 flex-col">
            <div class="border-b border-slate-200 px-5 py-6">
                <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div
                            class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-200/70 ring-1 ring-slate-200">

                            <img src="/images/logo.png" alt="AMS Logo" class="h-full w-full object-cover" />

                        </div>

                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
                                Admin Panel
                            </p>
                            <h2 class="mt-1 text-lg font-bold text-slate-900">
                                Asset Management
                            </h2>
                        </div>
                    </div>

                    <button type="button"
                        class="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
                        @click="sidebarOpen = false">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="min-h-0 flex-1 overflow-y-auto px-4 py-5">
                <p class="px-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Navigasi
                </p>

                <nav class="mt-4 space-y-2 pb-6">
                    <NuxtLink v-for="item in menuItems" :key="item.to" :to="item.to"
                        class="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-slate-900"
                        active-class="bg-gradient-to-r from-sky-50 via-blue-50 to-cyan-50 text-sky-700 ring-1 ring-sky-200 shadow-sm shadow-sky-100/80"
                        @click="handleNavigate">
                        <span
                            class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition group-hover:bg-sky-100 group-hover:text-sky-700">
                            <Icon :icon="item.icon" class="h-5 w-5" />
                        </span>
                        <div class="flex-1">
                            <p class="font-semibold">{{ item.label }}</p>
                            <p class="text-xs text-slate-400 transition group-hover:text-slate-500">
                                {{ item.description }}
                            </p>
                        </div>
                    </NuxtLink>
                </nav>
            </div>

            <div class="border-t border-slate-200 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <button type="button" @click="openLogoutDialog"
                    class="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200/70 transition hover:-translate-y-0.5 hover:bg-red-600">
                    <Icon icon="mdi:logout" class="h-5 w-5" />
                    Keluar dari Sistem
                </button>
            </div>
        </div>
    </aside>

    <Teleport to="body">
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="logoutDialogOpen"
                class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
                @click.self="closeLogoutDialog">
                <Transition appear enter-active-class="transition duration-200 ease-out"
                    enter-from-class="translate-y-3 scale-95 opacity-0"
                    enter-to-class="translate-y-0 scale-100 opacity-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="translate-y-0 scale-100 opacity-100"
                    leave-to-class="translate-y-3 scale-95 opacity-0">
                    <section role="dialog" aria-modal="true" aria-labelledby="logout-dialog-title"
                        class="w-full max-w-md rounded-3xl bg-white p-6 text-slate-900 shadow-2xl shadow-slate-950/25 ring-1 ring-slate-200">
                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
                                <Icon icon="mdi:logout-variant" class="h-6 w-6" />
                            </div>

                            <div class="min-w-0">
                                <h2 id="logout-dialog-title" class="text-lg font-bold text-slate-950">
                                    Keluar dari sistem?
                                </h2>
                                <p class="mt-2 text-sm leading-6 text-slate-500">
                                    Sesi admin akan diakhiri dan Anda perlu login kembali untuk mengakses dashboard.
                                </p>
                            </div>
                        </div>

                        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button type="button"
                                class="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                                @click="closeLogoutDialog">
                                Batal
                            </button>
                            <button type="button"
                                class="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200/70 transition hover:bg-red-600"
                                @click="confirmLogout">
                                <Icon icon="mdi:check" class="h-5 w-5" />
                                Ya, keluar
                            </button>
                        </div>
                    </section>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({
    inheritAttrs: false
})

const route = useRoute()
const sidebarOpen = useState('admin-sidebar-open', () => false)
const logoutDialogOpen = ref(false)

const menuItems = [
    {
        to: '/dashboard',
        label: 'Dashboard',
        description: 'Ringkasan performa utama',
        icon: 'mdi:view-dashboard'
    },
    {
        to: '/obat',
        label: 'Data Obat',
        description: 'Kelola stok dan harga obat',
        icon: 'mdi:pill'
    },
    {
        to: '/barang',
        label: 'Barang Keluar',
        description: 'Catat transaksi inventori',
        icon: 'mdi:package-variant'
    },
    {
        to: '/distributor',
        label: 'Distributor',
        description: 'Kelola mitra pemasok',
        icon: 'mdi:truck'
    },
    {
        to: '/laporan',
        label: 'Laporan',
        description: 'Pantau dan cetak rekap data',
        icon: 'mdi:file-chart'
    }
]

const { logout } = useAuth()

const openLogoutDialog = () => {
    logoutDialogOpen.value = true
}

const closeLogoutDialog = () => {
    logoutDialogOpen.value = false
}

const confirmLogout = () => {
    closeLogoutDialog()
    logout()
}

const handleNavigate = () => {
    sidebarOpen.value = false
}

watch(() => route.path, () => {
    sidebarOpen.value = false
    closeLogoutDialog()
})

const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeLogoutDialog()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscape)
})
</script>
