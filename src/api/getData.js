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


