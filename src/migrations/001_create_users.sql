CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(30) NOT NULL,

    username VARCHAR(30) NOT NULL UNIQUE,

    email VARCHAR(255) NOT NULL,

    password_hash TEXT NOT NULL,

    date_of_birth DATE NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT name_length_check
        CHECK (CHAR_LENGTH(TRIM(name)) BETWEEN 3 AND 30),

    CONSTRAINT username_format_check
        CHECK (username ~ '^[a-z0-9_]{3,30}$'),

    CONSTRAINT username_letters_check
        CHECK (
            CHAR_LENGTH(
                REGEXP_REPLACE(username, '[^a-z]', '', 'g')
            ) >= 3
        )
);

CREATE UNIQUE INDEX users_email_lower_unique
ON users (LOWER(email));