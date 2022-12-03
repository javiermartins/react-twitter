package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/models"
)

func InsertTweet(w http.ResponseWriter, r *http.Request) {
	var message models.Tweet
	err := json.NewDecoder(r.Body).Decode(&message)

	record := models.InsertTweet{
		UserId:  IdUser,
		Message: message.Message,
		Date:    time.Now(),
	}

	_, status, err := bd.InsertTweet(record)
	if err != nil {
		http.Error(w, "Error while inserting tweet"+err.Error(), 400)
		return
	}
	if status == false {
		http.Error(w, "Could not insert the tweet"+err.Error(), 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
