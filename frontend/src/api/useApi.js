import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

export function useGet(url, dependency = null) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await axios.get(url);
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchData);

  if (dependency) {
    watch(dependency, fetchData);
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
      const response = await axios.post(url, payload, { headers });
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, postData };
}

export function useDelete(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const deleteData = async (headers = {}) => {
    loading.value = true;
    try {
      const response = await axios.delete(url, { headers });
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, deleteData };
}

export function usePut(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const putData = async (payload, headers = {}) => {
    loading.value = true;
    try {
      const response = await axios.put(url, payload, { headers });
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, putData };
}
