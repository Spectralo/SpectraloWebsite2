<template>
  <div>
    <ContentDoc>
      <template v-slot="{ doc }">
        <h1 class="titleArticle">{{ doc.title }}</h1>
        <article class="article">
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
      navigateTo('/project/')
    }
  })
  onBeforeUnmount(() => {
      window.removeEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          navigateTo('/project/')
        }
      });
  });s
})
</script>

<style>
.titleArticle {
  margin-top: 4vh;
  color: oklch(80.15% 0.15 350.57);
  font-size: 3em;
  margin-bottom: 6vh;
  text-decoration: wavy underline;
  text-underline-offset: 0.2em;
}
.content {
  color: oklch(80.15% 0.15 50);
}

a.content {
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
a {
  margin-top: 10vh;
  margin-bottom: 10vh;
}
.article {
  margin-left: 2vw;
}
h3:has(+ p) {
  translate: -2vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
}


</style>