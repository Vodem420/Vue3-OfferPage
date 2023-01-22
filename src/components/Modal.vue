<script setup>
import { reactive, computed, ref } from "vue";
import InputComp from "./InputComp.vue";
import SelectComp from "./SelectComp.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { vMaska } from "maska";

const months = ref([
  { title: "Jan", value: "Jan" },
  { title: "Feb", value: "Feb" },
  { title: "Mar", value: "Mar" },
  { title: "Apr", value: "Apr" },
  { title: "May", value: "May" },
  { title: "June", value: "June" },
  { title: "July", value: "July" },
  { title: "Aug", value: "Aug" },
  { title: "Sep", value: "Sep" },
  { title: "Oct", value: "Oct" },
  { title: "Now", value: "Now" },
  { title: "Dec", value: "Dec" },
]);
const years = ref([]);
const formData = reactive({
  cardNumber: "",
  month: "",
  year: null,
  cvc: "",
});

const generateYear = function () {
  for (
    let currentYear = new Date().getFullYear();
    currentYear < 2031;
    currentYear++
  ) {
    years.value.push({ title: currentYear });
  }
};
generateYear();

const rules = computed(() => {
  return {
    cardNumber: {
      required,
      minLength: minLength(19),
      maxLength: maxLength(19),
    },
    month: { required },
    year: { required },
    cvc: { required, minLength: minLength(3), maxLength: maxLength(3) },
  };
});

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    return;
  } else {
    return false;
  }
};
</script>
<template>
  <div class="modal">
    <div class="modal__content">
      <h2>Payment method</h2>
      <button class="btn btn__payPal mb-6">Buy now</button>
      <button class="btn btn__googlePay mb-6">Pay</button>
      <div class="modal__hr mb-6">
        <div class="line"></div>
        <span>or</span>
        <div class="line"></div>
      </div>
      <form @submit.prevent="submitForm">
        <div class="modal__inputWrapper mb-12">
          <input-comp
            v-model="formData.cardNumber"
            v-maska
            label="Card number"
            class="mb-2"
            inputmode="numeric"
            data-maska="#### #### #### ####"
          />
          <span
            v-for="error in v$.cardNumber.$errors"
            :key="error.$uid"
            class="error"
            >Invalid card number</span
          >
        </div>
        <div class="modal__contentWrapper">
          <div class="modal__selectWrapper">
            <select-comp
              v-model="formData.month"
              label="Month"
              :items="months"
            />
            <span
              v-for="error in v$.month.$errors"
              :key="error.$uid"
              class="error"
              >Is Required</span
            >
          </div>
          <div class="modal__selectWrapper">
            <select-comp v-model="formData.year" label="Year" :items="years" />
            <span
              v-for="error in v$.year.$errors"
              :key="error.$uid"
              class="error"
              >Is Required</span
            >
          </div>
          <div class="modal__inputWrapper">
            <input-comp
              v-model="formData.cvc"
              v-maska
              label="CVC"
              inputmode="numeric"
              data-maska="###"
            />
            <span
              v-for="error in v$.cvc.$errors"
              :key="error.$uid"
              class="error"
              >Invalid CVC</span
            >
            <!-- {{ error.$message }} -->
          </div>
        </div>
        <button
          :class="{ btn__active: !v$.$invalid, btn__disabled: v$.$invalid }"
          type="submit"
          class="btn mt-16"
        >
          Submit
        </button>
      </form>
      <p @click="$emit('close')">Close</p>
    </div>
    <div class="modal__backdrop" @click="$emit('close')"></div>
  </div>
</template>
