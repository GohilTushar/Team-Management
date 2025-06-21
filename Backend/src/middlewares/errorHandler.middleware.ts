import { ZodError } from "zod";
import { httpStatusCodeType } from "../config/http.config";

export const errorHandler = (
  err: any,
  req: any,
  res: any,
  next: any
): any => {

  if (err instanceof ZodError) {
    return res.status(httpStatusCodeType.BAD_REQUEST).json({
      status: httpStatusCodeType.BAD_REQUEST,
      errors: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

    return res.status(err.status || httpStatusCodeType.INTERNAL_SERVER_ERROR).json({
        status: err.status || httpStatusCodeType.INTERNAL_SERVER_ERROR,
        message: err.message || "Internal Server Error",
    });
};
