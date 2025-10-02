<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import emailjs from '@emailjs/browser'
import home from '../assets/home.svg'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'
import placeholder from '../assets/placeholderpfp.png'
import python from '../assets/python.svg'
import cpp from '../assets/cpp.svg' 
import java from '../assets/java.svg'
import php from '../assets/php.svg'
import sql from '../assets/sql.svg'
import typescript from '../assets/typescript.svg'
import javascript from '../assets/javascript.svg'
import vue from '../assets/vue.svg'
import react from '../assets/react.svg'
import nodejs from '../assets/nodejs.svg'
import springboot from '../assets/springboot.svg'
import flask from '../assets/flask.svg'
import tensorflow from '../assets/tensorflow.svg'
import keras from '../assets/keras.svg'
import scikit from '../assets/sklearn.svg'
import git from '../assets/git.svg'
import linux from '../assets/linux.svg'
import docker from '../assets/docker.svg'
import postman from '../assets/postman.svg'
import s3 from '../assets/s3.svg'
import lambda from '../assets/lambda.svg'
import mongodb from '../assets/mongodb.svg'
import mariadb from '../assets/mariadb.svg'
import figma from '../assets/figma.svg'
import wireshark from '../assets/wireshark.svg'

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
    link: "https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h",
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
      "Java",
      "Spring Boot",
      "AWS S3",
      "MongoDB",
      "React.js",
      "TypeScript"
    ]
  },
]

const languages = [
  { name: "Python", icon: python },
  { name: "C++", icon: cpp },
  { name: "Java", icon: java },
  { name: "PHP", icon: php },
  { name: "SQL", icon: sql },
  { name: "TypeScript", icon: typescript },
  { name: "JavaScript", icon: javascript }
]

const frameworks = [
  { name: "Vue", icon: vue },
  { name: "React", icon: react },
  { name: "Node.js", icon: nodejs },
  { name: "Spring Boot", icon: springboot },
  { name: "Flask", icon: flask },
  { name: "TensorFlow", icon: tensorflow },
  { name: "Keras", icon: keras },
  { name: "Scikit-Learn", icon: scikit }
]

const tools = [
  { name: "Git", icon: git },
  { name: "Linux", icon: linux },
  { name: "Docker", icon: docker },
  { name: "Postman", icon: postman },
  { name: "S3", icon: s3 },
  { name: "Lambda", icon: lambda },
  { name: "MongoDB", icon: mongodb },
  { name: "MariaDB", icon: mariadb },
  { name: "Figma", icon: figma },
  { name: "Wireshark", icon: wireshark }
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

const form = ref<HTMLFormElement | null>(null)
const status = ref('')
const statusColor = ref('text-gray-300')

const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY

const sendEmail = async () => {
  if (!form.value) return
  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.value, PUBLIC_KEY)
    status.value = 'Email sent successfully!'
    statusColor.value = 'text-green-400'
    form.value.reset()
  } catch (error) {
    console.error('EmailJS error:', error)
    status.value = 'Failed to email. Please try again.'
    statusColor.value = 'text-red-400'
  }
}

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
            <img class="h-8 w-auto" :src=home alt="Loc Dinh Logo" />
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
        <div class="hover:lg hover:scale-102 transition-transform hidden lg:flex lg:flex-1 lg:justify-end">
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
          <img :src="placeholder" alt="Photo of Loc Dinh" class="w-full rounded-3xl object-cover" />
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
    <section id="projects" class="px-[10%] py-30 bg-gray-900 text-white">
      <h2 class="font-serif text-center text-5xl font-bold mb-16">Projects</h2>

      <!-- 3-column grid -->
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
    <section id="skills" class="min-h-screen bg-gray-900 px-[10%] py-30 text-white">
      <h2 class="font-serif text-5xl font-bold text-center mb-16">Skills</h2>

      <!-- 3-column -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        <!-- Languages -->
        <div class="group bg-gray-800/60 rounded-2xl p-8 shadow-lg border border-white/10 hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300">
          <h3 class="font-mono text-2xl font-bold mb-6 text-center">Languages</h3>
          <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="lang in languages" 
                :key="lang.name" 
                class="flex flex-col items-center text-center bg-white/5 p-4 rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img :src="lang.icon" :alt="lang.name" class="w-12 h-12 mb-2 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] transition-all duration-300" />
              <p class="text-sm font-semibold">{{ lang.name }}</p>
            </div>
          </div>
        </div>

        <!-- Frameworks -->
        <div class="group bg-gray-800/60 rounded-2xl p-8 shadow-lg border border-white/10 hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300">
          <h3 class="font-mono text-2xl font-bold mb-6 text-center">Frameworks & Libraries</h3>
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="fw in frameworks" 
              :key="fw.name" 
              class="flex flex-col items-center text-center bg-white/5 p-4 rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img :src="fw.icon" :alt="fw.name" class="w-12 h-12 mb-2 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] transition-all duration-300" />
              <p class="text-sm font-semibold">{{ fw.name }}</p>
            </div>
          </div>
        </div>

        <!-- Tools -->
        <div class="group bg-gray-800/60 rounded-2xl p-8 shadow-lg border border-white/10 hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300">
          <h3 class="font-mono text-2xl font-bold mb-6 text-center">Tools & Platforms</h3>
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="tool in tools" 
              :key="tool.name" 
              class="flex flex-col items-center text-center bg-white/5 p-4 rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img :src="tool.icon" :alt="tool.name" class="w-12 h-12 mb-2 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] transition-all duration-300" />
              <p class="text-sm font-semibold">{{ tool.name }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>


    <!-- Contact -->
    <section id="contact" class="min-h-screen bg-gray-900 text-white px-[10%] py-30">
      <h2 class="font-serif text-5xl font-bold text-center mb-12">Contact Me</h2>

      <form ref="form" @submit.prevent="sendEmail" class="max-w-lg mx-auto bg-gray-800/60 p-8 rounded-2xl shadow-lg border border-white/10">
        <label class="font-mono block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="user_name"
          required
          class="w-full mb-4 p-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label class="font-mono block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="user_email"
          required
          class="w-full mb-4 p-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label class="font-mono block mb-2 font-semibold">Message</label>
        <textarea
          name="message"
          rows="5"
          required
          class="w-full mb-4 p-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>

        <button
          type="submit"
          class="font-mono hover:scale-101 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-transform duration-200 shadow-lg"
        >
          Send Message
        </button>

        <p v-if="status" class="mt-4 text-center text-sm" :class="statusColor">{{ status }}</p>
      </form>

      <!-- Social Links -->
      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-lg mx-auto">
        <!-- LinkedIn Card -->
        <a 
          href="https://www.linkedin.com/in/loc-dinh-/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex flex-col items-center justify-center bg-gray-800/60 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-300"
        >
          <img :src="linkedin" alt="LinkedIn" class="w-16 h-16 mb-3 transition-transform group-hover:scale-110" />
          <p class="font-mono text-lg font-semibold">Connect on LinkedIn</p>
        </a>

        <!-- GitHub Card -->
        <a 
          href="https://github.com/LocBDinh" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex flex-col items-center justify-center bg-gray-800/60 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-300"
        >
          <img :src="github" alt="GitHub" class="w-16 h-16 mb-3 transition-transform group-hover:scale-110" />
          <p class="font-mono text-lg font-semibold">View My GitHub</p>
        </a>
      </div>
    </section>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
