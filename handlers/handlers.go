package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/javiermartins/react-twitter/middlew"
	"github.com/javiermartins/react-twitter/routers"
	"github.com/rs/cors"
)

func Handlers() {
	router := mux.NewRouter()

	router.HandleFunc("/signup", middlew.CheckBD(routers.Signup)).Methods(("POST"))
	router.HandleFunc("/login", middlew.CheckBD(routers.Login)).Methods(("POST"))
	router.HandleFunc("/viewProfile", middlew.CheckBD(middlew.ValidateJWT(routers.ViewProfile))).Methods(("GET"))
	router.HandleFunc("/modifyProfile", middlew.CheckBD(middlew.ValidateJWT(routers.ModifyProfile))).Methods(("PUT"))
	router.HandleFunc("/insertTweet", middlew.CheckBD(middlew.ValidateJWT(routers.InsertTweet))).Methods(("POST"))
	router.HandleFunc("/readTweets", middlew.CheckBD(middlew.ValidateJWT(routers.ReadTweets))).Methods(("GET"))
	router.HandleFunc("/deleteTweet", middlew.CheckBD(middlew.ValidateJWT(routers.DeleteTweet))).Methods(("DELETE"))

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
}
