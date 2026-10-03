# Awrecking Goals

A client-only React SPA for a fictitious athletic footwear store. Built with React, Vite, Bootstrap 5, custom CSS, and Lucide icons. No server, database, real authentication, checkout, or payments.

## Run locally

Install Node.js, open this folder in VS Code, and run:

```sh
npm ci
npm run dev
```

Open the URL shown in the terminal. To prepare a static deployment:

```sh
npm run build
```

Upload the **contents of dist/** to your static host. The ZIP includes a ready-built dist folder. Hash routes keep product and account links working on static hosts without server routing rules. Node.js is used only for development/build tooling; the published app runs entirely in the browser.

## Pages and implementation

- Home, Shop, Product Detail, Account, Create Account and Cart views.
- 25 fully populated product records in src/data/products.json. Five sport categories share a consistent footwear schema. The catalog has 12 women's styles, 12 men's styles and one unisex style, with 25 distinct AI-generated shoe designs. Each has a single pictured colorway. Women and Men filters each include the shared unisex style. Prices, specifications, ratings and stock are fictitious demonstration data.
- ProductList accepts products through props and uses .map() to create ProductCard components.
- App owns cart useState. Exact product/size/color selections merge; different variants remain separate. Cart and CartItem use props, render through .map(), calculate line totals/subtotal and derive navbar count. Invalid quantity and missing option selections are blocked.
- Password, confirmation, username and email validation; optional full U.S. address and phone validation. Login validates presence only. Form success clearly indicates that no real account is created. Credentials are never stored.
- Bootstrap responsive grid, navbar breakpoint and form classes; custom mobile menu and responsive CSS. Red and dark gold form the store palette. Women's and men's collections have equal homepage prominence and correct labeled US size systems.
- Cart is intentionally session-only React state and resets on refresh.

## Submission work still required

1. Read and understand the code, personalize it, and disclose AI assistance.
2. Create your GitHub repository; upload source files, package.json, package-lock.json, public/, src/, docs/ and Vite configuration. Exclude node_modules/, .env files and .openai/.
3. Deploy the contents of dist/ to **Google Cloud**, as specified by your course. Set index.html as the main page for the course's static hosting configuration. Use the hosting instructions provided by your instructor and verify the URL is accessible to your grader.
4. Copy docs/wiki/*.md to GitHub Wiki pages. Replace placeholders with your actual URLs.
5. Run the requested HTML/CSS validators and attach their real results; no validator results have been fabricated.
6. Add real desktop/mobile screenshots and record the blank, partial, invalid and valid account form demo video. Upload it and paste its URL.
7. Submit your Google Cloud URL and GitHub repository URL to Canvas.

See docs/wiki/ for editable documentation drafts. This work is AI-assisted and must be disclosed in your submission.

The Cleats category contains the five soccer-cleat designs and has a direct header link, homepage sport link, shop filter and footer link. Legacy Soccer category links resolve to Cleats.

The custom connected AG logo follows the owner's sketch and appears in the header, footer, browser icon and all 25 shoe images. Branding prompts and AI disclosure are included in docs/.
