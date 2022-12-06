package routers

import (
	"encoding/json"
	"net/http"

	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/models"
)

func GetRelation(w http.ResponseWriter, r *http.Request) {
	idRelation := r.URL.Query().Get("idUserRelation")
	if len(idRelation) < 1 {
		http.Error(w, "The idUser is missing", http.StatusBadRequest)
		return
	}

	var relation models.Relation
	relation.UserID = IdUser
	relation.UserRelationID = idRelation

	var response models.ResponseRelation

	status, err := bd.GetRelation(relation)
	if err != nil || status == false {
		response.Status = false
	} else {
		response.Status = true
	}

	w.Header().Set("context-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}
