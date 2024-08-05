<template>
  <div>
    <div contenteditable="true" class="editable outline" ref="line2">
    </div>
    <ContentNavigation>
      <ul class="gallerylist">
        <li class="gallery" v-for="item in contentQuery" :key="item.title">
          <div class="containerprojects">
          <NuxtLink :to="item._path" class="link">
          <NuxtImg :src="item.img" :alt="item.title" width="200px" height="200" class="projectimg"/>
          <p class="project"> {{ item.title }}
          </p>
          </NuxtLink>
          </div>
        </li>
      </ul>
    </ContentNavigation>
    <p class="bottom">
      Q to get back
    </p>
  </div>
</template>

<script lang="js" setup>

import { ref, onMounted } from 'vue'
const contentQuery = await queryContent('articles').find()
const line2 = ref(null)

onMounted(() => {
  line2.value.focus()
  line2.value.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {
      const command = line.value.innerText
      if (command === 'Q') {
        router.push('/')
      }
    }
})
</script>

<style>
* {
  font-family: 'JetBrains Mono', monospace;
}
.gallerylist {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  list-style: none;
  padding: 0;
}
li {
  width: 200px;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-top: 1vw;
  margin-bottom: 1vw;  
}
li:hover {
  background-color: oklch(80.15% 0.15 100);
  border-radius: 10px;
  color: oklch(0% 0.15 100) !important;
}
.project {
  width: 200px;
  height: max-content;
}
a {
  text-decoration: none;
  color: oklch(80.15% 0.15 100);
}
.editable {
  color: oklch(80.15% 0.15 100);
  border-bottom: 2px solid oklch(80.15% 0.15 100);
  margin-bottom: 1em;
}
.projectimg {
  width: 200px;
}
.outline {
  border-bottom: 5px solid oklch(80.15% 0.15 100);
}
.bottom {
  color: oklch(80.15% 0.15 100);
  margin-top: 1em;
  margin-bottom: 1em;
  position: absolute;
  bottom: 0;
}
</style>