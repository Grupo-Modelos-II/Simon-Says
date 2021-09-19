class HttpClient{

    constructor(url = 'http://localhost:5000') {
        this.url = url;
        this.headers = { 'Content-Type': 'application/json' };
    }

    addHeader(header) {
      this.headers[header.name] = header.value;
    }

    async sendRequest(request) {
        return await (await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(request.data),
        })).json();
      }
    
    async get(endpoint) {
        return await this.sendRequest({
          url: `${this.url}${endpoint}`,
          method: 'GET',
          headers: this.headers,
        });
      }
    
    async post(endpoint, data) {
        return await this.sendRequest({
          url: `${this.url}${endpoint}`,
          method: 'POST',
          headers: this.headers,
          data,
        });
      }
    
    async put(endpoint, data) {
        return await this.sendRequest({
          url: `${this.url}${endpoint}`,
          method: 'PUT',
          headers: this.headers,
          data,
        });
      }
    
    async del(endpoint) {
        return await this.sendRequest({
          url: `${this.url}${endpoint}`,
          method: 'DELETE',
          headers: this.headers,
        });
      }
}