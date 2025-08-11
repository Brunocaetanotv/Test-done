# Test Done - Full Stack Project

## What is this?

This is a technical test project. It's a full stack application that allows saving event dates with specific times. It has a Django + Django REST Framework backend and a React + TypeScript frontend.

## Backend (Django) - ✅ WORKING

### What was implemented:
- **REST API** with Django REST Framework
- **SaveDate Model** that stores event information (name, description, date and times)
- **Serializers** for data validation and conversion
- **Views** with endpoints to create and list events
- **CORS** configured for frontend communication
- **Automated tests** running and passing

### How to run:
```bash
# 1. Navigate to backend folder
cd Test-done/testalready/backend

# 2. Install dependencies (only first time)
pipenv install

# 3. Activate virtual environment
pipenv shell

# 4. Run server
python manage.py runserver
```

**To run tests, follow steps 1, 3 and then use `python manage.py test`**

### Tests:
**IMPORTANT:** Always activate the virtual environment before running tests!

```bash
# 1. Activate virtual environment
pipenv shell

# 2. Run tests
python manage.py test
```

**Expected result:** 11 tests passing ✅

**Note:** If you don't activate the virtual environment with `pipenv shell`, the tests won't work because dependencies won't be available.

### API Endpoints:
- `POST /api/save-date/` - Create new event
- `GET /api/save-date/` - List all events

### Technologies used:
- Django 4.x
- Django REST Framework
- SQLite (local database)
- Pipenv (dependency management)

---

## Frontend (React + TypeScript) - ✅ WORKING

### What was implemented:
- **Form** to create events with date and time fields
- **Reusable components** (InputField, TimePickerField, EventTimesField)
- **Form validation** with Zod
- **Unit tests** with Vitest
- **Modern UI** with Tailwind CSS

### How to run:
```bash
cd Test-done/testalready/frontend
npm install
npm run dev
```

### Tests:
```bash
npm run test:quick
```

**Expected result:** 9 tests passing ✅

**Tests implemented:**
- **Unit Tests:** InputField (5 tests), TimePickerField (3 tests), Smoke test (1 test)
- **Coverage:** Component rendering, user interaction, form validation

**Note:** Tests run quickly and complete successfully without hanging.

### Technologies used:
- React 18
- TypeScript
- Vite
- Vitest
- Tailwind CSS
- Zod (validation)

---

## Project Structure

```
TesteDone/
├── Test-done/
│   └── testalready/
│       ├── backend/          # Django API
│       └── frontend/         # React App
```

---

##  Automated Testing with GitHub Actions

### What's automated:
- **Backend tests** run automatically on every push/PR
- **Frontend tests** run automatically on every push/PR
- **Both test suites** execute in parallel for faster results

### How to trigger automated tests:

#### Option 1: Push to any branch
```bash
git push origin main
# Tests will run automatically
```

#### Option 2: Manual execution
1. Go to your GitHub repository
2. Click on **Actions** tab
3. Select **Full Stack Tests** workflow
4. Click **Run workflow** button
5. Choose branch and click **Run workflow**

### What you'll see:
- **Backend tests:** 11 tests passing
- **Frontend tests:** 9 tests passing
- **Total time:** ~2-3 minutes
- **Real-time logs** for each test step

### Test results:
- **Green checkmark** = All tests passed
- **Red X** = Some tests failed (check logs for details)
- **Yellow dot** = Tests are running

**Note:** Automated tests ensure code quality and catch issues before they reach production!

