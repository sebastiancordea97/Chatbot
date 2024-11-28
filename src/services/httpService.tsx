import axios from 'axios';
import axiosRetry from 'axios-retry';

const httpService = axios.create({
    baseURL: 'https://chatbot-u2zl.onrender.com',
    timeout: 10000,
});

axiosRetry(httpService, {
    retries: 10,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    },
    onMaxRetryTimesExceeded: (err) => {
        console.error(err);
    }
});

export default httpService;
