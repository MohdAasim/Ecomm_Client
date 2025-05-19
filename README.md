# Ecommerce Client

A modern, responsive frontend for an e-commerce platform built with **React**, **TypeScript**, and **Vite**. This project connects to a RESTful backend API and supports containerized deployment via **Docker** for seamless development and production.

---

## 🚀 Features

- ⚛️ React 19 + TypeScript
- 🔁 React Router v7
- 🍪 Cookie-based auth (`js-cookie`)
- 🔔 Toast notifications (`react-toastify`)
- 🎨 Beautiful modals with `sweetalert2`
- 🌐 API integration with `axios`
- 📦 Fully Dockerized
- 🧪 Unit testing with Jest + React Testing Library
- 💅 Code formatting and linting with Prettier + ESLint
- ✅ Git hooks with Husky for consistent commits

---

## 📁 Folder Structure

```

├── .husky/ # Git hooks (Husky)
├── jest/ # Test configurations/mocks
├── node_modules/
├── public/ # Static assets
├── src/ # Application source code
├── .env.dev # Development environment variables
├── .env.prod # Production environment variables
├── docker-compose.yml # Docker Compose setup
├── Dockerfile # Docker image setup
├── index.html # HTML entry point
├── tsconfig.app.json # TypeScript config
├── package.json # Scripts and dependencies
└── README.md # Project overview

```

---

## ⚙️ Getting Started

### 🐳 Run with Docker

Make sure you have **Docker** and **Docker Compose** installed.

```bash
docker-compose up --build
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 🧑‍💻 Run Locally (Without Docker)

Make sure you have **Node.js (v18+)** and **npm** installed.

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

By default, this runs the app at [http://localhost:5173](http://localhost:5173)

---

## 🌐 Environment Variables

These should be placed in `.env.dev` or `.env.prod`.

| Key            | Description          | Example                                                                  |
| -------------- | -------------------- | ------------------------------------------------------------------------ |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api/v1` (dev)<br>`http://external_url.com` (prod) |

---

## 🛠️ Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite development server        |
| `npm run build`        | Build the app with Vite and TypeScript   |
| `npm run preview`      | Preview the production build             |
| `npm run lint`         | Run ESLint on the codebase               |
| `npm run format`       | Format the codebase using Prettier       |
| `npm run format:check` | Check formatting without writing changes |
| `npm run test`         | Run unit tests with Jest                 |
| `npm run prepare`      | Initialize Husky pre-commit hooks        |

---

## 🧪 Testing

This project uses **Jest** with **React Testing Library** and `jsdom` for unit testing React components.

To run all tests:

```bash
npm run test
```

---

## 🧰 Code Style

### Code Quality Tools

- **Linting**: ESLint with React and TypeScript plugins
- **Formatting**: Prettier
- **Pre-commit Hooks**: Powered by Husky (`.husky` directory)

To lint your code:

```bash
npm run lint
```

To auto-format your code:

```bash
npm run format
```

---

## 🤝 Contributing

We welcome contributions! Please ensure all code is linted, formatted, and tested before submitting pull requests. Use clear commit messages and branch naming.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For questions or issues, feel free to open an [issue](https://github.com/your-repo/issues) or submit a pull request.

---

```

Let me know if you also want to:
- Add a backend service in `docker-compose.yml` and reflect that here.
- Include a live demo link or screenshots.
- Customize the license section.

I'm happy to help further polish it if needed!
```
