package bd

import (
	"context"
	"time"

	"github.com/javiermartins/react-twitter/bd/constants"
	"github.com/javiermartins/react-twitter/models"
)

func DeleteRelation(relation models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database(constants.DATABASENAME)
	collection := db.Collection(constants.RELATIONCOLLECTION)

	_, err := collection.DeleteOne(ctx, relation)
	if err != nil {
		return false, err
	}
	return true, err
}
