<template>
    <Teleport to="body">
        <Transition name="model-outer">
            <div v-show="modalActive"
                class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
                <Transition name="modal-inner">
                    <div v-if="modalActive" class="flex flex-col p-4 bg-white self-start mt-32 max-w-screen-md w-full">
                        <slot />
                        <button @click="$emit('close-modal')" class="items-center text-white mt-8 bg-dark30 py-2 px-6">
                            Fechar
                        </button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>

defineEmits(['close-modal']);

defineProps({
    modalActive: {
        type: Boolean,
        default: false
    }
})

</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity .3s cubic-bezier(.52, .02, .19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all .3s cubic-bezier(.52, .02, .19, 1.02) .15s;
}

.modal-inner-leave-active {
    transition: all .3s cubic-bezier(.52, .02, .19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(.8);
}

.modal-inner-leave-to {
    opacity: 0;
    transform: scale(.8);
}
</style>