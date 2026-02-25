<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// State
const rotateX = ref(-8)
const rotateY = ref(0)

const zoom = ref(1)
const baseScale = ref(1)

const offsetX = ref(0)
const offsetY = ref(0)

const wrapperRef = ref<HTMLElement | null>(null)

const isDragging = ref(false)
const isAnimating = ref(false)

let startX = 0
let startY = 0
let animationFrameId: number | null = null

const RESUME_WIDTH = 900
const RESUME_HEIGHT = 1165

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

// Autofit
const fitToScreen = () => {
  const vw = window.innerWidth
  const vh = window.innerHeight

  const scaleX = vw / RESUME_WIDTH
  const scaleY = vh / RESUME_HEIGHT

  baseScale.value = Math.min(scaleX, scaleY) * 0.9
}

// Drag

const onMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging.value = true
  startX = e.clientX
  startY = e.clientY
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = e.clientX - startX
  const deltaY = e.clientY - startY

  rotateY.value += deltaX * 0.4
  rotateX.value -= deltaY * 0.2

  rotateX.value = clamp(rotateX.value, -45, 45)

  startX = e.clientX
  startY = e.clientY
}

const stopDragging = () => {
  if (!isDragging.value) return
  isDragging.value = false
  snapToNearest()
}

// Snap Dragging
const snapToNearest = () => {
  const snapped = Math.round(rotateY.value / 180) * 180
  smoothRotateTo(snapped)
}

// Rotate
const smoothRotateTo = (target: number) => {
  if (isAnimating.value) return
  if (animationFrameId) cancelAnimationFrame(animationFrameId)

  isAnimating.value = true

  const start = rotateY.value
  const diff = target - start
  const duration = 300
  const startTime = performance.now()

  const animate = (time: number) => {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)

    rotateY.value = start + diff * eased

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      rotateY.value = target
      isAnimating.value = false
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

// Flip Button
const flip = () => {
  smoothRotateTo(rotateY.value + 180)
}

// Center Button
const centerView = () => {
  if (isAnimating.value) return
  if (animationFrameId) cancelAnimationFrame(animationFrameId)

  isAnimating.value = true

  const startRX = rotateX.value
  const startRY = rotateY.value
  const startZoom = zoom.value
  const startXOff = offsetX.value
  const startYOff = offsetY.value

  // Normalize rotation to nearest 180 (front or back)
  const normalizedTarget = Math.round(startRY / 180) * 180

  const duration = 400
  const startTime = performance.now()

  const animate = (time: number) => {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)

    rotateX.value = startRX + (-8 - startRX) * eased
    rotateY.value = startRY + (normalizedTarget - startRY) * eased
    zoom.value = startZoom + (1 - startZoom) * eased
    offsetX.value = startXOff + (0 - startXOff) * eased
    offsetY.value = startYOff + (0 - startYOff) * eased

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      rotateX.value = -8
      rotateY.value = normalizedTarget
      zoom.value = 1
      offsetX.value = 0
      offsetY.value = 0
      isAnimating.value = false
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

// Keypress

const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') smoothRotateTo(rotateY.value + 180)
  if (e.key === 'ArrowLeft') smoothRotateTo(rotateY.value - 180)
}

// Cursor Zoom

const onWheel = (e: WheelEvent) => {
  e.preventDefault()

  if (!wrapperRef.value) return

  const rect = wrapperRef.value.getBoundingClientRect()

  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  const oldZoom = zoom.value
  const newZoom = clamp(oldZoom + e.deltaY * -0.001, 0.8, 2)

  const zoomFactor = newZoom / oldZoom

  offsetX.value -= (mouseX - rect.width / 2) * (zoomFactor - 1)
  offsetY.value -= (mouseY - rect.height / 2) * (zoomFactor - 1)

  zoom.value = newZoom
}

// Cleanup
onMounted(() => {
  fitToScreen()
  window.addEventListener('resize', fitToScreen)
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('resize', fitToScreen)
  window.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <div class="viewport" @mousemove="onMouseMove" @wheel="onWheel">
    <!-- Buttons -->
    <div class="absolute top-6 right-6 z-50 flex gap-3">
      <button @click="flip" class="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200">
        Flip
      </button>

      <button
        @click="centerView"
        class="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200"
      >
        Center
      </button>
    </div>

    <div
      ref="wrapperRef"
      class="fit-wrapper"
      :style="{
        transform: `
          translate(${offsetX}px, ${offsetY}px)
          scale(${baseScale * zoom})
        `,
      }"
    >
      <div class="scene">
        <div
          class="resume-3d"
          :style="{
            transform: `
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `,
          }"
          @mousedown="onMouseDown"
        >
          <!-- Front Side -->
          <div class="resume-face front">
            <!-- Name Header -->
            <div class="resume-name">Loc Dinh</div>

            <!-- Contact Info -->
            <div class="resume-contact">
              <a href="mailto:locdinh622@gmail.com">locdinh622@gmail.com</a> |
              <a href="https://www.linkedin.com/in/loc-dinh-/" target="_blank">
                https://www.linkedin.com/in/loc-dinh-/
              </a>
              |
              <a href="https://locdinhswe.com" target="_blank"> https://locdinhswe.com </a>
            </div>

            <!-- Education -->
            <div class="section">
              <div class="section-header">Education</div>

              <div class="row">
                <div class="italic">
                  University of Florida, Herbert Wertheim College of Engineering
                </div>
                <div class="right italic">Gainesville, FL</div>
              </div>

              <div class="row">
                <div>
                  Bachelor of Science in Computer Science, Certificate in AI Fundamentals and
                  Applications
                </div>
                <div class="right">December 2025</div>
              </div>
            </div>

            <!-- Technical Skills -->
            <div class="section">
              <div class="section-header">Technical Skills</div>

              <div>
                <strong>Languages:</strong> Python, Java, PHP, SQL, TypeScript, C++, JavaScript.
              </div>
              <div>
                <strong>Frameworks/Libraries:</strong> Node.js, React.js, Next.js, Flask, Vue.js,
                Scikit-Learn, TensorFlow, Keras, Bootstrap.
              </div>
              <div>
                <strong>Tools:</strong> AWS, Vercel, Linux, Git, Docker, Agile, MongoDB, MariaDB,
                Unity.
              </div>
              <div>
                <strong>Certifications:</strong> HackerRank SQL Certificate (2024), AWS Cloud Quest
                (2024), Certified SolidWorks Associate (2019).
              </div>
              <div>
                <strong>Relevant Coursework:</strong> Data Structure & Algorithms, Computer
                Organization, Operating Systems, Intro to Machine Learning, Computer Network
                Fundamentals, Natural Language Processing, Enterprise Software Engineering
                Practices, Information & Database Systems, Internet Programming, Algorithm
                Abstraction & Design, Programming Language Concepts, Intro to VR.
              </div>
            </div>

            <!-- Experience -->
            <div class="section">
              <div class="section-header">Experience</div>

              <div class="row">
                <div><strong>Full-Stack Cloud Engineering Intern</strong></div>
                <div class="right">June 2024 – August 2024</div>
              </div>

              <div class="row italic">
                <div>Modern Development LLC</div>
                <div class="right">Remote</div>
              </div>

              <ul>
                <li>
                  Developed the Front-End using Vue.js and TypeScript, with the Quasar framework to
                  create a responsive and dynamic user interface for a serverless e-commerce
                  platform.
                </li>
                <li>
                  Hosted a high-performance Back-End using Lambda for low-latency serverless
                  functions, integrated with S3 for scalable media storage and image hosting.
                </li>
                <li>
                  Deployed containerized services on EC2 using Docker for critical backend
                  processes, ensuring efficient resource management.
                </li>
                <li>
                  Configured SSL certificates and set up Nginx as a reverse proxy for secure HTTPS
                  and efficient traffic routing, integrated with Cloudflare for global content
                  delivery.
                </li>
                <li>
                  Integrated MongoDB for scalable non-relational database management with AWS
                  Cognito for user authentication.
                </li>
              </ul>
            </div>

            <!-- Projects -->
            <div class="section">
              <div class="section-header">Project Experience</div>

              <!-- Immunodom -->
              <div class="row">
                <div>
                  <strong>Immunodom</strong>
                  (<a href="https://github.com/matthewshenry/immunodom-electron" target="_blank">https://github.com/</a
                  >) | Java, Spring Boot, Electron, React.js, Agile
                </div>
                <div class="right">July 2025</div>
              </div>

              <ul>
                <li>
                  Led development as the Scrum Master of a peptide binder visualizer, using a Spring
                  Boot back-end and React and Electron front-end that integrates IEDB data, reducing
                  manual analysis time for researchers.
                </li>
                <li>
                  Designed interactive visualizations with zoom features and dataset overlays,
                  enabling faster identification of immunodominant peptides.
                </li>
                <li>
                  Improved data accessibility for research teams and a feature that autofills 27
                  alleles that cover ~98 percent of the human population.
                </li>
              </ul>

              <!-- GreenGPT -->
              <div class="row">
                <div>
                  <strong>GreenGPT</strong>
                  (<a href="https://green-gpt-dusky.vercel.app/" target="_blank">https://green-gpt-dusky.vercel.app/</a
                  >) | React.js, Next.js, PHP, Vercel, Render, CSS, MySQL
                </div>
                <div class="right">April 2025</div>
              </div>

              <ul>
                <li>
                  Developed a full-stack sustainability tracking web app integrating a React.js and
                  Next.js frontend hosted on Vercel with a PHP backend on Render and MySQL database.
                </li>
                <li>
                  Designed a gamified leaderboard and goal-setting system to visualize token usage
                  and estimated energy consumption.
                </li>
                <li>
                  Utilized session-based user authentication with PHP and managed API requests via
                  Node.js middleware hosted on Render.
                </li>
                <li>
                  Created an extension which tracks ChatGPT prompt usage and turns prompts into
                  tokens to estimate energy usage.
                </li>
              </ul>

              <!-- NeuroStock -->
              <div class="row">
                <div>
                  <strong>NeuroStock Forecast</strong>
                  | Python, CSS, Flask, TensorFlow, Scikit-Learn, Postman, YFinance
                </div>
                <div class="right">April 2024</div>
              </div>

              <ul>
                <li>
                  Designed a Stock Prediction model utilizing LSTM, Python, Flask, HTML, CSS,
                  TensorFlow, and YahooFinance for real-time user interaction and visualization,
                  increasing user engagement.
                </li>
                <li>
                  Streamlined data processing and model training using Keras, reducing latency for
                  real-time predictions.
                </li>
              </ul>

              <!-- CaSMM -->
              <div class="row">
                <div>
                  <strong>CaSMM: Teacher View and Lesson Creation</strong>
                  | Strapi, Docker, React.js, Node.js, Agile, Bootstrap
                </div>
                <div class="right">December 2023</div>
              </div>

              <ul>
                <li>
                  Enhanced dashboard readability from wireframes using Figma for ease of navigation
                  by introducing stylized hover effects and buttons with Bootstrap CSS.
                </li>
                <li>
                  Executed daily stand-ups as Scrum Master, tracked sprint progress, and conducted
                  code reviews with a six-person development team.
                </li>
              </ul>
            </div>

            <!-- Leadership Experience -->
            <div class="section">
              <div class="section-header">Leadership</div>

              <div class="row">
                <div><strong>External Vice President</strong></div>
                <div class="right">August 2022 – April 2023</div>
              </div>

              <div class="row italic">
                <div>Tuyet’s Home Nonprofit Organization</div>
                <div class="right">Gainesville, FL</div>
              </div>

              <ul>
                <li>
                  Strategized and designed events that raised awareness of social causes and
                  increased the club’s operating budget from $800 to over $1,500 by driving active
                  participation and service event engagement.
                </li>
              </ul>
            </div>
          </div>

          <div class="resume-face back">
            Back
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  width: 100vw;
  height: 100vh;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.fit-wrapper {
  transform-origin: center center;
}

.scene {
  perspective: 1800px;
}

/* Sizing */
.resume-3d {
  width: 900px;
  height: 1165px;
  transform-style: preserve-3d;
  cursor: grab;
}

.resume-face {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  padding: 40px 48px;
  backface-visibility: hidden;

  font-family: 'Times New Roman', Times, serif;
  font-size: 13.5px; 
  line-height: 1.15;
  color: black;
}

.back {
  transform: rotateY(180deg);
}

/* Name */
.resume-name {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 4px;
}

/* Contacts */
.resume-contact {
  text-align: center;
  font-size: 12.5px;
  margin-bottom: 8px;
}

.resume-contact a {
  color: #0000ff;
  text-decoration: underline;
}

/* Section Blocks */
.section {
  margin-top: 8px;
}

/* Section Headers */
.section-header {
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #000;
  padding-bottom: 2px;
  margin-bottom: 4px;
}

/* Rows */
.row {
  display: flex;
  justify-content: space-between;
}

.right {
  text-align: right;
  white-space: nowrap;
}

.italic {
  font-style: italic;
}

/* Bullet Points */
ul {
  color:#000;
  list-style-type: disc;
  list-style-position: outside;
  margin-top: 2px;
  margin-bottom: 4px;
  margin-left: 22px;
  padding-left: 0;
}

li {
  margin-bottom: 2px;
  color: #000;
}

/* Link */
a {
  color: #0000ff;
  text-decoration: underline;
}
</style>
