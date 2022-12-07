package bd

import (
	"context"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func InsertTweet(tweet models.InsertTweet) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.TWEETCOLLECTION)

	record := bson.M{
		"userId":  tweet.UserId,
		"message": tweet.Message,
		"date":    tweet.Date,
	}
	result, err := collection.InsertOne(ctx, record)
	if err != nil {
		return "", false, err
	}

	objectId, _ := result.InsertedID.(primitive.ObjectID)

	return objectId.String(), true, nil
}
