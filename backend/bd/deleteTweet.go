package bd

import (
	"context"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeleteTweet(id string, userId string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.TWEETCOLLECTION)

	objectId, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{
		"_id":    objectId,
		"userId": userId,
	}

	_, err := collection.DeleteOne(ctx, filter) // TODO: logical delete
	return err
}
