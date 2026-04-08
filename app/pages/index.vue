<template>
    <div class="min-h-screen flex">

        <!-- LEFT SIDE (BIRU) -->
        <div class="hidden md:flex w-1/2 bg-[#1E3A8A] text-white flex-col justify-center px-12">

            <div>
                <h1 class="text-4xl font-bold text-[#FACC15] mb-4">
                    MITRA SEJAHTERA
                </h1>

                <p class="text-lg mb-6 text-gray-200">
                    Sistem Manajemen Aset & Stok Obat Apotek
                </p>

                <div class="space-y-3 text-sm text-gray-200">
                    <p>✔️ Kelola stok obat dengan mudah</p>
                    <p>✔️ Monitoring aset apotek secara real-time</p>
                    <p>✔️ Laporan otomatis & akurat</p>
                </div>

                <div class="mt-10 text-sm text-gray-300 space-y-1">

                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 72 72">
                            <circle cx="36.446" cy="28.864" r="7.225" fill="#fff" />
                            <path fill="#d22f27"
                                d="M52.573 29.11c0-9.315-7.133-16.892-15.903-16.892s-15.903 7.577-15.903 16.896c.002.465.223 11.609 12.96 31.245a3.46 3.46 0 0 0 2.818 1.934c1.84 0 3.094-2.026 3.216-2.232C52.58 40.414 52.58 29.553 52.573 29.11" />
                            <path fill="#ea5a47"
                                d="M52.573 29.11c0-9.315-7.133-16.892-15.903-16.892a15 15 0 0 0-3.865.525c8.395.45 15.1 7.823 15.1 16.85c.006.443.006 11.303-12.813 30.95a6 6 0 0 1-.586.797c.52.584 1.257.928 2.04.954c1.839 0 3.093-2.027 3.215-2.233C52.58 40.414 52.58 29.553 52.573 29.11" />
                            <g fill="none" stroke="#000" stroke-width="2">
                                <path
                                    d="M36.545 62.294a3.46 3.46 0 0 1-2.817-1.935C20.99 40.723 20.769 29.58 20.766 29.114c0-9.32 7.134-16.896 15.904-16.896s15.903 7.577 15.903 16.892c.007.444.007 11.304-12.812 30.95c-.122.207-1.377 2.234-3.216 2.234" />
                                <path d="M36.67 35.914a7.083 7.083 0 1 1 7.083-7.083a7.09 7.09 0 0 1-7.083 7.083" />
                            </g>
                        </svg>

                        <span>Jl. Kramat - Sumber</span>
                    </div>

                    <p>Kec. Dukupuntang, Kab. Cirebon</p>

                </div>
            </div>

        </div>

        <!-- RIGHT SIDE -->
        <div class="flex w-full md:w-1/2 items-center justify-center bg-gray-100 px-6">

            <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <!-- Header -->
                <div class="text-center mb-6">
                    <h2 class="text-2xl font-bold text-[#1E3A8A]">
                        Login
                    </h2>
                    <p class="text-sm text-gray-500">
                        Silakan masuk ke sistem
                    </p>
                </div>

                <!-- Form -->
                <form class="space-y-4">

                    <div>
                        <label class="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input type="email" placeholder="you@example.com"
                            class="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-600">
                            Password
                        </label>

                        <!-- WRAPPER HARUS RELATIVE -->
                        <div class="relative mt-1">

                            <input :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                                class="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />

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

                    <button type="submit"
                        class="w-full bg-[#FACC15] text-black py-2 rounded-lg font-semibold hover:scale-[1.02] hover:bg-yellow-400 transition">
                        Login
                    </button>
                </form>

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

</script>