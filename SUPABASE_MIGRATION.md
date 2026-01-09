# Supabase Authentication Migration

This document outlines the migration from JWT-based authentication to Supabase authentication in the Kigolasso backend.

## What was removed

### Files deleted:
- `src/controllers/auth.ts` - JWT auth controller
- `src/services/auth.ts` - JWT auth service
- `src/services/email.ts` - Email service
- `src/routes/auth.ts` - JWT auth routes
- `src/middleware/auth.ts` - JWT auth middleware
- `src/utils/jwt.ts` - JWT utilities
- `src/utils/crypto.ts` - Crypto utilities
- `src/utils/crypto-migration.ts` - Crypto migration utilities
- `src/validations/auth.ts` - Auth validations
- `test-email-temp.js` - Test email file

### Dependencies removed:
- `bcrypt`
- `jsonwebtoken`
- `nodemailer`
- `crypto-js`
- `@types/bcrypt`
- `@types/jsonwebtoken`
- `@types/nodemailer`
- `@types/crypto-js`
- `@types/bcryptjs`

## What was added

### New files:
- `src/config/supabase.ts` - Supabase client configuration
- `src/middleware/supabaseAuth.ts` - Supabase authentication middleware
- `src/routes/supabaseAuth.ts` - Supabase authentication routes
- `src/types/database.ts` - Database types for Supabase

### New dependencies:
- `@supabase/supabase-js` - Supabase JavaScript client

## Environment Variables

Replace the old environment variables:
```bash
# OLD (remove these)
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
ENCRYPTION_KEY="your-32-character-encryption-key-here"
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Kigolasso <noreply@kigolasso.com>"

# NEW (add these)
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
```

## API Endpoints

### New endpoints available:
- `GET /api/v1/auth/profile` - Get current user profile
- `PUT /api/v1/auth/profile` - Update current user profile
- `DELETE /api/v1/auth/profile` - Delete current user account
- `GET /api/v1/auth/me` - Get current user info (lightweight)
- `POST /api/v1/auth/refresh` - Refresh session info

### Authentication
All endpoints expect an `Authorization: Bearer <token>` header with a valid Supabase JWT token.

## Database Schema

The new authentication system expects a `profiles` table with the following structure:
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);
```

## Middleware Usage

### Required authentication:
```typescript
import { authenticateSupabaseUser } from '@/middleware/supabaseAuth';

router.get('/protected', authenticateSupabaseUser, (req, res) => {
  // req.user contains the authenticated user data
  console.log(req.user.id, req.user.email);
});
```

### Optional authentication:
```typescript
import { optionalSupabaseAuth } from '@/middleware/supabaseAuth';

router.get('/public', optionalSupabaseAuth, (req, res) => {
  // req.user will be undefined if no token provided
  if (req.user) {
    console.log('Authenticated user:', req.user.email);
  }
});
```

## Client-side Changes Required

The frontend needs to:
1. Replace JWT token management with Supabase auth
2. Update API calls to use Supabase session tokens
3. Handle authentication state through Supabase client
4. Use Supabase auth methods for login/logout/signup

## Benefits of the Migration

1. **Simplified auth flow** - No need to manage JWT tokens manually
2. **Built-in features** - Email verification, password reset, social auth
3. **Security** - Supabase handles security best practices
4. **Scalability** - Supabase handles user management at scale
5. **Real-time capabilities** - Built-in real-time features
6. **Admin tools** - Supabase dashboard for user management

## Next Steps

1. Set up Supabase project
2. Configure database schema
3. Update frontend to use Supabase auth
4. Test authentication flow
5. Deploy and monitor

For more information, see the Supabase documentation: https://supabase.com/docs