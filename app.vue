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
.bright {
  color: oklch(100% 0.15 350.57) !important;
  font-weight: 900;
  transition: color 0.1s;
}



</style>

<script lang="js" setup>
let path = '~'
import { ref, onMounted } from 'vue'
const line = ref(null)



onMounted(() => {
  let options = []
  let args = []
  const history = document.querySelector('.history')

  function returnText(text) {
    history.innerHTML += `<p><pre class='lasthistory'>${text}</pre></p>`
  }


  // Define commands

  let commands = {
    'help' : [help, 'Give you some hints', '1, Command name (optional)','-m : More details',1,1],
  }

  function help() {
    for (const [key, value] of Object.entries(commands)) {
      returnText(key+" : "+value[1]);
      if (options[1] == '-m') {
        returnText('Args : '+value[2])
      }
    }
    returnText(`✨ Hint : Use -m to have more details about args and options `)
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
    returnText(`${element}`)
  });
  returnText(` `)
  returnText(`Welcome to Spectralo's TUI website`)
  returnText(`Type 'help' to get some hints ✨`)

  line.value.focus()
  line.value.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {
      
      // Add the command to the history
      e.preventDefault()
      const input = line.value.innerText
      const prompt = document.querySelector('.prompt')
      prompt.classList.add('bright')
      setTimeout(() => {
        prompt.classList.remove('bright')
      }, 200)
      
      // Reset input line
      line.value.innerText = ''

      // Reset options and args
      options = []
      args = []

      // Break down the command to use it 
      let breakedInput = input.split(' ')
      let command = breakedInput[0]
      let breakedInputWithoutCommand = breakedInput.slice(1)

      breakedInputWithoutCommand.forEach(element => {
        let elementArray = element.split('')
        if (elementArray[0] == '-') {
          options.push(element)
        }
        else {
          args.push(element)
        }
      });

      history.innerHTML += `<p>[${path}] ${input}</p>`
      // Add output to the history
      if (commands[command][4] < args.length) {
        returnText(`Too much args :/`)
      } else if (commands[command][5] < options.length) {
        returnText(`Too much options :/`)
      } else if (command in commands) {
        commands[command][0]()
      } else {
        returnText(`Command not found`)
      }

      
    }
  })
})

</script>

