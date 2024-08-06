<template>
  <div>
    <div contenteditable="true" class="editable outline" ref="line2">
    </div>
    <ContentNavigation>
      <ul class="gallerylist">
        <li class="gallery" v-for="item in contentQuery" :key="item.date">
          <div class="containerprojects">
          <NuxtLink @click='navigateTo(`${item._path}`)' class="link">
          <NuxtImg :src="item.img" :alt="item.title" width="200px" height="200px" class="projectimg"/>
          <p class="projecttitle"> {{ item.title }}
          </p>
          </NuxtLink>
          </div>
        </li>
      </ul>
    </ContentNavigation>
    <p class="bottom">
      ESC to get back
    </p>
  </div>
</template>

<script lang="js" setup>

import { ref, onMounted, compile } from 'vue'
const contentQuery = await queryContent('articles').find()
const line2 = ref(null)


onMounted(() => {
  line2.value.addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {
      navigateTo('/articles/' + line2.value.innerText)
    }
    if (e.key === 'Escape') {
      navigateTo('/')
    }
  })
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
li.gallery {
  width: 200px;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-top: 1vw;
  margin-bottom: 1vw;  
}

.projectimg {
  border-radius: 10px;
}
li.gallery:hover {
  background-color: oklch(80.15% 0.15 100);
  border-radius: 10px;
  color: oklch(0% 0.15 100) !important;
  opacity: 100%;
  -webkit-transition: background-color 200ms linear;
  -ms-transition: background-color 200ms linear;
  transition: background-color 200ms linear;
  color: black !important;
}

li:hover .projecttitle {
  color: black !important;
}

.projecttitle {
  width: 190px;
  padding: 5px;
  height: max-content;
  color: oklch(80.15% 0.15 100);
  font-size: 0.9em;
}

.li:hover + .projecttitle {
  color: black !important;
}

a {
  text-decoration: none;
  color: oklch(80.15% 0.15 100);
}
.editable {
  color: oklch(80.15% 0.15 100);
  margin-bottom: 1em;
}
.projectimg {
  width: 200px;
}
.outline {
  border-bottom: 5px solid oklch(80.15% 0.15 100);
}
.bottom {
  color: black;
  margin-top: 1em;
  margin-bottom: 1em;
  position: fixed;
  background-color: oklch(80.15% 0.15 100);
  border-radius: 10px;
  padding: 10px;
  bottom: 0;

}
</style>