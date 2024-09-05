import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export function useGet(url, dependencies = []) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await axios.get(BASE_URL + url);
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchData);

  if (dependencies.length > 0) {
    watch(dependencies, fetchData);
  }

  return { data, error, loading, refetch: fetchData };
}

export function usePost(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const postData = async (payload, headers = {}) => {
    loading.value = true;
    try {
      const response = await axios.post(BASE_URL + url, payload, { headers });
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, postData };
}

export function usePut(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const putData = async (payload, headers = {}) => {
    loading.value = true;
    try {
      const response = await axios.put(BASE_URL + url, payload, { headers });
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, putData };
}

export function useDelete(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const deleteData = async (headers = {}) => {
    loading.value = true;
    try {
      const response = await axios.delete(BASE_URL + url, { headers });
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, deleteData };
}
