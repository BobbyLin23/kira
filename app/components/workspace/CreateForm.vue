<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const WorkspaceSchema = toTypedSchema(
  z.object({
    name: z.string({ error: 'Workspace name is required' }).min(1, { message: 'Workspace name is required' }),
  }),
)

const form = useForm({
  validationSchema: WorkspaceSchema,
})

const { $client } = useNuxtApp()

const queryClient = useQueryClient()

const { mutate, isPending } = useMutation($client.workspace.create.mutationOptions())

const onSubmit = form.handleSubmit(async (values) => {
  mutate({
    name: values.name,
  }, {
    onSuccess: () => {
      toast.success('Workspace created successfully!')
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    },
    onError: () => {
      toast.error('Failed to create workspace. Please try again.')
    },
  })
})
</script>

<template>
  <Card class="size-full border-none shadow-none">
    <CardHeader class="flex p-7">
      <CardTitle class="text-xl font-bold">
        Create a new workspace
      </CardTitle>
    </CardHeader>
    <div class="px-7">
      <DottedSeparator />
    </div>
    <CardContent class="p-7">
      <form @submit="onSubmit">
        <div class="flex flex-col gap-y-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter workspace name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DottedSeparator class="py-7" />
        <div class="flex justify-between items-center">
          <Button type="button" size="lg" variant="secondary" :disabled="isPending" @click="$router.back()">
            Cancel
          </Button>
          <Button type="submit" size="lg" :disabled="isPending">
            Create
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
