import axios from 'axios';

const getHeaders = () => ({
    Authorization: 'Basic YXBpa2V5Ok1iaU40cTBkcXlEblQ3Mm1JMVhsblBDZUtaZDdhM0R3dTRKYlBWSnMxdWNU'
})

const getHttp = () => {
  const headers = getHeaders();
  const instance = axios.create({
    headers
  });
  return instance;
};

const post = (endpoint, data) => {
  const promise = getHttp().request({
    method: 'POST',
    url: endpoint,
    data
  });

  return promise;
};

export { post };