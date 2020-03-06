export class APIError implements Error {
    name: string;
    message: string;
    stack?: string;
    constructor(message :string) {
        this.message=message;
       this.name = "APIError"; // (2)
    }
  }