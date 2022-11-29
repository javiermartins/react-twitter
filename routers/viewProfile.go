package routers

import (
	"encoding/json"
	"net/http"

	"github.com/javiermartins/react-twitter/bd"
)

func ViewProfile(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You must send the parameter id", http.StatusBadRequest)
		return
	}
	profile, err := bd.SearchProfile(ID)
	if err != nil {
		http.Error(w, "Id not found in database"+err.Error(), 400)
		return
	}
	w.Header().Set("context-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(profile)
}
