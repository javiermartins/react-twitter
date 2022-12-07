package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ReadAllUsers(userId string, page int64, search string, kind string) ([]*models.User, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.USERCOLLECTION)

	var result []*models.User

	var usersShown int64 = 20
	options := options.Find()
	options.SetSkip(((page - 1) * usersShown))
	options.SetLimit(usersShown)

	condition := bson.M{
		"name": bson.M{"$regex": `(?i)` + search},
	}

	cursor, err := collection.Find(ctx, condition, options)
	if err != nil {
		fmt.Println(err.Error())
		return result, false
	}

	var found, include bool

	for cursor.Next(ctx) {
		var user models.User
		err := cursor.Decode(&user)
		if err != nil {
			fmt.Println(err.Error())
			return result, false
		}
		var relation models.Relation
		relation.UserID = userId
		relation.UserRelationID = user.ID.Hex()

		include = false

		found, err = GetRelation(relation)
		if kind == "new" && found == false {
			include = true
		}
		if kind == "follow" && found == true {
			include = true
		}

		if relation.UserRelationID == userId {
			include = false
		}

		if include == true {
			user.Password = ""
			user.Biography = ""
			user.WebSite = ""
			user.Location = ""
			user.Banner = ""
			user.Email = ""

			result = append(result, &user)
		}
	}

	err = cursor.Err()
	if err != nil {
		fmt.Println(err.Error())
		return result, false
	}
	cursor.Close(ctx)

	return result, true
}
