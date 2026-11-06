CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    receiver_id UUID NOT NULL REFERENCES users(id)
        ON DELETE CASCADE,

    actor_id UUID NOT NULL REFERENCES users(id)
        ON DELETE CASCADE,

    type VARCHAR(50) NOT NULL CHECK (
        type IN ('friend_request', 'friend_accepted')
    ),

    message TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);