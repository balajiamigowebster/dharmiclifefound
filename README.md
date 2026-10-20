# Dharmic Life Foundation Website

A full-stack, pixel-perfect replication of the **[Dharmic Life Foundation](https://amigowebster.in/dharmiclifefoundation/)** official website built with:
- **Frontend**: React.js (Vite, Tailwind CSS, Lucide Icons)
- **Backend**: Node.js (Express REST API)
- **Database**: MariaDB (with connection pooling, schema migrations, and dual-mode resilient fallback)

---

## 🌟 Key Features

### 1. Top Header Bar
- Official email: `dharmiclifestyle@gmail.com`
- Location indicator: `Pondicherry, India`
- Direct social links: Facebook, Twitter, Instagram, Pinterest

### 2. Unified Header & Navigation
- Symmetrical layout with high-resolution center logo
- Multi-tier dropdown menus:
  - **About Us**: Trust, Trustees
  - **Activities**: Annadhanam, Unclaimed Soules, Spreading the Dharmic way of life, Educational Support, Women Empowerment, Caring for Homeless People, Other Activities
  - **Awards**: Srowtha Rathana Award, Dharma Shri Award
- Right navigation: Upcoming Events, Gallery, Testimonials, Contact
- Responsive mobile drawer menu with seamless tab switching

### 3. Hero Carousel Slider
- Dynamic transitions with controls and indicator dots
- Slide 1: *"Humanity is the Mother of Dharma"* & *"Upholding Dharma through Selfless Service"*
- Slide 2: *"Humanity is the Mother of Dharma"* with volunteer and mission exploration

### 4. About Us Section
- Framed visual showcase with *"100% Volunteer Driven"* badge
- Subtitle: *"About us"* | Title: *"Upholding Dharma through Selfless Service"*
- Comprehensive mission statement emphasizing Vedic values of Karuna (compassion) and Seva (selfless service)
- Core highlights list and interactive action buttons

### 5. Core Activities Section (7 Initiatives)
- Subtitle: *"Our Core Activities"* | Title: *"Serving Humanity, Preserving Dharma"*
- 7 rich cards with image zoom, custom icon badges, descriptions, and interactive "Read More" modal:
  1. **Annadhanam (When Hunger ends, Dharma begins)**
  2. **Honoring the Unclaimed Souls with Dignified Cremation**
  3. **Spreading the Dharmic Way of Life (Traditional life Education for the Public)**
  4. **Educational Support (Investing in Education and Transforming lives)**
  5. **Women Empowerment (Every Women Deserves Opportunity, Respect and Dignity)**
  6. **Compassion Begins with Caring for Homeless People**
  7. **Other Additional Activies**

### 6. Donation CTA Banner
- *"Be the Change for One Child Life"*
- Quick donation amount selectors (₹500, ₹1,000, ₹2,500)
- Opens full-featured interactive Donation Modal

### 7. Volunteer & Impact Metrics
- Subtitle: *"Get involved now"* | Title: *"Only Possible because of Friends Like You"*
- Impact metrics progress bars:
  - Save Water & Health Initiatives: 90%
  - Education & Child Support: 80%
  - Fund Raising & Food Relief: 60%
- Direct "Become a Volunteer" modal registration

### 8. Events & Awards Section
- *"Dharmic Impact Across the Map"*
- Event cards with date badges, locations, and seva details:
  - Honoring the Unclaimed Souls (08 Sep, 2023)
  - Annadhanam (11 Sep, 2023)
  - Bridging the Digital Divide: Empowering Students Through Technology (11 Aug, 2023)
  - Empowering Motherhood and Honoring Womanhood (11 Sep, 2023)
  - Dressing with Dignity: Providing Warmth to the Homeless (09 May, 2023)

### 9. Visual Gallery Grid
- 6 high-resolution impact photos
- Lightbox preview on click with full-screen zoom

### 10. Testimonials Carousel
- Quotations, star ratings, reviewer roles, and avatar images

### 11. Latest News & Articles
- Blog post cards with post date, comments count, and excerpt

### 12. Partners / Brands Ribbon
- Partner logos 1 through 6

### 13. Dedicated Trust Page (`/trust`)
- Accessible directly via the **About Us &rarr; Trust** navigation dropdown or `/trust` URL
- Full origin story of the Foundation from *Academy of Dharmic Life* (October 2020) to formal Trust registration on *15 October 2021* (*Vijayadashami*)
- Founding Trustees (*Mr. Balaji*, *Mr. V. Anbalagan @ Rajagopal*, *Mrs. N. Gomathi*)
- Core Philosophy cards (*The Essence of Dharma*, *Promoting Healthy Living*)
- 6 Social Service Initiatives (Food Provision, Dignified Cremation, Educational Support, Women's Empowerment, Homeless Care, Humanitarian Aid)

### 14. Dedicated Contact Page (`/contact`)
- Accessible directly via the **Contact** navigation menu or `/contact` URL
- 3 Contact Info Cards:
  - **Mailing Address**: Pondicherry, India (and 901 N Pitt Str., Suite 170 Alexandria, USA)
  - **Quick Contact**: +91 98765 43210 / (406) 555-0120
  - **Support Email**: dharmiclifestyle@gmail.com / info@cleanheart.com
- Full interactive contact form (*"Leave us a message"*) connected to Node.js backend
- Google Map interactive embed for Pondicherry

### 15. Dedicated Testimonials Page (`/testimonials`)
- Accessible directly via the **Testimonials** navigation menu or `/testimonials` URL
- **Voices of Our Community** widget with dual-tone gradient header (`#8B2613` to `#B84318`), highlight card, and category breakdown:
  - *Student Reflections*: Course feedback on Udaliyal & Manoviyal Dharmam
  - *Beneficiary Stories*: Humanitarian impact stories
- **Featured Testimonials Showcase** with interactive slider controls (Christine Eve, Kevin Smith, Jessica Brown, David Anderson, Susan Neill)
- **Review Grid** with star ratings and patron reflections
- **Bottom Call-to-Action**: *"Your story starts from here"* with interactive donation & contact triggers

### 16. Dedicated Gallery Page (`/gallery`)
- Accessible directly via the **Gallery** navigation menu or `/gallery` URL
- **Highlights of Our Journey** widget with dual-tone header (`#8B2613` to `#B84318`), highlight card, and 4 core dimensions:
  - *Service Initiatives*, *Cultural & Sacred Events*, *Award Ceremonies*, *Programmes & Workshops*
- Category filter tabs:
  - *All Photos*, *Aarthi Relief Fund*, *Clothes Distribution*, *Annadhanam*, *Dharma Shri Award*, *Diwali Sweets & Clothes*
- Responsive photo grid with hover zoom & category badges
- Full-screen interactive **Lightbox** with previous/next controls and photo index counter
- Support CTA banner linking to donation and contact channels

### 17. Dedicated Upcoming Events Page (`/event-page`)
- Accessible directly via the **Upcoming Events** navigation menu or `/event-page` URL
- **Clean design with all donation references removed** per specification
- **Purpose of Our Programmes** widget with dual-tone header (`#8B2613` to `#B84318`), highlight card, and 4 pillars:
  - *Promote Dharma*, *Preserve Traditions*, *Recognize Excellence*, *Inspire Youth*
- **Our Sacred Mission & Community Services** section:
  - High-resolution visual showcase with *"Selfless Service"* badge
  - 4 key feature highlights: Annadanam, Unclaimed Souls, Spreading the Dharmic Way of Life, Educational Support
  - Direct "Contact Us" routing
- **Our Events Around the World** listing:
  - 5 comprehensive event cards with dates, locations, categories, and summary descriptions
  - Interactive "Read More" modal dialog with in-depth event details and direct contact action
- **Bottom Call-to-Action**: *"Your story starts from here"* & *"Make it Happen"* linking directly to Contact

### 18. Dedicated Activities Hub (`/activities`) & All 7 Core Activity Subpages
- **Activities Hub (`/activities`)**:
  - Accessible directly via the **Activities** navigation menu or `/activities` URL
  - Subtitle: *"Our Core Activities"* | Heading: *"Serving Humanity, Preserving Dharma"*
  - 7 interactive cards leading directly to each dedicated subpage
- **7 Dedicated Activity Subpages with Authentic Verbatim Narratives & Photo Galleries**:
  1. **Annadhanam (`/annadhanam`)**:
     - Dedicated specialized page matching original layout ([`AnnadhanamPage.jsx`](file:///Users/balajin/billing%20software/client/src/components/AnnadhanamPage.jsx))
     - Authentic header banner with quote: *"Annam Parabrahma Swaroopam"* & *"Food is a form of God"*
     - Special focus card for daily nutritional service at Rajiv Gandhi Govt Hospital for pregnant mothers
     - **Complete 81 Documented Seva Drives** (from June 2022 to September 2026)
     - **Authentic HTML5 Video Players** for each drive running original `.mp4` video footage
     - Photo galleries with interactive Lightbox zoom
     - Fast Year filtering controls (All, 2026, 2025, 2024, 2023, 2022) with dynamic pagination and load-more support
  2. **Honoring Unclaimed Souls (`/unclaimed-souls`)**:
     - Dedicated specialized page matching original layout ([`UnclaimedSoulsPage.jsx`](file:///Users/balajin/billing%20software/client/src/components/UnclaimedSoulsPage.jsx))
     - Authentic header banner with scripture quote: *"Anatha Pretha Samskarah Ashwamedha Phalam Labhet"*
     - Special cards for Puducherry Police Department partnership & the long-term vision of *Dharmic Life Garden*
     - **Complete 67 Documented Cremation Cases** across Pondicherry (2022 to 2026)
     - **Authentic HTML5 Video Players** for drives featuring video footage (`cremation-v1.mp4`, `CREMATION.mp4`, `police-v.mp4`)
     - Official police handover certificates & ceremonial photo records with interactive Lightbox zoom
     - Fast Year filtering controls (All, 2026, 2025, 2024, 2023, 2022) with smooth load-more support
  3. **Spreading the Dharmic Way of Life (`/spreading-the-dharmic-way-of-life`)**:
     - Dedicated specialized page matching original layout ([`SpreadingDharmicWayPage.jsx`](file:///Users/balajin/billing%20software/client/src/components/SpreadingDharmicWayPage.jsx))
     - Authentic header banner with quote: *“If we want to change something in the world, the first and foremost change must begin within ourselves.”*
     - Two foundational educational pillars:
       - *🌱 1. Udaliyal Dharmam* (The Law of Nature in the Body: circadian rhythms, natural diet, Dinacharya)
       - *🧠 2. Manoviyal Dharmam* (The Law of Nature in the Mind: emotional equanimity, moral duty, meditation)
     - Impact & Mission card with motto: *To create a disease-free world by promoting a healthy and harmonious lifestyle based on the Laws of Nature* (300+ public participants benefited)
     - **Complete 13 Documented Training Workshops & Classes** (offline and online from 2020 through 2023)
     - **Authentic HTML5 Video Players** streaming original class footage (`Caring-for-homeless-1.mp4`, `WhatsApp-Video-2026-08-08-at-3.51.59-PM.mp4`)
     - Class photo collages & slide records with interactive Lightbox zoom
  4. **Educational Support (`/education-support`)**:
     - Dedicated specialized page matching original layout ([`EducationSupportPage.jsx`](file:///Users/balajin/billing%20software/client/src/components/EducationSupportPage.jsx))
     - Authentic header banner with Mahakavi Subramania Bharatiyar poem in Tamil:
       > *"அன்ன சத்திரம் ஆயிரம் வைத்தல்... ஆங்கோர் ஏழைக்கு எழுத்தறிவித்தல்"*
     - Special cards for *Educational Support in Puducherry* & *Our Growing Vision* (supporting government institutions & underprivileged students)
     - **Complete Documented Sponsorship Drives** for Dr. Ambedkar Government Law College, Puducherry:
       - Drive 1: Computer donation (19.07.2023) with **Authentic HTML5 Video Player** (`news-46.mp4`) & photo gallery
       - Drive 2: Criminal Law books donation worth ₹12,000/- (11.09.2024) with **Authentic HTML5 Video Player** (`news-4.mp4`) & photo gallery
       - Drive 3: Two wall clocks donation (03.04.2025) with ceremonial photo records
     - Photo galleries with interactive Lightbox zoom
  5. **Women Empowerment (`/women-empowerment`)**:
     - Dedicated specialized page matching original layout ([`WomenEmpowermentPage.jsx`](file:///Users/balajin/billing%20software/client/src/components/WomenEmpowermentPage.jsx))
     - Authentic header banner with Dr. A.P.J. Abdul Kalam quote:
       > *"Empowering women is a prerequisite for creating a good nation, when women are empowered, society with stability is assured."*
     - Motherhood & Dignity cards (*Nurturing New Life & Dignity*, *Strengthening Mothers & Children*)
     - **Complete Documented International Women's Day Field Drives**:
       - **Drive 1**: World Women's Day celebration at Rajiv Gandhi Government Women and Children's Hospital (08.03.2023) with **Authentic HTML5 Video Player** (`Women-Empowerment-1-Function.mp4`) & photo gallery
       - **Drive 2**: Welcoming 8 newborn baby girls born on Women's Day with ₹1,000 cash blessing each, with **Authentic HTML5 Video Player** (`Women-Empowerment-2-new-born-baby.mp4`) & photo gallery
       - **Drive 3**: High-protein nutritional supplement kits (dry fruits & nuts) distributed to 125 pregnant women, with **Authentic HTML5 Video Player** (`Women-Empowerment-3-pregnant-ladies.mp4`) & photo gallery
       - **Drive 4**: News Articles & Press coverage (*Dinamalar*, *Raghava Vision News*) with **Authentic HTML5 Video Player** (`ragava-vision-news.mp4`) & press clipping image
     - Photo galleries with interactive Lightbox zoom
  6. **Caring for Homeless People (`/caring-for-homeless-people`)**:
     - Dedicated specialized page matching original layout ([`CaringForHomelessPage.jsx`](file:///Users/balajin/billing%20software/client/src/components/CaringForHomelessPage.jsx))
     - Authentic header banner with `.homeless-widget`:
       > *"Supporting Homeless and Vulnerable People"*
       > *“No person should ever be ignored because they are poor or homeless.”*
     - Rebuilding Lives with Hope (`🤝 Rebuilding Lives with Hope`, `🌟 Our Commitment & Vision`)
     - **All 4 Documented Field Seva Drives**:
       - **Drive 1**: Blankets donated during peak winter season in Puducherry (21.12.2022) with **Authentic HTML5 Video Player** (`Caring-for-homeless-1.mp4`) & 11 photos
       - **Drive 2**: New clothes distributed on Pongal festival in Puducherry (07.01.2023) with **Authentic HTML5 Video Player** (`Caring-for-homeless-2.mp4`) & 3 photos
       - **Drive 3**: Sweets & savouries distributed on Diwali in Chennai (10.11.2023) with **Authentic HTML5 Video Player** (`Copy-of-Caring-for-homeless-3.mp4`) & 10 photos
       - **Drive 4**: Festive clothes distributed on Diwali in Chennai (19.10.2025) with **Authentic HTML5 Video Player** (`Caring-for-homeless-4.mp4`) & 7 photos
     - Multi-image full-screen Lightbox modal with next/previous image navigation controls
  7. **Other Additional Activities (`/other-additional-activities`)**:
     - Dedicated specialized page matching original layout ([`OtherActivitiesPage.jsx`](file:///Users/balajin/billing%20software/client/src/components/OtherActivitiesPage.jsx))
     - Authentic header banner with `.humanitarian-widget`:
       > *"Service Without Boundaries"*
       > *“Humanity begins when we see every person as one of our own.”*
     - Emergency & collaboration cards (`🌍 Support During Emergencies & Disasters`, `🤝 Collaborative Impact`)
     - Tagline footer: *"Humanity is our common bond • Service is our responsibility"*
     - **All Documented Relief & Emergency Seva Drives**:
       - **Drive 1 (1. Supporting Victim Family)**: Paid last respects and provided emotional, moral, and ₹10,000 financial support to 9-year-old Arthi's parents in Puducherry (March 2024), featuring **Authentic HTML5 Video Player** (`Other-Activities-Arthi.mp4`) & 3 ceremony photos
       - **Drive 2 (2. Supporting Kerala Wayanad Landslide)**: Contributed ₹50,000/- to Seva Bharathi for the cremation of unclaimed souls following the catastrophic landslides in Wayanad, Kerala (August 2024), with high-resolution photo documentation (`wayanad-768x576.jpg`, `other-1-768x524.png`)
     - Multi-image full-screen Lightbox modal with next/previous image navigation controls

### 19. Trustees & Leadership (`/trustees`)
- Dedicated specialized page matching original layout ([`TrusteesPage.jsx`](file:///Users/balajin/billing%20software/client/src/components/TrusteesPage.jsx))
- Authentic header banner with `.trustees-widget`:
  > *"Trustees & Leadership"*
  > *“Trustees are the backbone of Dharmic Life Foundation. Without their dedication, upholding the principles of Dharma would not be possible.”*
- Principles of Trusteeship (`🏛️ Principles of Trusteeship`, `🌱 The Pathway to Trusteeship`: Learn → Serve → Lead)
- Order of Seniority of Trustees:
  1. **A. Balaji**: Founder & Managing Trustee, Advocate, 15+ years of research, 15+ awards, pandemic response community guidance
  2. **Mr. V. Anbalagan**: Founding and Life Trustee, 40 years practicing Advocate in Puducherry, moral guide and advisor
  3. **Mrs. N. Gomathi**: Founding and Life Trustee, retired Government Middle School teacher, inspiration for the Trust's social welfare initiatives (in sacred memory)
  4. **Mrs. Srividhya Shankar**: Former Trustee (Tenure: 3 June 2023 – 29 May 2025), Dharma Shri Award recipient (2021), student turned trustee
  5. **Mrs. Radha Ramanathan**: Trustee (Tenure: 6 May 2025 – Present), Dharma Shri Award recipient (2024), student turned trustee
- Full biographical dossiers, quote banners, metric tiles, and timeline highlights matching live site design

### 20. 4-Column Footer
- Official logo & Trust purpose
- Get In Touch! with contact details
- Quick Navigation links
- Newsletter subscription form
- Copyright bar: *"© 2026 Copyrights by Dharmic Life Foundation . All Rights Reserved | Designed by amigowebster"*
- WhatsApp, Facebook, Instagram quick links

---

## 🗄️ Database & Backend Architecture

### MariaDB Schema (`server/schema.sql`)
The backend is structured to interface directly with MariaDB via `mysql2/promise`. The database schema includes:
- `site_settings`: General site configurations and contacts
- `activities`: 7 core initiatives with full articles and media
- `events`: Community campaigns and dates
- `testimonials`: Supporter quotes and ratings
- `blog_posts`: Articles and news
- `team_members`: Trustees and leadership
- `donations`: Recorded donation transactions with causes and donor info
- `volunteers`: Registered volunteer submissions
- `contact_messages`: Submitted queries
- `subscribers`: Email newsletter subscriber list

### Dual-Mode Database Resilience
- **If MariaDB is running**: Connects to MariaDB, auto-creates the `dharmic_life_db` database, verifies/creates tables, and seeds the exact initial data.
- **If MariaDB is not yet started**: The backend gracefully serves all endpoints from the built-in pre-seeded dataset (`server/seedData.js`), ensuring the entire website operates seamlessly without crashing!

---

## 🚀 Quick Start Guide

### Option 1: One-Click Startup Script (macOS)
Double click `start.command` or run:
```bash
./start.sh
```

### Option 2: Running via NPM
```bash
# 1. Install dependencies
npm run install:all

# 2. Start both Node.js Backend & React Frontend concurrently
npm run dev
```

- **React Frontend**: [http://localhost:5173](http://localhost:5173)
- **Node.js Express Backend API**: [http://localhost:5001](http://localhost:5001)

---

## ⚙️ MariaDB Configuration

To configure your MariaDB connection:
1. Ensure your MariaDB / MySQL service is running:
   ```bash
   brew services start mariadb
   # or via docker:
   # docker run --name mariadb -e MARIADB_ROOT_PASSWORD="" -p 3306:3306 -d mariadb:latest
   ```

2. Edit `server/.env`:
   ```env
   PORT=5001
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=dharmic_life_db
   ```

3. Initialize schema and seed data manually if desired:
   ```bash
   node server/init-mariadb.js
   ```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service and database status |
| `GET` | `/api/site-info` | Site metadata and contact info |
| `GET` | `/api/activities` | List all 7 core activities |
| `GET` | `/api/activities/:slug` | Get specific activity details |
| `GET` | `/api/events` | List upcoming and past events |
| `GET` | `/api/testimonials` | List patron testimonials |
| `GET` | `/api/blog` | List news and articles |
| `GET` | `/api/team` | List trustees and leadership |
| `GET` | `/api/gallery` | Gallery images |
| `GET` | `/api/stats` | Impact metrics |
| `POST` | `/api/donations` | Record a donation transaction |
| `POST` | `/api/volunteer` | Submit a volunteer application |
| `POST` | `/api/contact` | Submit a contact query |
| `POST` | `/api/newsletter` | Subscribe to newsletter |
