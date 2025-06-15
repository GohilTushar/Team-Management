import { httpStatusCodeType } from "../config/http.config";

export const errorHandler = (
  err: any,
  req: any,
  res: any,
  next: any
): any => {
    return res.status(err.status || httpStatusCodeType.INTERNAL_SERVER_ERROR).json({
        status: err.status || httpStatusCodeType.INTERNAL_SERVER_ERROR,
        message: err.message || "Internal Server Error",
    });
};
