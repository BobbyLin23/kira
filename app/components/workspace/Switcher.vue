<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'

const { $client } = useNuxtApp()

const { data: workspaces } = useQuery($client.workspace.get.queryOptions())
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex items-center justify-between">
      <p class="text-xs text-neutral-500 uppercase">
        Workspace
      </p>
      <Icon name="ri:add-circle-fill" class="size-5 cursor-pointer text-neutral-500 transition-colors hover:opacity-75" />
    </div>
    <Select>
      <SelectTrigger class="w-full bg-neutral-200 p-1 font-medium">
        <SelectValue placeholder="No workspace selected" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="workspace in workspaces"
          :key="workspace.id"
          :value="workspace.id"
        >
          <div class="flex items-center justify-start gap-3 font-medium">
            <WorkspaceAvatar :image="workspace.imageUrl" :name="workspace.name" />
            <span class="truncate">{{ workspace.name }}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
