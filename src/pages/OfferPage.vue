<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import OfferInfo from "@/components/OfferInfo.vue";
import Modal from "../components/Modal.vue";
const isOpen = ref(false);
const isMounted = ref(false);

onBeforeMount(() => {
  isMounted.value = true;
});
</script>

<template>
  <div class="OfferPage__wrapper">
    <div v-if="isMounted" id="pageStart"></div>
    <div class="OfferPage">
      <div class="OfferPage__left">
        <h1>Start your learning journey now</h1>
        <p>
          Get a <b><span>Planet</span><span>Learn</span></b> plan to rock
          self-learning
        </p>
        <button class="btn btn__main" @click="isOpen = true">
          Get my plan
        </button>
      </div>
      <div class="OfferPage__right">
        <OfferInfo />
      </div>
    </div>
    <teleport to="body">
      <modal v-if="isOpen" @close="isOpen = false" />
    </teleport>
  </div>
</template>
