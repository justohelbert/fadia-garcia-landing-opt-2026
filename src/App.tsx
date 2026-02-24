import { motion } from "framer-motion";
import { 
  Star, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  Youtube, 
  Instagram, 
  Twitter,
  ArrowDownToLine,
  LayoutGrid,
  MessageSquare,
  Users,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-navy-blue rounded-full opacity-10"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const ArcStars = ({ position = "bottom" }: { position?: "top" | "bottom" }) => {
  const arcStars = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      delay: i * 2,
      duration: 8 + Math.random() * 4,
    }));
  }, []);

  return (
    <div className={`absolute ${position === "top" ? "top-0 rotate-180" : "bottom-0"} left-1/2 -translate-x-1/2 w-[150%] aspect-[2/1] z-15 pointer-events-none overflow-hidden`}>
      {arcStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-navy-blue rounded-full shadow-[0_0_8px_rgba(0,31,63,0.5)]"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ 
            offsetDistance: ["0%", "100%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
          style={{
            offsetPath: "ellipse(50% 100% at 50% 100%)",
            offsetRotate: "auto",
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-quickbooks-green rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-bold text-xl tracking-tight text-navy-blue">BRAND</span>
        </div>
        
        <div className={`flex items-center gap-8 ${isScrolled ? "bg-white/80 backdrop-blur-md border border-navy-blue/10 px-6 py-2 rounded-full shadow-sm" : ""}`}>
          <a href="#features" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">Features</a>
          <a href="#testimonials" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">Testimonials</a>
          <a href="#pricing" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">Pricing</a>
          <button className="bg-navy-blue text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-40 overflow-hidden bg-white">
      {/* Top Arc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-[2/1] bg-white rounded-[100%] shadow-[inset_0_-2px_20px_#2ca01c,0_10px_50px_1px_rgba(44,160,28,0.1)] z-10 border-b border-quickbooks-green/10 rotate-180" />
      <ArcStars position="top" />

      <div className="relative z-20 text-center max-w-5xl px-6 flex flex-col items-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative w-24 h-24">
             <img 
              src="https://framerusercontent.com/images/Z0uikyX7ZP9ZUDE1GGlLX2tIZtQ.png" 
              alt="Hero Icon" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-20 tracking-tight text-black"
        >
          A quiet place to <br />
          <span className="font-serif italic font-normal text-navy-blue">see what's new.</span>
        </motion.h1>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl aspect-video bg-gray-100 rounded-[40px] border-8 border-white shadow-[0_20px_80px_-20px_rgba(0,31,63,0.3)] overflow-hidden mb-24 relative group"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-navy-blue/5 z-10">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
              <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-navy-blue border-b-[14px] border-b-transparent ml-2" />
            </div>
          </div>
          <img 
            src="https://picsum.photos/seed/consulting/1200/675" 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold z-20">
            Mira el video
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-10"
        >
          <button className="bg-navy-blue text-white px-16 py-5 rounded-2xl text-2xl font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-[0_20px_40px_-10px_rgba(0,31,63,0.4)]">
            Aplicar
          </button>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-4">
              {[1,2,3,4,5].map(i => (
                <img key={i} src={`https://picsum.photos/seed/user${i}/48/48`} className="w-12 h-12 rounded-full border-4 border-white shadow-md" alt="User" />
              ))}
            </div>
            <div className="text-center">
              <div className="flex justify-center text-yellow-400 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-sm font-bold text-gray-400">21+ Clientes felices</p>
            </div>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-base text-gray-400 italic"
        >
          ¿Ya viste el video?
        </motion.p>
      </div>

      {/* Bottom Arc - Positioned relative to the content above */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] aspect-[2/1] bg-white rounded-[100%] shadow-[inset_0_2px_20px_#2ca01c,0_-10px_50px_1px_rgba(44,160,28,0.1)] z-10 border-t border-quickbooks-green/10" />
      <ArcStars position="bottom" />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-gray-400 text-xs">
        <span>© 2025</span>
        <span>—</span>
        <a href="#" className="hover:underline text-navy-blue">@AlcoveNews</a>
      </div>
    </section>
  );
};

const ChannelSection = () => {
  return (
    <section className="py-24 relative z-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-black">
          Powering the biggest channels in the world
        </h2>
        
        <div className="relative h-[400px] flex items-center justify-center">
          {/* Central Logo */}
          <div className="relative z-10 w-32 h-32 bg-navy-blue rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,31,63,0.2)] border border-navy-blue/10">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-navy-blue rounded-sm rotate-45" />
            </div>
          </div>

          {/* Floating Channel Cards */}
          <div className="absolute top-0 left-1/4 bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
            <img src="https://picsum.photos/seed/beast/50/50" className="rounded-full" alt="MrBeast" />
            <div className="text-left">
              <div className="font-bold flex items-center gap-1 text-black">MrBeast <CheckCircle2 className="w-4 h-4 text-blue-500" /></div>
              <div className="text-xs text-gray-500">336M subscribers</div>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/3 bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
            <img src="https://picsum.photos/seed/redbull/50/50" className="rounded-full" alt="Red Bull" />
            <div className="text-left">
              <div className="font-bold flex items-center gap-1 text-black">Red Bull <CheckCircle2 className="w-4 h-4 text-blue-500" /></div>
              <div className="text-xs text-gray-500">17.6M subscribers</div>
            </div>
          </div>

          <div className="absolute top-1/4 right-1/4 bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
            <img src="https://picsum.photos/seed/dp/50/50" className="rounded-full" alt="Dude Perfect" />
            <div className="text-left">
              <div className="font-bold flex items-center gap-1 text-black">Dude Perfect <CheckCircle2 className="w-4 h-4 text-blue-500" /></div>
              <div className="text-xs text-gray-500">60.1M subscribers</div>
            </div>
          </div>

          <div className="absolute bottom-1/4 right-1/3 bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
            <img src="https://picsum.photos/seed/kai/50/50" className="rounded-full" alt="Kai Cenat" />
            <div className="text-left">
              <div className="font-bold flex items-center gap-1 text-black">Kai Cenat Live <CheckCircle2 className="w-4 h-4 text-blue-500" /></div>
              <div className="text-xs text-gray-500">11.1M subscribers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TargetAudience = () => {
  const pros = [
    "Eres un consultor o creador que vende servicios digitales de alto valor.",
    "Ya estás facturando por encima de $10k-$15k/mes con tu servicio o expertise.",
    "Tienes clientes, y das resultados, pero tu entrega de servicio se siente desorganizada por dentro.",
    "Querés ordenar el negocio, simplificarlo y quedarte con más ganancia, evitando la complejidad.",
    "Buscas convertirte en una autoridad respetada dentro de tu nicho y elevar tu estatus.",
    "Preferís servir bien a tus clientes a largo plazo antes que cerrar rápido y quemar reputación.",
    "Estás dispuesto a ejecutar, iterar y sostener estándares altos durante 4-6 meses aunque duela."
  ];

  const cons = [
    "No vendés servicios digitales de alto valor ni eres un consultor o creador digital.",
    "Estás empezando y todavía no llegaste de forma consistente los $10k USD mensuales.",
    "Querés que alguien te arme el negocio mientras vos mirás, pero sin pagar un servicio DFY.",
    "Buscás hacer mucho dinero rápido, a costa de venderle a cualquiera sin trabajar en serio.",
    "Escuchas a muchos mentores y cambias de estrategia cada mes.",
    "Buscas un curso, un roadmap, un sistema plug & play o un grupo que te diga qué hacer.",
    "No estás listo para ejecutar de forma constante y con estándares altos sin gratificación inmediata."
  ];

  return (
    <section className="py-24 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block border border-navy-blue/20 rounded-full px-4 py-1 text-xs mb-8 italic opacity-70 text-navy-blue">
          ¿Para quién es?
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black">No somos para todos...</h2>
        <p className="text-lg text-gray-500 mb-16 max-w-3xl mx-auto italic">
          Pero si estás acá, probablemente no seas como la mayoría. <br />
          Dejemos totalmente en claro para quién es <span className="font-bold text-navy-blue">Consulting OS™</span> y quién debería evitarlo por completo:
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 border border-quickbooks-green/20 rounded-3xl p-8 text-left shadow-sm">
            <h3 className="text-2xl font-bold mb-8 italic text-quickbooks-green">Para quién es esto...</h3>
            <ul className="space-y-6">
              {pros.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-quickbooks-green flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 text-left shadow-sm">
            <h3 className="text-2xl font-bold mb-8 italic text-gray-400">Para quién no es esto...</h3>
            <ul className="space-y-6">
              {cons.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <XCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  <p className="text-sm text-gray-400 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIInsights = () => {
  return (
    <section className="py-24 bg-white relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block bg-quickbooks-green/10 text-quickbooks-green font-bold px-4 py-1 rounded-full text-sm mb-8">
          New
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight text-black">
          AI insights into strengths and flaws
        </h2>
        <p className="text-lg text-gray-500 mb-16">
          Discover potential problems with your thumbnails before they go live
        </p>

        <div className="relative max-w-4xl mx-auto">
          <img 
            src="https://picsum.photos/seed/hamster/800/450" 
            alt="AI Analysis" 
            className="rounded-3xl border border-gray-200 shadow-xl"
          />
          
          {/* Floating Insights */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="absolute -left-12 top-1/4 bg-white/90 backdrop-blur-md border-2 border-quickbooks-green p-6 rounded-2xl max-w-xs text-left shadow-2xl hidden lg:flex gap-4 items-start"
          >
            <CheckCircle2 className="w-6 h-6 text-quickbooks-green flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-700 leading-relaxed">
              High contrast between the bright hamster and stormy background creates a dramatic, attention-grabbing effect.
            </p>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="absolute -right-12 bottom-1/4 bg-white/90 backdrop-blur-md border-2 border-red-500 p-6 rounded-2xl max-w-xs text-left shadow-2xl hidden lg:flex gap-4 items-start"
          >
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-700 leading-relaxed">
              The image compositing appears artificial, which could detract from its impact for some viewers.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "How will this help me make better thumbnails?",
      a: "Thumbnails don't live in a vacuum. They are seen by viewers surrounded by tons of other videos. Previewing your thumbnails within YouTube's UI is the best way to see if your video is clickable and fix any issues early on."
    },
    {
      q: "Do you have an affiliate program?",
      a: "Yes! You can apply to be an affiliate and receive lifetime commissions on every subscription you help secure."
    },
    {
      q: "What can collaborators do?",
      a: "Collaborators can preview any thumbnail/title in your project and comment. They cannot add or remove thumbnails or see your inspiration board."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative z-20">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center md:text-left text-black">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-lg text-navy-blue opacity-90">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-navy-blue transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="px-6 pb-6 text-gray-500 leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 mb-16 text-center md:text-left">
          <div>
            <h4 className="font-bold mb-4 text-black">Follow the creator</h4>
            <p className="text-sm text-gray-500 mb-6">
              Created by a YouTuber building tools for content creators.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-navy-blue"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-navy-blue"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-navy-blue"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-black">Affiliate Program</h4>
            <p className="text-sm text-gray-500 mb-6">
              Earn lifetime commissions on every subscription you help secure.
            </p>
            <button className="bg-gray-50 border border-gray-200 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors text-navy-blue">
              Join Now
            </button>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-black">Contact Us</h4>
            <p className="text-sm text-gray-500 mb-6">
              Have questions or want to report an issue? We'll respond within 24hrs.
            </p>
            <button className="bg-gray-50 border border-gray-200 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors text-navy-blue">
              Send Message
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
          <p>© 2025 BRAND</p>
          <div className="flex gap-8">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms and Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <Navbar />
      <Hero />
      <ChannelSection />
      <AIInsights />
      <TargetAudience />
      <FAQ />
      <Footer />
    </div>
  );
}
