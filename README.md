# Swaad Smriti: A Digital Archive of Food and Homesickness

A student oral history and photographic archive documenting the intersection of culinary memory, student migration, and regional identity. Created for the Gastronomic Studies course (Humanities and Social Sciences Elective) at the Indian Institute of Information Technology Dharwad (IIIT Dharwad).

***

## Project Details

* **Institution:** Indian Institute of Information Technology Dharwad (IIIT Dharwad)
* **Course:** Gastronomic Studies (HSS Elective)
* **Academic Year:** 2026

## Student Team Members

**25BDA113** - **Shubham Raj**

**25BDA119** - **Sumeet Kumar**

**25BDA091** - **Rajan Choudhary**

**25BDA014** - **Anuj Raghuwanshi**

**25BCS180** - **Sumer Singh**

**25BCS021** - **Arun Fakirappa Halyal**

***

## Why We Built This Project

Moving to college is usually the first time any of us live away from our families. While campus life brings independence and excitement, one of the hardest adjustments is almost always the food. Canteens and hostel mess halls provide calories, but they cannot give you the comfort, care, and familiarity of a home cooked meal.

We built Swaad Smriti to document this exact feeling. It is a student archive where we interviewed our classmates from different parts of the country, recorded their voices, collected authentic photographs, and recorded their real memories. The project explores how a simple plate of food keeps young adults connected to their roots while living in hostel rooms hundreds of kilometers away from home.

***

## Documented Regional Dishes

The archive documents ten iconic regional dishes, each paired with an oral history interview and personal reflections:

1. **Hyderabadi Biryani** (Telangana, told by Bhukhya Lohitha Rathore): Fragrant dum rice that reminds her of festive family lunches back in Hyderabad.
2. **Mysore Pak** (Karnataka, told by Himanshu Kumawat): Rich ghee sweet first created in the royal palace of Mysuru, shared during family celebrations.
3. **Dharwad Pedha** (Karnataka, told by Divyansh Verma): Roasted brown milk fudge that students proudly pack in boxes to take home after exams.
4. **Dal Baati Churma** (Rajasthan, told by Rajan Choudhary): Baked wheat balls crushed into dal and sweet churma, eaten slowly with family on lazy afternoons.
5. **Pongal** (Tamil Nadu, told by Mohit): Steaming pepper and cumin rice porridge that brings back memories of peaceful Sunday mornings.
6. **Medu Vada** (Tamil Nadu, told by Khushal): Fresh crispy fried breakfast rings that hostel canteens never manage to make properly.
7. **Til ke Laddu** (Uttar Pradesh, told by Sumer Singh): Sesame and warm jaggery balls rolled by hand on sunny terraces during winter festivals.
8. **Tekua** (Bihar, told by Shubham Raj): Sweet jaggery and fennel cookies pressed into wooden molds for Chhath Puja, wiped out in minutes by hostel roommates.
9. **Ragi Mudde** (Karnataka, told by Arun Fakirappa Halyal): Traditional steamed finger millet spheres that gave local farming families steady energy for daily work.
10. **Ghewar** (Rajasthan, told by Dishant Joon): Honeycomb textured sweet soaked in saffron syrup to celebrate the first monsoon rains.

***

## Features and Architecture

* **Archival Scrapbook Theme:** Designed with warm cream paper textures, turmeric tones, and polaroid style recipe cards that straighten on hover.
* **Oral History Audio Player:** Built in audio player for listening to authentic student interview recordings with waveform scrubbers and duration counters.
* **Multi Plate Photo Galleries:** Each dish showcases three to four distinct photographs covering the cooked plate, family cooking rituals, and local markets, with interactive plate switcher pills.
* **Food at Home vs Food in the Hostel:** A side by side comparison highlighting the contrast between family dining and campus mess adaptations.
* **Did You Know Cultural Trivia:** Curated gastronomic facts exploring the scientific, cultural, and historical innovations behind each recipe.
* **Interactive India Cultural Map:** Leaflet map plotting the regional origins of all dishes with direct links to individual stories.
* **Random Taste Memory Explorer:** A discovery button on the home page that takes the user to a surprise dish memory.
* **Live Contribution Page:** A client side submission interface allowing students and visitors to test submitting their own food memories, photos, and voice notes.
* **Complete Word for Word Transcripts:** Full ethnographic transcripts preserving conversational speech and cultural expressions.
* **Academic Ambience Transparency:** Transparent labels and justifications for visual reconstructions of ancestral rural hearths where photographic records were unavailable.

***

## Design Choices and Gastronomic Context

* **Polaroid Cards and Paper Styling:** A typical tech dashboard feels cold and transactional like a food delivery app. We used warm paper tones and tilted polaroid cards to make the site feel like an old family album full of preserved memories.
* **Spoken Oral History Audio Player:** Reading text alone misses the emotional pauses, laughter, and regional accents of students talking about home. We added an audio player because culinary traditions have historically been passed down by word of mouth.
* **Did You Know Cultural Facts:** People naturally love sharing surprising food trivia with their family and friends. In gastronomic studies, we study how food creates social bonding and conversation across groups.
* **Food at Home vs Food in the Hostel:** This side by side comparison captures the sharp reality every university student experiences after moving away, contrasting loving family meals with rushed hostel trays.
* **Word for Word Transcripts:** While summaries give a quick overview, an academic archive must preserve real primary source material so future students and teachers can read the exact words used during interviews.
* **Interactive India Map:** Our campus brings together students from diverse states into one shared academic space. The map visually plots where each recipe originates, showing the physical distance students traveled to reach IIIT Dharwad.
* **Multi Plate Photo Collections:** A single photo cannot capture the full cultural story of a dish. We gave each food item three or four distinct pictures showing the cooking process, family preparation, local markets, and festival plates.
* **Transparent Visual Reconstruction Labels:** Historical family photos from rural village kitchens decades ago are rarely available in digital form. Instead of leaving blank placeholders, we used reconstructed images and clearly labeled them with an academic note.
* **Taste Memory Discovery Button:** In real life, food nostalgia usually hits us unexpectedly through a random smell or sudden craving. The taste memory button recreates that spontaneous spark of remembering a childhood meal.
* **Live Contribution Page:** An archive of food memories should keep growing as new student batches join the campus each year. The contribution page allows anyone to test adding their own hometown dish.

***

## Technology Stack

* **Frontend:** React 19, TypeScript
* **Styling:** Tailwind CSS, Custom Archival Paper Grain Gradients
* **Animations:** Motion (Framer Motion)
* **Icons:** Lucide React
* **Maps:** Leaflet, React Leaflet Integration
* **Build Tool:** Vite

***

## Getting Started

### Prerequisites

* Node.js (version 18 or above)
* npm or bun package manager

### Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/swaad-smriti.git
cd swaad-smriti
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```text
http://localhost:3000
```

5. Build for production:
```bash
npm run build
```

***

## What We Learned from Gastronomic Studies

* **Food Brings Back Sudden Memories:** The smell of hot ghee or tempering spices can instantly take your mind back to a specific morning in your childhood kitchen. Taste is one of the strongest triggers for human memory.
* **Eating Together Builds Friendships:** In hostels, students from different cultures bond by sharing snacks sent from home or pooling money for late night parcels. Sharing food turns strangers into close friends.
* **Preserving Stories Passed by Word of Mouth:** Most home cooking secrets are never written down in books; they are learned by standing in the kitchen with parents and grandparents. Recording these student interviews helps keep those family traditions alive.
* **Food Changes with Geography:** Every recipe in our archive reflects its local geography, from millets that survive dry Karnataka weather to desert rations that last weeks in Rajasthan without spoiling.

***

## License and Credits

* **Course Project:** Gastronomic Studies elective, IIIT Dharwad.
* **Oral Histories:** Documented by IIIT Dharwad students.
* **Visuals:** Archival photographs collected with permission from student family albums and Wikimedia Commons (Creative Commons Attribution). Reconstructions curated for academic historical presentation.
