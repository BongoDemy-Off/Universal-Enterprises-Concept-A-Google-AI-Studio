# Universal Enterprises - Frontend Prototype Client Review Notes

This document outlines the current state of the frontend prototype to assist with the client review process.

## 1. Prototype Scope (What is built)
This is a **Frontend UI/UX Prototype** focusing on the B2C (Business to Consumer) purchase journey. The application is built using React, Vite, and Tailwind CSS.
- **Routing & Navigation**: Fully implemented client-side navigation.
- **Mobile Responsive**: Custom mobile drawer, responsive filtering grids, and touch-friendly product interactions.
- **Theming & Typography**: Implemented "Brand Blue" and "Brand Red" styling with consistent scale.
- **"Shop By Bike" Engine**: A simulated fitment wizard (`Brand -> Model -> Year -> CC -> Variant`) which narrows down parts compatible with the selected vehicle.
- **English / Bangla Translation Toggle**: Basic context-driven toggle implemented to demonstrate localization framework (Note: Bangla copy needs human translation review).

## 2. Simulated Features (Prototype Only)
The following features are designed to *look and act* real for UX feedback, but rely on hardcoded local state rather than a production backend:
- **Authentication**: "My Account", "Profile", and "Sign Out" links are visually present but no actual Firebase Auth or session management is implemented.
- **Checkout Processing**: Placing an order bypasses a real gateway (e.g., SSLCommerz) and pushes directly to a local confirmation page. MFS (bKash, Nagad) options are visual placeholders.
- **Product & Inventory Data**: All products, reviews, categories, specs, prices, and stock statuses are loaded from a static `prototype-data.json` mock adapter.
- **Location & Shipping Rules**: Delivery districts and logic are mocked in the static data file.
- **Search & Filtering**: Searching relies on a local array filter (`src/data/repository.ts`) rather than a backend database index (e.g. Typesense/Algolia).

## 3. Feedback Needed from Client (TBD Items)
Please collect feedback on the following structural and business logic questions:
1. **Email Requirement**: In the checkout flow, is email *mandatory* for B2C orders, or can guests checkout strictly with a Phone Number? (Currently set as optional).
2. **Translation Review**: The current Bangla text is machine-translated/placeholder. A human review is required before full production rollout.
3. **Fitment Data Structure**: The "Shop By Bike" selector uses 5 parameters (Brand -> Model -> Year -> CC -> Variant). Is this exactly how your internal database maps compatibility, or can it be simplified?
4. **Checkout Rules**: Are there specific district/upazila restrictions for cash-on-delivery (COD)?

## 4. Next Steps (Production Phase)
Once the UI flow is approved, the following backend architecture must be connected:
- **Database (Cloud SQL / PostgreSQL)**: To manage thousands of SKUs and relational fitment data.
- **Authentication (Firebase Auth)**: To handle B2B wholesale accounts, customer histories, and saved addresses.
- **Payment Gateway Integration**: Secure processing for mobile financial services (MFS) and card payments.
- **Admin Dashboard**: A secure portal for staff to manage stock, orders, and CMS banners.
