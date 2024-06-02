import { IProperties } from '@/types/Properties';

//fetch all properties
export async function fetchProperties(): Promise<IProperties[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`, {
      cache: 'no-store',
    });

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
//fetch single property
export async function fetchProperty(id: string | string[]): Promise<IProperties | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Failde to fetch data');
    }
    const result = (await res.json()) as IProperties;
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
