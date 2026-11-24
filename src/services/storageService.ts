import { getSupabaseAdminClient } from "@/lib/supabaseClient";

export type StorageBucket = "project-images" | "team-photos" | "resumes";

export interface UploadResult {
  path: string;
  publicUrl?: string;
  error?: string;
}

export class SupabaseStorageService {
  /**
   * Uploads a file to a designated Supabase Storage bucket.
   * If the bucket is public (e.g. project-images, team-photos), generates a permanent public URL.
   * For private buckets (e.g. resumes), returns the secured storage path.
   */
  static async uploadFile(
    bucket: StorageBucket,
    filePath: string,
    fileBuffer: Buffer | Blob | Uint8Array,
    contentType?: string
  ): Promise<UploadResult> {
    try {
      const supabase = getSupabaseAdminClient();

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (error) {
        return { path: "", error: error.message };
      }

      if (bucket !== "resumes") {
        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);

        return {
          path: data.path,
          publicUrl: publicUrlData.publicUrl,
        };
      }

      return {
        path: data.path,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Storage upload failed";
      return { path: "", error: message };
    }
  }

  /**
   * Generates a temporary time-limited signed download URL for private files (e.g. candidate resumes).
   * Default expiration: 1 hour (3600 seconds).
   */
  static async getSignedUrl(
    bucket: StorageBucket,
    filePath: string,
    expiresInSeconds: number = 3600
  ): Promise<{ signedUrl?: string; error?: string }> {
    try {
      const supabase = getSupabaseAdminClient();
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filePath, expiresInSeconds);

      if (error) {
        return { error: error.message };
      }

      return { signedUrl: data.signedUrl };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to generate signed URL";
      return { error: message };
    }
  }

  /**
   * Removes a file from storage.
   */
  static async deleteFile(bucket: StorageBucket, filePath: string): Promise<boolean> {
    try {
      const supabase = getSupabaseAdminClient();
      const { error } = await supabase.storage.from(bucket).remove([filePath]);
      return !error;
    } catch {
      return false;
    }
  }
}
