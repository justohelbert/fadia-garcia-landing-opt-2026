import { motion } from "motion/react";
import { 
  Star, 
  CheckCircle2, 
  LayoutGrid,
  Instagram, 
  Youtube,
  Volume2
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

const TestimonialCard = ({ name, description, videoId }: { name: string, description: string, videoId: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative group p-[2px] rounded-[42px] bg-quickbooks-green overflow-hidden shadow-xl"
    >
      <BorderStars />
      <div className="bg-white rounded-[40px] overflow-hidden p-4 relative z-20">
        <div className="aspect-[9/16] bg-black rounded-[32px] overflow-hidden mb-6 relative">
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-[10px] text-center p-8 z-10">
            [Código Embebido: {videoId}]
          </div>
          <img 
            src={`https://picsum.photos/seed/${videoId}/400/711`} 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            alt={name}
          />
          <div className="absolute bottom-6 left-6 right-6 z-20">
             <div className="bg-cyan-400/90 backdrop-blur text-navy-blue px-4 py-2 rounded-full text-[10px] font-bold inline-flex items-center gap-2 shadow-lg">
               <Volume2 className="w-3 h-3" /> Toca para escuchar
             </div>
          </div>
        </div>
        <div className="px-2 pb-2">
          <h4 className="font-bold text-lg text-black mb-1">{name}</h4>
          <p className="text-[11px] text-gray-500 leading-relaxed italic">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-white/80 backdrop-blur-md border-b border-navy-blue/10 shadow-sm" : "py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-quickbooks-green rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="font-bold text-xl tracking-tight text-navy-blue">DIAMOND FUNDING</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#metodo" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">El Método</a>
          <a href="#resultados" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">Resultados</a>
          <a href="#oferta" className="text-sm font-medium text-navy-blue opacity-70 hover:opacity-100 transition-opacity">La Oferta</a>
          <a href="#formulario" className="bg-navy-blue text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all hover:scale-105">
            Aplicar Ahora
          </a>
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
            src="https://picsum.photos/seed/funding/1200/675" 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold z-20">
            Descubre el Método 500K
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-10 mb-24"
        >
          <a href="#formulario" className="bg-navy-blue text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-[0_20px_40px_-10px_rgba(0,31,63,0.4)]">
            APLICAR A LA LISTA DE ESPERA 💎
          </a>
          
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
        <div className="w-full max-w-6xl mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Jean Carlo Rojas" 
              videoId="testimonial1"
              description="A través de nuestro método Impulso Empresarial 10X, Jean Carlo obtuvo $102.000 de capital de negocio al 0% de interés por 1 año."
            />
            <TestimonialCard 
              name="Maria Rodriguez" 
              videoId="testimonial2"
              description="Logró levantar $75,000 para su empresa de logística en tiempo récord, permitiéndole duplicar su flota sin deudas."
            />
            <TestimonialCard 
              name="Carlos Mendoza" 
              videoId="testimonial3"
              description="De ser rechazado por bancos tradicionales a obtener $120,000 al 0% mediante nuestra estructura de bajo riesgo."
            />
          </div>
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
    <section id="resultados" className="py-32 bg-white relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-100 rounded-[40px] overflow-hidden border-8 border-white shadow-2xl relative">
              <img 
                src="https://picsum.photos/seed/fadia/800/1000" 
                alt="Fadia Garcia" 
                className="w-full h-full object-cover"
              />
              {/* Floating Badge */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -right-8 top-1/4 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 max-w-[200px]"
              >
                <div className="text-3xl font-bold text-quickbooks-green mb-1">$500K+</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Capital Levantado Personalmente</div>
              </motion.div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-quickbooks-green/10 rounded-full blur-3xl" />
          </div>

          <div>
            <div className="inline-block bg-navy-blue/5 text-navy-blue font-bold px-4 py-1 rounded-full text-xs mb-8">
              CONOCE A TU MENTORA
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-10 text-black leading-tight">
              De la Bancarrota a <br />
              <span className="text-quickbooks-green">$500,000 en Capital Levantado.</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
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
            <a href="#formulario" className="inline-block bg-navy-blue text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-xl shadow-navy-blue/20">
              QUIERO INGRESAR AHORA 💎
            </a>
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
            <div className="text-quickbooks-green font-bold tracking-widest text-xs mt-2">DIAMOND FUNDING</div>
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

          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl font-bold mb-10 text-black text-center">Solicita Tu Consulta Gratis</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nombre Completo</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all" placeholder="Tu nombre..." />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Teléfono</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all" placeholder="+1..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">¿Tienes LLC o Corp activa?</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all appearance-none">
                  <option>Sí</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">¿Cuál es tu industria?</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all appearance-none">
                  <option>Trucking</option>
                  <option>Construcción</option>
                  <option>Real Estate</option>
                  <option>Servicios</option>
                  <option>Landscaping</option>
                  <option>Food</option>
                  <option>Limpieza</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">¿Facturación mensual promedio?</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all appearance-none">
                  <option>$0-$10K</option>
                  <option>$10K-$30K</option>
                  <option>$30K-$50K</option>
                  <option>+$50K</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">¿Puntaje de crédito estimado?</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all appearance-none">
                  <option>&lt;600</option>
                  <option>600-700</option>
                  <option>700+</option>
                  <option>No lo sé</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">¿Cuánto capital al 0% buscas en 120 días?</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all appearance-none">
                  <option>$25K</option>
                  <option>$50K</option>
                  <option>+$100K</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">¿Cuentas con al menos $5,000 de saldo disponible?</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-quickbooks-green transition-all appearance-none">
                  <option>Sí</option>
                  <option>No</option>
                  <option>No estoy seguro</option>
                </select>
                <p className="text-[10px] text-gray-400 mt-2 italic">Los bancos requieren demostrar liquidez financiera mínima de $5,000.</p>
              </div>

              <button type="submit" className="w-full bg-navy-blue text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all hover:scale-[1.02] shadow-xl shadow-navy-blue/20">
                APLICAR A LA LISTA DE ESPERA 💎
              </button>

              <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                🔒 Tu información es 100% confidencial.
              </p>

              {/* GHL Form Embed Placeholder */}
              <div id="ghl-form-embed" className="hidden">
                {/* GoHighLevel form will be embedded here */}
              </div>
            </form>
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
            <div className="font-bold text-2xl mb-6 text-black">💎 DIAMOND FUNDING</div>
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
