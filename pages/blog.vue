<template>
  <div>
    <ContentNavigation v-slot="{ navigation }">
      <ul class="gallerylist">
        <li class="gallery" v-for="item in contentQuery" :key="item.id">
          <div class="containerprojects">
          <NuxtLink :to="item._path" class="link">
            {{ item._path }}
          <NuxtImg :src="item.img" :alt="item.title" width="200px" height="200" class="projectimg"/>
          <p class="project">{{ item.title }}</p>
          </NuxtLink>
          </div>
        </li>
      </ul>
    </ContentNavigation>
  </div>
</template>

<script lang="ts" setup>
const contentQuery = await queryContent('articles').find()


</script>

<style>
* {
  font-family: 'JetBrains Mono', monospace;
}
</style>