import { travelData } from '../data/travelData.js';
import CurrencyConverter from '../components/CurrencyConverter.jsx';
import MangoCouple from '../components/MangoCouple.jsx';
import WeatherForecast from '../components/WeatherForecast.jsx';

export default function Dashboard({ onNavigate }) {
  const { weather } = travelData;

  return (
    <div className="space-y-4">
      {onNavigate && (
        <button
          type="button"
          onClick={() => onNavigate('info')}
          className="block text-[10px] font-semibold text-gray-300 active:text-rose-400 transition-colors"
        >
          SHANGHAI TRAVEL 이용가이드 ›
        </button>
      )}

      <div className="animate-card-in">
        <MangoCouple />
      </div>

      <div className="animate-card-in" style={{ animationDelay: '0.08s' }}>
        <WeatherForecast days={weather} />
      </div>

      <div className="animate-card-in" style={{ animationDelay: '0.16s' }}>
        <CurrencyConverter />
      </div>
    </div>
  );
}
