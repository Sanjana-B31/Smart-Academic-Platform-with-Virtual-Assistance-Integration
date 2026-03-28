import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-emerald-500/30">
      <Navbar />
      <Hero />
      <Mission />
      <Categories />
      {/* If this "Ready to Start" section looks like a duplicate, delete lines 14-19 */}
      <Footer /> 
    </div>
  );
}
