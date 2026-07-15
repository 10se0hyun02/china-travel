import { travelData } from '../data/travelData.js';
import CurrencyConverter from '../components/CurrencyConverter.jsx';
import MangoCouple from '../components/MangoCouple.jsx';
import WeatherForecast from '../components/WeatherForecast.jsx';

export default function Dashboard() {
  const { meta, weather } = travelData;

  return (
    <div className="space-y-4">
      <div className="animate-card-in">
        <MangoCouple />
      </div>

      <div
        className="animate-card-in bg-white rounded-2xl shadow-sm border border-rose-100 p-4 text-center"
        style={{ animationDelay: '0.08s' }}
      >
        <p className="text-sm text-gray-500">
          {meta.startDate} ~ {meta.endDate}
        </p>
      </div>

      <div className="animate-card-in" style={{ animationDelay: '0.16s' }}>
        <WeatherForecast days={weather} />
      </div>

      <div className="animate-card-in" style={{ animationDelay: '0.24s' }}>
        <CurrencyConverter />
      </div>
    </div>
  );
}
