<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: Object,
    default: null,
  },
  items: {
    type: Array,
    default: () => {
      return [
        {
          value: "111",
          title: "222",
        },
      ];
    },
  },
});
</script>

<template>
  <div class="select__wrapper">
    <select
      :value="modelValue"
      v-bind="$attrs"
      class="input"
      autocomplete="off"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in items" :key="option.value" :value="option.value">
        {{ option.title }}
      </option>
    </select>
    <label v-if="label" for="email" class="select__label"> {{ label }} </label>
  </div>
</template>
