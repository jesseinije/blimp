import React, { useEffect, useState, useCallback } from "react";
import "../styles/Pitch.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const Pitch: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10;
  const deckRef = React.useRef<HTMLDivElement>(null);

  // Memoize the goToSlide function with useCallback
  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
      deckRef.current?.scrollTo({
        top: clampedIndex * window.innerHeight,
        behavior: "smooth",
      });
      setCurrentSlide(clampedIndex);
    },
    [totalSlides]
  );

  // Handle scroll events to update current slide
  useEffect(() => {
    const handleScroll = () => {
      if (deckRef.current) {
        const viewportTop = deckRef.current.scrollTop;
        const h = window.innerHeight;
        const index = Math.round(viewportTop / h);
        setCurrentSlide(index);
      }
    };

    const deckElement = deckRef.current;
    if (deckElement) {
      deckElement.addEventListener("scroll", handleScroll);
      return () => deckElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown"].includes(e.key))
        goToSlide(currentSlide + 1);
      if (["ArrowLeft", "PageUp"].includes(e.key)) goToSlide(currentSlide - 1);
      if (e.key === "Home") goToSlide(0);
      if (e.key === "End") goToSlide(totalSlides - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, goToSlide]);

  // Example real data for the chart
  const marketData = [
    { year: "2020", "Creator Economy ($B)": 104, "US Social Users (M)": 223 },
    { year: "2021", "Creator Economy ($B)": 139, "US Social Users (M)": 231 },
    { year: "2022", "Creator Economy ($B)": 175, "US Social Users (M)": 240 },
    { year: "2023", "Creator Economy ($B)": 210, "US Social Users (M)": 247 },
    { year: "2024", "Creator Economy ($B)": 250, "US Social Users (M)": 255 },
    {
      year: "2030 (est.)",
      "Creator Economy ($B)": 500,
      "US Social Users (M)": 270,
    },
  ];

  return (
    // Use a semantic article for the presentation container
    <article className="bg-white text-gray-900 min-h-screen flex flex-col items-center">
      {/* Screen reader only title for better accessibility */}
      <h1 className="sr-only">
        Blimp - Creator-First Social Platform Pitch Deck
      </h1>

      {/* Slides Container - max-width to ensure proper centering on larger screens */}
      <main
        ref={deckRef}
        className="deck h-screen w-full overflow-y-scroll snap-y snap-mandatory"
        aria-live="polite"
      >
        {/* TITLE */}
        <section
          id="title"
          className="slide h-screen flex justify-center items-center px-6"
          aria-label="Title Slide"
        >
          <div className="max-w-4xl w-full text-center">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              The creator-first social platform
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A hybrid of TikTok & Instagram designed for discovery, growth, and
              monetization.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://YOUR-NETLIFY-DEMO-URL"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-blue-500 text-white font-semibold shadow-sm hover:shadow transition-all"
              >
                View Live Demo
              </a>
              <button
                onClick={() => goToSlide(8)}
                className="px-5 py-3 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-50 transition-all"
              >
                Invest with Us
              </button>
            </div>
            <div className="mt-10 text-sm text-gray-500">
              Launching in the U.S. • Built in Nigeria
            </div>
          </div>
        </section>

        {/* PROBLEM - similar pattern for remaining slides */}
        <section
          id="problem"
          className="slide h-screen flex justify-center items-center px-6 pt-20 bg-gradient-to-b from-white to-blue-50/40"
          aria-label="Problem Slide"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl sm:text-5xl font-bold">Problem</h2>
            <ul className="mt-6 space-y-4 text-lg">
              <li className="flex gap-3">
                <span
                  className="mt-2 w-2 h-2 rounded-full bg-blue-500"
                  aria-hidden="true"
                ></span>
                <span>
                  Creators struggle with visibility and stable income on
                  ad-first platforms.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 w-2 h-2 rounded-full bg-blue-500"
                  aria-hidden="true"
                ></span>
                <span>
                  Discovery favors incumbents; newcomers can't break through.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 w-2 h-2 rounded-full bg-blue-500"
                  aria-hidden="true"
                ></span>
                <span>Limited, fragmented monetization tools.</span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 w-2 h-2 rounded-full bg-blue-500"
                  aria-hidden="true"
                ></span>
                <span>
                  Platform navigation and discoverability are often confusing,
                  as seen in real creator feedback and support chats—emerging
                  creators frequently ask for help just to get noticed or to use
                  platform features effectively.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 w-2 h-2 rounded-full bg-blue-500"
                  aria-hidden="true"
                ></span>
                <span>
                  Many creators, especially new ones, lack access to actionable
                  analytics and community support, making it hard to grow and
                  sustain their presence.
                </span>
              </li>
            </ul>
            <div className="mt-4 text-sm text-gray-500">
              <em>
                (These pain points are echoed in real-world creator communities
                and support chats, where questions about growth, monetization,
                and platform usability are among the most common.)
              </em>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section
          id="solution"
          className="slide h-screen flex justify-center items-center px-6 pt-20"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl sm:text-5xl font-bold">Solution</h2>
            <p className="mt-4 text-lg text-gray-700">
              <b>Blimp</b> is a creator-first platform designed to break down
              the barriers that hold back emerging talent. We empower creators
              to <b>monetize</b> their work, <b>showcase</b> their content to a
              wider, more engaged audience, and <b>interact</b> directly with
              their fans—all in one seamless experience.
              <br />
              <br />
              Unlike ad-driven incumbents, Blimp puts creators at the center:
              with built-in revenue tools, advanced analytics, and discovery
              algorithms that spotlight new voices, not just the top 1%.
              <br />
              <br />
              <b>Regular users</b> can follow, support, and interact with their
              favorite creators, models, and influencers, making Blimp a
              vibrant, two-sided community. Whether you’re a creator looking to
              grow and earn, or a fan seeking authentic connections, Blimp is
              the home for the next generation of digital talent.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold">Showcase</h3>
                <p className="mt-2 text-gray-600">
                  Effortless posting, remixing, and curation—creators can
                  highlight their best work and reach new audiences.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold">Grow & Interact</h3>
                <p className="mt-2 text-gray-600">
                  Smart discovery and community features help creators build
                  loyal followings and engage directly with fans.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold">Monetize</h3>
                <p className="mt-2 text-gray-600">
                  Multiple revenue streams—subscriptions, tips, and more—enable
                  creators to earn sustainably from their passion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT */}
        <section
          id="product"
          className="slide h-screen flex justify-center items-center px-6 pt-20 bg-gradient-to-b from-white to-blue-50/40"
        >
          <div className="max-w-5xl w-full">
            <h2 className="text-3xl sm:text-5xl font-bold">Product</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold">Live Demo (Web)</h3>
                <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                  <li className="bullet">
                    <a
                      href="https://www.blimp.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      www.blimp.me
                    </a>{" "}
                    — Clean, modern React UI deployed on Netlify.
                  </li>
                  <li className="bullet">
                    Demonstrates Blimp’s intuitive creator-first experience and
                    core engagement flows.
                  </li>
                  <li className="bullet">
                    Built for speed, accessibility, and investor review.
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold">
                  Mobile & Backend (In Progress)
                </h3>
                <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                  <li className="bullet">
                    Full-featured mobile app under development with Flutter for
                    cross-platform reach.
                  </li>
                  <li className="bullet">
                    Robust backend powered by Python and Node.js/Express.js for
                    scalable, real-time features.
                  </li>
                  <li className="bullet">
                    Secure authentication, media management, and advanced
                    analytics planned for launch.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MARKET */}
        <section
          id="market"
          className="slide h-screen flex justify-center items-center px-6 pt-20"
          aria-label="Market Opportunity Slide"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Market Opportunity
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              The global creator economy is projected to reach <b>$500B</b> by
              2030 (Goldman Sachs, 2023). The US alone has over <b>250M</b>{" "}
              social media users, with demand for creator-first tools at an
              all-time high.
            </p>
            <div className="mt-8 w-full h-72 bg-white  flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={marketData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    label={{
                      value: "Economy ($B)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "US Social Users (M)",
                      angle: 90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="Creator Economy ($B)"
                    fill="#3b82f6"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="US Social Users (M)"
                    fill="#f59e42"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl border border-gray-200 text-center">
                <div className="text-4xl font-extrabold">250M+</div>
                <div className="mt-1 text-gray-600">
                  U.S. social users (2024)
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 text-center">
                <div className="text-4xl font-extrabold">$500B</div>
                <div className="mt-1 text-gray-600">
                  Creator economy by 2030
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 text-center">
                <div className="text-4xl font-extrabold">High</div>
                <div className="mt-1 text-gray-600">
                  Demand for creator-first tools
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400 text-right">
              Sources: Goldman Sachs, Statista, DataReportal
            </div>
          </div>
        </section>

        {/* BUSINESS MODEL */}
        <section
          id="model"
          className="slide h-screen flex justify-center items-center px-6 pt-20 bg-gradient-to-b from-white to-blue-50/40"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl sm:text-5xl font-bold">Business Model</h2>
            <p className="mt-4 text-lg text-gray-700">
              Blimp is built for sustainable, recurring revenue and long-term
              growth. Our model is designed to scale with the creator economy,
              capturing value from both creators and their audiences.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold">Core Revenue Streams</h3>
                <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                  <li className="bullet">
                    <b>Verification subscriptions:</b> Recurring monthly fees
                    for premium creator status and enhanced features.
                  </li>
                  <li className="bullet">
                    <b>Premium creator tools:</b> Advanced analytics, content
                    scheduling, and monetization boosters available as paid
                    add-ons.
                  </li>
                  <li className="bullet">
                    <b>Targeted advertising:</b> Brand-safe, high-engagement ad
                    formats for brands seeking authentic creator partnerships.
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="font-semibold">Future Growth Levers</h3>
                <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                  <li className="bullet">
                    <b>Brand partnerships & campaigns:</b> Scalable influencer
                    marketing and campaign management for brands.
                  </li>
                  <li className="bullet">
                    <b>Marketplace for services & collabs:</b> Commission on
                    creator-to-creator and creator-to-brand transactions.
                  </li>
                  <li className="bullet">
                    <b>In-app tipping & revenue share:</b> Microtransactions and
                    fan support, with a platform fee on all earnings.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <em>
                Our model aligns Blimp’s growth with creator success—more
                creators, more fans, more value for all.
              </em>
            </div>
          </div>
        </section>

        {/* TRACTION */}
        <section
          id="traction"
          className="slide h-screen flex justify-center items-center px-6 pt-20"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl sm:text-5xl font-bold">Traction</h2>
            <ul className="mt-6 space-y-3 text-lg">
              <li className="flex gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-blue-500"></span>
                <span>
                  <b>Live MVP:</b> Web demo at{" "}
                  <a
                    href="https://www.blimp.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    blimp.me
                  </a>{" "}
                  with positive feedback for its clean UI.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-blue-500"></span>
                <span>
                  <b>Community Pipeline:</b> Early partnerships and outreach to
                  creator communities, with hundreds of creators expressing
                  interest.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-blue-500"></span>
                <span>
                  <b>Iterative Product Development:</b> Rapid feature releases
                  and user-driven improvements, with a clear roadmap to mobile
                  and full backend launch.
                </span>
              </li>
            </ul>
            <div className="mt-4 text-sm text-gray-500">
              <em>
                Blimp is already resonating with creators and fans—momentum is
                building for our next phase.
              </em>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section
          id="whyus"
          className="slide h-screen flex justify-center items-center px-6 pt-20 bg-gradient-to-b from-white to-blue-50/40"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl sm:text-5xl font-bold">Why Us</h2>
            <p className="mt-4 text-lg text-gray-700">
              <b>Blimp is built by creators, for creators.</b> Our team combines
              deep creator economy insight, technical expertise, and a
              relentless drive to empower the next generation of digital talent.
              We understand the challenges of breaking through and building a
              sustainable brand—because we’ve lived them.
              <br />
              <br />
              We move fast, listen to our users, and are committed to building a
              platform that puts creators first—globally. Our vision is bold,
              our execution is proven, and our passion is unmatched.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl border border-gray-200 text-center">
                <div className="text-xl font-semibold">Creator DNA</div>
                <p className="mt-2 text-gray-600">
                  We optimize for creator success, not just ad revenue.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 text-center">
                <div className="text-xl font-semibold">Lean & Fast</div>
                <p className="mt-2 text-gray-600">
                  Scrappy, iterative shipping with a clear roadmap.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200 text-center">
                <div className="text-xl font-semibold">Global Vision</div>
                <p className="mt-2 text-gray-600">
                  U.S. launch with international creator network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE ASK */}
        <section
          id="ask"
          className="slide h-screen flex justify-center items-center px-6 pt-20"
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl sm:text-5xl font-bold">The Ask</h2>
            <p className="mt-4 text-lg text-gray-700">
              We are seeking <b>pre-seed funding</b> to accelerate Blimp’s
              growth, launch our mobile app, and scale our creator and user
              base. Your investment will help us:
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50">
                <h3 className="font-semibold text-blue-700">Use of Funds</h3>
                <ul className="mt-3 space-y-2 text-gray-800 list-disc pl-5">
                  <li className="bullet">
                    Complete mobile app and backend development
                  </li>
                  <li className="bullet">
                    Cloud infrastructure, media storage, and security
                  </li>
                  <li className="bullet">
                    Company registration, compliance, and legal
                  </li>
                  <li className="bullet">
                    Marketing, creator onboarding, and community growth
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-gray-200">
                <h3 className="font-semibold">Milestones (12 months)</h3>
                <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-5">
                  <li className="bullet">
                    Beta launch in U.S. with 1,000+ creators
                  </li>
                  <li className="bullet">
                    Feature-complete mobile app and backend
                  </li>
                  <li className="bullet">
                    Early revenue via subscriptions and ads
                  </li>
                  <li className="bullet">
                    Expand to new markets and verticals
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:you@email.com"
                className="px-5 py-3 rounded-2xl bg-blue-500 text-white font-semibold shadow-sm hover:shadow"
              >
                Contact Founder
              </a>
              <a
                href="https://www.blimp.me"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-50"
              >
                View Live Demo
              </a>
            </div>
          </div>
        </section>

        {/* VISION */}
        <section
          id="vision"
          className="slide h-screen flex justify-center items-center px-6 pt-20 bg-gradient-to-b from-white to-blue-50/40"
        >
          <div className="max-w-4xl w-full text-center">
            <h2 className="text-3xl sm:text-5xl font-bold">Vision</h2>
            <p className="mt-4 text-lg text-gray-700">
              <b>
                Our vision is to become the world’s go-to platform for creators
                and their fans.
              </b>{" "}
              We believe in a future where every creator—no matter where they
              start—can build, grow, and monetize their audience sustainably.
              Blimp will be the launchpad for the next generation of digital
              talent, powering authentic connections and economic opportunity
              worldwide.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700">
              Creator-first • Discovery • Monetization
            </div>
          </div>
        </section>

        {/* CTA / END */}
        <section
          id="cta"
          className="slide h-screen flex justify-center items-center px-6 pt-20"
        >
          <div className="max-w-4xl w-full text-center">
            <h2 className="text-3xl sm:text-5xl font-bold">
              Let's build the home for creators
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              We're ready to launch—join us as early partners.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href="mailto:you@email.com"
                className="px-5 py-3 rounded-2xl bg-blue-500 text-white font-semibold shadow-sm hover:shadow"
              >
                Invest
              </a>
              <a
                href="https://YOUR-NETLIFY-DEMO-URL"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl border border-gray-300 font-semibold hover:bg-gray-50"
              >
                Try the Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Controls - improved accessibility */}
      <div className="fixed bottom-4 inset-x-0 z-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white/90 backdrop-blur px-3 py-2 shadow-sm">
            <button
              onClick={() => goToSlide(currentSlide - 1)}
              className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm transition-all"
              disabled={currentSlide === 0}
              aria-label="Previous slide"
            >
              Prev
            </button>
            <div
              className="flex items-center gap-1"
              role="navigation"
              aria-label="Slide navigation"
            >
              {[...Array(totalSlides)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentSlide ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === currentSlide ? "true" : "false"}
                />
              ))}
            </div>
            <button
              onClick={() => goToSlide(currentSlide + 1)}
              className="px-3 py-2 rounded-xl bg-blue-500 text-white text-sm transition-all"
              disabled={currentSlide === totalSlides - 1}
              aria-label="Next slide"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Pitch;
