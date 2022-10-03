export class Response {
	statusCode: number;
	message: [string];
	data: any;

	constructor(code: number, msg: [string], data: any) {
		this.statusCode = code;
		this.message = msg;
		this.data = data;
	}
}
