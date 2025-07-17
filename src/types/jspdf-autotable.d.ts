/* eslint-disable @typescript-eslint/no-explicit-any */
import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
      [key: string]: any;
    };
  }
}
