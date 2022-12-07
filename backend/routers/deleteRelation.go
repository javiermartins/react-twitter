package routers

import (
	"net/http"

	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/models"
)

func DeleteRelation(w http.ResponseWriter, r *http.Request) {
	idRelation := r.URL.Query().Get("idRelation")
	var relation models.Relation
	relation.UserID = IdUser
	relation.UserRelationID = idRelation

	status, err := bd.DeleteRelation(relation)
	if err != nil || status == false {
		http.Error(w, "Error deleting the relation"+err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
