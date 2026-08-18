GOLD EVERYWHERE - LOGIN ADMIN

Perubahan:
- Halaman login Admin dengan logo GE.
- Login menggunakan Supabase Auth (email + password).
- Tombol Keluar.
- Dashboard lama tetap dipertahankan.

SETUP NETLIFY:
Tambahkan environment variable:
1. SUPABASE_URL = URL project Supabase
2. SUPABASE_SERVICE_ROLE_KEY = key service role yang SUDAH dipakai sebelumnya
3. SUPABASE_ANON_KEY = Publishable/Anon key dari Supabase (AMAN untuk client, bukan service_role)

SETUP SUPABASE:
1. Buka Authentication > Users.
2. Buat user admin dengan email dan password.
3. Gunakan email/password itu pada halaman login.

PENTING:
- Jangan pernah memasukkan SUPABASE_SERVICE_ROLE_KEY ke index.html.
- SUPABASE_ANON_KEY boleh dipakai oleh aplikasi browser.
