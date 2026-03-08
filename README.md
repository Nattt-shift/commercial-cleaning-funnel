# SparkPro Commercial Cleaning Funnel Demo

A professional, conversion-focused lead magnet funnel for **SparkPro Commercial Cleaning Services**.

## Project Structure

```text
commercial-cleaning-funnel/
├── index.html                     # Main landing page and lead form
├── thank-you.html                 # Post-submission confirmation page
├── style.css                      # Funnel styling (responsive, modern UI)
├── main.js                        # Two-step form logic, validation, local storage simulation, timer
├── data/
│   └── leads.json                 # Demo JSON target for lead storage format
└── assets/
    └── images/
        └── office-placeholder.svg # Placeholder hero image (replace with real photo)
```

## Features Included

- Hero section with conversion copy, trust badges, and clear CTA
- Two-step lead capture form:
  - Step 1: Name + Email
  - Step 2: Phone + Company
- Required field validation + email format validation
- Benefits section with icons
- How-it-works 3-step process
- 3 professional testimonials
- Final CTA with urgency messaging and countdown timer
- Thank-you page with return-home button
- Responsive layout for desktop/mobile
- Hover effects for buttons and CTAs
- In-code comments for easy editing

## How to Run Locally

1. Open `index.html` directly in your browser (double-click or right-click → Open with browser).
2. Fill out and submit the form.
3. You will be redirected to `thank-you.html`.

No build tools or install steps are required.

## Lead Storage Demo Note

Because browsers cannot directly write to local files when opening HTML without a backend server, `main.js` stores submitted leads in `localStorage` under the key:

- `sparkproLeads`

The structure matches JSON array format used in `data/leads.json`, making it easy to copy/export for demo purposes.

If you later add a backend API, you can replace the localStorage section in `main.js` with a POST request that writes to `data/leads.json` server-side.

## Easy Customization

- Update text content directly in `index.html` and `thank-you.html`
- Change brand colors in `style.css` `:root` variables
- Replace `assets/images/office-placeholder.svg` with a real commercial office image
- Adjust countdown duration in `main.js` (currently 10 days)
