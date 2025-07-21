<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const formSchema = toTypedSchema(z.object({
  email: z.email({ error: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  password: z.string({ error: 'Password is required' }).min(8, { error: 'Password must be at least 8 characters long' }).max(256, { error: 'Password must be at most 256 characters long' }),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <Card class="w-full h-full md:w-[487px] border-none shadow-none">
    <CardHeader class="flex items-center justify-center text-center p-7">
      <CardTitle class="text-2xl">
        Welcome back!
      </CardTitle>
    </CardHeader>
    <div class="px-7 mb-2">
      <DottedSeparator />
    </div>
    <CardContent class="p-7">
      <form class="space-y-4" @submit="onSubmit">
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
        <Button size="lg" class="w-full" :disabled="false">
          Login
        </Button>
      </form>
    </CardContent>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7 flex flex-col gap-y-4">
      <Button variant="secondary" size="lg" class="w-full" :disabled="false">
        <Icon name="simple-icons:google" class="mr-2 size-5" />
        Login with Google
      </Button>
      <Button variant="secondary" size="lg" class="w-full" :disabled="false">
        <Icon name="simple-icons:github" class="mr-2 size-5" />
        Login with GitHub
      </Button>
    </CardContent>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7 flex items-center justify-center">
      <p>
        Don&apos;t have an account?
        <NuxtLink to="/sign-up" class="text-blue-700 hover:underline">
          &nbsp;Sign Up
        </NuxtLink>
      </p>
    </CardContent>
  </Card>
</template>
