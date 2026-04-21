type TeacherBio = string | string[]

export const content: {
  mantras: readonly string[]
  purposeTitle: string
  purposeBody: string
  approachTitle: string
  approachBody: string
  philosophyTitle: string
  philosophyBody: string
  panchakoshaBody: string
  founder: {
    name: string
    title: string
    quote: string
    badges: string[]
    highlights: string[]
    contact: {
      phoneDisplay: string
      email: string
      instagram: string
      mapsUrl: string
    }
  }
  teachers: {
    name: string
    title: string
    image: string
    quote: string
    badges?: string[]
    highlights?: string[]
    bio: TeacherBio
    instagram?: string
  }[]
} = {
  mantras: [
    "ॐ",
    "अथ योगानुशासनम्",
    "अखण्डमण्डलाकारं व्याप्तं येन चराचरम्।",
    "तत्पदं दर्शितं येन तस्मै श्रीगुरवे नमः॥",
    "योगेन चित्तस्य पदेन वाचां मलं शरीरस्य च वैद्यकेन।",
    "योऽपाकरोत्तं प्रवरं मुनीनां पतञ्जलिं प्राञ्जलिरानतोऽस्मि॥"
  ],
  purposeTitle: "Our Purpose",
  purposeBody:
    "At Yogam Yoga Shālā, we are not a business, and we do not have \"customers.\" We are a community of souls walking the path of Yoga together. Every person who enters our space is welcomed as a fellow practitioner, deserving of respect and authentic guidance.",
  approachTitle: "The Yogic Approach",
  approachBody:
    "We believe in teaching the experience, not just information from a book. Our teachers are, first and foremost, dedicated practitioners who have spent years on the mat. We don’t just teach yoga; we share the fruits of our consistent, disciplined practice.",
  philosophyTitle: "Our Philosophy",
  philosophyBody:
    "While we anchor our teachings in the timeless wisdom of the Gurus and Shastras, we recognize that Yoga is an evolving process. We provide the foundation of the basics while giving every practitioner the space to explore their unique journey.",
  panchakoshaBody:
    "We adopt a Holistic Approach centered on the Panchakosha (the five layers of being), ensuring that health is addressed from the outermost physical shell to the innermost bliss.",
  founder: {
    name: "Pravin Dilip Jagtap",
    title: "Yoga Trainer & Consultant",
    quote:
      "Yoga is not a performance — it is a daily return to balance. Come as you are, practice with sincerity, and let the discipline do its quiet work.",
    badges: ["Founder & Lead Teacher (since 2021)", "15+ years teaching (since 2010)"],
    highlights: [
      "Guided 1000+ local residents through yogic practice",
      "Trained 20+ yoga teachers through TTC programmes",
      "Yoga therapies for medical ailments; specialised female health regimen",
      "Lead yoga teacher for a Guinness World Record event (Kolkata, 2015)",
    ],
    contact: {
      phoneDisplay: "+91 98811 44997",
      email: "yogamyogashala@gmail.com",
      instagram: "https://www.instagram.com/your_yogi_sultan?igsh=d3BidzY1MDVid2Fv",
      mapsUrl: "https://maps.app.goo.gl/ZSwUGvWQ1e8PBVxe7"
    }
  },
  teachers: [
    {
      name: "Sultan",
      title: "Yoga Coach",
      image: "/assets/teachers/sultan_pfp.jpeg",
      quote: "Building strength and balance, one breath at a time.",
      badges: ["Computer Engineer turned Yoga Coach", "Precision & Alignment Focus"],
      highlights: [
        "Specializes in building strong foundations through precise alignment",
        "Guided individuals through mindful breathing techniques",
        "Combines structure, discipline, and awareness for sustainable results",
        "Committed to helping develop strength and lasting well-being"
      ],
      bio: "Namaste. I'm Sultan, a computer engineer by profession and a dedicated yoga coach by passion. I specialize in guiding individuals to build strong foundations through precise alignment and mindful breathing. My approach combines structure, discipline, and awareness to deliver sustainable results. I am committed to helping you develop strength, balance, and lasting well-being — on and off the mat.",
      instagram: "https://www.instagram.com/your_yogi_sultan?igsh=d3BidzY1MDVid2Fv"
    },
    {
      name: "Austin Clinton Barboza",
      title: "Yoga Coach & Founder – Align Your Prana, Mahol",
      image: "/assets/teachers/austin_pfp.jpeg",
      quote: "Creating intentional spaces for reflection and conscious evolution.",
      badges: ["RYT 500-hour Certified", "Architect & Artist"],
      instagram: "https://www.instagram.com/austinclintonbarboza?igsh=MTJ1Zjhtb3BuYWc3MQ==",
      highlights: [
        "RYT 500-hour international certification from International Yoga Alliance",
        "Ministry of AYUSH, Government of India certified",
        "Co-creator of Shunyasthiti - guided stillness & meditation experience",
        "Bridges structural design and embodied yoga practice"
      ],
      bio: "I am an architect by profession, an artist by expression, and a yoga teacher by choice. My journey brings together structural design and embodied practice, guided by a deep respect for alignment, discipline, and conscious living. I hold an RYT 500-hour international certification from the International Yoga Alliance and the Ministry of AYUSH, Government of India, grounded in formal training in traditional yoga systems through Yogam Yoga Shālā, Pune, and Yoga with Srinatha, Mysore. I also co-created Shunyasthiti, a guided stillness, meditation, and vibrational experience rooted in silence, awareness, and self-inquiry. Through my work in architecture, yoga, and meditation, I create spaces, both external and internal, that nurture reflection, regulate the nervous system, and support resilience, alignment, and conscious evolution."
    }
  ]
}
