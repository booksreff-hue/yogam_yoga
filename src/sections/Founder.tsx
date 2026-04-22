import React, { useState } from "react"
import FadeIn from "../components/FadeIn"
import { Users, User, Instagram } from "lucide-react"
import { content } from "../content"

export default function Founder() {
  const f = content.founder
  return (
    <section id="teachers" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-title text-ocean-900 mb-6 tracking-tight">Our Teachers</h2>
          <p className="text-xl md:text-2xl font-title text-azure-700 italic">We are practitioners first, teachers second</p>
          <div className="w-20 h-1 bg-gradient-to-r from-aqua-500 to-azure-600 mx-auto rounded-full mt-6" />
        </FadeIn>

        <FadeIn className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 border border-aqua-200/60 overflow-hidden relative">
          <img
            src="/assets/teachers/teachers_bg.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />
          <div className="relative">
            <div className="space-y-6 text-ocean-700 leading-relaxed">
              <p className="text-base md:text-lg">
                Our teachers are dedicated practitioners guided by the timeless wisdom of the Gurus and Shastras.
                We don&apos;t teach yoga as a performance—we teach it as a lived discipline.
              </p>

              {/* ── Pravin ── */}
              <div className="relative rounded-2xl bg-[#ffffe6] p-6 border border-aqua-200/60 overflow-hidden">
                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <img
                      src="/assets/teachers/pravin_pfp.jpeg"
                      alt={`${f.name} portrait`}
                      className="w-full md:w-40 h-48 md:h-40 object-cover rounded-2xl shadow-md"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <div className="text-2xl font-title text-ocean-900">{f.name}</div>
                      <div className="text-ocean-600 mt-1">{f.title}</div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {f.badges.map((b) => (
                          <div key={b} className="inline-flex rounded-full bg-aqua-100 px-3 py-1 text-sm font-medium text-ocean-800">
                            {b}
                          </div>
                        ))}
                      </div>

                      {f.contact.instagram && (
                        <a
                          href={f.contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium border-b-4 border-purple-700 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 active:border-b-2 active:translate-y-0.5"
                        >
                          <Instagram className="w-4 h-4" />
                          Follow on Instagram
                        </a>
                      )}

                      <p className="mt-4 text-ocean-700 italic">"{f.quote}"</p>

<p className="mt-4 text-base md:text-lg text-ocean-700 leading-relaxed">
                        Namaste. I'm Pravin Dilip Jagtap, an experienced yoga trainer and consultant based in Pune with over 15 years of teaching experience. Since 2010, I have guided individuals, communities, schools, colleges, and corporate groups toward better health, balance, and a deeper yogic lifestyle. As the founder and lead teacher of Yogam Yoga Shālā, my work includes group classes, personal training, yoga therapy, and teacher training, with a sincere focus on helping people experience yoga as a practical path to holistic well being, inner discipline, and inner growth.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {f.highlights.map((h) => (
                      <div key={h} className="rounded-2xl bg-[#B8F9FF] p-4 text-sm text-black border border-aqua-200/60">
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Additional Teachers ── */}
              {content.teachers.map((teacher) => (
                <TeacherCard key={teacher.name} teacher={teacher} />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ── Teacher Card Component ── */
type Teacher = {
  name: string
  title: string
  image: string
  quote: string
  badges?: string[]
  highlights?: string[]
  bio: string | string[]
  instagram?: string
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative rounded-2xl bg-[#ffffe6] p-6 border border-aqua-200/60 overflow-hidden">
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {!imgError ? (
            <img
              src={teacher.image}
              alt={`${teacher.name} portrait`}
              className="w-full md:w-40 h-48 md:h-40 object-cover rounded-2xl shadow-md"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full md:w-40 h-48 md:h-40 rounded-2xl shadow-md bg-gradient-to-br from-aqua-100 to-azure-100 flex items-center justify-center flex-shrink-0">
              <User className="w-16 h-16 text-azure-400" />
            </div>
          )}

          <div className="flex-1">
            <div className="text-2xl font-title text-ocean-900">{teacher.name}</div>
            <div className="text-ocean-600 mt-1">{teacher.title}</div>

            <div className="flex flex-wrap gap-2 mt-3">
              {teacher.badges?.map((b) => (
                <div key={b} className="inline-flex rounded-full bg-aqua-100 px-3 py-1 text-sm font-medium text-ocean-800">
                  {b}
                </div>
              ))}
            </div>

            {teacher.instagram && (
              <a
                href={teacher.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium border-b-4 border-purple-700 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 active:border-b-2 active:translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
                Follow on Instagram
              </a>
            )}

            <p className="mt-4 text-ocean-700 italic">"{teacher.quote}"</p>

            {typeof teacher.bio === "string" ? (
              <p className="mt-4 text-ocean-700 text-base leading-relaxed">{teacher.bio}</p>
            ) : (
              <div className="mt-4 space-y-2 text-ocean-700">
                {teacher.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}

            {teacher.highlights && teacher.highlights.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {teacher.highlights.map((h) => (
                  <div key={h} className="rounded-2xl bg-[#B8F9FF] p-4 text-sm text-black border border-aqua-200/60">
                    {h}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
