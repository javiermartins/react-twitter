package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/javiermartins/react-twitter/bd"
)

func ReadTweets(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("idUser")
	if len(ID) < 1 {
		http.Error(w, "The idUser is missing", http.StatusBadRequest)
		return
	}

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

	pag := int64(page)
	response, success := bd.ReadTweet(ID, pag)
	if success == false {
		http.Error(w, "Error while reading tweets", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}
