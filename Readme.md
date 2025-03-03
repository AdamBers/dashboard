# A/B Testing Dashboard

A React-based dashboard for managing A/B tests.

## 🚀 Features

- Displays a list of A/B tests retrieved from a JSON file via API.
- Table row highlighting on hover.
- Filtering by test name with a reset button.
- Sorting by name, type, site, and status.
- Routing between Dashboard, Results, and Finalize pages.
- Navigation without full-page reload.
- Removes `http://`, `https://`, and `www.` from site URLs.

## 🛠️ Tech Stack

- **React** (with hooks)
- **React Router** for navigation
- **Axios** for API requests
- **CSS Modules** for styling
- **TypeScript**

## 📦 Installation

Clone the repository and start the project:

```sh
git clone https://github.com/AdamBers/dashboard
cd dashboard

# Start the API
cd api
npm install
npm start

# Start the frontend
cd ../frontend
npm install
npm run dev

# Open in browser
http://localhost:5171
```
