# Awrecking Goals

Awrecking Goals is a responsive online athletic footwear store built as a React single-page application. The website includes 25 original shoe designs for women, men, and unisex customers across running, basketball, cleats, tennis, and training categories.

This project was created for CS 351 Project 1. It is a fictitious student storefront and does not process real orders, payments, or user accounts.

## Live Website

[View Awrecking Goals on Google Cloud](https://storage.googleapis.com/dist_bucket_bruh/index.html)

## Features

- Responsive homepage with women’s and men’s shopping links
- 25 original athletic footwear products
- Women’s, men’s, and unisex products
- Running, basketball, cleats, tennis, and training categories
- Product filtering by audience and category
- Individual product-detail pages
- Required size and color selection
- Shopping-cart item count
- Quantity increase and decrease controls
- Product-removal controls
- Cart line totals and subtotal
- Account sign-in form with client-side validation
- Create-account form with client-side validation
- Optional address and telephone fields with validation
- Responsive Bootstrap navigation
- Mobile-friendly product grids and forms
- Custom red and dark-gold visual design
- Custom connected AG logo
- Original AI-generated product images

## Technologies Used

- React 19
- Vite
- JavaScript
- JSON
- HTML5
- CSS3
- Bootstrap 5
- Lucide React
- Google Cloud Storage
- GitHub

## Application Pages

### Home

The homepage introduces the Awrecking Goals brand and provides links to women’s products, men’s products, featured shoes, and each footwear category.

### Shop

The Shop page displays the complete catalog of 25 products. Products can be filtered by audience and category.

### Product Details

Each product has an individual detail page containing its image, name, category, price, description, rating, sizes, colors, features, specifications, and care information.

### Account

The Account page includes a demonstration sign-in form. The form checks that the required fields are completed before allowing submission.

### Create Account

The Create Account page validates the required username, password, email address, and password-confirmation fields. Optional address and telephone information is also validated when entered.

### Cart

The Cart page displays each selected product, size, color, quantity, price, line total, and subtotal. Customers can increase quantities, decrease quantities, or remove products.

## Project Architecture

Awrecking Goals is a client-side React single-page application. It does not use a backend or database.

Product information is stored in `src/data/products.json`. React components receive product information through props, and the product catalog is rendered with the JavaScript `.map()` method.

React’s `useState` hook manages the shopping cart, product selections, form fields, quantities, and navigation state. Cart information is temporary and resets when the page is refreshed.

The website uses hash-based navigation so its pages work when hosted as a static website on Google Cloud Storage.

## Reusable Components

- `Navbar` provides the primary website navigation.
- `Footer` provides secondary navigation and project information.
- `ProductList` receives products through props and maps them into a product grid.
- `ProductCard` displays the summary information for each product.
- Product-detail components display complete information for a selected product.
- Cart components display product variants, quantities, and prices.
- Form components collect and validate account information.

## Project Structure

```text
Awrecking-Goals/
├── dist/                       Production website files
├── docs/                       Wiki drafts and AI prompt records
├── public/
│   └── images/                 Logo, hero image, and product images
├── src/
│   ├── components/
│   │   └── Products.jsx        ProductList and ProductCard components
│   ├── data/
│   │   └── products.json       Product catalog
│   ├── utils/
│   │   └── validation.js       Form-validation functions
│   ├── App.jsx                 Pages, navigation, and cart state
│   ├── main.jsx                React entry point
│   └── styles.css              Custom styling and responsive rules
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Running the Project Locally

Node.js and npm must be installed.

1. Download or clone the repository.
2. Open the `Awrecking-Goals` folder in Visual Studio Code.
3. Open a terminal in the project folder.
4. Install the dependencies:

```bash
npm install
```

5. Start the Vite development server:

```bash
npm run dev
```

6. Open the localhost URL displayed in the terminal.

On Windows PowerShell, use these commands if PowerShell blocks the standard npm script:

```powershell
npm.cmd install
npm.cmd run dev
```

## Creating a Production Build

Run:

```bash
npm run build
```

Vite creates the production files inside the `dist` folder. The contents of `dist` are uploaded to the Google Cloud Storage bucket.

The Vite configuration uses a relative base path so the JavaScript and CSS assets load correctly from the Cloud Storage bucket.

## Responsive Design

Bootstrap 5 provides responsive containers, grids, navigation, forms, and buttons. Custom CSS media queries adjust the page layout for smaller screens. Product grids change their number of columns based on screen width, and the navigation menu changes to a mobile layout below the large-screen breakpoint.

The website was reviewed on desktop and mobile screen sizes.

## Validation

HTML and CSS validation evidence is documented in the project’s GitHub Wiki. The Wiki includes screenshots of the validation results, explanations of errors encountered, and descriptions of corrections made during development.

## Project Limitations

- The project does not use a backend or database.
- Account information is not saved.
- The sign-in page is for demonstration purposes only.
- Shopping-cart information resets when the page is refreshed.
- The store does not accept payments or place real orders.
- Each product currently displays one pictured colorway.
- Product images represent fictitious student-designed footwear.

## AI Assistance Disclosure

Generative AI assistance was used during the development of this project.

AI was used to help create the initial website template and React project structure. It assisted with organizing reusable components, implementing the product catalog, creating the shopping-cart interface, developing the account forms, and refining the responsive red and dark-gold design. The generated code was reviewed, tested, edited, and adapted for the requirements of this project.

AI was also used during debugging. This included helping diagnose npm setup errors, identifying incorrect project-folder paths, correcting Google Cloud deployment paths, configuring Vite to use relative asset paths, and troubleshooting the white-screen deployment problem.

The original concept for the connected AG logo was based on my own sketch. AI image-generation tools were used to refine the logo into a finished digital asset and to create the fictitious product, hero, and footwear images. AI image editing was also used to place the AG branding on the shoe designs. The image-generation and branding prompts used for the project are documented in the `docs` folder.

AI assistance was used as a development and design tool. The final project was reviewed and organized to meet the assignment requirements.
