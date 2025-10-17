import axios from '../../../api/axiosInstance';
import { Comitte } from '../types';

export const getMemberComittes = async (memberId: number): Promise<Comitte[]> => {
  const res = await axios.get<Comitte[]>(`/api/comittes/member/${memberId}`);
  return res.data;
};

export const getOwnerComittes = async (ownerId: number): Promise<Comitte[]> => {
  const res = await axios.get<Comitte[]>(`/api/comittes/owner/${ownerId}`);
  return res.data;
};

export const deleteComitte = async (comitteId: number): Promise<void> => {
  await axios.delete(`/api/comittes/${comitteId}`);
};

export const getComitte = async (comitteId: number): Promise<Comitte> => {
  const res = await axios.get<Comitte>(`/api/comittes/${comitteId}`);
  return res.data;
};

export const updateComitte = async (comitteId: number, payload: Partial<Comitte>) => {
  const res = await axios.put<Comitte>(`/api/comittes/${comitteId}`, payload);
  return res.data;
};

export const createComitte = async (payload: Partial<Comitte>) => {
  const res = await axios.post<Comitte>('/api/comittes', payload);
  return res.data;
};