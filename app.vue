<template>
  <div class="terminalcontainer">
    <p class="history" ref="history"></p>
    <div class="editable">
      <p class="prompt">[{{ path }}] </p>
      <div class="line"  ref="line" contenteditable="true"></div>
    </div>
    
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: oklch(0% 0 0);
  font-family: JetBrains Mono, monospace;
  font-size: 2em;
}
.terminalcontainer {
  color: oklch(85.29% 0.05 225.93);
}
.editable {
  display: flex;
  flex-direction: row;
  height: fit-content;
  margin: 0;
  outline: 0px solid transparent;
  border: 0px solid transparent;
}
.line {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  margin-left: 0.5em;
}
*:focus {
    outline: none;
}


</style>

<script lang="js" setup>
let path = '~'
import { ref, onMounted } from 'vue'
const line = ref(null)

onMounted(() => {
  line.value.focus()
  line.value.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const input = line.value.innerText
      line.value.innerText = ''
      const history = document.querySelector('.history')
      history.innerHTML += `<p>[${path}] ${input}</p>`
    }
  })
})

</script>

