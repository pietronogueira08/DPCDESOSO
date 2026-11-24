import "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DialogHTMLAttributes<T> {
    closedby?: "any" | "closerequest" | "none";
  }
}
