package routers

import (
	"encoding/json"
	"net/http"

	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/models"
)

func ModifyProfile(w http.ResponseWriter, r *http.Request) {
	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Incorrect data"+err.Error(), 400)
		return
	}

	var status bool

	status, err = bd.ModifyRecord(user, IdUser)
	if err != nil {
		http.Error(w, "An error occurred while editing the profile"+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "An error occurred while editing the profile"+err.Error(), 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
