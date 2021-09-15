class HttpClient{

    constructor(url = 'localhost:5000/') {
        this.url = url.endsWith('/') ? url : `${url}/`;
        this.headers = { 'Content-Type': 'application/json' };
    }

    async sendRequest(request) {
        return await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(request.data),
        });
      }
    
    async get(endpoint) {
        return this.sendRequest({
          url: `${this.url}${endpoint}`,
          method: 'GET',
        });
      }
    
    async post(endpoint, data) {
        return this.sendRequest({
          url: `${this.url}${endpoint}`,
          method: 'POST',
          headers: this.headers,
          data,
        });
      }
    
    async put(endpoint, data) {
        return this.sendRequest({
          url: `${this.url}${endpoint}`,
          method: 'PUT',
          headers: this.headers,
          data,
        });
      }
    
    async del(endpoint) {
        return this.sendRequest({
          url: `${this.url}${endpoint}`,
          method: 'DELETE',
        });
      }
}