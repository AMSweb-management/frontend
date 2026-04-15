<template>
    <div class="relative min-h-screen overflow-hidden bg-[#1E3A8A]">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.18),_transparent_24%),linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_52%,_#1e3a8a_100%)] lg:hidden" />
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />

        <div class="relative z-10 grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
            <section class="relative hidden overflow-hidden px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
                <img
                    src="/images/apotek.png"
                    alt="Apotek Mitra Sejahtera"
                    class="absolute inset-0 h-full w-full object-cover" />
                <div class="absolute inset-0 bg-[#1E3A8A]/82" />
                <div class="absolute inset-0 bg-gradient-to-br from-[#0f172a]/45 via-[#1E3A8A]/35 to-[#1d4ed8]/25" />
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.16),_transparent_24%)]" />

                <div class="max-w-xl">
                    <div class="hero-copy inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-blue-50 backdrop-blur-md">
                        <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        Sistem inventori apotek siap digunakan
                    </div>

                    <div class="mt-8">
                        <p class="hero-copy text-sm font-semibold uppercase tracking-[0.35em] text-blue-100/80">
                            Mitra Sejahtera
                        </p>
                        <h1 class="hero-copy mt-4 max-w-lg text-5xl font-black leading-tight text-white">
                            Kelola aset dan stok obat dalam satu dashboard.
                        </h1>
                        <p class="hero-copy mt-5 max-w-xl text-lg leading-8 text-blue-100/80">
                            Pantau persediaan, transaksi barang keluar, distributor, dan laporan apotek dengan tampilan yang lebih cepat dan terstruktur.
                        </p>
                    </div>

                    <div class="mt-10 grid gap-4 sm:grid-cols-3">
                        <div
                            v-for="item in overviewCards"
                            :key="item.label"
                            class="feature-card rounded-3xl border border-white/12 bg-white/10 p-5 backdrop-blur-md">
                            <p class="text-sm text-blue-100/70">{{ item.label }}</p>
                            <p class="mt-3 text-2xl font-bold text-white">{{ item.value }}</p>
                            <p class="mt-2 text-sm text-blue-100/75">{{ item.description }}</p>
                        </div>
                    </div>
                </div>

                <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                    <div class="rounded-[2rem] border border-white/12 bg-white/10 p-6 backdrop-blur-xl">
                        <p class="hero-copy text-sm font-semibold uppercase tracking-[0.24em] text-blue-100/75">
                            Keunggulan
                        </p>
                        <ul class="mt-5 space-y-4">
                            <li
                                v-for="point in highlights"
                                :key="point"
                                class="hero-item flex items-start gap-3 text-sm leading-6 text-blue-50/90">
                                <span class="mt-1 flex h-7 w-7 items-center justify-center rounded-2xl bg-amber-300/20 text-amber-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" fill="none"
                                        stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m5 12 5 5L20 7" />
                                    </svg>
                                </span>
                                <span>{{ point }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="rounded-[2rem] border border-white/12 bg-slate-950/25 p-6 backdrop-blur-xl">
                        <p class="hero-copy text-sm font-semibold uppercase tracking-[0.24em] text-blue-100/75">
                            Lokasi
                        </p>
                        <p class="hero-copy mt-4 text-xl font-semibold text-white">
                            Apotek Mitra Sejahtera
                        </p>
                        <p class="hero-copy mt-3 text-sm leading-7 text-blue-100/80">
                            Jl. Kramat - Sumber, Kec. Dukupuntang, Kab. Cirebon
                        </p>
                        <div class="hero-copy mt-6 rounded-2xl border border-white/12 bg-white/10 px-4 py-3 text-sm text-blue-50/90">
                            Login untuk masuk ke dashboard admin dan mulai mengelola operasional harian.
                        </div>
                    </div>
                </div>
            </section>

            <section class="relative flex items-center justify-center bg-[#1E3A8A] px-4 py-8 sm:px-6 lg:px-10">
                <div class="login-card w-full max-w-xl rounded-[2rem] border border-white/45 bg-white/90 p-6 shadow-[0_35px_90px_-36px_rgba(15,23,42,0.75)] backdrop-blur-2xl sm:p-8">
                    <div class="flex items-center gap-3 lg:hidden">
                        <div
                            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-200/80">
                            AMS
                        </div>
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600">
                                Mitra Sejahtera
                            </p>
                            <p class="mt-1 text-lg font-bold text-slate-900">
                                Asset Management
                            </p>
                        </div>
                    </div>

                    <div class="mt-8">
                        <div class="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
                            Admin Login
                        </div>
                        <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                            Masuk ke sistem
                        </h2>
                        <p class="mt-3 text-sm leading-6 text-slate-500">
                            Gunakan akun admin Anda untuk mengakses dashboard inventori, transaksi, dan laporan apotek.
                        </p>
                    </div>

                    <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
                        <div
                            v-for="item in overviewCards"
                            :key="`mobile-${item.label}`"
                            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ item.label }}</p>
                            <p class="mt-2 text-lg font-bold text-slate-900">{{ item.value }}</p>
                        </div>
                    </div>

                    <form @submit.prevent="handleLogin" class="mt-8 space-y-5">
                        <div
                            v-if="errorMsg"
                            class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                            {{ errorMsg }}
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-slate-700">
                                Email
                            </label>
                            <div class="relative">
                                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </span>
                                <input
                                    v-model="email"
                                    type="email"
                                    autocomplete="email"
                                    placeholder="admin@mitrasejahtera.id"
                                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-center justify-between gap-3">
                                <label class="text-sm font-semibold text-slate-700">
                                    Password
                                </label>
                                <span class="text-xs text-slate-400">
                                    Pastikan akun Anda aman
                                </span>
                            </div>

                            <div class="relative">
                                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect width="18" height="11" x="3" y="11" rx="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>

                                <input
                                    v-model="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    autocomplete="current-password"
                                    placeholder="Masukkan password"
                                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-14 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100" />

                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-slate-700">
                                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>

                                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m3 3 18 18" />
                                        <path d="M10.58 10.58A2 2 0 0 0 13.42 13.42" />
                                        <path d="M9.88 4.24A10.75 10.75 0 0 1 21.94 11.65a1 1 0 0 1 0 .7a10.8 10.8 0 0 1-3.32 4.62" />
                                        <path d="M6.61 6.61A10.75 10.75 0 0 0 2.06 11.65a1 1 0 0 0 0 .7A10.75 10.75 0 0 0 12 19a10.8 10.8 0 0 0 4.23-.86" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            :disabled="loading"
                            class="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 px-4 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-amber-200/70 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
                            <span v-if="loading">Memproses login...</span>
                            <span v-else>Masuk ke Dashboard</span>
                            <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 transition group-hover:translate-x-1" fill="none"
                                stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="m13 5 7 7-7 7" />
                            </svg>
                        </button>
                    </form>

                    <div class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                        <p class="font-semibold text-slate-700">Akses aman untuk administrator</p>
                        <p class="mt-1 leading-6">
                            Pastikan email dan password sesuai dengan akun admin yang telah terdaftar di sistem.
                        </p>
                    </div>

                    <p class="mt-6 text-center text-sm text-slate-400">
                        &copy; 2026 Mitra Sejahtera
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import gsap from 'gsap'

useHead({
    title: 'Login'
})

const showPassword = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const overviewCards = [
    {
        label: 'Modul Aktif',
        value: '4 Modul',
        description: 'Inventori, transaksi, distributor, dan laporan.'
    },
    {
        label: 'Monitoring',
        value: 'Realtime',
        description: 'Pergerakan stok dan aktivitas harian lebih cepat dipantau.'
    },
    {
        label: 'Laporan',
        value: 'Siap Cetak',
        description: 'Rekap harian dan bulanan tersedia langsung dari dashboard.'
    }
]

const highlights = [
    'Kelola stok obat dengan alur yang lebih terstruktur dan mudah dipantau.',
    'Catat barang keluar dan distribusi inventori secara real-time.',
    'Pantau performa apotek lewat laporan yang siap dilihat dan dicetak.'
]

onMounted(async () => {
    await nextTick()

    const tl = gsap.timeline()

    tl.from('.hero-copy', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out'
    })

    tl.from('.feature-card', {
        y: 28,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.35')

    tl.from('.hero-item', {
        x: 24,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power3.out'
    }, '-=0.35')

    tl.from('.login-card', {
        y: 42,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        ease: 'expo.out'
    }, '-=0.45')
})

const { login } = useAuth()

const handleLogin = async () => {
    loading.value = true
    errorMsg.value = ''

    try {
        await login(email.value, password.value)
        await navigateTo('/dashboard')
    } catch (err: any) {
        errorMsg.value = err.message
    } finally {
        loading.value = false
    }
}
</script>
