## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jfru/bmbootcamp.git
cd bmbootcamp/backend
```

### 2. Create and Activate a Virtual Environment

```bash
# For Linux/MacOS
python3 -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt
```

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Run the Development Server

```bash
python manage.py runserver
```