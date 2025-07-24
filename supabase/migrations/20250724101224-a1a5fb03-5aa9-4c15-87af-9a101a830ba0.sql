-- Create admin user directly in auth.users and profiles
-- First, create the admin user in auth.users (this simulates the signup process)
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Generate a UUID for the admin user
    admin_user_id := gen_random_uuid();
    
    -- Insert the admin user into auth.users
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        role
    ) VALUES (
        admin_user_id,
        '00000000-0000-0000-0000-000000000000',
        'admin@naijahomelyfinds.com',
        crypt('password', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider": "email", "providers": ["email"]}',
        '{"full_name": "Admin User"}',
        false,
        'authenticated'
    )
    ON CONFLICT (email) DO UPDATE SET
        encrypted_password = crypt('password', gen_salt('bf')),
        updated_at = now();
    
    -- Ensure the admin profile exists with admin role
    INSERT INTO public.profiles (
        user_id,
        full_name,
        role,
        created_at,
        updated_at
    ) VALUES (
        admin_user_id,
        'Admin User',
        'admin',
        now(),
        now()
    )
    ON CONFLICT (user_id) DO UPDATE SET
        role = 'admin',
        updated_at = now();
END $$;