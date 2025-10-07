<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { ImageIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { uploadImage } from '~/utils/supabase'

const form = useForm({
  validationSchema: toTypedSchema(createWorkspaceSchema),
})

const inputRef = ref<HTMLInputElement | null>(null)
const imagePreview = ref<string | null>(null)
const isUploading = ref(false)

const { $client } = useNuxtApp()

const queryClient = useQueryClient()

const { mutate, isPending } = useMutation($client.workspace.create.mutationOptions())

const onSubmit = form.handleSubmit(async (values) => {
  try {
    let imageUrl = ''

    if (values.image && values.image instanceof File) {
      isUploading.value = true
      toast.loading('Uploading image...')
      imageUrl = await uploadImage(values.image)
      toast.dismiss()
      toast.success('Image uploaded successfully!')
    }

    mutate({
      name: values.name,
      image: imageUrl,
    }, {
      onSuccess: () => {
        toast.success('Workspace created successfully!')
        queryClient.invalidateQueries({ queryKey: ['workspaces'] })
        form.resetForm()
        imagePreview.value = null
      },
      onError: (error) => {
        console.error('Failed to create workspace:', error)
        toast.error('Failed to create workspace. Please try again.')
      },
      onSettled: () => {
        isUploading.value = false
      },
    })
  }
  catch (error) {
    console.error('Upload error:', error)
    toast.dismiss()
    toast.error('Failed to upload image. Please try again.')
    isUploading.value = false
  }
})

async function handleImageChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]

    if (!file) {
      return
    }

    if (file.size > 1024 * 1024) {
      toast.error('Image size should be less than 1MB')
      return
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, and SVG files are allowed')
      return
    }

    form.setFieldValue('image', file)

    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
  else {
    form.setFieldValue('image', undefined)
    imagePreview.value = null
  }
}
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
          <FormField name="image">
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div class="flex flex-col gap-y-2">
                  <div class="flex items-center gap-x-5">
                    <div v-if="imagePreview" class="relative size-18 overflow-hidden rounded-md">
                      <img
                        :src="imagePreview"
                        alt="Workspace preview"
                        class="size-full object-cover"
                      >
                    </div>
                    <Avatar v-else class="size-18">
                      <AvatarFallback>
                        <ImageIcon class="size-9 text-neutral-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col gap-y-1">
                      <p class="text-sm font-medium">
                        Workspace Image
                      </p>
                      <p class="text-muted-foreground text-xs">
                        JPG, PNG, or SVG (max 1MB)
                      </p>
                      <input ref="inputRef" class="hidden" accept=".jpg,.jpeg,.png,.svg" type="file" :disabled="isPending || isUploading" @change="handleImageChange">
                      <Button type="button" variant="tertiary" :disabled="isPending || isUploading" size="xs" class="mt-2 w-fit" @click="inputRef?.click()">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DottedSeparator class="py-7" />
        <div class="flex items-center justify-between">
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
