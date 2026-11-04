CREATE TABLE connection_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    status VARCHAR(20) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT connection_status_check
        CHECK (status IN ('pending', 'accepted', 'rejected')),

    CONSTRAINT no_self_connection
        CHECK (sender_id <> receiver_id),

    CONSTRAINT unique_connection_request
        UNIQUE (sender_id, receiver_id)
);

