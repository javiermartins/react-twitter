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

	router.HandleFunc("/getProfilePicture", middlew.CheckBD(routers.GetProfilePicture)).Methods(("GET"))
	router.HandleFunc("/uploadProfilePicture", middlew.CheckBD(middlew.ValidateJWT(routers.UploadProfilePicture))).Methods(("POST"))
	router.HandleFunc("/getBanner", middlew.CheckBD(routers.GetBanner)).Methods(("GET"))
	router.HandleFunc("/uploadBanner", middlew.CheckBD(middlew.ValidateJWT(routers.UploadBanner))).Methods(("POST"))

	router.HandleFunc("/getRelation", middlew.CheckBD(middlew.ValidateJWT(routers.GetRelation))).Methods(("GET"))
	router.HandleFunc("/insertRelation", middlew.CheckBD(middlew.ValidateJWT(routers.InsertRelation))).Methods(("POST"))
	router.HandleFunc("/deleteRelation", middlew.CheckBD(middlew.ValidateJWT(routers.DeleteRelation))).Methods(("DELETE"))

	router.HandleFunc("/listUsers", middlew.CheckBD(middlew.ValidateJWT(routers.ListUsers))).Methods(("GET"))
	router.HandleFunc("/listTweets", middlew.CheckBD(middlew.ValidateJWT(routers.ListTweets))).Methods(("GET"))

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
}
