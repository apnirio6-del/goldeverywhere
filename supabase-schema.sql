-- Gold Everywhere V2
create extension if not exists pgcrypto;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  karat text,
  price numeric not null default 0,
  weight numeric default 0,
  created_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  invoice text not null unique,
  date date not null,
  customer_id uuid references customers(id) on delete set null,
  customer_name text,
  customer_phone text,
  customer_address text,
  payment text,
  note text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  discount numeric not null default 0,
  grand numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists transactions_date_idx on transactions(date);
create index if not exists transactions_invoice_idx on transactions(invoice);
create index if not exists customers_name_idx on customers(name);

-- IMPORTANT:
-- The Netlify Functions use the Supabase SERVICE ROLE key server-side.
-- Never put that key into index.html or browser JavaScript.
