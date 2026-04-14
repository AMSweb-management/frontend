<template>
    <div class="min-h-screen bg-[#1E3A8A]">
        <AdminSidebar class="fixed inset-y-0 left-0 z-30 w-64" />

        <div class="ml-64 min-h-screen flex flex-col">
            <AdminNavbar class="sticky top-0 z-20 shrink-0" />

            <main class="flex-1 p-8">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
const { fetchUser } = useAuth()

onMounted(() => {
    fetchUser()
})
</script>
