import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <header>
    <h1>Anonymous</h1>
    <p>Web Developer</p>
  </header>
  
  <nav>
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </nav>
  
  <main>
    <section id="about">
      <h2>About Me</h2>
      <p>I'm a passionate web developer with experience in HTML, CSS, and JavaScript. I love creating beautiful and functional websites that provide great user experiences.</p>
    </section>
    
    <section id="projects">
      <h2>My Projects</h2>
      <div class="project-list"></div>
    </section>
    
    <section id="contact">
      <h2>Contact Me</h2>
      <p>Email: Anonymous@example.com</p>
      <p>LinkedIn: linkedin.com/inAnonymous</p>
      <p>GitHub: github.com/Anonymous</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 Anonymous. All rights reserved.</p>
  </footer>
`

const projects = [
  { name: 'E-commerce Website', description: 'A fully responsive online store built with React and Node.js', image: 'https://picsum.photos/id/3/300/200' },
  { name: 'Weather App', description: 'A real-time weather application using OpenWeatherMap API', image: 'https://picsum.photos/id/1011/300/200' },
  { name: 'Task Manager', description: 'A productivity app built with Vue.js and Firebase', image: 'https://picsum.photos/id/180/300/200' },
]

const projectList = document.querySelector('.project-list')
projects.forEach(project => {
  const projectElement = document.createElement('div')
  projectElement.classList.add('project')
  projectElement.innerHTML = `
    <img src="${project.image}" alt="${project.name}">
    <div class="project-info">
      <h3>${project.name}</h3>
      <p>${project.description}</p>
    </div>
  `
  projectList.appendChild(projectElement)
})

// Add scroll reveal effect
const revealElements = document.querySelectorAll('section, .project')
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1 })

revealElements.forEach(element => observer.observe(element))