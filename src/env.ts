// This file MUST be imported first before anything else
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// In production (Docker), environment variables come from the container
// In development, we load from .env file
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  // Clear any existing DATABASE_URL that might be set from elsewhere (dev only)
  delete process.env.DATABASE_URL;

  // Load .env from project root with override enabled
  const envPath = path.resolve(__dirname, '../.env');

  // Check if .env file exists before trying to read it
  if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath, override: true });

    if (result.error) {
      console.error('❌ Error loading .env file:', result.error);
    } else {
      console.log('✅ Environment variables loaded from .env');

      // Double-check by reading file directly
      const envContent = fs.readFileSync(envPath, 'utf8');
      const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);
      if (dbUrlMatch) {
        // Force set the DATABASE_URL from file content
        process.env.DATABASE_URL = dbUrlMatch[1];
        console.log('🔧 DATABASE_URL (forced):', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
      }
    }
  } else {
    console.warn('⚠️  .env file not found, using environment variables');
  }
} else {
  console.log('✅ Production mode: using container environment variables');
}

export {};
