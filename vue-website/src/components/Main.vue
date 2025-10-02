<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'
import placeholder from '../assets/placeholderpfp.png'

const projects = [
  {
    title: "GreenGPT",
    link: "https://green-gpt-dusky.vercel.app/",
    description:
      "A chrome extension and sustainability tracking web app with a gamified leaderboard and energy usage visualization. Tracks ChatGPT prompt usage and converts it into estimated energy consumption tokens.",
    tools: [
      "React.js",
      "Next.js",
      "PHP",
      "Vercel",
      "Node.js",
      "CSS",
      "MySQL"
    ]
  },
  {
    title: "NeuroStock Forecast",
    link: "https://github.com/LocBDinh/NeuroStock-Forecast",
    description:
      "A real-time stock prediction model using LSTM and TensorFlow with a Flask backend. Integrated YahooFinance for live data and trained models with Keras.",
    tools: [
      "Python",
      "Flask",
      "TensorFlow",
      "Keras",
      "Scikit-Learn",
      "Postman",
      "YFinance",
      "HTML",
      "CSS"
    ]
  },
  {
    title: "CaSMM: Teacher View & Lesson Creator",
    link: "https://github.com/your-github-repo",
    description:
      "An educator focused dashboard built with Strapi and React. Enhanced UI/UX with Bootstrap hover effects and led Agile sprints as Scrum Master.",
    tools: [
      "Strapi",
      "Docker",
      "React.js",
      "Node.js",
      "Agile",
      "Bootstrap",
      "Figma"
    ]
  }
  ,
  {
    title: "IMMUNODOM",
    link: "https://immunodom.com/about",
    description:
      "A web application for immunology data management and analysis. Features user authentication, data visualization, and reporting tools.",
    tools: [
      "Electron",
      "Spring Boot",
      "AWS S3",
      "MongoDB",
      "React.js",
      "TypeScript",
      "Java"
    ]
  },
]

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
  <div class="bg-gray-900 min-h-screen">
    <!-- Navbar -->
    <header
      :class="[
        'z-50 transition-all duration-300',
        isScrolled
          ? 'fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-gray-900/95 backdrop-blur border border-white/10 rounded-2xl shadow-lg'
          : 'absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-gray-900/60 backdrop-blur rounded-2xl shadow-xl border border-white/10',
      ]"
    >
      <nav
        class="flex font-mono items-center justify-between px-6 py-3 lg:px-8"
        aria-label="Global"
      >
        <!-- Logo -->
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="" alt="Loc Dinh Logo" />
          </a>
        </div>

        <!-- Links -->
        <div class="hidden lg:flex lg:gap-x-12">
          <a href="#about" class="hover:text-gray-500 text-sm font-semibold text-white">
            About
          </a>
          <a href="#projects" class="hover:text-gray-500 text-sm font-semibold text-white">
            Projects
            </a>
          <a href="#skills" class="hover:text-gray-500 text-sm font-semibold text-white">
            Skills
          </a>
          <a href="#contact" class="hover:text-gray-500 text-sm font-semibold text-white">
            Contact</a>
        </div>

        <!-- Right -->
        <div class="hover:lg hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="../../public/Resume.pdf"
            download="Loc_Dinh_Resume.pdf"
            class="inline-flex items-center rounded-xl bg-white/10 
            px-4 py-2 text-sm font-semibold text-white 
            hover:bg-stone-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Download Resume
          </a>
        </div>
      </nav>
    </header>

    <!-- About -->
    <section id="about" class="w-full px-[12%] py-30 scroll-mt-32 text-white">
      <!-- intro -->
      <h4 class="font-serif text-center mb-2 text-lg font-semibold">Portfolio</h4>

      <!-- main -->
      <h2 class="font-serif text-center text-5xl font-bold">Loc Dinh</h2>

      <!-- image -->
      <div class="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <!-- portrait -->
        <div class="w-64 sm:w-80 rounded-3xl max-w-none">
          <img :src="placeholder" alt="Portrait" class="w-full rounded-3xl object-cover" />
        </div>

        <!-- bio -->
        <div class="font-mono flex-1 space-y-5 leading-relaxed text-gray-200">
          <p>
            I am a New Grad Developer with a passion for Cloud Architecture, Machine Learning and
            Software Engineering. I am currently looking for new opportunities to apply my skills
            and grow as a developer. Here are some of the technologies I have been working with
            recently:
          </p>
          <!-- main tools -->
          <ul class="font-mono font-semibold flex flex-wrap gap-3 pt-4">
            <li
              class="hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full 
              border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Python
            </li>
            <li
              class="hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full 
              border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              C++
            </li>
            <li
              class="hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full 
              border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Java
            </li>
            <li
              class="hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full 
              border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Spring Boot
            </li>
            <li
              class="hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full 
              border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Vue
            </li>
            <li
              class="hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full 
              border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              TypeScript
            </li>
            <li
              class="hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full 
              border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              AWS
            </li>
            <li
              class="hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full 
              border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Linux
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="px-[10%] py-20 bg-gray-900 text-white">
      <h2 class="font-serif text-center text-5xl font-bold mb-16 ">Projects</h2>

      <!-- Responsive 3-column grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div 
          v-for="project in projects" 
          :key="project.title"
          class="bg-gray-800/60 border border-white/10 rounded-2xl p-6 flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <!-- Title -->
          <h3 class="text-2xl font-bold mb-3">{{ project.title }}</h3>

          <!-- Description -->
          <p class="text-gray-300 text-sm leading-relaxed mb-5">{{ project.description }}</p>

          <!-- Tools / Tech badges -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span 
              v-for="tool in project.tools" 
              :key="tool"
              class="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-gray-200 hover:bg-white/20 transition"
            >
              {{ tool }}
            </span>
          </div>

          <!-- Button -->
          <a 
            :href="project.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="mt-auto inline-block text-sm font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition"
          >
            Explore Here →
          </a>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="min-h-screen flex items-center justify-center text-white">
      <h2 class="text-4xl">Skills Section</h2>
    </section>

    <!-- Contact -->
    <section id="contact" class="min-h-screen flex items-center justify-center text-white">
      <h2 class="text-4xl">Contact Section</h2>
    </section>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
