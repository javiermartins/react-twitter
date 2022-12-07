package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ReturnTweetsUsers struct {
	ID             primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	UserID         string             `bson:"userId" json:"userId"`
	UserRelationID string             `bson:"userRelationId" json:"userRelationId"`
	Tweet          struct {
		ID      string    `bson:"_id" json:"_id,omitempty"`
		Message string    `bson:"message" json:"message"`
		Date    time.Time `bson:"date" json:"date,omitempty"`
	}
}
