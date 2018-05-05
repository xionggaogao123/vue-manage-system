import axios from 'axios'


let host = 'http://localhost:9001';
if(window.location.hostname === 'coinwallet-admin.adbaitai.com') {
    host = 'http://coinwallet-admin.adbaitai.com';
}

// 投资 列表
export const investList =(params) => {
    return axios.get(`${host}/admin/invest/paging?pageNo=`+params.pageNo +'&industry='+ params.industry + '&type=' + params.type + '&status='+params.status);
};

//平台列表
export const platformList =(params) => {
    return axios.get(`${host}/admin/platform/paging?pageNo=`+params.pageNo +'&industry='+ params.industry + '&type=' + params.type + '&status='+params.status);
};

export const platformAllList =(params) => {
    return axios.get(`${host}/admin/platform/list-all`);
};

export const createInvest =(params) => {
  return axios.post(`${host}/admin/invest/create`, params);
};

export const  createPlatform =(params) => {
  return axios.post(`${host}/admin/platform/create`, params);
};

export const  findPlatform =(params) => {
    return axios.get(`${host}/admin/platform/find-by-id?id=`+params.id);
};

export const  updatePlatform =(params) => {
  return axios.post(`${host}/admin/platform/update`, params);
};

export const countTotalMoney =() => {
    return axios.get(`${host}/admin/count/total-money`);
};

export const  createIncome =(params) => {
  return axios.post(`${host}/admin/record/income`, params);
};

export const createConsume =(params) => {
  return axios.post(`${host}/admin/record/consume`, params);
};

export const  consumeList =(params) => {
  return axios.get(`${host}/admin/consume/list`, params);
};

export  const  eachMonthConsumeList =() => {
  return axios.get(`${host}/admin/count/pre-monty-consume`);
};

export const  userList =(params) => {
    return axios.get(`${host}/admin/user/paging`, params);
};

export  const  createUser =(params) => {
  return axios.post(`${host}/admin/user/add`, params);
};
