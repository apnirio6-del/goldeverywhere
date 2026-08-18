# Gold Everywhere V2 — Database & Multi-device

## 1. Buat project Supabase
Buat project baru di Supabase.

## 2. Jalankan database
Buka SQL Editor lalu jalankan seluruh isi `supabase-schema.sql`.

## 3. Set environment variables di Netlify
Site configuration → Environment variables:
- SUPABASE_URL = URL project Supabase
- SUPABASE_SERVICE_ROLE_KEY = Service Role key

Jangan masukkan SERVICE_ROLE_KEY ke `index.html`.

## 4. Deploy
Upload seluruh folder/ZIP ini ke Netlify atau hubungkan repository Git.

## 5. Tahap berikutnya
Versi ini menyediakan API serverless:
- `/api/transactions`
- `/api/customers`
- `/api/products`
- `/api/dashboard`

Frontend lama masih bisa dipakai sebagai basis. Integrasi penuh frontend→API perlu mengganti penyimpanan localStorage menjadi endpoint API. Setelah kredensial Supabase tersedia, bagian tersebut dapat disambungkan.
