import { EventList } from '@/types/events';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { EventsTable } from '@/components/events-table';
import { getListEventsAction } from '@/app/actions/events';

export default async function EventsPage() {
  const data = (await getListEventsAction()) as EventList;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">События</h1>
        <Link href="/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Новое событие
          </Button>
        </Link>
      </div>

      <EventsTable events={data.events} />
    </div>
  );
}
