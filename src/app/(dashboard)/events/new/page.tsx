import { EventForm } from '@/components/event-form';

export default function NewEventPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Create New Event</h1>
      <div className="rounded-lg border bg-card p-6">
        <EventForm mode="create" />
      </div>
    </div>
  );
}
