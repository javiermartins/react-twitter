package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetRelation(relation models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.RELATIONCOLLECTION)

	condition := bson.M{
		"userId":         relation.UserID,
		"userRelationId": relation.UserRelationID,
	}

	var result models.Relation
	fmt.Println(result)
	err := collection.FindOne(ctx, condition).Decode(&result)
	if err != nil {
		fmt.Println(err.Error())
		return false, err
	}
	return true, err
}
