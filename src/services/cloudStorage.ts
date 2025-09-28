import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import AWS from "aws-sdk";

export class CloudStorage {
  supabase = createSupabaseClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
  s3 = new AWS.S3({ region: "us-east-1" });

  async uploadFile({ buffer, filename, provider }: { buffer: Buffer; filename: string; provider: "supabase" | "s3" }) {
    if (provider === "supabase") {
      return await this.supabase.storage.from("user-files").upload(filename, buffer, { contentType: "application/octet-stream" });
    } else if (provider === "s3") {
      return await this.s3
        .putObject({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: filename,
          Body: buffer,
          ACL: "private",
        })
        .promise();
    }
    throw new Error("Unknown provider");
  }

  async getFile({ filename, provider }: { filename: string; provider: "supabase" | "s3" }) {
    if (provider === "supabase") {
      return await this.supabase.storage.from("user-files").download(filename);
    } else if (provider === "s3") {
      return await this.s3
        .getObject({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: filename,
        })
        .promise();
    }
    throw new Error("Unknown provider");
  }
}