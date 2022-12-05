package routers

import (
	"net/http"

	"github.com/javiermartins/react-twitter/bd"
)

func DeleteTweet(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("idTweet")
	if len(ID) < 1 {
		http.Error(w, "The idTweet is missing", http.StatusBadRequest)
		return
	}

	err := bd.DeleteTweet(ID, IdUser)
	if err != nil {
		http.Error(w, "An error occurred while deleting the tweet"+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("context-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
