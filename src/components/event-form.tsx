'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Event, EventCreate } from '@/types/events';
import { toast } from 'react-toastify';
import { createEventAction, updateEventAction } from '@/app/actions/events';
import { utcToLocalDateTime } from '@/lib/utils';

interface EventFormProps {
  event?: Event;
  mode: 'create' | 'edit';
}

export function EventForm({ event, mode }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EventCreate>({
    number: event?.number || 1,
    title: event?.title || '',
    description: event?.description || '',
    datetime_event: event?.datetime_event ? utcToLocalDateTime(event.datetime_event) : '',
    registration_start: event?.registration_start
      ? utcToLocalDateTime(event.registration_start)
      : '',
    registration_end: event?.registration_end ? utcToLocalDateTime(event.registration_end) : '',
    duration: event?.duration || 120,
    location: event?.location || '',
    format: event?.format || null,
    price: event?.price || 0,
    theme: event?.theme || null,
    max_teams: event?.max_teams || 10,
    image_url: event?.image_url || null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (mode === 'create') {
        result = await createEventAction(formData);
      } else if (event) {
        result = await updateEventAction(event.id, formData);
      }

      if (result?.success) {
        toast.success(`Event ${mode === 'create' ? 'created' : 'updated'} successfully`);
        router.push('/events');
      } else {
        toast.error(result?.error || `Failed to ${mode} event`);
      }
    } catch (error) {
      toast.error(`Failed to ${mode} event`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="number">Номер события</Label>
          <Input
            id="number"
            type="number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="title">Название</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="md:col-span-2 space-y-1">
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="datetime_event">Дата и время</Label>
          <Input
            id="datetime_event"
            type="datetime-local"
            value={formData.datetime_event}
            onChange={(e) => setFormData({ ...formData, datetime_event: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="duration">Продолжительность (мин)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="registration_start">Начало регистрации</Label>
          <Input
            id="registration_start"
            type="datetime-local"
            value={formData.registration_start}
            onChange={(e) => setFormData({ ...formData, registration_start: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="registration_end">Конец регистрации</Label>
          <Input
            id="registration_end"
            type="datetime-local"
            value={formData.registration_end}
            onChange={(e) => setFormData({ ...formData, registration_end: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="location">Место проведения</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="format">Формат</Label>
          <Select
            value={formData.format || ''}
            onValueChange={(value) =>
              setFormData({ ...formData, format: value as 'classic' | 'family' })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Классический</SelectItem>
              <SelectItem value="family">Семейный</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="price">Цена (руб.)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="max_teams">Максимальное число команд</Label>
          <Input
            id="max_teams"
            type="number"
            value={formData.max_teams}
            onChange={(e) => setFormData({ ...formData, max_teams: parseInt(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="theme">Тема события (опционально)</Label>
          <Input
            id="theme"
            value={formData.theme || ''}
            onChange={(e) => setFormData({ ...formData, theme: e.target.value || null })}
          />
        </div>

        <div className="md:col-span-2 space-y-1">
          <Label htmlFor="image_url">Ссылка на изображение (опционально)</Label>
          <Input
            id="image_url"
            value={formData.image_url || ''}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value || null })}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Сохранение...' : mode === 'create' ? 'Создать событие' : 'Обновить событие'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Отмена
        </Button>
      </div>
    </form>
  );
}
