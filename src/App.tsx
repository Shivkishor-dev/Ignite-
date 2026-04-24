/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Dumbbell, 
  Heart, 
  Zap, 
  Users, 
  Clock, 
  Star, 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Phone, 
  MessageSquare,
  Award,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';

// --- Types ---
interface Program {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Trainer {
  name: string;
  specialty: string;
  exp: string;
  image: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
      if (isNaN(numericValue)) return;
      
      let start = 0;
      const end = numericValue;
      const totalMiliseconds = duration * 1000;
      const stepTime = Math.max(totalMiliseconds / end, 10);

      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / stepTime));
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={nodeRef}>{count}{value.replace(/[0-9]/g, '')}</span>;
};

// --- Components ---

const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Dumbbell className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-black text-2xl tracking-tighter">IGNITE <span className="text-red-600">GYM</span></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className={`hover:text-red-500 transition-colors ${activeSection === item.name.toLowerCase() ? 'text-red-600' : 'text-gray-300'}`}
            >
              {item.name}
            </a>
          ))}
          <a href="#pricing" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30">
            JOIN NOW
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 text-center uppercase tracking-[0.2em] font-semibold text-sm">
              {menuItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="py-2 hover:text-red-500 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#pricing" 
                onClick={() => setIsOpen(false)}
                className="bg-red-600 text-white py-3 rounded-xl mt-4"
              >
                JOIN NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const stats = [
    { label: 'Members', value: '500+' },
    { label: 'Trainers', value: '10+' },
    { label: 'Hours', value: '24/7' },
    { label: 'Rating', value: '5 ★' },
  ];

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505] z-[1]"></div>
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
          alt="Gym Hero" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full pt-32 lg:pt-0">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-4 mb-4 bg-red-600/20 text-red-500 rounded-full text-xs font-bold uppercase tracking-widest border border-red-600/30">
              Ranchi's Finest Fitness Hub
            </span>
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-6">
              TRANSFORM <br />
              <span className="text-gradient">YOUR BODY</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl">
              Elevate your fitness journey at Ranchi's premium destination. World-class equipment, 
              expert coaching, and an atmosphere designed for results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#pricing" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl flex items-center justify-center gap-2 font-bold tracking-wide transition-all hover:scale-105 active:scale-95 group">
                JOIN THE TRIBE <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="border border-white/20 hover:bg-white/10 text-white px-10 py-4 rounded-xl flex items-center justify-center gap-2 font-bold tracking-wide transition-all active:scale-95">
                FREE TRIAL
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/10 pt-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="group">
                <div className="text-3xl md:text-4xl font-display font-black text-white group-hover:text-red-500 transition-colors">
                  <Counter value={stat.value} />
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

const About = () => {
  const skills = [
    { name: 'Strength Training', value: 95 },
    { name: 'Cardio Fitness', value: 90 },
    { name: 'Fat Loss Excellence', value: 92 },
    { name: 'Personal Coaching', value: 97 },
  ];

  return (
    <section id="about" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-red-600/20 blur-2xl rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000" 
              className="rounded-3xl border border-white/10 shadow-2xl h-[400px] md:h-[600px] w-full object-cover"
              alt="About Gym" 
            />
            <div className="absolute bottom-8 -right-8 bg-black p-8 rounded-3xl border border-red-600/30 glass md:flex items-center gap-4 hidden">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center">
                <Award className="text-white w-8 h-8" />
              </div>
              <div>
                <div className="text-2xl font-black">#1 IN RANCHI</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Premium Gym Award 2024</div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-black text-4xl md:text-6xl mb-6">WHY <span className="text-gradient">IGNITE?</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                At Ignite Gym, we don't just provide a place to work out. We cultivate a mindset. 
                Our mission is to empower the people of Ranchi through world-class fitness experiences. 
                Whether you're a beginner or a pro, we provide the tools, the tech, and the tribe 
                to push your limits.
              </p>

              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm uppercase tracking-wide">{skill.name}</span>
                      <span className="text-red-500 font-bold">{skill.value}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-red-600 to-orange-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="glass p-4 rounded-2xl">
                  <h4 className="font-bold text-white mb-1">Elite Gear</h4>
                  <p className="text-xs text-gray-500">Hammer Strength & Life Fitness equipment.</p>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <h4 className="font-bold text-white mb-1">Luxury Perks</h4>
                  <p className="text-xs text-gray-500">Steam, lockers, and healthy cafe.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  const programs: Program[] = [
    { title: 'Weight Training', description: 'Build functional strength and explosive muscle growth with our elite iron section.', icon: <Dumbbell size={32} /> },
    { title: 'Cardio Zone', description: 'HIIT-focused machines designed to maximize caloric burn and heart health.', icon: <Zap size={32} /> },
    { title: 'Personal Training', description: '1-on-1 sessions tailored to your specific biology and lifestyle goals.', icon: <Users size={32} /> },
    { title: 'Women Fitness', description: 'Specialized programs and zones ensuring comfort and peak performance.', icon: <Award size={32} /> },
    { title: 'Fat Loss', description: 'Scientific approach to weight management involving nutrition and training.', icon: <Heart size={32} /> },
    { title: 'Yoga & Recovery', description: 'Holistic wellness focusing on flexibility, breath, and mental clarity.', icon: <Clock size={32} /> },
  ];

  return (
    <section id="programs" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 px-4">
          <h2 className="font-display font-black text-5xl md:text-7xl mb-4 uppercase tracking-tighter">OUR <span className="text-gradient">PROGRAMS</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic italic">Tailored excellence for every fitness ambition.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl group hover:border-red-500/30 transition-colors relative h-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                {p.icon}
              </div>
              <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                {p.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase group-hover:text-red-500 transition-colors">{p.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{p.description}</p>
              <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 group-hover:gap-4 transition-all">
                Learn More <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Trainers = () => {
  const trainers: Trainer[] = [
    { name: 'Rahul Sharma', specialty: 'Strength Coach', exp: '8 Yrs', image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?auto=format&fit=crop&q=80&w=600' },
    { name: 'Priya Verma', specialty: 'Yoga Expert', exp: '6 Yrs', image: 'https://images.unsplash.com/photo-1548690312-e3b507d17a47?auto=format&fit=crop&q=80&w=600' },
    { name: 'Vikram Singh', specialty: 'Bodybuilding Pro', exp: '10 Yrs', image: 'https://images.unsplash.com/photo-1507398941214-57f8999c33ef?auto=format&fit=crop&q=80&w=600' },
    { name: 'Anita Das', specialty: 'HIIT Specialist', exp: '5 Yrs', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <section id="trainers" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter">EXPERT <span className="text-gradient">COACHES</span></h2>
            <p className="text-gray-500 mt-2 px-1">Meet the architects of your transformation.</p>
          </div>
          <button className="border border-white/20 hover:bg-white/10 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors">
            All Trainers
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl mb-4 aspect-[4/5]">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <div className="flex gap-4">
                     <Instagram className="cursor-pointer hover:scale-110 transition-transform" size={20} />
                     <Facebook className="cursor-pointer hover:scale-110 transition-transform" size={20} />
                     <Twitter className="cursor-pointer hover:scale-110 transition-transform" size={20} />
                   </div>
                </div>
              </div>
              <h4 className="text-xl font-black uppercase text-white tracking-widest">{t.name}</h4>
              <p className="text-sm text-red-500 font-bold uppercase tracking-tight">{t.specialty} • {t.exp}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    { name: 'Monthly', price: '₹1,999', features: ['General Training', 'Locker Room Access', '24/7 Access', '1 Free Session'], highlighted: false },
    { name: 'Quarterly', price: '₹4,999', features: ['All Monthly Features', 'Free Steam/Sauna', 'Nutrition Guide', 'Personal Health Review'], highlighted: true },
    { name: 'Annual', price: '₹14,999', features: ['Unlimited Facilities', 'Private Locker', 'Guest Passes', 'Priority Coaching', 'Discounted Supplements'], highlighted: false },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter">PRICING <span className="text-gradient">PLANS</span></h2>
          <p className="text-gray-400 mt-4">Unbeatable value for premium fitness.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[2.5rem] relative flex flex-col h-full ${plan.highlighted ? 'bg-red-600 text-white red-glow scale-105 z-10' : 'glass'}`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-white text-red-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] shadow-xl">
                  Best Value
                </div>
              )}
              <div className="mb-8">
                <h3 className={`text-2xl font-black uppercase mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-400'}`}>{plan.name}</h3>
                <div className="text-5xl font-black flex items-baseline">
                  {plan.price}<span className="text-sm font-bold opacity-70 ml-2">/ plan</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center bg-white/10 ${plan.highlighted ? 'text-white' : 'text-red-500'}`}>
                      <ChevronRight size={14} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-gray-300'}`}>{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${plan.highlighted ? 'bg-white text-red-600 hover:bg-gray-100' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculate = () => {
    if (weight && height) {
      const hMeters = parseFloat(height) / 100;
      const bmi = parseFloat(weight) / (hMeters * hMeters);
      setResult(parseFloat(bmi.toFixed(1)));
      
      if (bmi < 18.5) setCategory('Underweight');
      else if (bmi < 25) setCategory('Normal');
      else if (bmi < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="glass p-8 md:p-16 rounded-[3rem] relative overflow-hidden border-hidden sm:border-solid">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-black text-4xl mb-4 tracking-tighter leading-none">CHECK YOUR <br/><span className="text-red-500 uppercase">FITNESS STATUS</span></h2>
              <p className="text-gray-400 text-sm mb-8 italic">Body Mass Index (BMI) is a simple screening tool to guide your health journey.</p>
              
              <div className="space-y-4">
                <input 
                  type="number" 
                  placeholder="Weight (kg)" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors"
                />
                <input 
                  type="number" 
                  placeholder="Height (cm)" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button 
                  onClick={calculate}
                  className="w-full bg-red-600 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
                >
                  Calculate Now
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-[2rem] border border-white/5 shadow-inner">
               {result ? (
                 <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                 >
                   <div className="text-gray-500 uppercase text-xs font-bold tracking-[0.3em] mb-2">Your BMI is</div>
                   <div className="text-7xl font-display font-black text-white mb-4">{result}</div>
                   <div className={`px-4 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                     category === 'Normal' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                   }`}>
                     Category: {category}
                   </div>
                 </motion.div>
               ) : (
                 <div className="text-center text-gray-600">
                    <Activity size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium uppercase tracking-widest">Enter data to see result</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Activity = ({ size, className }: { size: number, className: string }) => <Zap size={size} className={className} />;

const Gallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1574673130244-c747e4497337?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1581009146145-b5ef03a74513?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-display font-black text-5xl md:text-7xl mb-12 text-center uppercase tracking-tighter">OUR <span className="text-gradient">ARENA</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl aspect-square"
            >
              <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gym" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Star className="text-red-500 fill-red-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const data: Testimonial[] = [
    { name: "Anish Kumar", role: "Bodybuilder", text: "Best gym in Ranchi! The equipment quality is unparalleled and the community vibe keeps me coming back every day.", rating: 5 },
    { name: "Swati Roy", role: "Corporate Pro", text: "Ignite transformed my sedentary lifestyle. The trainers are patient and highly knowledgeable. Love the aura here!", rating: 5 },
    { name: "Rahul Dev", role: "Athlete", text: "Truly a international standard facility. The functional zone is a game changer for my performance training.", rating: 5 }
  ];

  const next = () => setCurrent((c) => (c + 1) % data.length);
  const prev = () => setCurrent((c) => (c - 1 + data.length) % data.length);

  return (
    <section id="testimonials" className="py-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 className="font-display font-black text-5xl md:text-7xl mb-12 uppercase tracking-tighter">MEMBER <span className="text-gradient">VOICES</span></h2>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass p-8 md:p-12 rounded-[2rem] relative"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(data[current].rating)].map((_, i) => <Star key={i} size={20} className="text-red-500 fill-red-500" />)}
              </div>
              <p className="text-xl md:text-2xl font-medium text-gray-300 italic leading-relaxed mb-8">
                "{data[current].text}"
              </p>
              <div>
                <div className="font-black text-xl uppercase tracking-widest">{data[current].name}</div>
                <div className="text-sm text-red-500 font-bold uppercase tracking-widest mt-1">{data[current].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors">
              <ChevronLeft />
            </button>
            <button onClick={next} className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display font-black text-5xl md:text-7xl mb-6 uppercase tracking-tighter">GET IN <span className="text-gradient">TOUCH</span></h2>
            <p className="text-gray-400 mb-12 text-lg">Ready to start? Visit us or drop a message. Our team is here to guide you.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-red-600/10 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest mb-1">Our Location</h4>
                  <p className="text-gray-400">Main Road, Ranchi, Jharkhand - 834001</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-red-600/10 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest mb-1">Call Us</h4>
                  <p className="text-gray-400">+91 97428 55697</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-red-600/10 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest mb-1">WhatsApp</h4>
                  <a href="https://wa.me/919742855697" className="text-red-500 font-bold hover:underline">Chat with us</a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[3rem]">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Phone</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500">
                  <option className="bg-black">General Inquiry</option>
                  <option className="bg-black">Personal Training</option>
                  <option className="bg-black">Free Trial Request</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-[0.3em] transition-all shadow-lg shadow-red-600/30">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="text-white w-5 h-5" />
              </div>
              <span className="font-display font-black text-xl tracking-tighter">IGNITE <span className="text-red-600">GYM</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              World-class fitness destination in Ranchi. Focused on performance, luxury, and body transformation.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"><Instagram size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"><Facebook size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"><Twitter size={18} /></div>
            </div>
          </div>

          <div>
             <h4 className="font-black uppercase tracking-widest text-sm mb-6">Quick Links</h4>
             <ul className="space-y-3 text-sm text-gray-500">
               <li><a href="#home" className="hover:text-red-500">Home</a></li>
               <li><a href="#about" className="hover:text-red-500">About</a></li>
               <li><a href="#programs" className="hover:text-red-500">Programs</a></li>
               <li><a href="#pricing" className="hover:text-red-500">Pricing</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-black uppercase tracking-widest text-sm mb-6">Support</h4>
             <ul className="space-y-3 text-sm text-gray-500">
               <li><a href="#" className="hover:text-red-500">FAQs</a></li>
               <li><a href="#" className="hover:text-red-500">Terms & Conditions</a></li>
               <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
               <li><a href="#contact" className="hover:text-red-500">Contact Support</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-black uppercase tracking-widest text-sm mb-6">Newsletter</h4>
             <p className="text-xs text-gray-500 mb-4">Get the latest fitness tips and offers directly in your inbox.</p>
             <div className="flex gap-2">
               <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-red-600" />
               <button className="bg-red-600 text-white p-2 rounded-lg"><ArrowRight size={16} /></button>
             </div>
          </div>
        </div>
        
        <div className="text-center pt-12 border-t border-white/5">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">
            © 2024 IGNITE GYM RANCHI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

const Loader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      onAnimationComplete={() => document.body.style.overflow = 'auto'}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <Dumbbell className="text-red-600 animate-bounce" size={64} />
        <h1 className="font-display font-black text-6xl tracking-tighter">IGNITE</h1>
      </motion.div>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-full bg-red-600"
        />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const observers = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => observers.observe(section));
    return () => observers.disconnect();
  }, []);

  return (
    <main className="font-sans antialiased bg-[#050505] selection:bg-red-600 selection:text-white">
      <Loader />
      <Navbar activeSection={activeSection} />
      
      <Hero />
      <About />
      <Programs />
      <Trainers />
      <Pricing />
      <BMICalculator />
      <Gallery />
      <Testimonials />
      <Contact />
      
      <Footer />

      {/* Floating WhatsApp for India */}
      <a 
        href="https://wa.me/919742855697" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageSquare size={24} />
      </a>
    </main>
  );
}

