package bd

import (
	"context"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
	"go.mongodb.org/mongo-driver/bson"
)

func ReadAllTweets(userId string, page int64) ([]models.ReturnTweetsUsers, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.RELATIONCOLLECTION)

	skip := (page - 1) * 20

	conditions := make([]bson.M, 0)
	conditions = append(conditions, bson.M{"$match": bson.M{"userId": userId}})
	conditions = append(conditions, bson.M{
		"$lookup": bson.M{
			"from":         "tweet",
			"localField":   "userRelationId",
			"foreignField": "userId",
			"as":           "tweet",
		},
	})
	conditions = append(conditions, bson.M{"$unwind": "$tweet"})
	conditions = append(conditions, bson.M{"$sort": bson.M{"tweet.date": -1}})
	conditions = append(conditions, bson.M{"$skip": skip})
	conditions = append(conditions, bson.M{"$limit": 20})

	cursor, err := collection.Aggregate(ctx, conditions)
	var result []models.ReturnTweetsUsers
	err = cursor.All(ctx, &result)
	if err != nil {
		return result, false
	}
	return result, true
}
