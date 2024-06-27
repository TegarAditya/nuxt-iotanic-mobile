<template>
  <div class="px-5 text-white">
    <div class="pt-20">
      <h1 class="text-4xl font-extrabold">Buat Akun</h1>
    </div>
    <div class="pt-5">
      <div class="flex w-full gap-2 py-2">
        <SocialAuthButton provider="google" />
        <SocialAuthButton provider="facebook" />
      </div>
    </div>
    <Divider><p class="text-gray-400">Atau daftar dengan</p></Divider>
    <div>
      <div v-for="field in formField" class="flex w-full flex-col">
        <div class="flex w-full flex-col gap-1 pb-3">
          <label for="username" class="font-semibold">{{ field.label }}</label>
          <InputText
            :id="field.name"
            v-model="value"
            aria-describedby="username-help"
            size="large"
            v-if="field.type === 'email'"
            class="h-12 bg-transparent text-white"
            :placeholder="field.placeholder"
          />
          <Password
            v-model="value"
            v-if="field.type === 'password'"
            toggleMask
            size="large"
            input-class="w-full h-12"
            :placeholder="field.placeholder"
          />
          <small id="username-help">{{ field.description }}</small>
        </div>
      </div>
      <div class="py-5">
        <AuthSubmitAction @click="submit">Daftar</AuthSubmitAction>
      </div>
      <div class="w-full">
        <p class="text-gray-400 text-center">
          Sudah punya akun?
          <NuxtLink to="/auth/login" class="font-bold text-blue-400">
            Masuk
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login to your account.",
    },
  ],
})

const value = ref("")

const formField = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email",
    description: "Enter your email to login.",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
    description: "Enter your password to login.",
  },
]

const submit = () => {
  console.log("submit")
}
</script>

<style></style>
