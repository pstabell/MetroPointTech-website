// The Agenient explainer on the home page (approved by Patrick 2026-10-07). Click to play: no autoplay,
// controls on, captions are burned into the video. The web encode is faststart, so playback begins before
// the whole file arrives; preload="metadata" keeps the page light until someone presses play.
export default function ExplainerVideo() {
  return (
    <section className="py-16 md:py-20 bg-[#0d2137]" aria-labelledby="explainer-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="explainer-heading" className="text-3xl md:text-4xl font-bold text-ivory mb-4">
            See Agenient in action
          </h2>
          <p className="text-xl text-[#A9BFCF] max-w-3xl mx-auto">
            A short walkthrough of how Agenient works for your agency.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden border border-[#1a3a52] shadow-xl shadow-black/30 bg-black">
          <video
            className="w-full h-auto block"
            controls
            playsInline
            preload="metadata"
            poster="/videos/agenient-explainer-poster.jpg"
          >
            <source src="/videos/agenient-explainer.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
