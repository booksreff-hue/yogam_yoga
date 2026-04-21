import React, { useEffect, useState } from "react"
import FadeIn from "../components/FadeIn"
import { Star } from "lucide-react"

type Review = {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
}

const reviews: Review[] = [
  {
    author_name: "Preity Kirpalani",
    rating: 5,
    text: "The yoga class at Yogam yog shala are for all fitness levels. They are challenging & energising at the same time. I have been practicing yoga under Pravin Sir. He is an excellent coach, extremely knowledgeable with a calm personality. I look forward to my class every single day. The atmosphere is very welcoming & serene. Thoughtfully curated sessions, they will leave you energetic and ready for the day. It will make you fall in love with yoga every single day.",
    relative_time_description: "4 months ago",
  },
  {
    author_name: "Bjala Jalanila",
    rating: 5,
    text: "It's been 6 months I have been practicing yoga under the guidance of Pravin Sir......when life felt heaviy with anxiety and depression, I found a ray of light through yoga.... Pravin sir.....you are not just teaching yoga..you are helping people transform their lifes. Also special thanks to Austin sir and Sultan sir. You guys are truly making difference in people's life. If anyone wants to rediscover peace in their life, I strongly recommend Yoga Shala...please contact Pravin Jagtap",
    relative_time_description: "4 months ago",
  },
  {
    author_name: "Sparshad Kasote",
    rating: 5,
    text: "Genuine, Professional and Intensive Yoga training. Pravin Sir conducts yogic training here in conjunction with breathing and Pranayama to train both the body and mind. It is located inside a historical premises of Shinde Chatri as well whichvadds to the charm.",
    relative_time_description: "3 months ago",
  },
  {
    author_name: "Anil Khatri",
    rating: 5,
    text: "Yogam Yoga class has the extra energy due to Pravin Sir's dedication. He is an excellent yoga teacher who guides us and corrects our postures and breathing pattern. His knowledge of yoga, focus on the minute details and individual attention makes the yoga class a pleasure to attend. When i joined the class in Sept 2024 for the 6.30 am batch I was not sure, if i will be consistent as i was not an early riser, but thereafter I felt pristine and energetic, also Shinde Chatri temple's beautiful environment is a bliss. I admire his discipline even for the 4 Prayers he recites every day. While there are several moving parts in life, my Yoga is constant, thanks to Praveen Sir's guidance and encouragement. Best wishes always!!",
    relative_time_description: "10 months ago",
  },
  {
    author_name: "kalpana sharma",
    rating: 5,
    text: "Pravin Sir's yoga classes have been a game changer for me. Initially, my lazy nature and low energy levels made me sceptical about starting yoga. But, under Sir's guidance, I have discovered a new me. It has improved my energy levels, enhanced overall health, increased flexibility, and strength and better focus. Sir's expertise, patience, and encouraging nature create a nurturing environment. His classes are meticulously designed to cater to diverse needs. I wholeheartedly recommend Yogam Yoga Shala to anyone seeking a holistic and supportive yoga experience. Thank you Pravin Sir.",
    relative_time_description: "a year ago",
  },
  {
    author_name: "Delshad Irani",
    rating: 5,
    text: "This class has been my first formal experience with yoga and I joined it specifically for health reasons. I come from a background of lifting weights and to make this shift was life altering. But Pravin sir has made the transition for me excellently smooth so much so that i have started enjoying yoga more than the gym and do not want to go back to weights at all! He is patient, very knowledgeable and guides us individually during the class. I love our meditation sessions as well which leave me wanting for more. Overall my experience has been enriching and I would definitely recommend people to join this class.",
    relative_time_description: "3 years ago",
  },
  {
    author_name: "Manoj Sethi",
    rating: 5,
    text: "Yogam Yoga Shala, helmed by the esteemed Pravin Sir, has been a transformative experience for me. Having joined as a beginner four months ago, grappling with severe back pain and posture issues, I found in Pravin Sir not just a yoga instructor but a true healer who uses the art of yoga therapeutically. He tailors his approach with a precision that speaks volumes about his expertise and compassion for his students' individual needs. When I started, we began with therapy yoga—a gentle yet profoundly effective regimen that was aimed directly at alleviating my pain and correcting my posture. Each pose and sequence were selected with care to ensure gradual and safe progression. Pravin Sir's attentive guidance made a noticeable difference early on. Through consistent practice under his guidance, my back pain has significantly reduced, and my posture has improved remarkably.",
    relative_time_description: "a year ago",
  },
  {
    author_name: "Vishal Bansal",
    rating: 5,
    text: "I have been practicing yoga from Sultan and Austin Sir here. Both are very knowledgeable and dedicated towards yoga. Their keen observation towards my asanas has drastically improved my yoga postures. They consistently motivates me to push my limit and strive for improvement. Their sessions are very enjoyable and rewarding. I highly recommend everyone to join it.",
    relative_time_description: "a year ago",
  },
]

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-1" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1
        const filled = n <= value
        return (
          <Star
            key={n}
            className={`w-5 h-5 ${filled ? "fill-azure-500 text-azure-500" : "text-azure-200"}`}
          />
        )
      })}
    </div>
  )
}

export default function Reviews() {
  const [currentSet, setCurrentSet] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const reviewsPerPage = 2
  const totalSets = Math.ceil(reviews.length / reviewsPerPage)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % totalSets)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSets])

  const handleSwipe = (direction: "left" | "right") => {
    setIsAutoPlaying(false)
    if (direction === "left") {
      setCurrentSet((prev) => (prev + 1) % totalSets)
    } else {
      setCurrentSet((prev) => (prev - 1 + totalSets) % totalSets)
    }
  }

  const currentReviews = reviews.slice(
    currentSet * reviewsPerPage,
    currentSet * reviewsPerPage + reviewsPerPage
  )

  return (
    <section id="reviews" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-title text-ocean-900 mb-4 md:mb-6 tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-lg md:text-xl text-ocean-700 max-w-2xl mx-auto leading-relaxed">
            Real experiences from our yoga community.
          </p>

          <div className="mt-6 flex flex-col items-center gap-2">
            <Stars value={5} />
            <div className="text-sm text-ocean-700">
              <span className="font-semibold">5.0</span> average{" "}
              <span className="text-ocean-600">({reviews.length} reviews)</span>
            </div>
          </div>
        </FadeIn>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <button
            onClick={() => handleSwipe("right")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-ocean-700 hover:bg-white hover:text-ocean-900 transition-all duration-300"
            aria-label="Previous reviews"
          >
            ←
          </button>

          <button
            onClick={() => handleSwipe("left")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-ocean-700 hover:bg-white hover:text-ocean-900 transition-all duration-300"
            aria-label="Next reviews"
          >
            →
          </button>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {currentReviews.map((r, idx) => (
              <FadeIn key={`${r.author_name}-${idx}`} delay={idx * 0.03} className="flex flex-col gap-6 rounded-xl py-4 md:py-6 border border-aqua-200/60 bg-white/85 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-4 md:p-8">
                  <div className="flex gap-1 mb-4" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < r.rating ? "fill-azure-500 text-azure-500" : "text-azure-200"}`}
                      />
                    ))}
                  </div>

                  <p className="text-ocean-700 leading-relaxed mb-6 text-base md:text-lg italic">
                    "{r.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aqua-400 to-azure-500 flex items-center justify-center shadow-md overflow-hidden">
                      <span className="text-white font-semibold text-sm">{r.author_name.slice(0, 1).toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-ocean-900 truncate">{r.author_name}</p>
                      <p className="text-sm text-ocean-600">{r.relative_time_description}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalSets }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSet(idx)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSet
                  ? "bg-azure-500 w-8"
                  : "bg-azure-200 hover:bg-azure-300"
              }`}
              aria-label={`Go to review set ${idx + 1}`}
            />
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <a
            href="https://share.google/UOoyKnTEtKsZQxFkl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-azure-500 to-aqua-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            For more reviews, head on to our Google Maps Page
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
