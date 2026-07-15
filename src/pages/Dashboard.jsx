import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import CurrencyConverter from '../components/CurrencyConverter.jsx';
import MangoCouple from '../components/MangoCouple.jsx';
import WeatherForecast from '../components/WeatherForecast.jsx';
import AppGuideModal from '../components/AppGuideModal.jsx';

export default function Dashboard() {
  const { weather } = travelData;
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setGuideOpen(true)}
        className="block text-[10px] font-semibold text-gray-300 active:text-rose-400 transition-colors"
      >
        SHANGHAI TRAVEL 이용가이드 ›
      </button>

      <div className="animate-card-in">
        <MangoCouple />
      </div>

      <div className="animate-card-in" style={{ animationDelay: '0.08s' }}>
        <WeatherForecast days={weather} />
      </div>

      <div className="animate-card-in" style={{ animationDelay: '0.16s' }}>
        <CurrencyConverter />
      </div>

      <AppGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} data={travelData.appGuide} />
    </div>
  );
}
