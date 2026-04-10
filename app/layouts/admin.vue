<template>
    <div class="flex min-h-screen bg-[#1E3A8A]">

        <AdminSidebar class="w-64 shrink-0" />

        <div class="flex-1 flex flex-col">

            <AdminNavbar class="shrink-0" />

            <main class="flex-1 overflow-y-auto p-8">
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