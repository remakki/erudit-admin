'use server';

import { api } from '@/lib/api-client';
import { revalidatePath } from 'next/cache';
import { EventCreate } from '@/types/events';
import { localDateTimeToUTC } from '@/lib/utils';

export async function deleteEventAction(id: number) {
  try {
    await api.events.delete(id);
    revalidatePath('/events');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete event',
    };
  }
}

export async function createEventAction(data: EventCreate) {
  try {
    const utcData = {
      ...data,
      image_url: data.image_url
        ? data.image_url
        : 'https://i.pinimg.com/736x/a9/7f/b6/a97fb6e3e6b9c41fda45bf13ce16982a.jpg',
      datetime_event: localDateTimeToUTC(data.datetime_event),
      registration_start: localDateTimeToUTC(data.registration_start),
      registration_end: localDateTimeToUTC(data.registration_end),
    };

    await api.events.create(utcData);
    revalidatePath('/events');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create event',
    };
  }
}

export async function updateEventAction(id: number, data: EventCreate) {
  try {
    const utcData = {
      ...data,
      image_url: data.image_url
        ? data.image_url
        : 'https://i.pinimg.com/736x/a9/7f/b6/a97fb6e3e6b9c41fda45bf13ce16982a.jpg',
      datetime_event: localDateTimeToUTC(data.datetime_event),
      registration_start: localDateTimeToUTC(data.registration_start),
      registration_end: localDateTimeToUTC(data.registration_end),
    };

    await api.events.update(id, utcData);
    revalidatePath('/events');
    revalidatePath(`/events/${id}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update event',
    };
  }
}

export async function getListEventsAction(actual?: boolean) {
  try {
    return await api.events.list(actual);
  } catch (error) {
    return [];
  }
}

export async function getEventAction(id: number) {
  try {
    return await api.events.get(id);
  } catch (error) {
    return {};
  }
}
