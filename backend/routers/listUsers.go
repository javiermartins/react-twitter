package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/javiermartins/react-twitter/bd"
)

func ListUsers(w http.ResponseWriter, r *http.Request) {
	typeUser := r.URL.Query().Get("type")
	pageParam := r.URL.Query().Get("page")
	search := r.URL.Query().Get("search")

	pageTemp, err := strconv.Atoi(pageParam)
	if err != nil {
		http.Error(w, "The page is missing or is less than 1", http.StatusBadRequest)
		return
	}

	page := int64(pageTemp)

	result, status := bd.ReadAllUsers(IdUser, page, search, typeUser)
	if status == false {
		http.Error(w, "Error getting users", http.StatusBadRequest)
		return
	}

	w.Header().Set("context-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(result)
}
