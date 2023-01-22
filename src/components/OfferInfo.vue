<script setup>
import { computed, ref, onMounted } from "vue";
const items = ref([
  { text: `Exclusive access to <b>350+</b> learning programs` },
  { text: "Personalized course plan" },
  { text: "Comfy learning schedule made by you" },
  { text: "<b>24/7</b> tutor support in a secure chat" },
  { text: "Lifetime access to materials" },
]);

const maxSecondTimer = 3 * 60;
let currentTimer = ref(maxSecondTimer);
const isMounted = ref(false);
let windowWidth = ref(window.innerWidth);
let responsive = ref(false);

const percentFromseconds = computed(() => {
  return Math.floor((currentTimer.value / maxSecondTimer) * 100);
  // return (currentTimer.value / maxSecondTimer) * 100;
});

function num(val) {
  val = Math.floor(val);
  return val < 10 ? "0" + val : val;
}

const timeFormated = computed(() => {
  let minutes = (currentTimer.value / 60) % 60,
    seconds = currentTimer.value % 60;
  return num(minutes) + ":" + num(seconds);
});

const startTimer = function () {
  const startTime = new Date().getTime();
  setInterval(() => {
    const currentTime = new Date().getTime();
    const delta = (currentTime - startTime) / 1000;
    currentTimer.value = Math.floor(maxSecondTimer - delta);
    if (currentTimer.value < 1) {
      currentTimer.value = false;
    }
  }, 100);
};
startTimer();

if (windowWidth.value <= 640) {
  responsive.value = true;
} else {
  responsive.value = false;
}

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div class="offerInfo">
    <img
      class="offerInfo__asteroid"
      src="/images/asteroid.png"
      alt="asteroid"
    />
    <teleport v-if="isMounted" to="#pageStart" :disabled="!responsive">
      <div class="offerInfo__head">
        <div class="offerInfo__head__left" :class="{ active: !currentTimer }">
          <h3>3-day trial for <b>$0.99</b></h3>
          <div v-if="currentTimer">
            <p>Then $9.99</p>
            <span>$39.99/week</span>
          </div>
          <div v-else>
            <p>Then $39.99/week</p>
          </div>
        </div>
        <div class="offerInfo__head__right">
          <div
            v-if="currentTimer > 0"
            :class="{ active: currentTimer <= 60 }"
            class="timer"
          >
            {{ timeFormated }}
            <div
              class="timer__persentWidth"
              :style="{ width: percentFromseconds + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </teleport>
    <nav class="offerInfo__list">
      <div v-for="item in items" :key="item" class="offerInfo__item">
        <img src="/images/icons/star.png" alt="star" />
        <span v-html="item.text" />
      </div>
    </nav>
    <button class="btn">
      <img src="/images/icons/lock-closed.png" alt="Safe & secure payment" />
      <span>Safe & secure payment</span>
    </button>
    <p class="offerInfo__description">
      $0.99 charged today. If you don't cancel at least 24 hours before the end
      of the 3-day trial period, you will automatically be charged the full
      price of $19.99/Month . You can cancel your subscription at any time. By
      continuing, you indicate that you've read and agree to our Terms &
      Conditions, Privacy Policy , Money Back , and Subscription Terms .
    </p>
  </div>
</template>
