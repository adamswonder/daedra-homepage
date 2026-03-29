// Adams Wonderboy's resume — injected as LLM system prompt context.
// Keep under ~4000 tokens for best performance.

const resume = `
# Adams Wonderboy — Resume

## Contact
- Phone: (+254) 758-548103
- Location: Nairobi, Kenya
- Email: adamswill.i.am71002@gmail.com
- Portfolio: adamswonder
- GitHub: github.com/adamswonder
- LinkedIn: linkedin.com/in/adamswonder

## Summary
I'm a self-motivated, innovative, and quality assurance individual with diverse knowledge in software engineering. My combined passion for intuitive design and problem-solving brought me here, to a position where I can demystify the everyday problems of users and empower them with delightful experiences and solutions.

## Title
Agile Practitioner | Software Engineer

## Skills
- Languages: Ruby, Python, C Programming, JavaScript, PHP
- Frameworks: Ruby on Rails, NodeJs, Django, .NET, Flask
- AI & LLM: LangChain, OpenAI API, Vector Databases (Qdrant, Milvus)
- Tools: Version Control, Jira, Figma, API (OAS3/Swagger, REST), SQL
- DevOps: Docker, AWS (EC2, S3, ECS/ECR), CI/CD (GitHub Actions, Jenkins, Terraform)
- Communication: English (fluent), Swahili
- Networking: NSE, CCNA, HCIA

## Technical Experience

### Software Engineer — Craft Silicon | Little Limited (August 2024 – Present)
Nairobi, Kenya
- Developed responsive, component-driven user interfaces using Next.js (React) and Vue.js, boosting user engagement and consistency across portals and admin dashboards.
- Engineered and consumed RESTful APIs with Rails, Node, Laravel PHP and Python, seamlessly integrating back-end services with front-end components to power dynamic, data-driven features.
- Currently leading development of two React Native POS applications (merchant-facing and consumer-facing) scheduled for release: a merchant management application enabling transaction processing, reporting, and operational insights; a consumer expense-tracking application that records purchases in real time and provides financial visibility and spending analytics.
- Architected secure mobile workflows including authentication, transaction logging, API integration, state management, and error handling to ensure reliability in production and low-connectivity environments.
- Led full product life cycle from ideation through launch — scoping requirements, defining MVPs, coordinating with stakeholders, and delivering production-ready releases.
- Designed, optimized, and maintained relational databases including MS SQL, MySQL, and PostgreSQL, ensuring data integrity, scalability, and performance across distributed applications.
- Built an AI-powered document intelligence and semantic search system, integrating OpenAI APIs for embeddings, summarization, and Q&A with vector databases (Qdrant, Milvus).
- Implemented an event-driven processing pipeline with document parsing, chunking, and embedding workflows, supporting scalable ingestion from multiple data sources.
- Applied LLM orchestration and prompt engineering to enable contextual responses, dynamic content generation, and efficient asynchronous processing.
- Collaborated on a comprehensive Ruby project management and support desk platform for Craft Silicon, serving clients and internal teams — contributing to support desk workflows (ticket tracking, SLA management, real-time notifications), role-based access control (Devise, Rolify, CanCanCan), audit trails (Paper Trail), reporting and analytics modules (Chartkick, Excel exports), QA workflows, and document storage via Cloudinary.

### Software Engineer — Omna Solutions (June 2023 – July 2024)
Remote, Australia
- Utilized .NET and C# to create an intuitive API documenting tool, enhancing back-of-house user engagement and tracking of endpoints by simplifying the documenting process.
- Optimized back-end performance by strategically indexing key database tables, resulting in a 70% reduction in query response times and improved application performance using SQL.
- Performed testing and debugging — ensuring software functions correctly through rigorous testing, identifying and resolving bugs.
- Built a time-sheet entry system using React and C# for team tracking and submission of hours worked across tasks.
- Developed user-centric features for onboarding, role management, and team structuring, allowing client organizations to efficiently manage employees across mobile and web platforms.

### Software Developer — iTalanta (January 2023 – June 2023)
Nairobi, Kenya
- Feature integration and development for the elewa-group project using Angular.
- Drafted documentation (Markdown) following acceptance criteria for features implemented.
- Utilized Firebase and Angular to implement The Elewa Conversational Manager — an open-source chatbot editor and manager for hosting and using conversational learning projects.
- Collaborated in agile sprints with cross-functional teams, contributing to planning, testing, and refinement of user-facing features and backend integrations.
- Debugged and resolved runtime issues in Angular modules and Firebase services.
- Performed peer reviews on open-source code.

### Networking Engineer | Solutions Integrator — Next Technologies Limited (June 2021 – June 2022)
Nairobi, Kenya
- Collaborated in the installation and configuration of networks including GCCN around the capital city and counties.
- Scoped technical solutions to address customer requirements and recommended optimum solutions for integration.
- Utilized Oracle-powered databases to conduct initial setups and perform migrations for clients.
- Conducted performance maintenance of networking equipment.

### Software Developer — Skylux Tech (October 2020 – March 2021)
Remote
- Implemented GitFlow branching strategy, resulting in a 10% reduction in code conflicts and improved stability of production releases.
- Increased CI/CD release speed by 90% using GitHub Actions to automate image creation and deployment to AWS ECR, enabling ECS to launch containers with the latest updates.
- Acted as project lead, ensuring project objectives aligned with the vision and delivered the solution based on earlier proposals.

### Software Developer (Freelancer) — Westside Real Consultancy (April 2019 – May 2019)
Nairobi, Kenya
- Built and offered technical support to a Real Estate website dealing with land resale, renting, and selling property listings.
- Designed the website wireframe following design patterns per the specification.
- Worked with site managers to ensure correct property images were taken to expected dimensions for quality marketing.

## Education

### Software Engineering — Moringa School (June 2022 – February 2023)
Flatiron Software Engineering: an immersive program in Full-Stack Software Development.

### Bachelor of Science in Computer Science — Riara University (August 2017 – July 2021)
Courses: OOP in C++, Compilers, Algorithms, Operating Systems, Data Structures.

## Certifications
- Test-Driven Development in Django — LinkedIn
- Designing RESTful APIs — LinkedIn
- Advanced Vue.js — LinkedIn
- DevOps Nano Degree — Udemy
`

export default resume
