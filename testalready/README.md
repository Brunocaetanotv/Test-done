# Testing Task Instructions

This project consists of a backend built with Django and a frontend built with React (using Vite and TypeScript).

As part of the task, we would like you to implement tests to demonstrate your skills and attention to quality.

## What we expect

### Frontend Testing

- Write **unit tests** for the `InputField` component to ensure it works correctly in isolation.
- Write **integration tests** for the overall form component that uses the `InputField`, validating user interaction and form submission behavior.
- Feel free to use testing tools like **Jest**, **React Testing Library**, or any other libraries you are comfortable with.

### Backend Testing

- Write tests for the API endpoint that creates an event, covering scenarios with valid and invalid inputs.
- You can use **pytest**, Django’s test framework, or any other Python testing tool you prefer.

Testing is a critical part of software development, and this task is designed to assess your ability to write maintainable, reliable tests.

## Submission Guidelines

- Please include the tests along with clear instructions on how to run them.
- The **deadline** for submitting this task is **Sunday at 6:00 PM**.

---

If you have any questions or need clarification, feel free to reach out.


## Getting Started

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```bash
https://github.com/edijavier99/test_full_stack

### 1. Navigate to the project directory

```bash
cd backend/
```

### 2. Install dependencies and activate the virtual environment (BACKEND)

Install pipenv (if not installed)

```bash
pip install pipenv

```

Then, run 

```bash
pipenv install
pipenv shell
```

### 3. Apply migrations

**On macOS/Linux:**

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

**On Windows:**

```bash
python manage.py makemigrations
python manage.py migrate
```


FRONTEND(VITE + REACT + TS)

### 1. Navigate to frontend folder

```bash
cd frontend 
```


### 2. Install npm dependencies

```bash
 npm install  
```

### 2. Run code 

```bash
 npm run dev
```




