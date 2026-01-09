// This file MUST be imported first before anything else
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Clear any existing DATABASE_URL that might be set from elsewhere
delete process.env.DATABASE_URL;

// Load .env from project root with override enabled
const envPath = path.resolve(__dirname, '../.env');
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

export {};
