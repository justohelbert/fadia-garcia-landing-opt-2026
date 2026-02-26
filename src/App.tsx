import { motion } from "motion/react";
import { 
  Star, 
  CheckCircle2, 
  LayoutGrid,
  Instagram, 
  Youtube,
  Volume2
} from "lucide-react";
import { useState, useEffect, useMemo, ReactNode } from "react";

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      color: i % 2 === 0 ? "bg-navy-blue" : "bg-quickbooks-green",
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute ${star.color} rounded-full opacity-10`}
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
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      delay: i * 1.5,
      duration: 8 + Math.random() * 4,
      color: i % 2 === 0 ? "bg-navy-blue" : "bg-quickbooks-green",
      shadow: i % 2 === 0 ? "rgba(0,31,63,0.5)" : "rgba(44,160,28,0.5)"
    }));
  }, []);

  return (
    <div className={`absolute ${position === "top" ? "top-0 rotate-180" : "bottom-0"} left-1/2 -translate-x-1/2 w-[150%] aspect-[2/1] z-15 pointer-events-none overflow-hidden`}>
      {arcStars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute w-1 h-1 ${star.color} rounded-full`}
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
            boxShadow: `0 0 8px ${star.shadow}`
          }}
        />
      ))}
    </div>
  );
};

const BorderStars = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      delay: i * 1.25,
      duration: 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1.5 h-1.5 bg-navy-blue rounded-full shadow-[0_0_10px_rgba(0,31,63,0.8)]"
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ 
            offsetDistance: ["0%", "100%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear",
          }}
          style={{
            // Approximate path for a rounded rectangle responsive to container
            offsetPath: "border-box",
            offsetRotate: "auto",
          }}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ videoUrl, objectFit = "object-cover" }: { videoUrl?: string, objectFit?: "object-cover" | "object-contain" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group rounded-[42px] border-2 border-quickbooks-green bg-white overflow-hidden shadow-xl h-full flex flex-col"
    >
      <BorderStars />
      <div className="p-4 relative z-20 flex flex-col h-full">
        <div className="aspect-[9/16] bg-black rounded-[32px] overflow-hidden relative shrink-0">
          {videoUrl ? (
            <video 
              controls 
              playsInline 
              className={`w-full h-full ${objectFit}`}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[10px] text-center p-8 z-10">
                [Video Placeholder]
              </div>
              <img 
                src={`https://picsum.photos/seed/testimonial/400/711`} 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                alt="Testimonial"
              />
            </>
          )}
          {!videoUrl && (
            <div className="absolute bottom-6 left-6 right-6 z-20">
               <div className="bg-cyan-400/90 backdrop-blur text-navy-blue px-4 py-2 rounded-full text-[10px] font-bold inline-flex items-center gap-2 shadow-lg">
                 <Volume2 className="w-3 h-3" /> Toca para escuchar
               </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Logo = ({ className = "", iconOnly = false }: { className?: string, iconOnly?: boolean }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <svg 
      viewBox="0 0 100 80" 
      className="h-10 w-auto shrink-0" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Diamond Icon - Improved paths for better visibility */}
      <path 
        d="M50 75L15 35H85L50 75Z" 
        stroke="#001F3F" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />
      <path 
        d="M15 35L30 5H70L85 35H15Z" 
        stroke="#001F3F" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />
      <path 
        d="M30 5L50 35L70 5" 
        stroke="#001F3F" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
      <path 
        d="M15 35L85 35" 
        stroke="#001F3F" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
      <path 
        d="M30 35L50 75L70 35" 
        stroke="#001F3F" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
    </svg>
    {!iconOnly && (
      <div className="flex flex-col justify-center leading-[0.9]">
        <span className="text-[#001F3F] font-black text-xl md:text-2xl tracking-tighter uppercase">Diamond</span>
        <div className="flex gap-1 text-[10px] md:text-xs font-bold uppercase tracking-wider mt-0.5">
          <span className="text-[#001F3F]">Biz</span>
          <span className="text-[#2CA01C]">Funding</span>
        </div>
      </div>
    )}
  </div>
);

const ActionButton = ({ href, children, subtitle, className = "" }: { href: string, children: ReactNode, subtitle?: string, className?: string }) => (
  <a 
    href={href} 
    className={`bg-navy-blue text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-[0_20px_40px_-10px_rgba(0,31,63,0.4)] flex flex-col items-center text-center group ${className}`}
  >
    <span className="text-lg md:text-xl">{children}</span>
    {subtitle && (
      <span className="text-[10px] md:text-[11px] opacity-70 font-normal mt-1 group-hover:opacity-100 transition-opacity">
        {subtitle}
      </span>
    )}
  </a>
);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-white/80 backdrop-blur-md border-b border-navy-blue/10 shadow-sm" : "py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo className="h-10 md:h-12" />
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#metodo" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">El Método</a>
          <a href="#resultados" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">Resultados</a>
          <a href="#oferta" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">La Oferta</a>
          <ActionButton 
            href="#formulario"
            className="px-6 py-2.5 rounded-full !text-sm !shadow-none"
          >
            Aplicar Ahora
          </ActionButton>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-40 overflow-hidden bg-white">
      {/* Top Arc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-[2/1] bg-white rounded-[100%] shadow-[inset_0_-2px_20px_rgba(44,160,28,0.2),inset_0_-2px_40px_rgba(0,31,63,0.1),0_10px_50px_1px_rgba(44,160,28,0.05)] z-10 border-b border-quickbooks-green/10 rotate-180" />
      <ArcStars position="top" />

      <div className="relative z-20 text-center max-w-5xl px-6 flex flex-col items-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-navy-blue/5 border border-navy-blue/10 rounded-full px-6 py-2 text-sm font-bold text-navy-blue flex items-center gap-2">
            <span className="text-quickbooks-green">✦</span> Válido Solo Para Dueños de Negocio en USA
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-12 tracking-tight text-black leading-[1.1]"
        >
          Obtén de $50,000 a $150,000 al <br />
          <span className="font-serif italic font-normal">
            <span className="text-quickbooks-green">0% de Interés</span> <span className="text-navy-blue">en 120 Días</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-gray-500 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          El sistema de ingeniería de capital que utilizan los empresarios de élite para escalar su operación usando el dinero del banco, no sus ahorros.
        </motion.p>

        {/* VSL Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl aspect-video bg-gray-100 rounded-[40px] border-8 border-white shadow-[0_20px_80px_-20px_rgba(0,31,63,0.3)] overflow-hidden mb-24 relative group"
        >
          <img 
            src="https://assets.cdn.filesafe.space/i5hxiE3CXl2ec8tvUdWp/media/69a0c9189a0c184e611b7ed2.png" 
            alt="Diamond Funding Accelerator VSL" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-navy-blue/10 z-10 group-hover:bg-navy-blue/20 transition-colors">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-navy-blue border-b-[12px] border-b-transparent ml-2" />
            </div>
          </div>
          <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold z-20">
            Próximamente: Video VSL
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-10 mb-24 w-full"
        >
          <ActionButton 
            href="#formulario"
            subtitle="Trato humano y personalizado, no eres un número más"
          >
            APLICAR A LA LISTA DE ESPERA 💎
          </ActionButton>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-4">
              {[1,2,3,4,5].map(i => (
                <img key={i} src={`https://picsum.photos/seed/founder${i}/48/48`} className="w-12 h-12 rounded-full border-4 border-white shadow-md" alt="User" />
              ))}
            </div>
            <div className="text-center">
              <div className="flex justify-center text-yellow-400 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-sm font-bold text-gray-400">+100 Empresarios Fondeados</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section Below Button */}
        <div className="w-full max-w-5xl mb-24 flex flex-col items-center">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-quickbooks-green font-serif italic text-3xl md:text-4xl text-center mb-12"
          >
            Testimonios
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-sm mx-auto md:max-w-none w-full">
            <TestimonialCard 
              videoUrl="https://assets.cdn.filesafe.space/i5hxiE3CXl2ec8tvUdWp/media/68d469c0b9f777addac9184.mp4"
              objectFit="object-contain"
            />
            <TestimonialCard 
              videoUrl="https://assets.cdn.filesafe.space/i5hxiE3CXl2ec8tvUdWp/media/6903f00679f86120193def76.mp4"
              objectFit="object-contain"
            />
            <TestimonialCard 
              videoUrl="https://assets.cdn.filesafe.space/i5hxiE3CXl2ec8tvUdWp/media/68d469c02c411b7040c110cf.mp4"
            />
            <TestimonialCard 
              videoUrl="https://assets.cdn.filesafe.space/i5hxiE3CXl2ec8tvUdWp/media/68d468e1b9f777fc84ac7528.mp4"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <a 
              href="https://dbettercredit.com/testimonios" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block border-2 border-navy-blue text-navy-blue px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-navy-blue hover:text-white transition-all duration-300"
            >
              Ver Más Testimonios
            </a>
          </motion.div>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-base text-gray-400 italic"
        >
          ¿Ya viste el video?
        </motion.p>
      </div>

      {/* Bottom Arc */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] aspect-[2/1] bg-white rounded-[100%] shadow-[inset_0_2px_20px_rgba(44,160,28,0.2),inset_0_2px_40px_rgba(0,31,63,0.1),0_-10px_50px_1px_rgba(44,160,28,0.05)] z-10 border-t border-quickbooks-green/10" />
      <ArcStars position="bottom" />
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section className="py-32 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block bg-red-50 text-red-600 font-bold px-4 py-1 rounded-full text-xs mb-8 border border-red-100">
          ⚠ El Problema Real
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-black leading-tight">
          El "Techo de Cristal" Que Está <br />
          <span className="text-red-600">Matando Tu Rentabilidad.</span>
        </h2>
        
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-[40px] p-12 md:p-20 text-left shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16" />
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            "Muchos empresarios facturan $40,000 al mes pero le dicen al banco que ganan $4,000 para 'ahorrar impuestos'. El resultado: Eres invisible para el crédito. Estás pagando intereses del 20% al 40% en préstamos rápidos (MCA) o agotando tus propios ahorros, mientras el capital al 0% se queda en manos de tu competencia."
          </p>
        </div>
      </div>
    </section>
  );
};

const MentorSection = () => {
  return (
    <section id="resultados" className="py-24 md:py-32 bg-white relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] bg-gray-100 rounded-[32px] md:rounded-[40px] overflow-hidden border-4 md:border-8 border-white shadow-2xl relative max-w-md mx-auto lg:max-w-none">
              <img 
                src="https://picsum.photos/seed/fadia/800/1000" 
                alt="Fadia Garcia" 
                className="w-full h-full object-cover"
              />
              {/* Floating Badge */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -right-4 md:-right-8 top-1/4 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 max-w-[140px] md:max-w-[200px]"
              >
                <div className="text-xl md:text-3xl font-bold text-quickbooks-green mb-1">$500K+</div>
                <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider leading-tight">Capital Levantado Personalmente</div>
              </motion.div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-quickbooks-green/10 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-block bg-navy-blue/5 text-navy-blue font-bold px-4 py-1 rounded-full text-xs mb-6 md:mb-8">
              CONOCE A TU MENTORA
            </div>
            <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-10 text-black leading-tight">
              De la Bancarrota a <br />
              <span className="text-quickbooks-green">$500,000 en Capital Levantado.</span>
            </h2>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-600 leading-relaxed mb-8 md:mb-10">
              <p>
                "En 2018 perdí mi empresa de 6 camiones y mi casa. Me quedé con un score de 588. Sentía que el sistema financiero me había cerrado las puertas para siempre."
              </p>
              <p>
                "Hoy, he levantado medio millón en capital al 0% y soy mentora oficial en la Cámara de Comercio."
              </p>
              <p className="text-2xl font-serif italic text-navy-blue border-l-4 border-quickbooks-green pl-6 py-2">
                "No te vendo teoría, te vendo el sistema exacto que me salvó la vida."
              </p>
            </div>
            <div>
              <div className="font-bold text-xl text-black">Fadia Garcia</div>
              <div className="text-gray-400">Fundadora, Diamond Funding</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MethodSection = () => {
  const phases = [
    {
      id: "01",
      title: "Limpieza Forense",
      desc: "Eliminamos el pasado negativo en tu reporte utilizando leyes de pre-litigación y tácticas avanzadas de disputa para restaurar tu credibilidad."
    },
    {
      id: "02",
      title: "Estructura de Bajo Riesgo",
      desc: "Configuramos tu LLC, tus datos públicos y tu presencia digital para que el algoritmo del banco te vea como un activo de bajo riesgo y te ame."
    },
    {
      id: "03",
      title: "Stacking al 0%",
      desc: "Aplicamos a múltiples instituciones en un orden exacto y calculado (Secured Sequence) para maximizar aprobaciones simultáneas sin pagar intereses."
    }
  ];

  return (
    <section id="metodo" className="py-32 bg-gray-50 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-black">El Método 500K</h2>
          <p className="text-xl text-gray-500">Ingeniería financiera estructurada en 3 fases inquebrantables.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, i) => (
            <div key={i} className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="text-6xl font-bold text-gray-100 mb-8 group-hover:text-quickbooks-green/20 transition-colors">{phase.id}</div>
              <h3 className="text-2xl font-bold mb-6 text-black">{phase.title}</h3>
              <p className="text-gray-500 leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OfferSection = () => {
  const items = [
    "Auditoría Financiera 360°",
    "Plan de Acción Estratégico de 120 días",
    "Mentoría Privada 1-a-1 con Fadia",
    "Acceso Directo a nuestra Red de Credit Unions",
    "Estructuración de LLC y Perfil Bancario",
    "Estrategia de Stacking Personalizada",
    "Soporte Continuo hasta conseguir el capital"
  ];

  return (
    <section id="oferta" className="py-32 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black leading-tight">
              Lo Que Recibes al Entrar al Diamond Funding Accelerator
            </h2>
            <p className="text-xl text-gray-500 mb-12">
              Un programa de acompañamiento completo diseñado para garantizar resultados. No te dejamos solo.
            </p>
            <ul className="space-y-6 mb-12">
              {items.map((item, i) => (
                <li key={i} className="flex gap-4 items-center">
                  <div className="w-6 h-6 bg-quickbooks-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-quickbooks-green" />
                  </div>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <ActionButton 
              href="#formulario"
              subtitle="Cupos limitados para garantizar atención 1-a-1"
              className="!items-start !text-left"
            >
              QUIERO INGRESAR AHORA 💎
            </ActionButton>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-50 rounded-[40px] border border-gray-100 p-12 flex flex-col justify-center">
              <div className="space-y-8">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-6 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                    <div className="w-12 h-12 bg-navy-blue rounded-xl flex items-center justify-center text-white">
                      <LayoutGrid className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-black">Módulo de Estrategia {i}</div>
                      <div className="text-sm text-gray-400">Acceso inmediato</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-navy-blue/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

const WarrantySection = () => {
  return (
    <section className="py-32 bg-gray-50 relative z-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="bg-white border border-gray-200 rounded-[50px] p-16 md:p-24 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-quickbooks-green" />
          <div className="inline-block bg-quickbooks-green/10 text-quickbooks-green font-bold px-6 py-2 rounded-full text-sm mb-12 tracking-widest uppercase">
            Garantía de Hierro
          </div>
          <h3 className="text-3xl md:text-5xl font-bold mb-12 text-black leading-tight italic font-serif">
            "Si en 120 días no hemos logrado las aprobaciones de capital pactadas siguiendo nuestro plan exacto, trabajamos contigo gratis hasta que el dinero esté en tu cuenta."
          </h3>
          <p className="text-xl text-gray-500 mb-12">
            El riesgo absoluto lo asumo yo.
          </p>
          <div className="flex flex-col items-center">
            <div className="font-bold text-2xl text-black">— FADIA GARCIA</div>
            <Logo className="h-8 mt-4 opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
};

const FormSection = () => {
  return (
    <section id="formulario" className="py-32 bg-[#0B1A2E] relative z-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-quickbooks-green/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-blue/20 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block bg-quickbooks-green text-white font-bold px-4 py-1 rounded-full text-xs mb-8 tracking-widest">
              CUPOS LIMITADOS
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Aplica a la Lista de Espera
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Completa el formulario y mi equipo te contactará para agendar tu consulta estratégica gratuita.
            </p>
          </div>

          <div className="bg-white rounded-[40px] p-4 md:p-6 shadow-2xl overflow-hidden min-h-[600px]">
            <iframe 
              src="https://app.diamondbizconsulting.com/widget/survey/ItZZl27uVsymzJ0a60Qb" 
              style={{ border: 'none', width: '100%', height: '100%', minHeight: '600px' }} 
              scrolling="no" 
              id="ItZZl27uVsymzJ0a60Qb" 
              title="survey"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-16 items-center">
          <div className="text-center md:text-left">
            <Logo className="h-12 mb-6 mx-auto md:mx-0" />
            <p className="text-lg text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed">
              Ayudamos a empresarios en Estados Unidos a escalar operaciones obteniendo capital al 0% mediante estructuras sólidas bancarias.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex gap-6">
              <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-navy-blue shadow-sm"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-navy-blue shadow-sm"><Youtube className="w-6 h-6" /></a>
              <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-navy-blue shadow-sm">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
            </div>
            <p className="text-gray-400 text-sm font-medium">© 2025 Diamond Funding Accelerator. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-quickbooks-green/30 selection:text-navy-blue">
      <StarField />
      <Navbar />
      <Hero />
      <ProblemSection />
      <MentorSection />
      <MethodSection />
      <OfferSection />
      <WarrantySection />
      <FormSection />
      <Footer />
    </div>
  );
}
