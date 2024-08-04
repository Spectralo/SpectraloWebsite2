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
  let options = []
  let args = []
  const history = document.querySelector('.history')


  function returnText(text) {
    history.innerHTML += `<p><pre>${text}</pre></p>`
  }


  // Define commands

  let commands = {
    'help' : [help, 'Give you some hints', '1, Command name (optional)','-m : More details',1,1],
  }

  function help() {
    console.log('help given')
    for (const [key, value] of Object.entries(commands)) {
      returnText(key+" : "+value[1]);
      if (options[1] == '-m') {
        returnText('Args : '+value[2])
      }
    }
    returnText(`<p><pre>✨ Hint : Use -m to have more details about args and options ✨</pre></p>`)
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

      // Reset options and args
      options = []
      args = []

      // Break down the command to use it 
      let breakedInput = input.split(' ')
      let command = breakedInput[0]
      let breakedInputWithoutCommand = breakedInput.slice(1)

      breakedInputWithoutCommand.forEach(element => {
        let elementArray = element.split('')
        console.log(elementArray)
        if (elementArray[0] == '-') {
          options.push(element)
        }
        else {
          args.push(element)
        }
      });

      console.log(command)
      console.log(args)
      console.log(options)

      const history = document.querySelector('.history')
      history.innerHTML += `<p>[${path}] ${input}</p>`

      // Add output to the history
      if (commands[command][4] < args.length) {
        returnText(`<p><pre> Too much args :/</pre></p>`)
      } else if (commands[command][5] < options.length) {
        returnText(`<p><pre> Too much options :/</pre></p>`)
      } else if (command in commands) {
        commands[command][0]()
      } else {
        returnText(`<p><pre>Command not found</pre></p>`)
      }

      
    }
  })
})

</script>

