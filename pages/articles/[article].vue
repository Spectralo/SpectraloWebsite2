<template>
  <div>
    <ContentDoc>
      <template v-slot="{ doc }">
        <article>
          <h1 class="titleArticle">{{ doc.title }}</h1>
          <ContentRenderer class="content" :value="doc" />
        </article>
      </template>
      <template #not-found>
        <h1 class="error">Document not found</h1>
        <p class="error">(How did you go there ?)</p>
      </template>
    </ContentDoc>
    <p class="bottom">
      Left arrow to get back
    </p>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigateTo('/blog/')
    }
  })
})
</script>

<style>
.titleArticle {
  color: oklch(80.15% 0.15 350.57);
}
.content {
  color: oklch(80.15% 0.15 50);
}
h1.error {
  color: oklch(56.27% 0.2252 30);
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 2em;
}
p.error {
  color: oklch(56.27% 0.2252 30);
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 1em;
}

</style>