import { DataTable } from '@/components/data-table';

import data from '../data.json';
import { Event } from '@/types/event';

export default function EventsPage() {
  const events: Event[] = [
    {
      id: 1,
      number: 101,
      title: 'Эрудит-пати',
      description: 'Интеллектуальная викторина',
      datetime_event: '2025-09-20T18:00:00',
      registration_start: '2025-09-01T00:00:00',
      registration_end: '2025-09-19T23:59:59',
      duration: 120,
      location: 'Москва, ул. Пушкина',
      format: 'classic',
      price: 500,
      theme: 'История',
      max_teams: 20,
      image_url: null,
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
