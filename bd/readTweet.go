package bd

import (
	"context"
	"log"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ReadTweet(ID string, page int64) ([]*models.ReturnTweet, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.TWEETCOLLECTION)

	var result []*models.ReturnTweet

	condition := bson.M{
		"userId": ID,
	}

	var tweetsShown int64 = 20
	options := options.Find()
	options.SetLimit(tweetsShown)
	options.SetSort(bson.D{{Key: "date", Value: -1}})
	options.SetSkip(((page - 1) * tweetsShown))

	cursor, err := collection.Find(ctx, condition, options)
	if err != nil {
		log.Fatal(err.Error())
		return result, false
	}

	for cursor.Next(context.TODO()) {
		var record models.ReturnTweet
		err := cursor.Decode(&record)
		if err != nil {
			return result, false
		}
		result = append(result, &record)
	}

	return result, true
}
