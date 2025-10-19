import { Event } from '@/types/events';
import { EventForm } from '@/components/event-form';
import { getEventAction } from '@/app/actions/events';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = (await getEventAction(parseInt(id))) as Event;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Редактировать событие</h1>
      <div className="rounded-lg border bg-card p-6">
        <EventForm event={event} mode="edit" />
      </div>
    </div>
  );
}
