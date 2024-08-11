import { StatusCodes } from "http-status-codes";

class AppErrors extends Error {
  explanation: string;
  statusCode: number;

  constructor(
    name: string,
    message: string = "Something went wrong",
    explanation: string = "Something went wrong",
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message); // Call the parent class constructor with the message
    this.name = name;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

export default AppErrors;
