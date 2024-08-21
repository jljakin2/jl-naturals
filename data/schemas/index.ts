import * as z from "zod";

export const updateProductSchema = z.object({
  id: z.string(),
  SKU: z.string().min(1, { message: "SKU cannot be empty" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Name cannot be empty" })
    .max(255, { message: "Name is too long" }),
  description: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .max(255, { message: "Description is too long" }),
  kind: z.enum([
    "Lip Balm",
    "Mineral Deodorant",
    "Hair Serum",
    "Cleansing Bar",
    "Shampoo Bar",
    "Face Salve",
    "Face Mask",
    "Salt Scrub",
    "Tinted Lip Balm",
    "Dish Soap",
  ]),
  customer: z.string().min(1, { message: "Customer cannot be empty" }).trim(),
  NDA: z.boolean().default(false),
  UPC: z.string().trim().optional(),
  hsCode: z.string().trim().optional(),
  broadCode: z.string().trim().optional(),
  scent: z.string().trim().optional(),
  scentCode: z.string().trim().optional(),
  maxBatchSize: z.number().optional(),
  meltTemp: z.number().optional(),
  fillTemp: z.number().optional(),
  skinRegimen: z.string().trim().optional(),
  hairRegimen: z.string().trim().optional(),
  containerType: z.string().trim().optional(),
  containerDimensions: z.string().trim().optional(),
  containerSize: z.number().optional(),
  productSize: z.number().optional(),
  microbial: z.string().trim().optional(),
  testing2: z.string().trim().optional(),
  testing3: z.string().trim().optional(),
  labels: z
    .array(
      z.object({
        type: z.string().trim().optional(),
        size: z.string().trim().optional(),
      })
    )
    .optional(),
  sealType: z.string().trim().optional(),
  sealAmount: z.number().optional(),
  scoop: z.boolean().default(false),
  containmentBox: z
    .object({
      color: z.string().trim().optional(),
      size: z.string().trim().optional(),
    })
    .optional(),
  tulipLinerSize: z.string().trim().optional(),
  finalProductWeight: z.number().optional(),
  shippingBox: z
    .object({
      size: z.string().trim().optional(),
      quantity: z.number().optional(),
    })
    .optional(),
});
