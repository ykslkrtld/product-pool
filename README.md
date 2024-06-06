# Product Pool

  Product Pool is a robust web application designed to manage and visualize a company's stock information. With an intuitive interface for administrators, this application simplifies stock management through advanced visualization tools, making inventory oversight both efficient and insightful.

## 🌐 Live Demo
  Check out the live demo of the application [here](https://product-pool-yksl.vercel.app/).

## ✨ Features

- **Stock Management**: Streamline the company's stock information handling.
- **CRUD Operations**: Seamlessly add, update, edit, and delete products.
- **Data Visualization**: Gain insights with interactive stock movement graphs.
- **User-Friendly Interface**: Navigate with ease through a thoughtfully designed UI.

## 🚀 Installation

  Get started with Product Pool by following these steps:

```bash
# Clone the repository
git clone https://github.com/ykslkrtld/product-pool.git

# Navigate to the project directory
cd product-pool

# Install dependencies
yarn install

# Launch the application
yarn start

# Access the app at http://localhost:3000
```

## 🔧 Usage

  - **Admin Panel:** Directly manage stock information.
  - **Product Management:** Handle products with full CRUD capabilities.
  - **Graphical Insights:** Utilize graphs for a clear view of stock trends.


## 📁 Project Skeleton

```bash
PRODUCT POOL
│
├── public
│   ├── index.html
│   ├── favicon.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── app
│   │   └── store.jsx
│   ├── assets
│   │   └── Stock.png
│   ├── components
│   │   ├── brand
│   │   │   ├── BrandEditModal.jsx
│   │   │   └── BrandModalComp.jsx
│   │   ├── firm
│   │   │   ├── FirmEditModal.jsx
│   │   │   └── FirmModalComp.jsx
│   │   ├── home
│   │   │   ├── Charts.jsx
│   │   │   └── KPICards.jsx
│   │   ├── product
│   │   │   ├── ProductEditModal.jsx
│   │   │   └── ProductModalComp.jsx
│   │   ├── purchases
│   │   │   ├── PurchaseEditModal.jsx
│   │   │   └── PurchaseModalComp.jsx
│   │   ├── sales
│   │   │   ├── SaleEditModal.jsx
│   │   │   └── SaleModalComp.jsx
│   │   ├── DataFetchMessages.jsx
│   │   ├── MenuListComp.jsx
│   ├── features
│   │   ├── authSlice.jsx
│   │   └── getDataSlice.jsx
│   ├── helper
│   │   └── ToastNotify.js
│   ├── pages
│   │   ├── Brands.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Firms.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   ├── Purchases.jsx
│   │   ├── Register.jsx
│   │   ├── Sales.jsx
│   ├── router
│   │   ├── AppRouter.jsx
│   │   └── PrivateRouter.jsx
│   ├── services
│   │   ├── useApiRequest.js
│   │   ├── useAxios.js
│   │   └── useStockRequest.js
│   └── styles
│       └── globalStyle.js
├── package.json
├── README.md
├── tailwind.config.js
└── yarn.lock
```

## 🛠 Technologies Used

  - **React:** For building dynamic user interfaces.
  - **Redux Toolkit & React Redux:** For state management in a standardized manner.
  - **Axios:** To handle API requests with ease.
  - **React Router DOM:** For seamless navigation within the application.
  - **Material UI:** For a rich set of pre-styled components.
  - **Formik & Yup:** For form handling and validation.
  - **React Toastify:** For elegant toast notifications.
  - **Redux Persist:** To persist state across sessions.
  - **Tailwind CSS:** For rapid and responsive UI development.
  - **MUI X Data Grid & Charts:** For advanced data grids and charting solutions.

## 🛠️ Dev Tools

  - **Redux DevTools:** Inspect actions and state changes for debugging.

## 🤝 Contributions

  I welcome contributions! If you find any bugs, have suggestions, or want to contribute, please open an issue or send a pull request. Your feedback and contributions are greatly appreciated.
