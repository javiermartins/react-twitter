package routers

import (
	"net/http"

	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/models"
)

func InsertRelation(w http.ResponseWriter, r *http.Request) {
	idRelation := r.URL.Query().Get("idUserRelation")
	if len(idRelation) < 1 {
		http.Error(w, "The idUser is missing", http.StatusBadRequest)
		return
	}

	var relation models.Relation
	relation.UserID = IdUser
	relation.UserRelationID = idRelation

	status, err := bd.InsertRelation(relation)
	if err != nil || status == false {
		http.Error(w, "Error in making the relation"+err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
