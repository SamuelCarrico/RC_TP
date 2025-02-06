class HttpUtils {
    static async get(url: string, headers?: Record<string, string>): Promise<any> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });
        return response.json();
    }

    static async post(url: string, data: any, headers: Record<string, string>): Promise<any> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
}

export default HttpUtils;
