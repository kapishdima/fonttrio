CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  api_key TEXT UNIQUE,
  api_key_created_at TIMESTAMPTZ,
  subscription_status TEXT NOT NULL DEFAULT 'free',
  subscription_id TEXT,
  customer_id TEXT,
  subscribed_at TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_api_key ON profiles(api_key) WHERE api_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
