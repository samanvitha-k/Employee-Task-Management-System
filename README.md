# Employee-Task-Management-System

A full-stack web application to assign, track, and manage employee tasks across an organization.
This system enables admin users to assign tasks, track progress, and view reports — all through an interactive React frontend powered by a FastAPI backend and SQLite database.

---

## 🚀 Features

- Admin can create, update, delete, and assign tasks  
- Employees can view assigned tasks and mark them as complete  
- Real-time updates with dynamic React UI  
- RESTful API built with FastAPI  
- Lightweight database using SQLite  
- Clean UI with modular components

---

## 🛠 Tech Stack

| Frontend         | Backend         | Database |  
|------------------|-----------------|----------|  
| React.js         | FastAPI (Python)| SQLite   |  

---

## 💻 Local Setup

### 🔹 Backend (FastAPI)
```bash
cd "database reqs"
python -m venv venv

# activate on Windows:
venv\Scripts\activate

# or on Mac/Linux:
# source venv/bin/activate
pip install -r ../requirements.txt
uvicorn main:app --reload
``` 


🔹 Frontend (React.js)
```bash
cd frontend
npm install
npm start
```
---
Visit:
```bash
React app: http://localhost:3000
FastAPI backend: http://127.0.0.1:8000
```

🌐 API Endpoints


| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/tasks`      | Get all tasks     |
| POST   | `/tasks`      | Create a new task |
| PUT    | `/tasks/{id}` | Update task by ID |
| DELETE | `/tasks/{id}` | Delete task by ID |

---
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Contact

If you have any questions or issues with the project, feel free to reach out:

* **GitHub:** [samanvitha-k](https://github.com/samanvitha-k)
* **Email:** [samanvithak@gmail.com](mailto:samanvithak@gmail.com)

