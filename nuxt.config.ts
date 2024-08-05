// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [["@nuxtjs/google-fonts", 
    { 
      families: { 
        Roboto: [400, 700, 900],
        "JetBrains Mono": [500, 700, 800]

      } 
    }  
  ], "@nuxt/content", "@nuxt/image"],
})