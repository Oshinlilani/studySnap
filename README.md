# 📝 AI Text Summarizer

A full-stack **Text Summarizer** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
It uses **Hugging Face’s Summarization API** for NLP, and **JWT authentication** to provide personalized history of summaries for each logged-in user.  

---

## 🚀 Features

- 🔑 User authentication (signup/login with JWT)
- ✍️ Enter long text and get a concise summary
- 📜 Summaries are saved per logged-in user
- 🕒 History of summaries (user-specific)
- 🛡️ Secure API using JWT & MongoDB
- 🎨 Simple React frontend with history view

---

## 🏗️ Tech Stack

- **Frontend**: React, Fetch API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT + bcrypt
- **NLP Model**: Hugging Face Inference API (e.g. `facebook/bart-large-cnn`)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/mern-summarizer.git
cd mern-summarizer
````

### 2️⃣ Install dependencies

* Backend:

```bash
cd backend
npm install
```

* Frontend:

```bash
cd ../frontend
npm install
```

### 3️⃣ Environment variables

Create `.env` in `backend/` with:

```
MONGO_URI=your_mongo_connection_string
HF_API_KEY=your_huggingface_api_key
JWT_SECRET=your_jwt_secret
PORT=5000
```


### 4️⃣ Run the app

* Start backend:

```bash
cd backend
npm run dev
```

* Start frontend:

```bash
cd frontend
npm start
```

The backend runs on [http://localhost:5000](http://localhost:5000)
The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### Auth

* `POST /auth/signup` → Register new user
* `POST /auth/login` → Login & get JWT token

### Summarizer

* `POST /summary/summarize` → Summarize text (requires JWT)
* `GET /summary/history` → Get user’s summary history (requires JWT)

---

## 📷 Screenshots


---

## 🤝 Contributing

Pull requests are welcome!

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/xyz`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push (`git push origin feature/xyz`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

```

---
