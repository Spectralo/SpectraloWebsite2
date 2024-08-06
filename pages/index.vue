<template>
  <div class="terminalcontainer">
    <p class="history" ref="history"></p>
    <div class="editable">
      <p class="prompt">[{{ path }}]</p>
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
  width: 90vw;
  word-wrap: break-word;
  white-space: pre-wrap;
}

pre {
  font-family: JetBrains Mono, monospace ;
  font-size: 30px;
  color: oklch(80.15% 0.15 100);
}

.terminalcontainer {
  color: oklch(80.15% 0.15 100);
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
  margin: 0;
  margin-left: 0.2em;
  width: 80%;
}

a {
  color: oklch(80.15% 0.15 100);
  text-decoration: wavy underline;
  text-underline-offset: 0.2em;
  text-decoration-color: oklch(80.15% 0.15 100);
}

*:focus {
    outline: none;
}
.glowing {
  color: oklch(80.15% 0.15 320.57);
}

@keyframes horizontal-shaking {
 0% { transform: translateX(0) }
 25% { transform: translateX(5px) }
 50% { transform: translateX(-5px) }
 75% { transform: translateX(5px) }
 100% { transform: translateX(0) }
}

@keyframes cool-done {
  0% { transform: rotate(0) }
  50% { transform: rotate(-10) }
  100% { transform: rotate(0) }
}

@keyframes appear {
  0% { opacity: 0 }
  100% { opacity: 1 }
}

.shaking {
  animation: horizontal-shaking 0.5s;
}

.cool {
  animation: cool-done 0.5s;
}

.output {
  color: oklch(80.15% 0.15 50);
}

.appearoutput {
  animation: appear 0.5s;
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

  function returnText(text, textclass = "nevergonnagiveyouup") {
    history.innerHTML += `<p><pre class='${textclass}'>${text}</pre></p>`
  }

  function returnOutput(text) {
    history.innerHTML += `<p><pre class='output'>${text}</pre></p>`
    let lasthistory = history.lastChild
    lasthistory.classList.add('appearoutput')
    setTimeout(() => {
      lasthistory.classList.remove('appearoutput')
    }, 500)
  }


  // Define commands

  let commands = {
    'help' : [help, 'Give you some hints', '1, Command name (optional)','-m, More details',1,1],
    'clear' : [clear, 'Clear the terminal', '0','0',0,0],
    'contact' : [contact, 'Contact me', '0','0',0,0],
    'aboutme' : [aboutme, 'About me', '0','0',0,0],
    'ascii' : [asciiprint, 'Print a beautiful image', '0','0',0,0],
    'blog' : [blog, 'Go to my blog', '0','0',0,0],
    'projects' : [projects, 'Go to my projects', '0','0',0,0],
  }

  function help() {
    for (const [key, value] of Object.entries(commands)) {
      returnOutput(key+" : "+value[1]);
      if (options[0] == '-m') {
        returnOutput('Args : '+value[2])
        returnOutput('Options : '+value[3])
        returnOutput('=========================')
      }
    }
    returnOutput(`✨ Hint : Use -m to have more details about args and options `)
  }

  function clear() {
    history.innerHTML = ''
  }

  function blog() {
    navigateTo('/blog')
  }
  function projects() {
    navigateTo('/project')
  }
  function contact() {
    returnOutput('How to contact me :')
    returnOutput('  By email at arthur@spectralo.me')
    returnOutput('  On dicord at @spectralo_')
  }
  function aboutme() {
    returnOutput('I am a 14 developer from France, I like doing all kind of stuff, ')
    returnOutput('from web development to game development, emnbedded systems and more !')
    returnOutput('On this website you can find some of my work and some of my thoughts.')
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
  function asciiprint() {
    ascii.forEach(element => {
      console.log(element)
      returnText(`${element}`,"glowing")
    });
  }
  
  asciiprint()
  returnText(` `)
  returnText(`Welcome to Spectralo's TUI website`)
  returnText(`Type 'help' to get some hints ✨`)

  line.value.focus()
  line.value.addEventListener('keydown', (e) => {
    
    if (e.key === 'Enter') {
      window.scrollTo(0, document.body.scrollHeight);

      const container = document.getElementsByClassName('terminalcontainer')[0]
      

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
      if (command in commands) {
        if (commands[command][4] < args.length) {
          returnText(`Too much args :/`)
        } else if (commands[command][5] < options.length) {
          returnText(`Too much options :/`)
        } else {
          container.classList.add('cool')
          setTimeout(() => {
            container.classList.remove('cool')
          }, 500)
          commands[command][0]()
        }
      } else {
        if (command == '') {
          console.log('empty')
        } else {
          returnText(`Command not found`)
          container.classList.add('shaking')
          setTimeout(() => {
            container.classList.remove('shaking')
          }, 500)
        }
      }
    }
  })
})

</script>

