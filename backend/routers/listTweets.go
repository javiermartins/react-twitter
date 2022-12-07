package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/javiermartins/react-twitter/bd"
)

func ListTweets(w http.ResponseWriter, r *http.Request) {
	pageParam := r.URL.Query().Get("page")

	if len(pageParam) < 1 {
		http.Error(w, "The page is missing", http.StatusBadRequest)
		return
	}
	page, err := strconv.Atoi(pageParam)
	if err != nil {
		http.Error(w, "Page must be greater than 0", http.StatusBadRequest)
		return
	}

	response, correct := bd.ReadAllTweets(IdUser, int64(page))
	if correct == false {
		http.Error(w, "Error getting tweets", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}
