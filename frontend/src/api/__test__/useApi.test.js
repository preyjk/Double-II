import { ref } from 'vue';
import { useGet, usePost, useDelete, usePut } from '../useApi'; // Adjust the path accordingly
import axios from 'axios';
import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';

vi.mock('axios');

describe('API Hooks', () => {
  // Mock Component to use in tests
  const mockComponent = (url, dependency = null) => {
    return {
      setup() {
        return useGet(url, dependency);
      },
      template: `<div></div>` // A simple template is required
    };
  };

  // useGet Test Cases
  describe('useGet', () => {
    it('should fetch data on mount', async () => {
      const mockData = { data: 'test data' };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const wrapper = mount(mockComponent('https://api.example.com/items'));

      await flushPromises();
      
      const { data, loading } = wrapper.vm;

      expect(loading).toBe(false);
      expect(data).toEqual(mockData);
    });

    it('should handle errors correctly', async () => {
      const mockError = new Error('Network Error');
      axios.get.mockRejectedValueOnce(mockError);

      const wrapper = mount(mockComponent('https://api.example.com/items'));
      
      await flushPromises();
      
      const { error, loading } = wrapper.vm;

      expect(loading).toBe(false);
      expect(error).toEqual(mockError);
    });

    it('should refetch data when dependency changes', async () => {
      const mockData = { data: 'new data' };
      const dependency = ref('initial');

      axios.get.mockResolvedValueOnce({ data: mockData });
      
      const wrapper = mount(mockComponent('https://api.example.com/items', dependency));

      await flushPromises();
      expect(wrapper.vm.data).toEqual(mockData);

      axios.get.mockResolvedValueOnce({ data: 'updated data' });
      dependency.value = 'updated';
      await flushPromises();
      expect(wrapper.vm.data).toEqual('updated data');
    });
  });

  // usePost Test Cases
  describe('usePost', () => {
    it('should post data and return response', async () => {
      const mockResponse = { data: 'post success' };
      axios.post.mockResolvedValueOnce({ data: mockResponse });

      const { data, postData } = usePost('https://api.example.com/items');
      postData({ name: 'New Item' });
      
      await flushPromises();
      expect(data.value).toEqual(mockResponse);
    });

    it('should handle post errors correctly', async () => {
      const mockError = new Error('Post Error');
      axios.post.mockRejectedValueOnce(mockError);

      const { error, postData } = usePost('https://api.example.com/items');
      postData({ name: 'New Item' });

      await flushPromises();
      expect(error.value).toEqual(mockError);
    });
  });

  // useDelete Test Cases
  describe('useDelete', () => {
    it('should delete data and return response', async () => {
      const mockResponse = { data: 'delete success' };
      axios.delete.mockResolvedValueOnce({ data: mockResponse });

      const { data, deleteData } = useDelete('https://api.example.com/items/1');
      deleteData();
      
      await flushPromises();
      expect(data.value).toEqual(mockResponse);
    });

    it('should handle delete errors correctly', async () => {
      const mockError = new Error('Delete Error');
      axios.delete.mockRejectedValueOnce(mockError);

      const { error, deleteData } = useDelete('https://api.example.com/items/1');
      deleteData();

      await flushPromises();
      expect(error.value).toEqual(mockError);
    });
  });

  // usePut Test Cases
  describe('usePut', () => {
    it('should put data and return response', async () => {
      const mockResponse = { data: 'put success' };
      axios.put.mockResolvedValueOnce({ data: mockResponse });

      const { data, putData } = usePut('https://api.example.com/items/1');
      putData({ name: 'Updated Item' });
      
      await flushPromises();
      expect(data.value).toEqual(mockResponse);
    });

    it('should handle put errors correctly', async () => {
      const mockError = new Error('Put Error');
      axios.put.mockRejectedValueOnce(mockError);

      const { error, putData } = usePut('https://api.example.com/items/1');
      putData({ name: 'Updated Item' });

      await flushPromises();
      expect(error.value).toEqual(mockError);
    });
  });
});
