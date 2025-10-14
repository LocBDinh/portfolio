<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import emailjs from '@emailjs/browser'
import home from '../assets/home.svg'
import pfp from '../assets/locdinh.jpg'
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
import unity from '../assets/unity.svg'

const projects = [
  {
    title: 'IMMUNODOM',
    link: 'https://immunodom.com/about',
    description:
      'A web application for immunology data management and analysis. Features user authentication, data visualization, and reporting tools.',
    tools: ['Electron', 'Java', 'Spring Boot', 'AWS S3', 'MongoDB', 'React.js', 'TypeScript'],
  },
  {
    title: 'GreenGPT',
    link: 'https://green-gpt-dusky.vercel.app/',
    description:
      'A chrome extension and sustainability tracking web app with a gamified leaderboard and energy usage visualization. Tracks ChatGPT prompt usage and converts it into estimated energy consumption tokens.',
    tools: ['React.js', 'Next.js', 'PHP', 'Vercel', 'Node.js', 'CSS', 'MySQL'],
  },
  {
    title: 'NeuroStock Forecast',
    link: 'https://github.com/LocBDinh/NeuroStock-Forecast',
    description:
      'A real-time stock prediction model using LSTM and TensorFlow with a Flask backend. Integrated YahooFinance for live data and trained models with Keras.',
    tools: [
      'Python',
      'Flask',
      'TensorFlow',
      'Keras',
      'Scikit-Learn',
      'Postman',
      'YFinance',
      'HTML',
      'CSS',
    ],
  },
  {
    title: 'CaSMM: Teacher View & Lesson Creator',
    link: 'https://github.com/Group-9h-Intro-Software-Engineering/Diamond-Project17-9h',
    description:
      'An educator focused dashboard built with Strapi and React. Enhanced UI/UX with Bootstrap hover effects and led Agile sprints as Scrum Master.',
    tools: ['Strapi', 'Docker', 'React.js', 'Node.js', 'Agile', 'Bootstrap', 'Figma'],
  },
]

const languages = [
  { name: 'Python', icon: python },
  { name: 'C++', icon: cpp },
  { name: 'Java', icon: java },
  { name: 'PHP', icon: php },
  { name: 'SQL', icon: sql },
  { name: 'TypeScript', icon: typescript },
  { name: 'JavaScript', icon: javascript },
]

const frameworks = [
  { name: 'Vue', icon: vue },
  { name: 'React', icon: react },
  { name: 'Node.js', icon: nodejs },
  { name: 'Spring Boot', icon: springboot },
  { name: 'Flask', icon: flask },
  { name: 'TensorFlow', icon: tensorflow },
  { name: 'Keras', icon: keras },
  { name: 'Scikit-Learn', icon: scikit },
]

const tools = [
  { name: 'Git', icon: git },
  { name: 'Linux', icon: linux },
  { name: 'Docker', icon: docker },
  { name: 'Postman', icon: postman },
  { name: 'S3', icon: s3 },
  { name: 'Lambda', icon: lambda },
  { name: 'MongoDB', icon: mongodb },
  { name: 'MariaDB', icon: mariadb },
  { name: 'Figma', icon: figma },
  { name: 'Unity', icon: unity },
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

  const formData = new FormData(form.value)

  // Anti-Bot Honeypot Check
  if (formData.get('honeypot')) {
    console.warn('Bot detected — form not submitted.')
    return
  }

  try {
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.value, PUBLIC_KEY)
    status.value = 'Email sent successfully!'
    statusColor.value = 'text-green-400'
    form.value.reset()
  } catch (error) {
    console.error('EmailJS error:', error)
    status.value = 'Failed to send email. Please try again.'
    statusColor.value = 'text-red-400'
  }
}

const isMenuOpen = ref(false)

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300"
  >
    <!-- Navbar -->
    <header
      :class="[
        'z-50 transition-all duration-300',
        isScrolled
          ? 'fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-white/90 dark:bg-gray-900/95 backdrop-blur border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg'
          : 'absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl shadow-xl border border-gray-200 dark:border-white/10',
      ]"
    >
      <nav
        class="flex font-mono items-center justify-between px-6 py-3 lg:px-8"
        aria-label="Global"
      >
        <!-- Logo -->
        <div class="flex lg:flex-1 items-center">
          <a href="#" class="-m-1.5 p-1.5 flex items-center gap-2">
            <img
              class="h-8 w-auto drop-shadow-[0_0_2px_rgba(0,0,0,1)] dark:drop-shadow-none transition"
              :src="home"
              alt="Loc Dinh Logo"
            />
          </a>
        </div>

        <!-- Links -->
        <div class="hidden lg:flex lg:gap-x-12">
          <a
            href="#about"
            class="hover:text-slate-300 text-sm font-semibold dark:text-white dark:hover:text-slate-600"
            >About</a
          >
          <a
            href="#projects"
            class="hover:text-slate-300 text-sm font-semibold dark:text-white dark:hover:text-slate-600"
            >Projects</a
          >
          <a
            href="#skills"
            class="hover:text-slate-300 text-sm font-semibold dark:text-white dark:hover:text-slate-600"
            >Skills</a
          >
          <a
            href="#contact"
            class="hover:text-slate-300 text-sm font-semibold dark:text-white dark:hover:text-slate-600"
            >Contact</a
          >
        </div>

        <!-- Resume Button -->
        <div
          class="hover:lg hover:scale-102 transition-transform hidden lg:flex lg:flex-1 lg:justify-end"
        >
          <a
            href="/portfolio/Resume.pdf"
            download="Loc_Dinh_Resume.pdf"
            class="inline-flex items-center rounded-xl bg-slate-500 dark:bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            hov
          >
            Download Resume
          </a>
        </div>

        <!-- Theme Toggle -->
        <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:ml-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-slate-300 dark:bg-white/10 hover:bg-gray-400 dark:hover:bg-white/20 transition flex items-center justify-center hover:scale-105"
            aria-label="Toggle Dark/Light Mode"
          >
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 3v1m0 16v1m8.66-8.66h1M3.34 12H2m15.36 6.36l.7.7M6.34 6.34l-.7-.7m0 12.72l.7-.7m12.72-12.72l-.7.7M12 5a7 7 0 000 14a7 7 0 000-14z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 12.79A9 9 0 1111.21 3A7 7 0 0021 12.79z"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Navbar Open -->
        <div class="lg:hidden flex items-center">
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="h-8 w-auto drop-shadow-[0_0_2px_rgba(0,0,0,0.5)] dark:drop-shadow-none"
            aria-label="Toggle Menu"
          >
            <svg
              v-if="!isMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <div
        v-show="isMenuOpen"
        class="lg:hidden dark:bg-gray-800 bg-slate-300 border-white/10 border-px-6 py-4 space-y-4 text-center rounded-b-2xl transition-all duration-300 font-mono"
      >
        <a
          href="#about"
          @click="isMenuOpen = false"
          class="block dark:text-white hover:text-gray-500 font-semibold"
          >About</a
        >
        <a
          href="#projects"
          @click="isMenuOpen = false"
          class="block dark:text-white hover:text-gray-500 font-semibold"
          >Projects</a
        >
        <a
          href="#skills"
          @click="isMenuOpen = false"
          class="block dark:text-white hover:text-gray-500 font-semibold"
          >Skills</a
        >
        <a
          href="#contact"
          @click="isMenuOpen = false"
          class="block dark:text-white hover:text-gray-500 font-semibold"
          >Contact</a
        >
        <a
          href="/portfolio/Resume.pdf"
          download="Loc_Dinh_Resume.pdf"
          @click="isMenuOpen = false"
          class="mt-2 inline-block bg-emerald-400 dark:bg-white/20 hover:bg-emerald-700 dark:hover:bg-stone-600 hover:scale-102 text-white font-semibold px-4 py-2 rounded-lg transition-transform"
        >
          Download Resume
        </a>
        <!-- Mobile Socials -->
        <div class="flex justify-center gap-6 mt-4">
          <a
            href="https://www.linkedin.com/in/loc-dinh-/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="linkedin" alt="LinkedIn" class="w-7 h-7 opacity-80 hover:opacity-100" />
          </a>
          <a href="https://github.com/locbdinh" target="_blank" rel="noopener noreferrer">
            <img :src="github" alt="GitHub" class="w-7 h-7 opacity-80 hover:opacity-100" />
          </a>
        </div>
      </div>
    </header>

    <!-- About -->
    <section id="about" class="w-full px-[12%] py-30 scroll-mt-32 dark:text-white">
      <!-- intro -->
      <h4 class="font-serif text-center mb-2 text-lg font-semibold">Portfolio</h4>

      <!-- main -->
      <h2 class="font-serif text-center text-5xl font-bold">Loc Dinh</h2>

      <!-- image -->
      <div class="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <!-- portrait -->
        <div class="w-64 sm:w-80 rounded-3xl shadow-2xl max-w-none">
          <img :src="pfp" alt="Photo of Loc Dinh" class="w-full rounded-3xl object-cover" />
        </div>

        <!-- bio -->
        <div class="font-mono flex-1 space-y-5 leading-relaxed">
          <p>
            I am a New Grad Developer with a passion for Cloud Architecture, Machine Learning and
            Software Engineering. I am currently looking for new opportunities to apply my skills
            and grow as a developer. Here are some of the technologies I have been working with
            recently:
          </p>
          <!-- main tools -->
          <ul class="font-mono font-semibold flex flex-wrap gap-3 pt-4">
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Python
            </li>
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              C++
            </li>
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Java
            </li>
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Spring Boot
            </li>
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Vue
            </li>
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              TypeScript
            </li>
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              AWS
            </li>
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Linux
            </li>
            <li
              class="outline-1 outline-solid outline-stone-700 dark:outline-none hover:bg-gray-500 hover:scale-110 shadow-sm transition-transform rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
            >
              Unity
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="px-[10%] py-30 dark:bg-gray-900 dark:text-white">
      <h2 class="font-serif text-center text-5xl font-bold mb-16">Projects</h2>

      <!-- 3-column grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="project in projects"
          :key="project.title"
          class="dark:bg-gray-800/60 bg-slate-300 border border-white/10 rounded-2xl p-6 flex flex-col shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <!-- Title -->
          <h3 class="text-2xl font-bold mb-3">{{ project.title }}</h3>

          <!-- Description -->
          <p class="dark:text-gray-300 text-sm leading-relaxed mb-5">{{ project.description }}</p>

          <!-- Tools / Tech badges -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tool in project.tools"
              :key="tool"
              class="px-3 py-1 rounded-full bg-white hover:bg-gray-500 hover:scale-105 dark:bg-white/10 text-xs font-medium dark:text-gray-200 transition"
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
    <section id="skills" class="min-h-screen dark:bg-gray-900 px-[10%] py-30 dark:text-white">
      <h2 class="font-serif text-5xl font-bold text-center mb-16">Skills</h2>

      <!-- 3-column -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <!-- Languages -->
        <div
          class="group dark:bg-gray-800/60 bg-slate-300 dark:text-white rounded-2xl p-8 shadow-lg border border-white/10 hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300"
        >
          <h3 class="font-mono text-2xl font-bold mb-6 text-center">Languages</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="lang in languages"
              :key="lang.name"
              class="flex flex-col items-center text-center bg-white/5 outline-1 dark:outline-none outline-solid outline-stone-700 p-4 rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img
                :src="lang.icon"
                :alt="lang.name"
                class="w-12 h-12 mb-2 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] transition-all duration-300"
              />
              <p class="text-sm font-semibold">{{ lang.name }}</p>
            </div>
          </div>
        </div>

        <!-- Frameworks -->
        <div
          class="group dark:bg-gray-800/60 bg-slate-300 dark:text-white rounded-2xl p-8 shadow-lg border border-white/10 hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300"
        >
          <h3 class="font-mono text-2xl font-bold mb-6 text-center">Frameworks & Libraries</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="fw in frameworks"
              :key="fw.name"
              class="flex flex-col items-center text-center bg-white/5 outline-1 dark:outline-none outline-solid outline-stone-700 p-4 rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img
                :src="fw.icon"
                :alt="fw.name"
                class="w-12 h-12 mb-2 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] transition-all duration-300"
              />
              <p class="text-sm font-semibold">{{ fw.name }}</p>
            </div>
          </div>
        </div>

        <!-- Tools -->
        <div
          class="group dark:bg-gray-800/60 bg-slate-300 dark:text-white rounded-2xl p-8 shadow-lg border border-white/10 hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300"
        >
          <h3 class="font-mono text-2xl font-bold mb-6 text-center">Tools & Platforms</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="tool in tools"
              :key="tool.name"
              class="flex flex-col items-center text-center bg-white/5 p-4 outline-1 dark:outline-none outline-solid outline-stone-700 rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img
                :src="tool.icon"
                :alt="tool.name"
                class="w-12 h-12 mb-2 group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] transition-all duration-300"
              />
              <p class="text-sm font-semibold">{{ tool.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="min-h-screen dark:bg-gray-900 dark:text-white px-[10%] py-30">
      <h2 class="font-serif text-5xl font-bold text-center mb-12">Contact Me</h2>

      <form
        ref="form"
        @submit.prevent="sendEmail"
        class="max-w-lg mx-auto dark:bg-gray-800/60 bg-slate-300 p-8 rounded-2xl shadow-lg border border-white/10"
      >
        <!-- Honeypot -->
        <input type="text" name="honeypot" style="display: none" tabindex="-1" autocomplete="off" />

        <label class="font-mono block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="user_name"
          required
          class="w-full mb-4 p-2 rounded-lg bg-white/10 text-white focus:outline-none outline-2 outline-solid outline-stone-700 focus:ring-2 focus:ring-indigo-500"
        />

        <label class="font-mono block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="user_email"
          required
          class="w-full mb-4 p-2 rounded-lg bg-white/10 text-white focus:outline-none outline-2 outline-solid outline-stone-700 focus:ring-2 focus:ring-indigo-500"
        />

        <label class="font-mono block mb-2 font-semibold">Message</label>
        <textarea
          name="message"
          rows="5"
          required
          class="w-full mb-4 p-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 outline-2 outline-solid outline-stone-700 focus:ring-indigo-500"
        ></textarea>

        <button
          type="submit"
          class="font-mono hover:scale-101 w-full bg-emerald-400 hover:bg-emerald-700 dark:text-white font-semibold py-2 rounded-lg transition-transform duration-200 shadow-lg"
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
          class="flex flex-col items-center justify-center bg-slate-300 dark:bg-gray-800/60 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-300"
        >
          <img
            :src="linkedin"
            alt="LinkedIn"
            class="w-16 h-16 mb-3 transition-transform group-hover:scale-110"
          />
          <p class="font-mono text-lg font-semibold">Connect on LinkedIn</p>
        </a>

        <!-- GitHub Card -->
        <a
          href="https://github.com/LocBDinh"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center justify-center bg-slate-300 dark:bg-gray-800/60 rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.7)] hover:-translate-y-2 transition-all duration-300"
        >
          <img
            :src="github"
            alt="GitHub"
            class="w-16 h-16 mb-3 transition-transform group-hover:scale-110"
          />
          <p class="font-mono text-lg font-semibold">View My GitHub</p>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="dark:bg-gray-800 bg-slate-200 border-t border-white/10 py-6">
      <div
        class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between dark:text-gray-400 text-sm"
      >
        <!-- Copyright -->
        <p class="text-center md:text-left">
          © 2025 - {{ new Date().getFullYear() }} Loc Dinh. All Rights Reserved.
        </p>

        <!-- Quick Links + Socials -->
        <div class="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0 dark:text-white">
          <!-- Quick Links -->
          <div class="flex gap-6">
            <a href="#about" class="hover:text-indigo-400 transition">About</a>
            <a href="#projects" class="hover:text-indigo-400 transition">Projects</a>
            <a href="#skills" class="hover:text-indigo-400 transition">Skills</a>
            <a href="#contact" class="hover:text-indigo-400 transition">Contact</a>
          </div>

          <!-- Social Links (mini-cards) -->
          <div class="flex gap-4 mt-3 md:mt-0">
            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/in/loc-dinh-/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-9 h-9 bg-gray-700/50 rounded-xl border border-white/10 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(99,102,241,0.6)] transition-all duration-300"
            >
              <img :src="linkedin" alt="LinkedIn" class="w-5 h-5" />
            </a>

            <!-- GitHub -->
            <a
              href="https://github.com/locbdinh"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-9 h-9 bg-gray-700/50 rounded-xl border border-white/10 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(99,102,241,0.6)] transition-all duration-300"
            >
              <img :src="github" alt="GitHub" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
