<template>
    <div class="min-h-screen flex">

        <!-- LEFT SIDE (IMAGE + OVERLAY) -->
        <div class="hidden md:flex w-1/2 relative text-white flex-col justify-center px-12 overflow-hidden">

            <!-- BACKGROUND IMAGE -->
            <img src="/images/image.png" class="absolute inset-0 w-full h-full object-cover" />

            <!-- OVERLAY BIRU -->
            <div class="absolute inset-0 bg-[#1E3A8A]/80"></div>

            <!-- GRADIENT (KANAN → KIRI FADE) -->
            <div class="absolute inset-0 bg-gradient-to-l from-[#1E3A8A] via-[#1E3A8A]/60 to-transparent"></div>

            <div class="relative z-10 max-w-md ml-auto">

                <!-- JUDUL -->
                <h1 class="text-4xl font-bold text-[#FACC15] mb-4 anim-title">
                    MITRA SEJAHTERA
                </h1>

                <!-- DESKRIPSI -->
                <p class="text-lg mb-6 text-gray-200 anim-desc">
                    Sistem Manajemen Aset & Stok Obat Apotek
                </p>

                <!-- LIST -->
                <div class="space-y-3 text-sm text-gray-200">
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3 anim-item">
                            <div
                                class="w-5 h-5 flex items-center justify-center bg-[#FACC15]/20 rounded-full text-[#FACC15] text-xs">
                                ✓
                            </div>
                            <span>Kelola stok obat dengan mudah</span>
                        </li>
                        <li class="flex items-center gap-3 anim-item">
                            <div
                                class="w-5 h-5 flex items-center justify-center bg-[#FACC15]/20 rounded-full text-[#FACC15] text-xs">
                                ✓
                            </div>
                            <span>Monitoring aset apotek secara real-time</span>
                        </li>
                        <li class="flex items-center gap-3 anim-item">
                            <div
                                class="w-5 h-5 flex items-center justify-center bg-[#FACC15]/20 rounded-full text-[#FACC15] text-xs">
                                ✓
                            </div>
                            <span>Laporan otomatis & akurat</span>
                        </li>
                    </ul>
                </div>

                <!-- LOKASI -->
                <div class="mt-10 text-sm text-gray-300 space-y-1 anim-location">
                    <div class="flex items-center gap-2">
                        <span>📍</span>
                        <span>Jl. Kramat - Sumber Kec. Dukupuntang, Kab. Cirebon</span>
                    </div>
                </div>

            </div>

        </div>

        <!-- RIGHT SIDE -->
        <div class="flex w-full md:w-1/2 items-center justify-center bg-gray-100 px-6">

            <div class="login-card bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <!-- Header -->
                <div class="text-center mb-6">
                    <h2 class="text-2xl font-bold text-[#1E3A8A]">
                        Login
                    </h2>
                    <p class="text-sm text-gray-500">
                        Silakan masuk ke sistem
                    </p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">

                    <!-- ERROR -->
                    <div v-if="errorMsg" class="text-red-500 text-sm">
                        {{ errorMsg }}
                    </div>

                    <!-- EMAIL -->
                    <div>
                        <label class="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input v-model="email" type="email" placeholder="you@example.com"
                            class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E3A8A]" />
                    </div>

                    <!-- PASSWORD -->
                    <div>
                        <label class="block text-sm font-medium text-gray-600">
                            Password
                        </label>

                        <div class="relative mt-1">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                class="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-[#1E3A8A]" />

                            <!-- ICON -->
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
                                <svg v-if="!showPassword" F xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="M12 17.8c4.034 0 7.686-2.25 9.648-5.8C19.686 8.45 16.034 6.2 12 6.2S4.314 8.45 2.352 12c1.962 3.55 5.614 5.8 9.648 5.8M12 5c4.808 0 8.972 2.848 11 7c-2.028 4.152-6.192 7-11 7s-8.972-2.848-11-7c2.028-4.152 6.192-7 11-7m0 9.8a2.8 2.8 0 1 0 0-5.6a2.8 2.8 0 0 0 0 5.6m0 1.2a4 4 0 1 1 0-8a4 4 0 0 1 0 8" />
                                </svg>

                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd"
                                        d="m18.67 16.973l2.755 2.755l-.849.848L3.85 3.85L4.697 3l2.855 2.855C8.932 5.303 10.432 5 12 5c4.808 0 8.972 2.848 11 7a12.65 12.65 0 0 1-4.33 4.973M8.486 6.79l1.664 1.664a4 4 0 0 1 5.398 5.398l2.255 2.255c1.574-1 2.904-2.403 3.845-4.106C19.686 8.45 16.034 6.2 12 6.2a10.8 10.8 0 0 0-3.514.59m6.152 6.152a2.8 2.8 0 0 0-3.579-3.579zm1.81 5.204c-1.38.552-2.88.855-4.448.855c-4.808 0-8.972-2.848-11-7a12.65 12.65 0 0 1 4.33-4.973l.867.867A11.36 11.36 0 0 0 2.352 12c1.962 3.55 5.614 5.8 9.648 5.8a10.8 10.8 0 0 0 3.514-.59l.934.935zM8.453 10.15l.909.91a2.8 2.8 0 0 0 3.579 3.579l.91.908a4 4 0 0 1-5.398-5.398z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- BUTTON -->
                    <button type="submit" :disabled="loading"
                        class="w-full bg-[#FACC15] py-2 rounded-lg font-semibold hover:scale-[1.02] transition">
                        <span v-if="loading">Loading...</span>
                        <span v-else>Login</span>
                    </button>

                </form>
                <!-- Form -->

                <p class="text-sm text-center text-gray-500 mt-6">
                    © 2026 Mitra Sejahtera
                </p>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">

const showPassword = ref(false)
useHead({
    title: "Login"
})

import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'


onMounted(async () => {
    await nextTick()

    const tl = gsap.timeline()

    // Judul
    tl.from('.anim-title', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })

    // Deskripsi
    tl.from('.anim-desc', {
        x: 50,
        opacity: 0,
        duration: 0.6
    }, '-=0.4')

    // List (stagger)
    tl.from('.anim-item', {
        x: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    }, '-=0.3')

    // Lokasi
    tl.from('.anim-location', {
        x: 50,
        opacity: 0,
        duration: 0.6
    }, '-=0.3')

    tl.from('.login-card', {
        y: 60,
        opacity: 0,
        scale: 0.9,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'expo.out'
    })
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const { login } = useAuth()

const handleLogin = async () => {
    loading.value = true
    errorMsg.value = ''

    try {
        await login(email.value, password.value)

        // redirect ke dashboard
        navigateTo('/dashboard')
    } catch (err: any) {
        errorMsg.value = err.message
    } finally {
        loading.value = false
    }
}

</script>