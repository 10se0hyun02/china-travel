import { travelData } from '../data/travelData.js';
import CurrencyConverter from '../components/CurrencyConverter.jsx';
import MangoCouple from '../components/MangoCouple.jsx';
import WeatherForecast from '../components/WeatherForecast.jsx';

export default function Dashboard() {
  const { meta, weather } = travelData;

  return (
    <div className="space-y-4">
      <MangoCouple />

      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4 text-center">
        <p className="text-sm text-gray-500">
          {meta.startDate} ~ {meta.endDate}
        </p>
      </div>

      <WeatherForecast days={weather} />

      <CurrencyConverter />
    </div>
  );
}
