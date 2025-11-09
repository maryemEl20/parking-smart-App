# Smart Parking Web Application - Design Guidelines

## Design Approach
**Selected Framework**: Material Design with Moroccan-inspired enhancements for payment flow
**Justification**: Modern, interactive parking management requires clear visual hierarchy, real-time status indicators, and intuitive data visualization. Material Design's elevation system and color semantics align perfectly with parking spot status visualization.

## Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern, excellent for dashboards
- **Headings**: 
  - H1: 2.5rem (40px), font-weight 700 - Hero tagline, page titles
  - H2: 2rem (32px), font-weight 600 - Section headers, dashboard widgets
  - H3: 1.5rem (24px), font-weight 600 - Card titles, spot IDs
- **Body Text**: 1rem (16px), font-weight 400 - Forms, descriptions
- **Small Text**: 0.875rem (14px) - Metadata, timestamps, helper text

## Layout & Spacing
**Tailwind Spacing Primitives**: 2, 4, 8, 12, 16, 20
- Component padding: p-8
- Section spacing: py-20 (desktop), py-12 (mobile)
- Card gaps: gap-8
- Form field spacing: space-y-4
- Button padding: px-8 py-4

## Color System (Parking Status Indicators)
**Spot Status Colors** (Critical for UX):
- 🟢 Available: bg-green-500, hover:bg-green-600
- 🔵 Reserved: bg-blue-500, hover:bg-blue-600  
- 🔴 Occupied: bg-red-500, cursor-not-allowed

**Admin Dashboard Charts**: Green (revenue), Blue (occupancy), Amber (pending)

## Component Library

### Navigation & Layout
- **Landing Header**: Fixed top navigation with logo left, "Sign Admin" & "Sign Client" buttons right, dark mode toggle
- **Flash Messages**: Top-center toast notifications with icons, auto-dismiss after 4 seconds
- **Footer**: 4-column grid (About, Quick Links, Contact Info, Social Media), full-width bg with subtle contrast

### Landing Page
- **Hero Section**: Full-width (100vh) background image of parking lot with dark overlay (opacity-50)
  - Centered tagline "Bienvenue à SmartPark – Votre parking intelligent" in large white text
  - Dual CTA buttons below tagline with blurred backgrounds (backdrop-blur-md)
- **Contact Section**: Cards layout with icons for email, phone, address (2-column on desktop, stack on mobile)

### Parking Map (Core Interactive Component)
- **Layout**: Centered grid container, max-w-4xl
- **Spot Cards**: Large clickable cards (min-h-32) in grid-cols-2 lg:grid-cols-3
  - Each card displays: Spot number (large), status icon, color-coded border (4px), hover elevation
  - Available spots: cursor-pointer with scale transform on hover
  - Occupied/Reserved: Display tooltip with client name, ETA, estimated end time
- **Status Legend**: Fixed bottom-right with 3 color indicators and labels

### Forms
- **Client Sign-In**: Centered card (max-w-md), large input fields with floating labels
- **Reservation Screen**: Two-column layout
  - Left: Time picker (start/end) with calendar icon
  - Right: Live pricing card showing hourly rate, duration, total with emphasized total price
- **Admin Login**: Centered card with SmartPark logo above, email/password fields, remember me checkbox

### Payment Page (Moroccan-Style Split Layout)
- **Layout**: Two-column split (60% form, 40% image on desktop, stack on mobile)
- **Left Panel**: Payment form with:
  - Payment method selector (pill buttons with icons for each method)
  - Client info fields (email, name)
  - Card details with inline icons (card, calendar, lock for CVC)
  - Stripe test card instructions in subtle info box
  - Large "Payer" button at bottom
- **Right Panel**: Full-height decorative image (luxury car or premium credit card), subtle gradient overlay
- **Visual Treatment**: Soft shadows, rounded corners (12px), smooth transitions

### Code Display Screen
- **Layout**: Centered card (max-w-lg)
- **Code Display**: Monospace font, massive size (4rem), letter-spacing, dashed border, centered
- **Countdown Timer**: Circular progress indicator or linear bar showing time until reservation starts
- **Instructions**: Icon-based steps (1. Go to entrance, 2. Enter code, 3. Barrier opens)

### Admin Dashboard
- **Layout**: Sidebar navigation (250px) + main content area
- **Spot Overview Grid**: 5 cards in single row showing real-time status with large icons
- **Stats Cards**: 4-column grid showing metrics with icons (total spots, occupancy rate, revenue today, active reservations)
- **Charts Section**: 2-column layout
  - Left: Daily revenue bar chart
  - Right: Occupancy pie chart
- **Client Table**: Modern table with alternating row colors, sortable columns (Name, Spot, ETA, Payment Status, Access Code)

### Reservation History
- **Layout**: Card-based timeline, max-w-4xl centered
- **Reservation Cards**: Shadow-md, rounded-lg with:
  - Header: Spot ID badge (colored by status) + date/time
  - Body: 3-column grid (Duration, Cost, Access Code with eye icon to reveal)
  - Footer: ETA countdown or "Completed" badge
- **Empty State**: Illustration with "No reservations yet" message

## Icons
**Library**: Heroicons (via CDN)
- Parking spots: map-pin, check-circle, clock
- Payment: credit-card, banknotes, device-mobile
- Admin: chart-bar, users, cog
- Navigation: home, user-circle, arrow-right

## Dark Mode Implementation
- Toggle switch in top-right of all pages
- Dark backgrounds: bg-gray-900 (main), bg-gray-800 (cards)
- Light backgrounds: bg-gray-50 (main), bg-white (cards)
- Maintain parking status colors in both modes (ensure sufficient contrast)
- Adjust text: text-gray-900 → text-gray-100
- Chart colors remain vibrant in dark mode

## Images
1. **Landing Hero**: Wide-angle parking lot image (modern facility, well-lit, professional) - full viewport width
2. **Payment Page Decorative**: Luxury car side view or premium credit card close-up - right panel, cover object-fit
3. **Empty State Illustrations**: Simple SVG illustrations for "no reservations" states

## Responsive Breakpoints
- Mobile (base): Single column, stacked forms, collapsible sidebar
- Tablet (md: 768px): 2-column grids, side-by-side forms
- Desktop (lg: 1024px): Full multi-column layouts, fixed sidebar

## Animations
**Use Sparingly**:
- Spot status transitions: 300ms ease-in-out color change
- Flash message entry/exit: slide-down animation
- Card hover: subtle scale (1.02) and shadow increase
- Countdown timer: smooth progress bar animation
- No distracting scroll animations or complex transitions

## Accessibility
- All spot cards keyboard navigable with focus indicators
- Color-coded spots include text labels (not color alone)
- Form inputs with visible labels and error states
- ARIA labels for icon-only buttons
- Sufficient color contrast in both light and dark modes