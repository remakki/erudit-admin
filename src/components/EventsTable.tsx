'use client';

import { Event } from '@/types/event';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export function EventsTable({ events }: { events: Event[] }) {
  return (
    <Table>
      <TableCaption>Список всех событий</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead>Регистрация</TableHead>
          <TableHead>Место</TableHead>
          <TableHead>Формат</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead>Команд</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.number}</TableCell>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>
              {new Date(event.datetime_event).toLocaleString('ru-RU', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </TableCell>
            <TableCell>
              {new Date(event.registration_start).toLocaleDateString('ru-RU')} –{' '}
              {new Date(event.registration_end).toLocaleDateString('ru-RU')}
            </TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>{event.format ?? '-'}</TableCell>
            <TableCell>{event.price} ₽</TableCell>
            <TableCell>{event.max_teams}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Действия</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => alert(`Редактировать ${event.id}`)}>
                    Редактировать
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => alert(`Удалить ${event.id}`)}
                  >
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
