import axios from '../../../api/axiosInstance';
import { ComitteMemberMap } from '../types';

export const create = async (payload: ComitteMemberMap) => {
  const res = await axios.post('/api/comitte-member-map', payload);
  return res.data;
};

export const update = async (id: number, payload: Partial<ComitteMemberMap>) => {
  const res = await axios.put(`/api/comitte-member-map/${id}`, payload);
  return res.data;
};

export const remove = async (id: number) => {
  await axios.delete(`/api/comitte-member-map/${id}`);
};