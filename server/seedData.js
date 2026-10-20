// Seed data extracted directly from https://amigowebster.in/dharmiclifefoundation/

const siteSettings = {
  site_title: 'Dharmic Life Foundation',
  tagline: 'Humanity is the Mother of Dharma',
  email: 'dharmiclifestyle@gmail.com',
  phone: '+91 98765 43210',
  address: 'Pondicherry, India',
  about_summary: 'Dharmic Life Foundation is dedicated to restoring dignity to the forgotten and providing a pathway to a better life for the underserved. From ensuring a respectful final farewell to empowering the next generation through education, we believe that righteousness is found in service.',
  footer_description: 'Dharmic Life Foundation is a charitable Trust dedicated to feeding the hungry, supporting homeless communities, and spreading kindness through social service.',
  copyright: '© 2026 Copyrights by Dharmic Life Foundation . All Rights Reserved | Designed by amigowebster',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
  whatsapp: 'https://wa.me/919876543210'
};

const activities = [
  {
    id: 1,
    slug: 'annadhanam',
    title: 'Annadhanam (When Hunger ends, Dharma begins)',
    tagline: 'When Hunger ends, Dharma begins',
    description: 'Distributing nutritious meals to the homeless and underprivileged families to ensure that no one in our community goes hungry.',
    full_content: 'Every day, our dedicated volunteers prepare and distribute warm, hygienic, and nutritious meals across Pondicherry. We believe that feeding a hungry soul is the highest form of service. Over thousands of meals have been shared with dignity, warmth, and care.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/12-5.jpg',
    icon: 'Utensils',
    order_index: 1,
    is_active: 1
  },
  {
    id: 2,
    slug: 'unclaimed-souls',
    title: 'Honoring the Unclaimed Souls with Dignified Cremation',
    tagline: 'Dignified Final Rites for Every Soul',
    description: 'We provide honorable final ceremonies for unclaimed bodies, ensuring every individual is treated with dignity, regardless of their circumstances.',
    full_content: 'When an individual passes away without family or means, our Foundation steps in. Coordinating with local hospitals and authorities, we perform sacred traditional Vedic funeral rites and cremation ceremonies with solemn prayers so every departed soul departs in peace and dignity.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/Body-4.jpg',
    icon: 'Flame',
    order_index: 2,
    is_active: 1
  },
  {
    id: 3,
    slug: 'spreading-the-dharmic-way-of-life',
    title: 'Spreading the Dharmic Way of Life (Traditional life Education for the Public)',
    tagline: 'Traditional Life Education for the Public',
    description: 'Inspiring lives rooted in Dharma by preserving sacred traditions and nurturing compassion, righteousness, and unity.',
    full_content: 'We conduct regular cultural programs, moral education workshops, and traditional wisdom discourses for youths and families to cultivate moral integrity, non-violence, environmental reverence, and service-oriented living.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/18-2.jpg',
    icon: 'BookOpen',
    order_index: 3,
    is_active: 1
  },
  {
    id: 4,
    slug: 'education-support',
    title: 'Educational Support (Investing in Education and Transforming lives)',
    tagline: 'Investing in Education and Transforming Lives',
    description: 'Empowering students in government schools and colleges by providing tuition fees, uniforms, and study materials to ensure a bright future.',
    full_content: 'Education is the most potent catalyst to break the cycle of poverty. We sponsor school and college tuition fees, distribute school bags, uniforms, books, and conduct tutoring for promising students from low-income families.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/4-14.jpg',
    icon: 'GraduationCap',
    order_index: 4,
    is_active: 1
  },
  {
    id: 5,
    slug: 'women-empowerment',
    title: 'Women Empowerment (Every Women Deserves Opportunity, Respect and Dignity)',
    tagline: 'Every Woman Deserves Opportunity, Respect and Dignity',
    description: 'Supporting women through vocational training and skill-building workshops to help them achieve financial independence and lead confident lives.',
    full_content: 'Our vocational training centers provide hands-on tailoring, artisanal handicrafts, computer literacy, and small business mentoring for widowed and underprivileged women to achieve sustainable livelihoods.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/1-13.jpg',
    icon: 'UserCheck',
    order_index: 5,
    is_active: 1
  },
  {
    id: 6,
    slug: 'caring-for-homeless-people',
    title: 'Compassion Begins with Caring for Homeless People',
    tagline: 'Compassion Begins with Caring',
    description: 'Reaching out to homeless individuals with daily nourishment, hygiene kits, blankets, clothing, and healthcare assistance.',
    full_content: 'Living on the streets exposes individuals to severe vulnerability. We conduct regular outreach drives distributing seasonal clothing, blankets, hygiene items, and connecting destitute elders to safe shelter homes.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/3.jpg',
    icon: 'HeartHandshake',
    order_index: 6,
    is_active: 1
  },
  {
    id: 7,
    slug: 'other-additional-activities',
    title: 'Other Additional Activities',
    tagline: 'Holistic Community Welfare',
    description: 'Extending compassion through medical health camps, tree plantation drives, disaster emergency relief, and animal welfare assistance.',
    full_content: 'Whenever natural distress strikes or a community need arises, our team responds swiftly with dry ration kits, emergency aid, and sustainable green initiatives.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/08/other-1-768x524.png',
    icon: 'Sparkles',
    order_index: 7,
    is_active: 1
  }
];

const events = [
  {
    id: 1,
    slug: 'honoring-unclaimed-souls',
    title: 'Honoring the Unclaimed Souls',
    event_date: '08 Sep, 2023',
    location: 'Pondicherry Crematorium',
    summary: 'Solemn traditional cremation rites performed for unclaimed departed individuals with prayers for eternal peace.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/3-5.jpg',
    category: 'Moksha Seva'
  },
  {
    id: 2,
    slug: 'mega-annadhanam-drive',
    title: 'Annadhanam',
    event_date: '11 Sep, 2023',
    location: 'Pondicherry Community Center',
    summary: 'Nutritious meal distribution and prasadam served to over 1,200 homeless and underprivileged individuals.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/photo-2.jpg',
    category: 'Annadhanam'
  },
  {
    id: 3,
    slug: 'bridging-digital-divide',
    title: 'Bridging the Digital Divide: Empowering Students Through Technology',
    event_date: '11 Aug, 2023',
    location: 'Government High School, Pondicherry',
    summary: 'Distribution of digital learning kits, tablets, and educational software to underprivileged students.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2023/01/7.jpg',
    category: 'Education'
  },
  {
    id: 4,
    slug: 'empowering-motherhood',
    title: 'Empowering Motherhood and Honoring Womanhood',
    event_date: '11 Sep, 2023',
    location: 'Women Welfare Center',
    summary: 'Maternal nutrition drive, prenatal wellness kits distribution, and vocational training workshop for mothers.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/9-2.jpg',
    category: 'Women Empowerment'
  },
  {
    id: 5,
    slug: 'dressing-with-dignity',
    title: 'Dressing with Dignity: Providing Warmth to the Homeless',
    event_date: '09 May, 2023',
    location: 'Beach Road & Bus Terminal Area',
    summary: 'Distribution of new clothing, warm blankets, and hygiene kits to street dwellers and destitute families.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2023/01/22.jpg',
    category: 'Relief'
  }
];

const testimonials = [
  {
    id: 1,
    author_name: 'Christine Eve',
    author_role: 'Community Patron & Supporter',
    quote: 'The selfless dedication of Dharmic Life Foundation in providing dignity in death to unclaimed souls is something deeply noble. Their transparency and heartfelt commitment make them a beacon of hope in Pondicherry.',
    rating: 5,
    avatar: '/images/team-3.jpg'
  },
  {
    id: 2,
    author_name: 'David Hardson',
    author_role: 'Education Volunteer',
    quote: 'Volunteering with the educational support team opened my eyes to the incredible talent in our government schools. When provided with tuition fees and books, these children blossom beyond imagination.',
    rating: 5,
    avatar: '/images/team-4.jpg'
  },
  {
    id: 3,
    author_name: 'Jessica Brown',
    author_role: 'Social Worker',
    quote: 'Annadhanam is not just giving food; it is restoring human connection and respect. The warm smiles on people’s faces remind us that compassion is truly the heart of Dharma.',
    rating: 5,
    avatar: '/images/team-1.jpg'
  }
];

const blogPosts = [
  {
    id: 1,
    slug: 'donation-is-hope-for-poor-children',
    title: 'Donation is Hope for Poor Childrens',
    excerpt: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour.',
    content: 'Every contribution directly funds school supplies, nutritious breakfast, and educational mentorship for students who would otherwise have to drop out.',
    author: 'admin',
    post_date: '19 Dec',
    comments_count: 0,
    image: '/images/blog-1.jpg'
  },
  {
    id: 2,
    slug: 'a-place-where-start-new-life-with-peace',
    title: 'A Place where Start New Life with Peace',
    excerpt: 'Discover how our skill centers and shelter support assist homeless families in regaining their independence and rebuilding their lives.',
    content: 'Through our rehabilitative initiatives, multiple families have transitioned into steady jobs and stable rented homes.',
    author: 'admin',
    post_date: '19 Dec',
    comments_count: 0,
    image: '/images/blog-2.jpg'
  },
  {
    id: 3,
    slug: 'why-organic-food-may-be-good-for-you',
    title: 'Why organic food may be good for you',
    excerpt: 'Traditional wholesome diets and satvic nutrition form a core pillar of wellness and community health advocated by our Foundation.',
    content: 'Integrating fresh vegetables, traditional grains, and clean nourishment enhances immunity and supports local farmer livelihoods.',
    author: 'admin',
    post_date: '19 Dec',
    comments_count: 0,
    image: '/images/blog-3.jpg'
  }
];

const teamMembers = [
  {
    id: 1,
    name: 'A. Balaji',
    role: 'Founder & Managing Trustee',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/08/987789-Edited-580x580.png',
    facebook: '#',
    twitter: '#',
    instagram: '#'
  },
  {
    id: 2,
    name: 'Mr. V. Anbalagan',
    role: 'Founding and Life Trustee',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-10-at-5.10.25-PM-580x580.jpeg',
    facebook: '#',
    twitter: '#',
    instagram: '#'
  },
  {
    id: 3,
    name: 'Mrs. N. Gomathi',
    role: 'Founding and Life Trustee (In Memory)',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-10-at-5.10.36-PM-580x580.jpeg',
    facebook: '#',
    twitter: '#',
    instagram: '#'
  },
  {
    id: 4,
    name: 'Mrs. Radha Ramanathan',
    role: 'Trustee',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/08/new-3.webp',
    facebook: '#',
    twitter: '#',
    instagram: '#'
  },
  {
    id: 5,
    name: 'Mrs. Srividhya Shankar',
    role: 'Former Trustee',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/08/12345-580x580.png',
    facebook: '#',
    twitter: '#',
    instagram: '#'
  }
];

const galleryImages = [
  { id: 1, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/21-3-580x580.jpg', title: 'Community Outreach Drive' },
  { id: 2, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/98-580x580.jpg', title: 'Daily Annadhanam Camp' },
  { id: 3, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/1-20-580x580.jpg', title: 'Educational Kit Distribution' },
  { id: 4, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/police-2-580x580.jpg', title: 'Police & Civic Coordination for Rites' },
  { id: 5, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/18-4-580x580.jpg', title: 'Women Skill Workshop' },
  { id: 6, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/5-9-580x580.jpg', title: 'Volunteer Relief Team' }
];

const stats = {
  mealsServed: '85,000+',
  soulsHonored: '420+',
  studentsSupported: '650+',
  volunteersActive: '120+',
  metrics: [
    { title: 'Save Water & Health', value: 90 },
    { title: 'Education & Child Support', value: 80 },
    { title: 'Fund Raising & Food Relief', value: 60 }
  ]
};

const trustInfo = {
  established: 'October 2021',
  title: 'Dharmic Life Foundation',
  subtitle: 'Transforming Lives Through Righteous Conduct & Universal Harmony',
  origin_title: 'Our Origin & Journey',
  origin_paragraphs: [
    'Dharmic Life Foundation was established by transforming the institution known as the Academy of Dharmic Life. The Academy was started in October 2020 with the vision of educating people from all sections of society on overcoming the challenges of the COVID-19 pandemic through a Dharmic way of living—completely free of cost.',
    'The organization was formally registered as a trust in Puducherry on 15 October 2021, on the auspicious occasion of Vijayadashami. It was founded by Mr. Balaji (Founder & Managing Trustee) alongside his parents, Mr. V. Anbalagan @ Rajagopal and Mrs. N. Gomathi, as founding trustees.'
  ],
  philosophy: [
    {
      title: 'The Essence of Dharma',
      description: 'Lifestyle reflects how a person or society thinks, lives, and behaves. In the Indian tradition, the principles of Karma (action) and Dharma (righteous conduct) serve as the foundation for modern living.',
      icon: 'Scroll'
    },
    {
      title: 'Promoting Healthy Living',
      description: 'An unhealthy lifestyle directly impacts health and longevity. We conduct regular awareness programs and classes to help individuals harmonize with traditional values and universal laws of nature.',
      icon: 'HeartPulse'
    }
  ],
  initiatives: [
    {
      title: 'Food Provision',
      description: 'Nourishing needy and underprivileged communities.',
      icon: 'Utensils'
    },
    {
      title: 'Dignified Cremation',
      description: 'Performing final rites for unclaimed bodies with honor.',
      icon: 'Flame'
    },
    {
      title: 'Educational Support',
      description: 'Empowering students and institutions with key learning resources.',
      icon: 'GraduationCap'
    },
    {
      title: "Women's Empowerment",
      description: 'Skill development and welfare programs for self-reliance.',
      icon: 'Users'
    },
    {
      title: 'Homeless Care',
      description: 'Providing essential care, shelter, and basic human dignity.',
      icon: 'Home'
    },
    {
      title: 'Humanitarian Aid',
      description: 'Ongoing social welfare activities for societal enhancement.',
      icon: 'HandHeart'
    }
  ],
  closing_statement: 'Through these efforts, Dharmic Life Foundation strives to promote healthy living, moral values, compassion, and social responsibility for the betterment of society.'
};

module.exports = {
  siteSettings,
  activities,
  events,
  testimonials,
  blogPosts,
  teamMembers,
  galleryImages,
  stats,
  trustInfo
};
