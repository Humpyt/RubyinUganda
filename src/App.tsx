import React from 'react';
import { MapPin, Sun, Cloud, Home, Search, Calendar, ChevronDown, Aperture } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#5192a3] text-white text-[10px] sm:text-xs py-2 px-4 sm:px-8 flex justify-between items-center tracking-wider">
        <div className="flex items-center gap-2">
          <MapPin size={12} />
          <span>ST. ANDREWS, SCOTLAND</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span>FRIDAY</span>
            <Sun size={12} className="mx-1" />
            <span>24°C</span>
          </div>
          <div className="flex items-center gap-1">
            <span>SATURDAY</span>
            <Cloud size={12} className="mx-1" />
            <span>21°C</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white py-6 px-8 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Aperture size={32} className="text-gray-400" strokeWidth={1} />
          <span className="font-serif text-3xl tracking-widest text-gray-800">LEISURE</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-gray-500">
          <a href="#" className="text-[#d93838]"><Home size={16} /></a>
          <a href="#" className="hover:text-[#d93838] transition-colors">RESORT</a>
          <a href="#" className="hover:text-[#d93838] transition-colors">RECREATION</a>
          <a href="#" className="hover:text-[#d93838] transition-colors">EVENTS</a>
          <a href="#" className="hover:text-[#d93838] transition-colors">NEWS</a>
          <a href="#" className="hover:text-[#d93838] transition-colors">FEATURES</a>
          <a href="#" className="hover:text-[#d93838] transition-colors">CONTACT</a>
          <a href="#" className="hover:text-[#d93838] transition-colors"><Search size={16} /></a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=2070" 
          alt="Golfer on course" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        
        {/* Sub Nav Overlay */}
        <div className="absolute top-0 left-0 w-full bg-black/30 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 divide-x divide-white/20 text-center text-white">
              <div className="py-4 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="font-bold text-xs tracking-widest mb-1">ACCOMMODATION</div>
                <div className="text-[10px] text-gray-300 tracking-wider">ROOMS & SUITES</div>
              </div>
              <div className="py-4 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="font-bold text-xs tracking-widest mb-1">PRO GOLF CLUB</div>
                <div className="text-[10px] text-gray-300 tracking-wider">12 COURSES</div>
              </div>
              <div className="py-4 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="font-bold text-xs tracking-widest mb-1">TENNIS COURTS</div>
                <div className="text-[10px] text-gray-300 tracking-wider">ALL SEASONS</div>
              </div>
              <div className="py-4 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="font-bold text-xs tracking-widest mb-1">SWIMMING POOLS</div>
                <div className="text-[10px] text-gray-300 tracking-wider">OUTDOOR & INDOOR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-[#3a4740]/80 backdrop-blur-md py-6">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <input type="text" placeholder="Arrival Date" className="bg-transparent border border-white/30 text-white text-sm px-4 py-2 w-48 focus:outline-none focus:border-white placeholder-white/70" />
                <Calendar size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
              </div>
              <div className="relative">
                <input type="text" placeholder="Departure Date" className="bg-transparent border border-white/30 text-white text-sm px-4 py-2 w-48 focus:outline-none focus:border-white placeholder-white/70" />
                <Calendar size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
              </div>
              <div className="relative">
                <select className="appearance-none bg-transparent border border-white/30 text-white text-sm px-4 py-2 w-40 focus:outline-none focus:border-white">
                  <option className="text-black">Adults</option>
                  <option className="text-black">1 Adult</option>
                  <option className="text-black">2 Adults</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="appearance-none bg-transparent border border-white/30 text-white text-sm px-4 py-2 w-40 focus:outline-none focus:border-white">
                  <option className="text-black">Room</option>
                  <option className="text-black">Standard</option>
                  <option className="text-black">Deluxe</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none" />
              </div>
              <button className="bg-[#d93838] hover:bg-red-700 text-white text-sm font-bold px-8 py-2.5 transition-colors">
                Book a Room
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-4 text-center max-w-4xl mx-auto">
        <p className="font-serif italic text-gray-400 text-lg mb-3">What can you do with the Leisure Template?</p>
        <h2 className="font-serif text-4xl text-gray-800 tracking-wide mb-6">AWARD WINNING RESORT</h2>
        <div className="w-12 h-[2px] bg-[#d93838] mx-auto mb-8"></div>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non ornare eros. Ut pharetra ornare lorem, sit amet bibendum quam imperdiet ut.
        </p>
        <p className="text-gray-400 text-sm mb-10 leading-loose max-w-3xl mx-auto">
          Duis diam eros, dignissim sed condimentum ac, vehicula nec nisl. Suspendisse condimentum libero tempus, accumsan augue et, varius dui. Morbi justo tortor, tincidunt ornare magna ut, molestie mattis enim. Cras ac justo et augue suscipit euismod vel eget lectus. Proin vehicula nunc arcu, pulvinar accumsan.
        </p>
        <a href="#" className="font-bold text-sm text-gray-800 hover:text-[#d93838] tracking-wider transition-colors">
          What's happening at the Leisure Center?
        </a>
      </section>

      {/* Feature Section */}
      <section className="relative py-32 overflow-hidden bg-gray-50">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1535139262971-c51845709a48?auto=format&fit=crop&q=80&w=2070" 
            alt="Golfers background" 
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 relative h-80 mb-12 md:mb-0">
            <div className="absolute left-10 top-10 transform -rotate-6 shadow-2xl border-[10px] border-white w-64 z-10">
              <img src="https://images.unsplash.com/photo-1592916314466-4995f11e8609?auto=format&fit=crop&q=80&w=800" alt="Golf ball" className="w-full h-auto" />
            </div>
            <div className="absolute left-40 top-20 transform rotate-6 shadow-2xl border-[10px] border-white w-64 z-20">
              <img src="https://images.unsplash.com/photo-1535139262971-c51845709a48?auto=format&fit=crop&q=80&w=800" alt="Golf swing" className="w-full h-auto" />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-16 text-center md:text-left">
            <p className="font-serif italic text-gray-400 text-lg mb-3">Discover Nature & Fitness</p>
            <h2 className="font-serif text-4xl text-gray-800 tracking-wide mb-6">PLAY GOLF LIKE A PRO</h2>
            <div className="w-12 h-[2px] bg-[#d93838] mx-auto md:mx-0 mb-8"></div>
            <p className="text-gray-500 mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
              Cras ac justo et augue suscipit euismod vel eget lectus. Proin vehicula nunc arcu, pulvinar accumsan nulla porta vel. Vivamus malesuada vitae sem ac pellentesque.
            </p>
            <a href="#" className="font-bold text-sm text-gray-800 hover:text-[#d93838] tracking-wider transition-colors">
              Explore our Deluxe Golf Course
            </a>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-24 bg-white">
        <div className="text-center mb-16 px-4">
          <p className="font-serif italic text-gray-400 text-lg mb-3">What can you do at the Leisure Template?</p>
          <h2 className="font-serif text-4xl text-gray-800 tracking-wide mb-6">LEISURE CLUB ACTIVITIES</h2>
          <div className="w-12 h-[2px] bg-[#d93838] mx-auto"></div>
        </div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
            <div className="overflow-hidden mb-6 h-40">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" alt="Cuisine" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-xl text-gray-800 mb-4 leading-snug">International Cuisine<br/>for all Your Tastes</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A communi observantia non est recedendum. Cum ceteris in veneratione tui montes.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
            <div className="overflow-hidden mb-6 h-40">
              <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800" alt="Yacht" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-xl text-gray-800 mb-4 leading-snug">Take our Yacht and<br/>Visit the Surroundings</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Prima luce, cum quibus mons aliud consensu ab eo. Quid securi etiam tamquam eu fugiat.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
            <div className="overflow-hidden mb-6 h-40">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800" alt="Apartments" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-xl text-gray-800 mb-4 leading-snug">Studios & VIP<br/>Exclusive Apartments</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Magna pars studiorum, prodita quaerimus. Quid securi etiam tamquam eu fugiat nulla.
            </p>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white border border-gray-100 p-6 text-center group hover:shadow-xl transition-all duration-300">
            <div className="overflow-hidden mb-6 h-40">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800" alt="Fitness" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-xl text-gray-800 mb-4 leading-snug">Pro Fitness Instructor<br/>for Every Day Classes</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Praeterea iter est quasdam res quas ex communi. Vivamus sagittis lacus vel augue laoreet.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f8f8f8] py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="font-serif text-lg text-gray-800 mb-6">Leisure Club</h4>
            <div className="text-gray-400 text-sm leading-relaxed space-y-4">
              <p>
                St Andrews Scotland, United<br/>
                Kingdom KY16 8PN
              </p>
              <p>
                Tel +44 (0) 1334 837000<br/>
                Fax +44 (0) 1334 837099
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg text-gray-800 mb-6">The Resort</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              <li><a href="#" className="hover:text-[#d93838] transition-colors">Member Bookings</a></li>
              <li><a href="#" className="hover:text-[#d93838] transition-colors">Open Competitions</a></li>
              <li><a href="#" className="hover:text-[#d93838] transition-colors">Location</a></li>
              <li><a href="#" className="hover:text-[#d93838] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#d93838] transition-colors">Our Team</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
