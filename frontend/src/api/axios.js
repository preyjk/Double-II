import instance from './backendApi';

export default function request(config) {
  return instance(config);
};
