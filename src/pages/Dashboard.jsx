import { travelData } from '../data/travelData.js';
import CurrencyConverter from '../components/CurrencyConverter.jsx';
import MangoCouple from '../components/MangoCouple.jsx';
import WeatherForecast from '../components/WeatherForecast.jsx';

export default function Dashboard() {
  const { weather } = travelData;

  return (
    <div className="space-y-4">
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
