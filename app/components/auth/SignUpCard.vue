<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
  name: z.string({ error: 'Name is required' }).min(1, { message: 'Name is required' }),
  email: z.email({ error: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  password: z.string({ error: 'Password is required' }).min(8, { error: 'Password must be at least 8 characters long' }).max(256, { error: 'Password must be at most 256 characters long' }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  await authClient.signUp.email({
    name: values.name,
    email: values.email,
    password: values.password,
    callbackURL: '/sign-in',
  }, {
    onRequest: () => {
      isLoading.value = true
    },
    onSuccess: () => {
      toast.success('Sign up successful! Please check your email to verify your account.')
      isLoading.value = false
    },
    onError: (ctx) => {
      toast.error(ctx.error.message || 'An error occurred during sign up')
      isLoading.value = false
    },
  })
})
</script>

<template>
  <Card class="w-full h-full md:w-[487px] border-none shadow-none gap-0">
    <CardHeader class="flex flex-col items-center justify-center text-center p-7">
      <CardTitle class="text-2xl">
        Sign Up
      </CardTitle>
      <CardDescription>
        By signing up, you agree to our <a href="#" class="text-blue-700 hover:underline">Terms of Service</a> and <a href="#" class="text-blue-700 hover:underline">Privacy Policy</a>.
      </CardDescription>
    </CardHeader>
    <div class="px-7 mb-2">
      <DottedSeparator />
    </div>
    <CardContent class="p-7">
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormControl>
              <Input
                v-bind="componentField"
                required
                type="text"
                placeholder="Name"
                class="w-full"
                :disabled="false"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormControl>
              <Input
                v-bind="componentField"
                required
                type="email"
                placeholder="Email"
                class="w-full"
                :disabled="false"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormControl>
              <Input
                v-bind="componentField"
                required
                type="password"
                placeholder="Password"
                class="w-full"
                :disabled="false"
                min="8"
                max="256"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button size="lg" class="w-full" :disabled="isLoading">
          Sign Up
        </Button>
      </form>
    </CardContent>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7 flex flex-col gap-y-4">
      <Button variant="secondary" size="lg" class="w-full" :disabled="isLoading">
        <Icon name="simple-icons:google" class="mr-2 size-5" />
        Continue with Google
      </Button>
      <Button variant="secondary" size="lg" class="w-full" :disabled="isLoading">
        <Icon name="simple-icons:github" class="mr-2 size-5" />
        Continue with GitHub
      </Button>
    </CardContent>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7 flex items-center justify-center">
      <p>
        Already have an account?
        <NuxtLink to="/sign-in" class="text-blue-700 hover:underline">
          &nbsp;Sign In
        </NuxtLink>
      </p>
    </CardContent>
  </Card>
</template>
