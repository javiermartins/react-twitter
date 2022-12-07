package bd

import (
	"context"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ModifyRecord(user models.User, ID string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.USERCOLLECTION)

	record := make(map[string]interface{})
	if len(user.Name) > 0 {
		record["name"] = user.Name
	}
	if len(user.Surnames) > 0 {
		record["surnames"] = user.Surnames
	}
	record["birthDate"] = user.BirthDate
	if len(user.ProfilePicture) > 0 {
		record["profilePicture"] = user.ProfilePicture
	}
	if len(user.Banner) > 0 {
		record["banner"] = user.Banner
	}
	if len(user.Biography) > 0 {
		record["biography"] = user.Biography
	}
	if len(user.Location) > 0 {
		record["location"] = user.Location
	}
	if len(user.WebSite) > 0 {
		record["webSite"] = user.WebSite
	}

	updateString := bson.M{
		"$set": record,
	}
	objectID, _ := primitive.ObjectIDFromHex(ID)
	filter := bson.M{"_id": bson.M{"$eq": objectID}}

	_, err := collection.UpdateOne(ctx, filter, updateString)
	if err != nil {
		return false, err
	}
	return true, nil
}
