"use server";

import { revalidatePath } from "next/cache";
import { createSafeActionClient } from "next-safe-action";
import { updateProductSchema } from "../schemas";
import connectMongo from "@/lib/mongoose";
import Product from "@/models/Product";

export const action = createSafeActionClient();

export const updateProduct = async (formData: any) => {
  if (!formData) return;

  // Connect to the database
  await connectMongo();

  try {
    const res: any = await Product.updateOne(
      { _id: formData.id },
      { $set: formData }
    );

    if (res.ok) {
      revalidatePath("/products");
      revalidatePath(`/products/${formData.id}`);
    }
  } catch (error) {
    console.error({ error });
  }
};
