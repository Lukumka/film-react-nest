CREATE TABLE public.films (
    id UUID PRIMARY KEY,
    rating FLOAT,
    director VARCHAR(100),
    title VARCHAR(100) NOT NULL ,
    about TEXT,
    description TEXT,
    image VARCHAR(255),
    cover VARCHAR(255)
);

CREATE TABLE public.tags (
    id UUID PRIMARY KEY,
    title VARCHAR(100)
);


CREATE TABLE public.sessions (
    id UUID PRIMARY KEY,
    film_id UUID NOT NULL REFERENCES films(id) ON DELETE CASCADE,
    daytime DATE NOT NULL,
    hall INT NOT NULL,
    rows INT NOT NULL,
    seats INT NOT NULL,
    price INT NOT NULL
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY,
    total_price INT NOT NULL
);

CREATE TABLE public.tickets (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES sessions(id),
    row INT NOT NULL,
    seat INT NOT NULL,
    price INT NOT NULL
);


