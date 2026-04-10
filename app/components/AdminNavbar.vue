<template>
    <header class="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 class="font-semibold text-gray-700">
            Dashboard Admin
        </h1>

        <div class="flex items-center gap-3">
            <div class="text-right text-sm">
                <p class="font-semibold">
                    {{ user?.name || 'Loading...' }}
                </p>
                <p class="text-gray-400">
                    Admin
                </p>
            </div>

            <div class="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center font-bold uppercase">
                {{ user?.name?.charAt(0) || 'A' }}
            </div>
        </div>
    </header>
</template>

<script setup>
const { user, fetchUser } = useAuth()

onMounted(() => {
    fetchUser()
})
</script>
