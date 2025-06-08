# MERN Stack Application (with Vite.js)

A full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) with a modern React frontend powered by [Vite.js](https://vitejs.dev/).

## 🧰 Tech Stack

- **Frontend**: React, Vite, Axios, Tailwind CSS (optional)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (optional)
- **Tools**: Vite, Nodemon, Concurrently

---

## 📁 Folder Structure

```
root
├── client          # Frontend (React + Vite)
├── server          # Backend (Express + MongoDB)
├── .gitignore
├── README.md
├── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vepada-sateesh/newProj_Livoso.git
cd newProj_Livoso
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd Frontend
npm install
```

### 4. Environment Variables

Create a `.env` file inside the `Backend` folder:

```env
Pconnection_string = "mongodb://localhost:27017/livoso"
secretKey =  "abcdef"
EMAIL_USER = "rosalyn.goyette95@ethereal.email"
EMAIL_PASSWORD = "SgKkANNHxS5U6KE97m"

```


---

## 🚀 Running the App

### Start the Backend

```bash
cd Backend
npm start
```

### Start the Frontend

```bash
cd Frontend
npm run dev
```


## 🔗 API Routes

Example base URL: `http://localhost:5000/api`

- `POST http://localhost:8080/user/Signup`
- `POST http://localhost:8080/user/login`
- `POST [http://localhost:8080/user/login](http://localhost:8080/task/tasks)`
- `PUT [/api/data` (protected route)](http://localhost:8080/task/tasks/${ID})
- DELETE http://localhost:8080/task/tasks/${id}
- `GET http://localhost:8080/task/tasks`
---

## 🛠 Vite Commands (Frontend)

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

---


## 🧑‍💻 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📌 Notes

- Ensure MongoDB is running locally or use MongoDB Atlas.
- Use tools like Postman for testing API endpoints.
- Tailwind or any CSS library is optional.

---

Made with ❤️ using MERN and Vite.
