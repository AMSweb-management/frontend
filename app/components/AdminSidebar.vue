<template>
    <aside
        :class="[
            'h-screen overflow-y-auto border-r border-slate-200 bg-white text-slate-900 shadow-[18px_0_48px_-42px_rgba(15,23,42,0.35)] transition-transform duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]">
        <div class="flex min-h-full flex-col">
            <div class="border-b border-slate-200 px-5 py-6">
                <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-blue-200/70">
                            AMS
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

                    <button
                        type="button"
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

            <div class="flex-1 px-4 py-5">
                <p class="px-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Navigasi
                </p>

                <nav class="mt-4 space-y-2">
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

            <div class="border-t border-slate-200 p-4">
                <button @click="handleLogout"
                    class="flex w-full items-center justify-center rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200/70 transition hover:-translate-y-0.5 hover:bg-red-600">
                    Keluar dari Sistem
                </button>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const route = useRoute()
const sidebarOpen = useState('admin-sidebar-open', () => false)

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

const handleLogout = () => {
    if (confirm('Yakin mau logout?')) {
        logout()
    }
}

const handleNavigate = () => {
    sidebarOpen.value = false
}

watch(() => route.path, () => {
    sidebarOpen.value = false
})
</script>
