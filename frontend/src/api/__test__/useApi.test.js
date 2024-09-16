import { ref } from 'vue';
import { useGet, usePost, useDelete, usePut } from '../useApi'; // Adjust the path accordingly
import axios from '../backendApi'; // Adjust the path accordingly
import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';

describe('API Hooks', () => {

  // Mock Component to use in tests
  const mockComponent = (url, dependency = []) => {
    return {
      setup() {
        return useGet(url, dependency);
      },
      template: `<div></div>` // A simple template is required
    };
  };

  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  // useGet Test Cases
  describe('useGet', () => {
    it('should fetch data on mount', async () => {
      const mockData = { data: 'test data' };
      mock.onGet('/items').reply(200, mockData);

      const wrapper = mount(mockComponent('/items'));

      await flushPromises();

      const { data, loading } = wrapper.vm;

      expect(loading).toBe(false);
      expect(data).toEqual(mockData);
    });

    it('should handle errors correctly', async () => {
      mock.onGet('/items').reply(500);

      const wrapper = mount(mockComponent('/items'));

      await flushPromises();

      const { error, loading } = wrapper.vm;

      expect(loading).toBe(false);
      expect(error).toEqual(new Error('Request failed with status code 500'));
    });

    it('should refetch data when dependencies change', async () => {
      const mockData1 = { data: 'initial data' };
      const mockData2 = { data: 'updated data' };
      const mockData3 = { data: 'final data' };
      
      mock.onGet('/items').reply(200, mockData1);

      const dependency1 = ref(1);
      const dependency2 = ref('a');
      const wrapper = mount(mockComponent('/items', [dependency1, dependency2]));

      await flushPromises();
      
      let { data, loading } = wrapper.vm;
      expect(loading).toBe(false);
      expect(data).toEqual(mockData1);

      mock.onGet('/items').reply(200, mockData2);
      dependency1.value = 2;

      await flushPromises();
      
      ({ data, loading } = wrapper.vm);
      expect(loading).toBe(false);
      expect(data).toEqual(mockData2);

      mock.onGet('/items').reply(200, mockData3);
      dependency2.value = 'b';

      await flushPromises();
      
      ({ data, loading } = wrapper.vm);
      expect(loading).toBe(false);
      expect(data).toEqual(mockData3);
    });
  });

  // usePost Test Cases
  describe('usePost', () => {
    it('should post data and return response', async () => {
      const mockResponse = { data: 'post success' };
      mock.onPost('/items').reply(200, mockResponse);

      const { data, postData } = usePost('/items');
      postData({ name: 'New Item' });

      await flushPromises();
      expect(data.value).toEqual(mockResponse);
    });

    it('should handle post errors correctly', async () => {
      mock.onPost('/items').reply(500);

      const { error, postData } = usePost('/items');
      postData({ name: 'New Item' });

      await flushPromises();
      expect(error.value).toEqual(new Error('Request failed with status code 500'));
    });
  });

  // useDelete Test Cases
  describe('useDelete', () => {
    it('should delete data and return response', async () => {
      const mockResponse = { data: 'delete success' };
      mock.onDelete('/items/1').reply(200, mockResponse);

      const { data, deleteData } = useDelete('/items/1');
      deleteData();

      await flushPromises();
      expect(data.value).toEqual(mockResponse);
    });

    it('should handle delete errors correctly', async () => {
      mock.onDelete('/items/1').reply(500);

      const { error, deleteData } = useDelete('/items/1');
      deleteData();

      await flushPromises();
      expect(error.value).toEqual(new Error('Request failed with status code 500'));
    });
  });

  // usePut Test Cases
  describe('usePut', () => {
    it('should put data and return response', async () => {
      const mockResponse = { data: 'put success' };
      mock.onPut('/items/1').reply(200, mockResponse);

      const { data, putData } = usePut('/items/1');
      putData({ name: 'Updated Item' });

      await flushPromises();
      expect(data.value).toEqual(mockResponse);
    });

    it('should handle put errors correctly', async () => {
      mock.onPut('/items/1').reply(500);

      const { error, putData } = usePut('/items/1');
      putData({ name: 'Updated Item' });

      await flushPromises();
      expect(error.value).toEqual(new Error('Request failed with status code 500'));
    });
  });
});
