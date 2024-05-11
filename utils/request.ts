import { IProperties } from '@/types/Properties';

export async function fetchProperties(): Promise<IProperties[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);

    if (!res.ok) {
      throw new Error('Failde to fetch data');
    }
    const result = (await res.json()) as IProperties[];
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
