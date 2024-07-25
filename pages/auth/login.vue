<template>
  <div class="px-5 text-white">
    <div class="pt-20">
      <h1 class="text-4xl font-extrabold">Masuk</h1>
    </div>
    <div class="pt-5">
      <div class="flex w-full gap-2 py-2">
        <SocialAuthButton provider="google" />
        <SocialAuthButton provider="facebook" />
      </div>
    </div>
    <Divider><p class="text-gray-400">Atau masuk dengan</p></Divider>
    <div>
      <Message severity="error" v-if="isAuthError">Email/Password salah</Message>
      <div v-for="field in formField" class="flex w-full flex-col">
        <div class="flex w-full flex-col gap-1 pb-3">
          <label for="username" class="font-semibold">{{ field.label }}</label>
          <InputText
            :id="field.name"
            v-model="email"
            aria-describedby="username-help"
            size="large"
            v-if="field.type === 'email'"
            class="h-12 bg-transparent text-white"
            :placeholder="field.placeholder"
          />
          <Password
            :id="field.name"
            v-model="password"
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
        <AuthSubmitAction @click="submit">Masuk</AuthSubmitAction>
      </div>
      <div class="w-full">
        <p class="text-center text-gray-400">
          Belum punya akun?
          <NuxtLink to="/auth/register" class="font-bold text-blue-400">
            Daftar
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

const { signIn } = useAuth()
const { status } = useAuthState()

const email = ref("")
const password = ref("")
const isAuthError = ref(false)

const credentials = {
  email: email.value,
  password: password.value,
}

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

preloadRouteComponents("/dashboard")

const submit = async () => {
  await signIn(credentials, { callbackUrl: "/dashboard" }).catch((error) => {
    console.error("Failed to login", error)
    isAuthError.value = true
  })
}
</script>

<style></style>
