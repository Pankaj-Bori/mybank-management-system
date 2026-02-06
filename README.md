# 🏦 MyBank Management System

## 📌 Project Overview

MyBank Management System is a simple front-end banking application built using React, TypeScript, and Vite.
The goal of this project is to simulate basic banking operations such as user login, viewing account details, and tracking transactions in a clean and structured way.

This project focuses more on logic building, component structure, and TypeScript usage rather than real backend integration.

---
## 🎯 Why I Built This Project

As a computer science student, I wanted to build a project that:

* Strengthens my understanding of **React component architecture**
* Helps me practice **TypeScript interfaces and type safety**
* Simulates a **real-world system** like banking in a simple way

Most beginner projects are either too basic or too complex. This project helped me find a balance while learning how real applications are structured.

---

## 🛠️ Technologies Used

* **React** – for building UI components
* **TypeScript** – for type safety and better code reliability
* **Vite** – for fast development and build
* **CSS** – for basic styling

---

## 📂 Project Structure

src/
 ├── components/
 │   ├── Login.tsx
 │   ├── Sidebar.tsx
 │   ├── Dashboard.tsx
 │   └── TransactionsList.tsx
 │
 ├── services/
 │   └── bankLogic.ts
 │
 ├── types.ts
 ├── App.tsx
 ├── index.tsx


### 📁 Explanation

* **components/** → Contains all UI components
* **services/bankLogic.ts** → Handles core banking logic (separation of concerns)
* **types.ts** → Central place for TypeScript interfaces
* **App.tsx** → Manages main application flow and state

---

## ✨ Features

* User login simulation
* Dashboard view after login
* Transaction list display
* Clean separation between UI and business logic
* Type-safe data handling using TypeScript

---

## ⚙️ How the Application Works

1. User logs in using the login screen
2. On successful login, dashboard is displayed
3. Transaction data is processed using logic from `bankLogic.ts`
4. UI components receive data through props and state

---

## 🚧 Challenges I Faced

* Deciding where to place banking logic (UI vs service layer)
* Managing state between multiple components
* Understanding proper use of TypeScript interfaces
* Avoiding over-complication while keeping the code clean

Solving these helped me understand **real project design decisions**.

---

## 📚 What I Learned

* Component-based architecture in React
* Importance of separating logic from UI
* Using TypeScript to prevent runtime errors
* Structuring a project for scalability

---

## 🔮 Future Improvements

* Backend integration with real APIs
* Authentication system
* Database support for transactions
* Improved UI and validation

---

## ▶️ How to Run the Project

*Live demo
https://mybank-management-system.vercel.app/

```bash
npm install
npm run dev
```

---

## 👤 Author

Pankaj Bori
B.Tech Computer Science Student

---


