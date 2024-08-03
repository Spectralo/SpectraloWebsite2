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
  letter-spacing: 0px;
}
body {
  background-color: oklch(0% 0 0);
  font-family: JetBrains Mono, monospace ;
  font-size: 30px;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 5%;
  margin-right: 5%; 
}

pre {
  font-family: JetBrains Mono, monospace ;
  font-size: 30px;
  color: oklch(80.15% 0.15 320.57);
}

.terminalcontainer {
  color: oklch(80.15% 0.15 320.57);
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
  const history = document.querySelector('.history')


  function returnText(text) {
    history.innerHTML += `<p><pre>${text}</pre></p>`
  }


  // Define commands

  let commands = {
    'help' : [help, 'Give you some hints', '1 : Command name (optional)'],
  }

  // Welcome message
    
  let ascii = [
    "                               ",
    "             ,%                ",
    "            %%&##              ",
    "        %%%%%%&////%%          ",
    "        %%&&@@@##//%%          ",
    "        //####%//////          ",
    "&&&&##    ///(%////**    ##&&& ",
    "%%&&&&%%  ////#////**  %%&&&&% ",
    "%%//@@%%%%**///##//  %%%%@@/(% ",
    "  %%////##//**///**//%%////%(  ",
    "    %%////////*//**////////    ",
    "      ////**//*%%//**////      "
  ]

  ascii.forEach(element => {
    console.log(element)
    returnText(`<p><pre>${element}</pre></p>`)
  });
  returnText(`<p><pre> </pre></p>`)
  returnText(`<p><pre>Welcome to Spectralo's TUI website</pre></p>`)
  returnText(`<p><pre>Type 'help' to get some hints ✨ </pre></p>`)

  line.value.focus()
  line.value.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {
      // Add the command to the history
      e.preventDefault()
      const input = line.value.innerText
      
      // Reset input line
      line.value.innerText = ''

      // Break down the command to use it 
      let breakedInput = input.split(' ')
      let command = breakedInput[0]
      let args = breakedInput.slice(1)
      let options = []

      args.forEach(element => {
        let elementArray = element.split('')
        if (elementArray[0] == '-') {
          options.push(element)
          args.splice(args.indexOf(element), 1)
        }
      });

      console.log(command)
      console.log(args)
      console.log(options)

      const history = document.querySelector('.history')
      history.innerHTML += `<p>[${path}] ${input}</p>`

      // Add output to the history
      if (input === '') {
        history.innerHTML += `<p></p>`
      } else if (input === 'rm -rf /') {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      } else {
        history.innerHTML += `<p>Command not found: ${input}</p>`
      }
    }
  })
})

</script>

