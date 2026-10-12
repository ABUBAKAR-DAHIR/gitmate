<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:009e86,100:00c9a7&height=220&section=header&text=Gitmate&fontSize=76&fontColor=ffffff&fontAlignY=38&desc=Find%20your%20coding%20soulmate.&descSize=22&descAlignY=60" alt="Gitmate" width="100%" />

**Match with developers based on real code, not resumes.**
<br />
Build together. Grow together.

<br />

[![Live](https://img.shields.io/badge/🌐_Live-gitmate.org-009e86?style=for-the-badge)](https://gitmate.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white)](https://aws.amazon.com)

[**Live Demo**](https://gitmate.org) · [**Report a Bug**](../../issues) · [**Request a Feature**](../../issues)

<br />

<img src="./public/home.png" alt="Gitmate home page" width="92%" />

</div>

<br />

## 💡 Why Gitmate?

Finding the right coding partner is hard. Skills, interests, and availability all have to line up, and a random Discord server rarely delivers. Resumes and bios only tell you what people *claim*.

Gitmate connects to your GitHub, reads what you actually build, and matches you with developers whose goals, experience, and availability fit yours.

<br />

## ✨ Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🔗 Verified GitHub Profiles</h3>
      Sign in with GitHub and sync your repositories, commits, and stars. Your profile reflects real work.
    </td>
    <td width="50%" valign="top">
      <h3>🎯 Similarity Matching</h3>
      Every developer in your feed comes with a similarity score based on goals, experience, and availability.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>👆 Swipe to Connect</h3>
      Pass, star, or like. Mutual interest turns into a match.
    </td>
    <td width="50%" valign="top">
      <h3>💬 Built-in Chat</h3>
      Talk to your matches directly without leaving the platform.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📊 Personal Dashboard</h3>
      Track your matches, similar profiles, and new opportunities at a glance.
    </td>
    <td width="50%" valign="top">
      <h3>🌗 Light & Dark Mode</h3>
      A clean, responsive interface that looks great in both themes.
    </td>
  </tr>
</table>

<br />

## 📸 Screenshots

### Discover developers

<div align="center">
<img src="feed.png" alt="Discovery feed with similarity score" width="92%" />
</div>

### Dashboard, in light and dark

<div align="center">

| Light | Dark |
|:---:|:---:|
| <img src="./public/dashboard-light.png" alt="Dashboard in light mode" width="100%" /> | <img src="./public/dashboard-dark.png" alt="Dashboard in dark mode" width="100%" /> |

</div>

### Profile and settings

<div align="center">

| Profile | Settings |
|:---:|:---:|
| <img src="./public/profile.png" alt="Developer profile with GitHub stats" width="100%" /> | <img src="./public/settings.png" alt="Settings page" width="100%" /> |

</div>

<br />

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,ts,vite,tailwind,nestjs,postgres,prisma,aws,terraform,githubactions&perline=10" alt="Tech stack" />

</div>

<!-- | Layer | Technology |
|---|---|
| **Frontend** | React, TypeScript, Vite, TanStack Query, React Router |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Backend** | NestJS, Node.js |
| **Database** | PostgreSQL (pgvector), Prisma |
| **Auth** | GitHub OAuth |
| **Infrastructure** | AWS, Application Load Balancer, Terraform |
| **CI/CD** | GitHub Actions |
| **Hosting** | Vercel (frontend), AWS (backend) | -->
<br>
<br>
<div align="center">
  <table>
    <thead>
      <tr>
        <th align="center">Layer</th>
        <th align="center">Technology</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Frontend</strong></td>
        <td>React, TypeScript, Vite, TanStack Query, React Router</td>
      </tr>
      <tr>
        <td><strong>Styling</strong></td>
        <td>Tailwind CSS, shadcn/ui</td>
      </tr>
      <tr>
        <td><strong>Backend</strong></td>
        <td>NestJS, Node.js</td>
      </tr>
      <tr>
        <td><strong>Database</strong></td>
        <td>PostgreSQL (pgvector), Prisma</td>
      </tr>
      <tr>
        <td><strong>Auth</strong></td>
        <td>Google & GitHub OAuth</td>
      </tr>
      <tr>
        <td><strong>Infrastructure</strong></td>
        <td>AWS, Terraform</td>
      </tr>
      <tr>
        <td><strong>CI/CD</strong></td>
        <td>GitHub Actions</td>
      </tr>
      <tr>
        <td><strong>Hosting</strong></td>
        <td>AWS </td>
      </tr>
    </tbody>
  </table>

<br />

## 🏗️ Architecture

```mermaid
flowchart LR
    U([👩‍💻 Users]) --> D[gitmate.org]
    D --> F[Frontend<br/>React + TypeScript]
    D --> ALB[AWS Application<br/>Load Balancer]
    ALB --> B[Backend<br/>NestJS API]
    B --> P[(PostgreSQL)]
    B --> G[GitHub API]

    style U fill:#009e86,stroke:#009e86,color:#fff
    style D fill:#00c9a7,stroke:#00c9a7,color:#fff
    style F fill:#20232a,stroke:#61dafb,color:#fff
    style ALB fill:#232f3e,stroke:#ff9900,color:#fff
    style B fill:#e0234e,stroke:#e0234e,color:#fff
    style P fill:#336791,stroke:#336791,color:#fff
    style G fill:#181717,stroke:#ffffff,color:#fff
```

Frontend, API, and database are separate layers, so each can be deployed and scaled independently. Infrastructure is managed with Terraform and shipped through GitHub Actions.

<br />

## 🚦 Run it locally

```bash
# Clone
git clone https://github.com/ABUBAKAR-DAHIR/gitmate.git
cd gitmate

# Install
pnpm install

# Configure (point this at your running backend)
echo "VITE_API_URL=http://localhost:3000" > .env

# Start
pnpm dev
```

Open **http://localhost:5173** and you're in.

> [!NOTE]
> `VITE_` variables are bundled into the client. Never put secrets in them.

<br />

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your changes
4. Open a pull request

<br />

## 👤 Author

<div align="center">

**Abubakar Dahir Hassan**

Full-stack developer building production-ready applications, backend systems, and cloud infrastructure.

[![GitHub](https://img.shields.io/badge/GitHub-ABUBAKAR--DAHIR-181717?style=for-the-badge&logo=github)](https://github.com/ABUBAKAR-DAHIR)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abubakar_Dahir_Hassan-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/abubakar-dahir/)

<br />

⭐ **If you like Gitmate, give it a star!**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:009e86,100:00c9a7&height=100&section=footer" alt="" width="100%" />

</div>
