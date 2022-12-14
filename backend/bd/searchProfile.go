package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func SearchProfile(ID string) (models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.USERCOLLECTION)

	var profile models.User
	objectId, _ := primitive.ObjectIDFromHex(ID)

	condition := bson.M{
		"_id": objectId,
	}

	err := collection.FindOne(ctx, condition).Decode(&profile)
	profile.Password = ""

	if err != nil {
		fmt.Println("Data not found" + err.Error())
		return profile, err
	}
	return profile, nil

}
