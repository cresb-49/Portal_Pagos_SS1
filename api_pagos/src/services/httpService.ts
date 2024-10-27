import axios from 'axios';

// Use `Parameters` to get the request config type
type AxiosRequestConfig = Parameters<typeof axios.get>[1];

export const GET = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.get(url, config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export const POST = async (url: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export const PUT = async (url: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put(url, data, config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export const DELETE = async (url: string, config?: AxiosRequestConfig): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.delete(url, config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export const PATCH = async (url: string, data: any, config?: AxiosRequestConfig): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.patch(url, data, config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
