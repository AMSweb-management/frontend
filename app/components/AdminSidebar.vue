<template>
    <aside class="w-64 bg-white border-r flex flex-col h-screen">

        <!-- LOGO -->
        <div class="p-6 font-bold text-lg text-[#1E3A8A]">
            Asset Manajemen Sistem
        </div>

        <!-- MENU -->
        <nav class="flex-1 px-3 space-y-1">

            <NuxtLink to="/dashboard"
                class="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-slate-100"
                active-class="bg-blue-50 text-emerald-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z" />
                </svg>

                <span>Dashboard</span>
            </NuxtLink>


            <NuxtLink to="/obat"
                class="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-slate-100"
                active-class="bg-emerald-50 text-emerald-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3">
                        <path stroke-linejoin="round"
                            d="M42.615 14.604c1.957.162 3.395 1.81 3.318 3.773c-.217 5.534-.935 10.047-1.7 13.43c-.82 3.629-3.08 6.474-6.242 7.87c.727.592 1.63 1.56 1.898 2.858c.243 1.18-.88 2.043-2.083 2.12C35.5 44.8 31.071 45 23.998 45c-7.074 0-11.5-.199-13.807-.345c-1.201-.077-2.324-.939-2.082-2.118c.292-1.42 1.346-2.446 2.097-3.016c-3.32-1.613-5.647-4.767-6.485-8.696a78 78 0 0 1-1.638-12.452a3.577 3.577 0 0 1 3.3-3.769C8.7 14.33 14.638 14 24 14s15.3.33 18.616.604Z" />
                        <path
                            d="m24.635 14.001l1.945-8.693c.292-1.305 1.419-2.242 2.745-2.066c.76.1 1.686.27 2.74.553c1.054.282 1.94.599 2.649.891c1.236.51 1.743 1.886 1.344 3.162l-1.973 6.3" />
                        <path stroke-linejoin="round"
                            d="M21.088 36.124c.027.897.57 1.675 1.46 1.79c.393.05.875.086 1.452.086s1.059-.036 1.453-.086c.89-.115 1.432-.893 1.46-1.79c.027-.912.057-2.274.074-4.137c1.863-.017 3.225-.047 4.137-.075c.897-.027 1.675-.57 1.79-1.46c.05-.393.086-.875.086-1.452s-.036-1.059-.086-1.453c-.115-.89-.893-1.432-1.79-1.46a205 205 0 0 0-4.137-.074a201 201 0 0 0-.075-4.137c-.027-.897-.57-1.675-1.46-1.79C25.06 20.036 24.578 20 24 20s-1.059.036-1.453.086c-.89.115-1.432.893-1.46 1.79a205 205 0 0 0-.074 4.137c-1.863.017-3.225.047-4.137.075c-.897.027-1.675.57-1.79 1.46c-.05.393-.086.875-.086 1.452s.036 1.059.086 1.453c.115.89.893 1.432 1.79 1.46c.912.027 2.274.057 4.137.074c.017 1.863.047 3.225.075 4.137" />
                    </g>
                </svg>
                Daftar Obat
            </NuxtLink>

            <NuxtLink to="/barang"
                class="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-slate-100 transition"
                active-class="bg-emerald-50 text-emerald-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="m17.578 4.432l-2-1.05C13.822 2.461 12.944 2 12 2s-1.822.46-3.578 1.382l-.321.169l8.923 5.099l4.016-2.01c-.646-.732-1.688-1.279-3.462-2.21m4.17 3.534l-3.998 2V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44c.718-.179 1.535-.607 2.828-1.286l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-1.893 0-3.076-.252-3.978M11.25 21.904v-9.44l-8.998-4.5C2 8.866 2 10.05 2 11.941v.117c0 2.525 0 3.788.597 4.802c.598 1.015 1.674 1.58 3.825 2.709l2 1.049c1.293.679 2.11 1.107 2.828 1.286M2.96 6.641l9.04 4.52l3.411-1.705l-8.886-5.078l-.103.054c-1.773.93-2.816 1.477-3.462 2.21" />
                </svg>
                Barang Keluar
            </NuxtLink>


        </nav>

        <!-- LOGOUT -->
        <div class="p-4">
            <button @click="handleLogout"
                class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition">
                Keluar
            </button>
        </div>

    </aside>
</template>

<script setup lang="ts">
const { logout } = useAuth()

const handleLogout = () => {
    if (confirm('Yakin mau logout?')) {
        logout()
    }
}
</script>