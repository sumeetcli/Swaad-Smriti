/**
 * Swaad Smriti — Digital Archive Data Store
 * ============================================================================
 * - Authentic Oral Histories: Documented by IIIT Dharwad students
 * - Audio Consent Notes: Accurately reflected for all recordings
 * - AI Visual Reconstructions: Clearly tagged with academic rationale for ancient rural house ambience
 * - Client-Side Contribution Support: Real-time demonstration without requiring logins
 * ============================================================================
 */

export interface DishPhoto {
  url: string;
  alt: string;
  caption: string;
  sourceCredit: string;
  sourceUrl?: string;
  isAI?: boolean; // True if visually reconstructed using AI
  aiRationale?: string; // Academic justification for historical / rural house ambience
}

export interface DishStory {
  id: string; // Unique URL slug
  name: string; // Dish name
  state: string; // Origin state
  tagline: string; // One line description
  whyItMatters: string; // Curatorial background
  storyteller: string; // Story told by (Student name or title)
  storytellerNote?: string;
  storySummary: string; // Summary of oral history recording
  transcript: string; // Full transcript text or archival narrative record
  didYouKnow: string; // "Did You Know?" gastronomic fact
  atHome: string; // Memory of food at home
  inHostel: string; // Reality of food in hostel / campus life
  audioUrl: string | null; // MP3 path or URL (null if consent not given)
  audioDuration?: string;
  photos: DishPhoto[]; // Gallery of high-quality food photography
  mapCoordinates: [number, number];
  isCustomSubmission?: boolean;
}

export const DISHES: DishStory[] = [
  {
    id: "hyderabadi-biryani",
    name: "Hyderabadi Biryani",
    state: "Telangana",
    tagline: "Fragrant basmati rice slow cooked with spiced meat in sealed deghs of charcoal and saffron.",
    whyItMatters: "Hyderabadi Biryani originated in the kitchens of the Nizams, blending Mughlai and Telugu culinary techniques through the slow 'kacchi dum' method. It remains a definitive cultural marker of celebratory shared feasting across the Deccan plateau.",
    storyteller: "Bhukhya Lohitha Rathore",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Lohitha reflects on how chicken biryani represents the ultimate comfort food and culinary pride of Hyderabad. Even after a heavy meal, the aroma of spiced basmati rice and slow-cooked meat evokes an appetite. Moving away to university highlighted how restaurant biryanis across the country attempt to emulate the Deccan flavor, yet none can recreate the delicate saffron-perfumed layers prepared lovingly by family at home.",
    transcript: `Chicken biryani is actually one of those foods where even if you’re not hungry, just hearing the name can make you feel hungry! And when we talk about chicken biryani, Hyderabad is one of the first places that comes to our mind.

Hyderabadi biryani is really famous, and I feel like its taste is quite different from other biryanis. In fact, if you ask someone what food Hyderabad is famous for, most people would probably say Hyderabadi biryani. I think it’s also one of the reasons why so many people visiting Hyderabad want to try it.

What makes biryani so special is that it’s not just a dish; it’s an experience. The moment you open the lid of the vessel, that incredible aroma of spices, saffron, and slow-cooked chicken fills the whole room. It’s the kind of smell that instantly brings everyone to the dining table. The rice is soft, long-grained, and perfectly seasoned, and when combined with tender, juicy chicken, every single bite feels comforting.

Biryani has also been cooked in so many different ways across India. Every region has its own style, but Hyderabadi biryani has its own charm. It’s famous for its rich flavours, aromatic rice, and traditional cooking methods. Hyderabad has a long history of different culinary influences, and biryani gradually became one of the city’s best-known dishes.

Today, when people think of Hyderabad, biryani is one of the first foods that comes to mind. Many visitors make it a point to try it when they visit. So yeah, I think that’s why chicken biryani is loved by so many people. It’s not just about how famous it is or how many varieties we have. It’s about that amazing taste that makes you crave it again and again.

And personally, no matter how many restaurants I try, my mom’s biryani will always be my favourite. I feel like everyone has that one biryani they can never forget. And the funny thing is, even after eating a full plate, if someone asks me whether I want some more, saying no is actually very difficult! That’s how much I love biryani.`,
    didYouKnow: "In the authentic 'kacchi' (raw) dum biryani technique perfected in the royal Deccan kitchens, raw marinated meat is layered directly with 70% parboiled long-grain basmati rice and sealed with dough in a heavy handi. Natural tenderizers like raw papaya pulp break down the meat while trapped aromatic steam (dum) gently cooks the grains from the bottom up, ensuring no two layers have identical spice concentration.",
    atHome: "Prepared fresh on festive Sundays in heavy copper vessels, with aromatic layers of saffron soaked rice and slow cooked whole spices.",
    inHostel: "Replaced with weekend parcels ordered from dhabas near the highway, shared over paper plates on hostel corridor floors.",
    audioUrl: "/audio/hyderabadi-biryani.mp3",
    audioDuration: "02:45",
    mapCoordinates: [17.3850, 78.4867],
    photos: [
      {
        url: "/images/dishes/hyderabadi-biryani/cover.jpg",
        alt: "Steaming aromatic Hyderabadi Dum Biryani in traditional brass vessel with golden saffron rice and fried onions",
        caption: "Aromatic basmati rice slow cooked on dum with saffron, mint, and fried onions.",
        sourceCredit: "AI Visual Recreation · Historical Presentation",
        isAI: true,
        aiRationale: "Recreates the ambience of ancient royal Deccan kitchens and traditional heavy brassware where early photographic documentation was unavailable."
      },
      {
        url: "/images/dishes/hyderabadi-biryani/biryani.jpeg",
        alt: "Freshly cooked pot of spiced Hyderabadi Biryani garnished with fresh herbs and mint",
        caption: "Traditional spiced dum rice with slow cooked succulent meat and whole spices.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/hyderabadi-biryani/family-preparing-biryani.jpeg",
        alt: "Indian family gathered in home kitchen preparing festive biryani degh",
        caption: "Family culinary ritual: marinating meat and sealing the degh for weekend celebrations.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/hyderabadi-biryani/hyderabadi-dum-handi.jpg",
        alt: "Authentic Hyderabadi Dum Biryani served with golden fried onions, salan, and raita",
        caption: "Fragrant saffron rice layered over spiced marinade with crispy golden birista.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Garima Singh (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:%22Hyderabadi_Dum_Biryani%22.jpg"
      }
    ]
  },
  {
    id: "mysore-pak",
    name: "Mysore Pak",
    state: "Karnataka",
    tagline: "A melt in the mouth confection of roasted gram flour, generous pure ghee, and caramelized sugar syrup.",
    whyItMatters: "First created in 1935 by royal chef Kakasura Madappa at the Amba Vilas Palace in Mysuru, this sweet became a hallmark of South Indian festive hospitality. Its delicate crumb and rich ghee aroma require precise sugar syrup consistency and high heat aeration.",
    storyteller: "Himanshu Kumawat",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Himanshu shares how Mysore Pak transcends ordinary confections through its rich fragrance of pure desi ghee and roasted gram flour. From the porous crumb of traditional palace recipes to the modern melt-in-mouth soft versions, Mysore Pak embodies celebration, familial affection, and the hospitality extended to guests across Karnataka.",
    transcript: `When we talk about Indian sweets, there are so many options to choose from, but one sweet that holds a special place in my heart is Mysore Pak.

Mysore Pak is a traditional sweet that comes from Mysore, Karnataka. It is mainly made using three simple ingredients: gram flour, ghee, and sugar. But even though the ingredients are simple, making a really good Mysore Pak takes patience and the right technique. The ingredients are cooked together until they form that beautiful golden sweet we all know and love.

For me, Mysore Pak is more than just a sweet; it is connected to memories of festivals, family gatherings, and celebrations. Whenever there is a special occasion at home, sweets are always shared, and Mysore Pak is often one of the first choices. The rich aroma of ghee and roasted gram flour immediately creates a festive feeling, and even a small piece can make an ordinary day feel like a celebration.

Mysore Pak is not something people usually eat with every meal, but it is an important part of celebrations and special occasions. In many South Indian families, sweets are shared during festivals, weddings, religious occasions, and family functions. Mysore Pak is also commonly given to guests as a gesture of happiness and hospitality.

One beautiful thing about Mysore Pak is that there are different versions of it. The traditional Mysore Pak is often firm and slightly crumbly, with a rich flavour of ghee. The softer version, which many people call soft Mysore Pak, has a melt-in-your-mouth texture. Different sweet shops have their own methods, so the taste and texture can vary from one place to another.

According to me, the real beauty of Mysore Pak lies in its texture and aroma. A good Mysore Pak should have a rich ghee fragrance, the right amount of sweetness, and a smooth, buttery taste. Some versions are slightly crisp and crumbly, while others almost melt as soon as you take a bite. Personally, I love that rich flavour of ghee because it makes the sweet feel so traditional and satisfying.

When it comes to famous places, Mysore in Karnataka is the place most closely associated with this sweet. The city is known for its traditional sweet shops, and Mysore Pak is one of its most famous specialities. You can also find delicious versions in Bengaluru, Chennai, and many other South Indian cities. But honestly, every shop has its own taste, and sometimes the homemade version feels the most special.

What I personally love about Mysore Pak is its simplicity. It doesn't need fancy decorations or complicated ingredients. It is a sweet that reminds us that sometimes the simplest things can bring the greatest happiness.

And finally, I believe that traditional foods like Mysore Pak deserve to be preserved because they carry stories from one generation to another. When we share our favourite foods and the memories connected to them, we also preserve a part of our culture. Because a sweet like Mysore Pak is not just something we eat; it is a little piece of tradition that we can taste, share, and pass on to future generations.`,
    didYouKnow: "Mysore Pak was invented by royal chef Kakasura Madappa in 1935 at Mysuru's Amba Vilas Palace for Maharaja Krishnaraja Wadiyar IV. When asked what this unnamed melt-in-mouth confection was called, Madappa combined 'Mysuru' with 'Paka'—the classical Kannada/Sanskrit term for a boiling sugar syrup concoction.",
    atHome: "Cut into warm porous squares fresh off the kadai on festive mornings, warm enough to leave melted ghee on the fingers.",
    inHostel: "Carefully rationed from an airtight tin brought after term breaks, offered only to close wingmates until the last crumb.",
    audioUrl: "/audio/mysore-pak.mp3",
    audioDuration: "02:35",
    mapCoordinates: [15.4589, 75.0078],
    photos: [
      {
        url: "/images/dishes/mysore-pak/cover.jpg",
        alt: "Porous golden honeycomb cubes of authentic Mysore Pak arranged on a vintage brass plate",
        caption: "Golden honeycomb cubes with pure desi ghee and roasted gram flour.",
        sourceCredit: "AI Visual Recreation · Historical Presentation",
        isAI: true,
        aiRationale: "Reconstructs the authentic palace-era presentation on hand-hammered antique brassware, depicting the rich porous texture created under royal patronage in 1935."
      },
      {
        url: "/images/dishes/mysore-pak/mysore-pak-market.jpeg",
        alt: "Golden blocks of Mysore Pak stacked at traditional sweet market in Karnataka",
        caption: "Freshly cut blocks of Mysore Pak stacked at a heritage confectionery shop in Mysuru.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/mysore-pak/sweet-store.jpeg",
        alt: "Traditional sweet store counter displaying fresh batches of regional sweets and savouries",
        caption: "Historic sweet vendor display counter showcasing festive South Indian ghee confections.",
        sourceCredit: "Source: Team Archive"
      }
    ]
  },
  {
    id: "dharwad-pedha",
    name: "Dharwad Pedha",
    state: "Karnataka",
    tagline: "Caramelized brown milk fudge rolled in caster sugar, native to the twin cities of Dharwad and Hubballi.",
    whyItMatters: "Created by the Thakur family in the early 19th century using Dharwadi buffalo milk, the pedha undergoes painstaking slow browning to achieve its distinct dark hue and deep roasted dairy flavor. It has held a Geographical Indication (GI) tag since 2008 and is the signature pride of the region.",
    storyteller: "Divyansh Verma",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Divyansh reflects on how Dharwad Peda represents the local heart of northern Karnataka. The dark caramel hue, roasted dairy fragrance, and sugary crust make it far richer than ordinary milk sweets. For students living in Dharwad, packing boxes of pedha from historic Line Bazaar shops becomes the customary ritual of taking a piece of college life home to family.",
    transcript: `Whenever we talk about traditional Indian sweets, one sweet that comes to my mind is Dharwad Peda. It is a famous sweet from Dharwad, Karnataka, known for its rich milk flavour, brown colour, and slightly grainy texture. It is mainly made using milk and sugar, with the milk slowly cooked to develop its special roasted, caramel-like taste.

For me, Dharwad Peda is more than just a sweet. It reminds me of home, family, and the happiness of sharing something delicious with the people we love. I feel that food becomes even more meaningful when we move away from home for college. Hostel life brings new experiences, new friends, and independence, but there are also days when we miss our family and the little comforts of home.

During those moments, even a small piece of Dharwad Peda can bring back memories. Sometimes, when we visit home and return to college, our families give us sweets to take along. And when we open that box in our hostel room, it feels like we have brought a little piece of home with us. We might share it with our friends, talk about our hometowns, and remember the people who prepared or bought it for us. In that moment, a simple sweet becomes connected to love, care, and belonging.

Dharwad Peda is not usually an everyday food, but it is popular during festivals, weddings, family gatherings, and special occasions. In many Indian families, sweets are also given to guests as a gesture of happiness and hospitality. Dharwad Peda has become an important part of northern Karnataka's food identity, and people often buy boxes of it to take home as gifts when travelling through Dharwad.

One interesting thing about Dharwad Peda is that different sweet shops may have slightly different versions. Some are darker with a stronger roasted-milk flavour, while others are softer or sweeter. However, the traditional character of the sweet remains the same.

According to me, a good Dharwad Peda should have a rich aroma of cooked milk, balanced sweetness, and that slightly grainy texture that slowly melts in the mouth. The roasted flavour is what makes it different from ordinary milk sweets. Personally, I love how a small piece can satisfy a sweet craving while also bringing back familiar memories.

Dharwad itself is the best place to experience this sweet, and it is also available in nearby Hubballi and other cities across Karnataka. Although we can buy it from many shops, sometimes the most special part is receiving a box from someone who has travelled home and remembered to bring us something we love.

I believe this feeling is something many college students understand. When we live away from home, we start appreciating small things that we may have taken for granted before, including our favourite sweets and the memories attached to them. Finally, I believe traditional foods like Dharwad Peda should be preserved because they connect us with our hometowns, families, and cultural roots. Because sometimes, a small piece of sweet is more than just a treat. It carries the love of our family, the memories of home, and a reminder that no matter how far we travel, our roots are always with us.`,
    didYouKnow: "Dharwad Pedha was born when Ram Ratan Singh Thakur, a confectioner from Unnao in Uttar Pradesh, migrated to Dharwad following a plague epidemic in the late 19th century. He utilized the uniquely thick milk of local Dharwadi buffaloes, continuously roasting the khoa for hours over low heat until the lactose underwent intense Maillard caramelization, creating its signature earthy brown shade.",
    atHome: "Bought fresh in small paper boxes from Line Bazaar, still warm and rolled in fine sugar crystals.",
    inHostel: "Handed out as a campus pride souvenir to outstation batchmates returning to their hometowns after examinations.",
    audioUrl: "/audio/dharwad-pedha.mp3",
    audioDuration: "02:18",
    mapCoordinates: [15.4589, 75.0078],
    photos: [
      {
        url: "/images/dishes/dharwad-pedha/cover.jpg",
        alt: "Caramelized dark chocolate-brown Dharwad Pedhas dusted in fine caster sugar crystals in copper dish",
        caption: "Caramelized brown milk fudge rolled in sugar crystals, Line Bazaar style.",
        sourceCredit: "AI Visual Recreation · 19th Century Confectionery Ambience",
        isAI: true,
        aiRationale: "Depicts the historic 19th-century Line Bazaar presentation with vintage parchment paper and hand-hammered copper ware, evoking the heritage era when the Thakur family first crafted the sweet."
      },
      {
        url: "/images/dishes/dharwad-pedha/dharwad-peda-market.jpg",
        alt: "Deep roasted dark brown Dharwad Peda arranged on sweet market platter",
        caption: "Richly browned buffalo milk pedhas with grainy caramelized crumb.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Hari Prasad Nadig (CC BY-SA 2.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Dharwad_peda.jpg"
      },
      {
        url: "/images/dishes/dharwad-pedha/dharwad-peda-team.jpeg",
        alt: "Freshly boxed authentic Dharwad Pedha from Line Bazaar",
        caption: "Authentic boxed souvenir of the twin cities of Dharwad and Hubballi.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/dharwad-pedha/sweet-shop-counter.jpeg",
        alt: "Historic Line Bazaar confectionery shop display in Dharwad",
        caption: "Local mithai shop counter where students buy pedha boxes to carry home.",
        sourceCredit: "Source: Team Archive"
      }
    ]
  },
  {
    id: "dal-baati-churma",
    name: "Dal Baati Churma",
    state: "Rajasthan",
    tagline: "Hard wheat dough balls baked over open embers, crushed into fiery panchmel dal and sweetened ghee churma.",
    whyItMatters: "A centerpiece of Rajasthani desert gastronomy, baati evolved as high shelf life sustenance for warrior clans marching across arid terrains without perishable supplies. The tripartite combination balances protein dense lentils, ghee steeped wheat, and sweet coarse crumble.",
    storyteller: "Rajan Choudhary",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Rajan explains how Dal Baati Churma is not just a dish, but an unhurried communal ceremony. The contrast between spiced panchmel dal, crunchy roasted baatis broken open by hand, and rich sweetened churma represents the warmth and generous hospitality of desert Rajasthan. Living in a student hostel, missing home is often felt most acutely when looking at a tray of watery mess dal.",
    transcript: `When I think about traditional Indian food, one dish that immediately comes to my mind is Dal Baati Churma. It is one of the most famous dishes of Rajasthan, and for me, it represents the warmth, simplicity, and richness of Rajasthani culture.

Dal Baati Churma is actually a combination of three different things. Dal is a mixture of lentils cooked with spices, baati is a round, firm wheat dough ball that is traditionally baked or roasted, and churma is a sweet dish made from crushed baati mixed with ghee and sugar or jaggery. When you put all three together, you get a wonderful combination of spicy, savoury, and sweet flavours.

What makes this dish so special is the experience of eating it together. In Rajasthan, preparing Dal Baati Churma is often a community or family celebration. You don’t eat it in a hurry. You take a baati in your hand, crush it with your fingers into a plate, pour hot dal all over it, drizzle extra melted ghee on top, and mix it with sweet churma on the side. 

Back home, whenever family members gather or during monsoon festivals, this is what everyone demands. The kitchen gets smoky from roasting baatis over cow dung embers or charcoal, and the smell of sizzling ghee fills every corner of the house.

One interesting thing about this dish is that its preparation changes from family to family and region to region. Some people prepare baati in a traditional clay tandoor or over an open fire, while others bake it in modern ovens. Some versions have plain baati, while others include spiced sattu or masala fillings. The dal can be simple moong or the rich panchmel dal made with five lentils. But in every home, the core spirit remains the same: pure ghee, generous hearts, and unhurried togetherness.`,
    didYouKnow: "Baati was invented during the 8th-century Rajput reign of Rawal Jait Singh. Before heading into battle across the Thar desert, soldiers would bury dough balls under mounds of sand heated by the scorching desert sun. Upon their evening return, the sand-baked baatis were dug up, dusted off, and drenched in ghee to soften—providing long-lasting, nutritious rations without spoiling.",
    atHome: "Cracked open with the palm, dipped in a bowl of hot clarified butter, and paired with garlic chutney on rainy monsoon afternoons.",
    inHostel: "Craved whenever the hostel mess serves watery yellow dal with undercooked rotis.",
    audioUrl: "/audio/dal-baati-churma.mp3",
    audioDuration: "02:22",
    mapCoordinates: [26.9124, 75.7873],
    photos: [
      {
        url: "/images/dishes/dal-baati-churma/cover.jpg",
        alt: "Authentic Rajasthani bronze thali with cracked golden baatis soaked in desi ghee, panchmel dal, and sweet churma",
        caption: "Cracked golden baati drenched in pure ghee, spiced dal, and sweet churma.",
        sourceCredit: "AI Visual Recreation · Desert Heritage Ambience",
        isAI: true,
        aiRationale: "Recreates the ambience of a traditional Rajasthani courtyard feast with an unadulterated antique bronze thali and earthen chulha bake texture."
      },
      {
        url: "/images/dishes/dal-baati-churma/dal-baati-churma-thali.jpg",
        alt: "Rajasthani thali featuring traditional baati and dal",
        caption: "The tripartite harmony of desert Rajasthan gastronomy.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Harshmander Rastogi (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Dal_Baati_Churma.jpg"
      },
      {
        url: "/images/dishes/dal-baati-churma/daal-baati-churma-family.jpeg",
        alt: "Indian family seated together sharing festive Dal Baati Churma lunch",
        caption: "Family dining together: baatis broken by hand and dipped into sizzling clarified butter.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/dal-baati-churma/rajasthani-churma-platter.jpg",
        alt: "Platter of golden crisp baked baatis served with fiery panchmel dal and sweet churma",
        caption: "Hearty desert feast with ember roasted dough balls and rich lentil gravy.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Garima Singh (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:%22Delectable_Dal_Baati_Churma%22.jpg"
      }
    ]
  },
  {
    id: "pongal",
    name: "Pongal",
    state: "Tamil Nadu",
    tagline: "Comforting porridge of short grain rice and split yellow moong dal tempered with crushed black pepper, ginger, and curry leaves.",
    whyItMatters: "Pongal is both a celebrated harvest festival and an everyday staple of Tamil temple kitchens and breakfast eateries. Seasoned with ghee fried whole cashews and cumin, it provides balanced nourishment and deep digestive warmth.",
    storyteller: "Mohit",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Mohit describes how Pongal embodies harvest thanksgiving and family warmth. Prepared in both savory (Ven Pongal) and sweet (Sakkarai Pongal) varieties, its soothing texture of soft rice and yellow moong dal tempered with crushed black pepper, cumin seeds, ginger, and crunchy cashews is the quintessential taste of home. For students living far from the south, a simple bowl of warm pongal brings an instant reminder of temple mornings and family care.",
    transcript: `Pongal – A Taste of Home and Togetherness

When I think about traditional South Indian food, one dish that immediately comes to my mind is Pongal. It is a simple, comforting dish made mainly with rice and moong dal. There are two popular varieties: Ven Pongal, which is savoury and made with ingredients like black pepper, cumin, and ghee, and Sakkarai Pongal, which is sweet and prepared with jaggery, cardamom, and ghee.

What makes Pongal truly special is that it is not just a daily breakfast dish; it is also deeply connected to the harvest festival of the same name. Celebrated in Tamil Nadu and across South India, the festival of Pongal marks thanksgiving to nature, the sun, and the farm animals that help in agriculture. On that day, freshly harvested rice is boiled in an earthen pot until it overflows, accompanied by cheers of 'Pongalo Pongal!' to symbolize abundance and prosperity.

In everyday life, Ven Pongal is the ultimate comfort meal. Early on weekend mornings, walking into a traditional mess or temple, the aroma of ghee-roasted cashews and freshly cracked black peppercorns tells you breakfast is ready. Served steaming hot on a fresh green banana leaf with spicy sambar and chilled coconut chutney, each spoonful simply melts away any morning stress.

When you move to a hostel hundreds of kilometers away from home, you realize how much love went into those simple morning breakfasts. In college, the hostel mess attempts to serve pongal, but it is often dry, lacks the fragrance of curry leaves, and misses the generous ladle of ghee. That is when you truly miss home—because food is not just about filling your stomach. Sometimes, a simple bowl of Pongal brings back the warmth of family and reminds us that, no matter how far we go, a part of home always stays with us.`,
    didYouKnow: "Ven Pongal is celebrated not only as festive prasad but also as an ancient Ayurvedic restorative meal. The specific proportion of 2:1 rice to moong dal provides complete essential amino acids, while the tempering of whole black peppercorns (milagu) and ginger acts as a digestive stimulant (deepana) designed to balance Kapha dosha during chilly winter mornings.",
    atHome: "Served steaming on a banana leaf alongside spicy brinjal gosthu and thick coconut chutney early on Sunday mornings.",
    inHostel: "Endured as dry, under seasoned yellow grains in the campus mess breakfast counter, lacking the tempering of curry leaves.",
    audioUrl: "/audio/pongal.mp3",
    audioDuration: "02:25",
    mapCoordinates: [13.0827, 80.2707],
    photos: [
      {
        url: "/images/dishes/pongal/cover.jpg",
        alt: "Steaming hot Ven Pongal in traditional brass bowl on banana leaf with whole roasted cashews, cracked pepper, and ghee",
        caption: "Steaming Ven Pongal tempered with golden cashews, black pepper, and curry leaves.",
        sourceCredit: "AI Visual Recreation · Harvest Morning Ambience",
        isAI: true,
        aiRationale: "Evokes the sacred temple kitchen and rural Tamil courtyard ambiance during the Thai Pongal harvest celebration, featuring freshly cut banana leaf and heirloom brass vessels."
      },
      {
        url: "/images/dishes/pongal/ven-pongal-pot.jpg",
        alt: "Traditional brass pot of South Indian Ven Pongal",
        caption: "Comforting harvest porridge of short grain rice and moong dal.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Sivasankari (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ven_Pongal.jpg"
      },
      {
        url: "/images/dishes/pongal/pongal-plate.jpeg",
        alt: "Temple style Ven Pongal served with fresh coconut chutney on green banana leaf",
        caption: "Simple, nourishing Sunday morning comfort: soft rice, peppery ghee, and chilled chutney.",
        sourceCredit: "Source: Team Archive"
      }
    ]
  },
  {
    id: "medu-vada",
    name: "Medu Vada",
    state: "Tamil Nadu",
    tagline: "Crisp golden doughnut shaped fritters of fluffy black gram batter with a crackling shell and airy spiced crumb.",
    whyItMatters: "Medu vada showcases the complex aerating qualities of soaked and stone ground urad dal, creating a light interior trapped inside a crisp fried ring. Mentioned in ancient Sangam literature, it remains an irreplaceable breakfast pairing across the Coromandel coast.",
    storyteller: "Khushal",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Khushal shares how the irresistible crunch of fresh Medu Vada dipped into thick coconut chutney and piping hot sambar is the gold standard of morning happiness. The balance between a crackling exterior and an airy, herb-spiced interior requires skillful batter aeration that hostel canteens rarely replicate, leaving students with nostalgic cravings for home breakfasts.",
    transcript: `Medu Vada – A Taste of Home Away from Home

When we talk about South Indian food, one dish that immediately comes to my mind is Medu Vada. It is a traditional snack made mainly from urad dal, or black gram. The dal is soaked, ground into a thick fluffy batter, mixed with ingredients like minced ginger, green chillies, curry leaves, and whole black peppercorns, and then deep-fried until golden and crispy. It is usually served piping hot with coconut chutney and tangy vegetable sambar.

The word 'medu' literally translates to 'soft' in Kannada and Tamil, referring to the fluffy interior hidden inside that crackling brown crust. Making the perfect medu vada is practically an art form. The batter must be ground without adding too much water, and then whisked vigorously with your hand to trap air bubbles. If the batter is too thin, it absorbs oil and goes limp; if too thick, the center remains dense and raw.

And shaping them is pure muscle memory: dampening your fingers, scooping a ball of batter, piercing a neat hole in the center with your thumb, and sliding it into shimmering hot oil in one fluid motion. That doughnut shape ensures heat reaches both inside and outside simultaneously, creating an unbeatable crispness.

In the hostel, you miss the sheer freshness of it. In campus snack joints, vadas are often fried in advance, sitting under glass counters until they turn cold and rubbery. But back home, the first bite is scorching hot, loud with crunch, and immediately followed by the warmth of freshly brewed filter coffee. Because when we live away from home, food becomes that little piece of home we carry in our memories.`,
    didYouKnow: "The doughnut hole in Medu Vada is a brilliant functional culinary innovation rather than an aesthetic flourish. Urad dal batter is dense; without the central aperture, the outer edges would burn to a dark crisp before the thick center could cook through. The center hole increases total surface area, ensuring fast, uniform heat conduction through the batter.",
    atHome: "Straight from the hot oil kadai onto the plate, so crisp that the first crunch echoes across the breakfast table.",
    inHostel: "Cold, slightly rubbery vadas from the campus snack corner eaten in five minutes between practical lab sessions.",
    audioUrl: "/audio/medu-vada.mp3",
    audioDuration: "02:18",
    mapCoordinates: [13.0827, 80.2707],
    photos: [
      {
        url: "/images/dishes/medu-vada/cover.jpg",
        alt: "Three golden-brown crispy Medu Vadas on banana leaf with fresh coconut chutney and steaming vegetable sambar",
        caption: "Golden crisp on the outside, airy and spiced inside with coconut chutney.",
        sourceCredit: "AI Visual Recreation · Ancestral Breakfast Ambience",
        isAI: true,
        aiRationale: "Recreates the atmosphere of a traditional South Indian ancestral home with fresh banana leaf plating, seasoned iron cookware, and morning window illumination."
      },
      {
        url: "/images/dishes/medu-vada/medu-vada-crisp.jpg",
        alt: "Close up of crisp South Indian Medu Vada",
        caption: "Traditional South Indian breakfast fritters made with soaked black gram.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Thamizhpparithi Maari (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Aesthetic_Medu_Vadai.jpg"
      },
      {
        url: "/images/dishes/medu-vada/medu-vada-chutney-sambar.jpeg",
        alt: "Piping hot Medu Vadas served with fresh coconut chutney and spicy sambar bowl",
        caption: "Freshly fried crackling vadas served alongside homemade tempering and chutney.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/medu-vada/south-indian-tiffin-vada.jpg",
        alt: "Classic South Indian breakfast platter with Medu Vada, idli, and chutneys",
        caption: "Quintessential southern tiffin: crisp black gram vada with coconut and tomato chutneys.",
        sourceCredit: "Source: Wikimedia Commons · Photo by M.K. (CC BY-SA 3.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Idli_and_Medu_Vada.JPG"
      }
    ]
  },
  {
    id: "til-ke-laddu",
    name: "Til ke Laddu",
    state: "Uttar Pradesh",
    tagline: "Winter spheres of nutty roasted white and black sesame seeds bound together with warm melted dark jaggery.",
    whyItMatters: "A winter staple prepared during Makar Sankranti across Uttar Pradesh, sesame and jaggery are valued for their warming Ayurvedic properties and high calcium density. Rolling them requires quick hand dexterity while the jaggery syrup is still scorching hot.",
    storyteller: "Sumer Singh",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Sumer reflects on how Til ke Laddu brings back the warmth of family sitting together on sunny terraces during chilly winter mornings. Made by binding nutty roasted sesame seeds with caramelized sugarcane jaggery, these laddus carry memories of shared laughter, kite flying during Makar Sankranti, and care parcels brought to hostel rooms that warm the spirit during late-night exams.",
    transcript: `When we talk about traditional Indian sweets, we often think of kaju katli, gulab jamun, or laddus made for festivals. But today, I want to talk about a simple sweet that carries a lot of warmth, tradition, and childhood memories: Til Ke Laddu.

Til Ke Laddu is a traditional Indian sweet made mainly from sesame seeds, also known as til, and jaggery. The sesame seeds are roasted until they release their lovely nutty aroma, then mixed with melted jaggery and shaped into small round balls while the mixture is still warm. Some families also add peanuts, crushed coconut, or cardamom to give them a slightly different flavour.

What makes Til Ke Laddu truly special is its deep connection to the festival of Makar Sankranti. Celebrated in January, Makar Sankranti marks the transition of the sun and the arrival of longer, warmer days. Across Uttar Pradesh, Bihar, and many northern states, sesame and jaggery are eaten together as symbols of goodwill, harmony, and vitality. There is an old saying: 'Til-gul ghya, god god bola'—meaning eat sesame and jaggery, and speak sweetly.

For me, the memories of making these laddus are unforgettable. During winter mornings, my mother and grandmother would sit out in the winter sunshine on the open terrace with a massive kadhai. The hardest part was rolling them: the jaggery mixture had to be shaped while scorching hot, otherwise it would harden into brittle candy. You had to dip your palms quickly in water or ghee, scoop the hot sesame mass, and roll it into firm spheres between your hands before it cooled.

In college, keeping a small plastic jar of Til ke Laddu in the hostel room is like holding a piece of home sunshine. During late-night assignment submissions when the Karnataka night air gets chilly, eating a laddu gives both energy and comfort. Because sometimes, the smallest sweet carries the biggest message: stay connected, share happiness, and always make room for traditions in our lives.`,
    didYouKnow: "Sesame (til) is one of the oldest domesticated oilseeds in the Indian subcontinent, praised in the classical treatises Charaka Samhita and Sushruta Samhita for its 'ushna' (thermogenic) and 'vata'-pacifying properties. Consuming til with mineral-rich jaggery during Makar Sankranti provides bioavailable plant calcium, magnesium, and essential fatty acids to nourish the body against dry winter winds.",
    atHome: "Rolled in big batches with grandparents sitting on the sunlit terrace on chilly January mornings.",
    inHostel: "A small jar stored hidden behind laptop bags, popped as a quick sugary energy boost during 2 AM coding sessions.",
    audioUrl: "/audio/til-ke-laddu.mp3",
    audioDuration: "02:40",
    mapCoordinates: [26.8467, 80.9462],
    photos: [
      {
        url: "/images/dishes/til-ke-laddu/cover.jpg",
        alt: "Stack of glossy golden roasted white and black sesame seed laddus in rustic terracotta bowl",
        caption: "Roasted white and dark sesame seeds bound with rich sugarcane jaggery.",
        sourceCredit: "AI Visual Recreation · Rural Winter Ambience",
        isAI: true,
        aiRationale: "Recreates the rustic setting of an ancestral Awadhi village terrace with sunlit terracotta bowls and earthen pots, evoking the Makar Sankranti morning atmosphere."
      },
      {
        url: "/images/dishes/til-ke-laddu/til-ke-laddu-team.jpeg",
        alt: "Handcrafted bowl of Til ke Laddu made with roasted sesame and warm gur",
        caption: "Winter festival sweets rolled by hand while the melted jaggery is still warm.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/til-ke-laddu/til-ke-laddu-family.jpeg",
        alt: "Family celebration platter of Til ke Laddu during Makar Sankranti festival",
        caption: "Festive family gatherings sharing the warmth of sesame and gur in chilly January.",
        sourceCredit: "Source: Team Archive"
      }
    ]
  },
  {
    id: "tekua",
    name: "Tekua",
    state: "Bihar",
    tagline: "Deep fried sacred biscuits of whole wheat flour, ghee, dry fruits, and jaggery embossed with traditional wooden molds.",
    whyItMatters: "Tekua is the supreme Mahaprasad of the sacred Chhath Puja, prepared with utmost ritual purity on earthen stoves over mango wood embers. Its dense, crumbly texture and lingering aroma of crushed fennel and green cardamom make it a treasured symbol of Bihari cultural heritage.",
    storyteller: "Shubham Raj",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Shubham describes the sacred reverence and family joy surrounding Thekua. As the divine offering for the ancient Chhath festival, it is prepared with whole wheat flour, desi ghee, jaggery, crushed fennel, and dry fruits, stamped with inherited wooden sancha molds. In student hostels, a package of thekua brought back from Bihar is cherished and devoured by friends within minutes.",
    transcript: `When we talk about traditional Indian sweets, one sweet that holds a very special place in the hearts of people from Bihar and Jharkhand is Thekua.

Thekua is a traditional sweet snack made mainly from wheat flour, jaggery or sugar, and ghee. Sometimes, people add grated dry coconut, fennel seeds, or cardamom to give it extra flavour. The dough is shaped into small pieces, often pressed into carved wooden moulds to create beautiful patterns, and then deep-fried until golden brown. It is crispy on the outside, slightly firm inside, and has a lovely sweetness that makes it different from many other Indian sweets.

For me, what makes Thekua special is the feeling of home and tradition that comes with it. I imagine a family kitchen filled with the aroma of freshly fried Thekua, with everyone waiting to taste the first batch. Someone is carefully preparing the dough, another person is shaping the pieces, and the whole process becomes a family activity. These little moments make food more meaningful because they bring people together and create memories that stay with us for years.

Thekua is not just a sweet that people eat occasionally; it is also deeply connected to religious traditions and festivals. It is especially important during Chhath Puja, one of the most significant festivals celebrated in Bihar, Jharkhand, and parts of eastern Uttar Pradesh. During this festival, Thekua is prepared as a sacred offering to the Sun God. Families prepare it with great care, following traditional methods and maintaining cleanliness throughout the process. After the offering, it is shared among family members and the community as prasad.

One beautiful thing about Thekua is that every family may have its own way of preparing it. Some people use jaggery for a deeper, richer sweetness, while others prefer sugar. Some add coconut and fennel seeds, while others keep the recipe simple. The shape and texture may also differ depending on the mould used and how long the Thekua is fried. These small differences make every family's recipe unique.

According to me, the true taste of Thekua lies in its simplicity. A good Thekua should be golden brown, crispy, and full of the flavour of jaggery and ghee. The aroma of fennel seeds makes it even more special. It should be sweet without being too sugary, and its firm texture allows it to be stored for several weeks without losing its taste and crispness, making it a traditional sweet that is both delicious and practical for families to prepare, share, and pack for students traveling back to college.`,
    didYouKnow: "The wooden dies used to emboss Thekua—known as 'sancha'—are revered family heirlooms passed down through generations of Bihari women. Typically carved from shisham or teak wood, they feature ancient sacred motifs such as the leaf of the peepal tree or the radiating rays of Surya (the Sun God), conferring both cultural identity and uniform crust thickness during frying.",
    atHome: "Pressed gently into carved wooden sancha molds by maternal aunts while devotional Chhath songs play in the background.",
    inHostel: "The single most requested treat in the entire wing, emptied within twenty minutes of unzipping the return travel bag.",
    audioUrl: "/audio/tekua.mp3",
    audioDuration: "02:10",
    mapCoordinates: [25.5941, 85.1376],
    photos: [
      {
        url: "/images/dishes/tekua/cover.jpg",
        alt: "Golden brown Bihari Thekua cookies embossed with traditional leaf and sunray motifs arranged on handwoven bamboo winnowing basket",
        caption: "Traditional leaf pattern embossed on fragrant jaggery and fennel seed dough.",
        sourceCredit: "AI Visual Recreation · Chhath Sacred Hearth Ambience",
        isAI: true,
        aiRationale: "Reconstructs the traditional rural Bihari mud-hearth setting during Chhath Puja, capturing the sacred bamboo winnowing basket (soop) and handcrafted sancha carvings."
      },
      {
        url: "/images/dishes/tekua/thekua-making-mom.jpeg",
        alt: "Mother carefully shaping and frying fresh Thekua in home kitchen",
        caption: "Home preparation: pressing dough balls into heirloom wooden sancha molds before frying.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/tekua/thekua-gold-plate.jpeg",
        alt: "Traditional Chhath Puja Thekua on festival brass plate",
        caption: "Sacred Mahaprasad of the Chhath festival in Bihar and Jharkhand.",
        sourceCredit: "Source: Team Archive"
      },
      {
        url: "/images/dishes/tekua/chhath-puja-thekua.jpg",
        alt: "Chhath Puja ritual offering basket filled with fresh Thekua, sugarcane, and seasonal harvest fruits",
        caption: "Sacred offerings presented at riverbanks during sunrise for Surya Bhagwan.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Shivam Kumar (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Chatth.jpg"
      }
    ]
  },
  {
    id: "ragi-mudde",
    name: "Ragi Mudde",
    state: "Karnataka",
    tagline: "Steamed rustic finger millet spheres served piping hot with fiery country chicken or spiced lentil saaru.",
    whyItMatters: "Ragi mudde is a foundational staple of agrarian Karnataka, valued for its high dietary fiber, iron, and cooling sustenance in dry climates. Traditionally swallowed in smooth morsels with generous gravy, it embodies daily rural culinary wisdom and unpretentious comfort.",
    storyteller: "Arun Fakirappa Halyal",
    storytellerNote: "Student at IIIT Dharwad",
    storySummary: "Arun highlights how Ragi Mudde is a cornerstone of rural Karnataka's culinary culture and traditional lifestyle. Prepared simply with finger millet flour and water, this nutritious staple has sustained agricultural communities for generations. Eaten hot by dipping smooth morsels into spicy saaru without chewing, it represents grounding rural sustenance that college students miss deeply while living away in university hostels.",
    transcript: `Today, I am going to talk about a traditional South Indian dish that may look very simple, but has a lot of cultural importance and nutritional value. The dish I am talking about is Ragi Mudde.

Now, when we think about delicious food, many of us imagine pizza, burgers, biryani, or some fancy restaurant dish. But have you ever thought about how something made with just ragi flour and water can be such an important part of people's lives? That's what makes Ragi Mudde so interesting.

Ragi Mudde is a traditional dish, especially popular in Karnataka. It is prepared using ragi flour, also known as finger millet flour, and water. The mixture is cooked and stirred until it becomes a thick, smooth dough-like ball. It is usually shaped into a round ball and served hot.

At first, someone who has never tried Ragi Mudde might look at it and wonder, "That's it? Just a brown ball?" But trust me, the real experience is not just about how it looks. It's about how you eat it, what you eat it with, and the tradition behind it.

Coming to its importance in Karnataka, Ragi Mudde is much more than just food. It is closely connected to the state's rural culture and traditional lifestyle. For many generations, it has been a regular meal in farming communities, particularly in the southern parts of Karnataka.

Farmers and hardworking people have traditionally eaten Ragi Mudde because it provides energy and keeps them satisfied for a long time. Ragi is rich in dietary fibre and contains important minerals such as calcium. It is also a good source of carbohydrates, which makes it a very nutritious food for people doing heavy physical work.

Another important thing about Ragi Mudde is the way it is eaten. You don't chew it like other foods; you pinch off a small piece, roll it into a small ball with your fingers, dip it into spicy saaru, sambar, or country chicken curry, and swallow it whole. This allows you to experience the rich flavours of the curry while enjoying the smooth texture of the mudde.

When college students move away from home to hostels, we often miss these simple, grounding dishes. In university life, fast food and canteen meals take over, but nothing compares to the nourishment and feeling of home that a warm plate of Ragi Mudde brings. Traditional foods like Ragi Mudde remind us of our roots, our hardworking farming heritage, and the comfort of our homes.`,
    didYouKnow: "Finger millet (Eleusine coracana) has been cultivated in Karnataka for over 4,000 years. Ragi Mudde is traditionally swallowed in small smooth morsels rather than chewed, because chewing causes the gelatinized millet starches to adhere to teeth. This unique swallowing method slows carbohydrate absorption, providing a steady, low-glycemic energy release that sustained agricultural labor for hours.",
    atHome: "Rolled hot by hand directly from the heavy earthen pot and served with garden greens and home ground peppercorn saaru.",
    inHostel: "Unattainable in the common mess menu, making simple local mess visits a nostalgic pilgrimage for homesick students.",
    audioUrl: "/audio/ragi-mudde.mp3",
    audioDuration: "03:06",
    mapCoordinates: [15.4589, 75.0078],
    photos: [
      {
        url: "/images/dishes/ragi-mudde/cover.jpg",
        alt: "Steaming hot smooth Ragi Mudde sphere in ceramic bowl beside spiced soppina saaru and fresh curry leaves",
        caption: "Steaming finger millet sphere served with piping hot saaru and curry leaves.",
        sourceCredit: "AI Visual Recreation · Rural Kitchen Ambience",
        isAI: true,
        aiRationale: "Provides the authentic rustic ambience of a traditional agrarian Karnataka mud-plastered kitchen, capturing the steaming mudde in handcrafted clay and brass vessels without invasive photography."
      },
      {
        url: "/images/dishes/ragi-mudde/ragi-mudde-1.jpg",
        alt: "Freshly prepared Ragi Mudde ball with vegetable curry",
        caption: "Smooth steamed finger millet mudde with fresh gravy.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Vsigamany (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:RAGI_MUDDE.JPG"
      },
      {
        url: "/images/dishes/ragi-mudde/ragi-mudde-2.jpg",
        alt: "Traditional agrarian Karnataka meal with ragi ball and spicy country saaru",
        caption: "Nutrient-dense rustic meal of Karnataka farmers eaten with fiery saaru.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Subash.chandran (CC BY-SA 3.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ragi_Mudde_with_soppina_saaru.jpg"
      }
    ]
  },
  {
    id: "ghewar",
    name: "Ghewar",
    state: "Rajasthan",
    tagline: "A delicate disc of honeycomb flour confection fried in pure ghee and drenched in cardamom infused saffron syrup.",
    whyItMatters: "Ghewar is an intricate monsoon delicacy historically associated with the Teej festival and the rainy season in Northwestern India, where moist humidity aids its honeycomb pore formation. Often crowned with rich rabri and sliced pistachios, its porous geometry is an engineering marvel of confectionery.",
    storyteller: "Dishant Joon",
    storytellerNote: "Ex-student at IIIT Dharwad",
    storySummary: "Dishant shares the rich festive heritage of Ghewar, Rajasthan's iconic honeycomb-textured sweet. Prepared with flour, ghee, and sugar syrup, its delicate porous structure is traditionally enjoyed during Teej and Raksha Bandhan celebrations. Beyond its intricate confectionery technique, Ghewar evokes cherished memories of family reunions, festive warmth, and sweet gifts received from home.",
    transcript: `Today, I am going to talk about a traditional Indian sweet that looks beautiful, tastes delicious, and has a very special connection with festivals and celebrations. The sweet I am talking about is Ghewar.

Now, imagine a sweet that looks like a honeycomb, is soaked in sugar syrup, and is sometimes topped with creamy rabri, dry fruits, and saffron. Sounds delicious, right? Well, that's Ghewar!

Ghewar is a famous traditional sweet from Rajasthan. It is especially popular in cities like Jaipur, Jodhpur, and Udaipur. It has a unique disc-like shape with a porous, honeycomb-like texture, which makes it look very different from other Indian sweets.

What makes Ghewar interesting is the way it is prepared. It is generally made using flour, ghee, and water to create a thin batter. The batter is carefully poured into hot ghee or oil, where it forms its characteristic net-like structure. After frying, it is usually dipped in sugar syrup. Depending on the variety, it can be topped with rabri, nuts, or other ingredients.

Honestly, I find it fascinating that something with such a delicate and unusual appearance can be made using simple ingredients and a special cooking technique.

Now, let's talk about why Ghewar is important in Rajasthan.

Ghewar is closely associated with festivals, especially Teej and Raksha Bandhan. During these occasions, families often exchange sweets and gifts, and Ghewar becomes a special part of the celebration.

In many Rajasthani families, festivals are not just about rituals. They are also about meeting loved ones, preparing special food, and creating memories together. Ghewar adds sweetness to these moments, quite literally!

One thing I find beautiful about traditional Indian sweets is that they often carry emotions and memories. For some people, Ghewar may remind them of childhood celebrations, visiting their hometown, or receiving a box of sweets from a family member.`,
    didYouKnow: "Ghewar's fragile honeycomb lattice can only form through explosive thermal shock. When ice-cold batter is drizzled into smoking-hot clarified butter (around 190°C), water trapped within the batter flash-boils into steam, forcing its way outward and perforating the frying dough with millions of interconnected micro-pores that soak up cardamom-saffron syrup.",
    atHome: "Arriving wrapped in silver vark from the ancestral halwai to celebrate the first downpour of the monsoon season.",
    inHostel: "Scouted on food delivery apps during rainy Dharwad evenings, though rarely tasting like the sweet shops of home.",
    audioUrl: null, // Interviewee did not consent for usage of oral history audio
    audioDuration: "00:00",
    mapCoordinates: [26.9124, 75.7873],
    photos: [
      {
        url: "/images/dishes/ghewar/cover.jpg",
        alt: "Intricate golden honeycomb Malai Ghewar disc topped with rich rabri, slivered pistachios, almonds, and silver foil",
        caption: "Intricate honeycomb disc crowned with saffron rabri, pistachios, and silver vark.",
        sourceCredit: "AI Visual Recreation · Haveli Monsoon Ambience",
        isAI: true,
        aiRationale: "Recreates the historical setting of an antique Rajasthani haveli dining table during the Teej monsoon festival with royal carved silver platters and brass oil lamps."
      },
      {
        url: "/images/dishes/ghewar/ghewar-1.jpg",
        alt: "Traditional Rajasthani Ghewar disc with honeycomb porous structure",
        caption: "Traditional Rajasthani monsoon sweet with delicate porous structure.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Patelaahil (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Indian_sweet_ghewar.jpg"
      },
      {
        url: "/images/dishes/ghewar/ghewar-2.jpg",
        alt: "Festive Rajasthani Ghewar sweet drenched in fragrant sugar syrup",
        caption: "Monsoon delicacy prepared during Teej and Raksha Bandhan across Rajasthan.",
        sourceCredit: "Source: Wikimedia Commons · Photo by M.P. (CC BY-SA 3.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ghevar.jpg"
      },
      {
        url: "/images/dishes/ghewar/malai-ghewar-rabri.jpg",
        alt: "Rich Malai Ghewar crowned with saffron rabri, pistachios, and silver foil",
        caption: "Royal Jaipur Malai Ghewar topped with thickened rabri cream and dry fruit slivers.",
        sourceCredit: "Source: Wikimedia Commons · Photo by Deepa Chandran (CC BY-SA 4.0)",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:GhevarRajasthaniSweet.jpg"
      }
    ]
  }
];

export interface TeamMember {
  name: string;
  rollNo: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Shubham Raj", rollNo: "25BDA113" },
  { name: "Rajan Choudhary", rollNo: "25BDA091" },
  { name: "Sumeet Kumar", rollNo: "25BDA119" },
  { name: "Anuj Raghuwanshi", rollNo: "25BDA014" },
  { name: "Sumer Singh", rollNo: "25BCS180" },
  { name: "Arun Fakirappa Halyal", rollNo: "25BCS021" }
];

export const COURSE_INFO = {
  courseName: "Gastronomic Studies",
  institution: "Indian Institute of Information Technology Dharwad (IIIT Dharwad)",
  tagline: "A Digital Archive of Food and Homesickness",
  purpose: "Swaad Smriti is a student oral history and visual archive created for the Gastronomic Studies course at IIIT Dharwad. The project documents the intersection of culinary memory, student life, and regional identity. By recording short oral narratives and photographs, the archive explores what young adults miss from home, what they eat daily in university hostels, and how living apart from their families changes their relationship with taste, comfort, and home.",
  reflectionsText: "This digital archive explores how food operates as a living memory of home, identity, and regional culture for students living away at university. Moving into student hostels changes everyday dining routines, turning simple childhood meals into cherished reminders of family and comfort. In shared hostel corridors and late night mess gatherings, students build new traditions around takeaway food and dhabas carried from home, sharing meals with friends from across the country. At the same time, short food videos and online recipes shape what students crave, turning regional dishes into shared conversations among friends."
};

/**
 * Client-Side Demonstration Storage Helpers
 * Allows students and instructors to test oral history submissions live without requiring backend logins.
 */
export const getCustomDishes = (): DishStory[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('swaad_smriti_custom_dishes');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCustomDish = (dish: DishStory) => {
  if (typeof window === 'undefined') return;
  const current = getCustomDishes();
  // Avoid duplicate slugs
  const filtered = current.filter(d => d.id !== dish.id);
  const updated = [dish, ...filtered];
  localStorage.setItem('swaad_smriti_custom_dishes', JSON.stringify(updated));
};

export const clearCustomDishes = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('swaad_smriti_custom_dishes');
};

/**
 * Combines permanent archive entries with demonstration submissions
 */
export const getAllDishes = (): DishStory[] => {
  const custom = getCustomDishes();
  return [...DISHES, ...custom];
};
