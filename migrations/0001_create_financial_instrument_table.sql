-- Migration number: 0001 	 2024-12-21T15:27:42.521Z
create table financial_instrument (
    id integer not null primary key autoincrement, 
    name text not null unique,
    code text not null unique,
    type text not null,
    currency text not null
);