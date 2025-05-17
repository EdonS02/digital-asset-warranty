export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly error?: string
  ) {
    super(message);
    this.name = 'HttpException';
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  getResponse() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      error: this.error || this.name
    };
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message, 'Not Found');
    this.name = 'NotFoundException';
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message, 'Bad Request');
    this.name = 'BadRequestException';
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Internal server error') {
    super(500, message, 'Internal Server Error');
    this.name = 'InternalServerErrorException';
  }
}
  