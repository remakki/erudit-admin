'use client';

import { Event } from '@/types/events';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { deleteEventAction } from '@/app/actions/events';
import { formatDateShort } from '@/lib/utils';

export function EventsTable({ events }: { events: Event[] }) {
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const result = await deleteEventAction(id);
      if (result.success) {
        toast.success('Event deleted successfully');
      } else {
        toast.error(result.error || 'Failed to delete event');
      }
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Место</TableHead>
            <TableHead>Формат</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Макс. команд</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Событий не найдено
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.number}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{formatDateShort(event.datetime_event)}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell className="capitalize">{event.format || '-'}</TableCell>
                <TableCell>{event.price} ₽</TableCell>
                <TableCell>{event.max_teams}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/events/${event.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/events/${event.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(event.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
