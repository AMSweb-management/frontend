<template>
    <div class="min-h-screen bg-[#1E3A8A]">
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
            @click="sidebarOpen = false" />

        <AdminSidebar class="fixed inset-y-0 left-0 z-40 w-64" />

        <div class="min-h-screen flex flex-col lg:ml-64">
            <AdminNavbar class="sticky top-0 z-20 shrink-0" />

            <main class="flex-1 p-4 md:p-6 lg:p-8">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
const sidebarOpen = useState('admin-sidebar-open', () => false)
// const { fetchUser } = useAuth()

// onMounted(() => {
//     fetchUser()
// })
</script>
