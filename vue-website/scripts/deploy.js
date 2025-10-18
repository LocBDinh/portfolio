import { execSync } from "child_process";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Fix __dirname esm modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const bucket = process.env.AWS_S3_BUCKET;
const distId = process.env.CLOUDFRONT_ID;

if (!bucket || !distId) {
  console.error("❌ Missing environment variables, check the .env file.");
  process.exit(1);
}

try {
  console.log("🚀 Building project...");
  execSync("npm run build", { stdio: "inherit" });

  console.log(`📦 Uploading to S3 bucket: ${bucket}`);
  execSync(`aws s3 sync dist/ s3://${bucket} --delete`, { stdio: "inherit" });

  console.log(`🌍 Invalidating CloudFront distribution: ${distId}`);
  execSync(`aws cloudfront create-invalidation --distribution-id ${distId} --paths "/*"`, { stdio: "inherit" });

  console.log("✅ Deployment complete!");
} catch (error) {
  console.error("❌ Deployment failed:", error.message);
  process.exit(1);
}
