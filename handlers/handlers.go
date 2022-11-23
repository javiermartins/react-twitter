package handlers

import (
	"github.com/gorilla/mux"
	"github.com/javiermartins/react-twitter/middlew"
	"github.com/javiermartins/react-twitter/routers"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
)

func Handlers() {
	router := mux.NewRouter()

	router.HandleFunc("/signup", middlew.CheckBD(routers.Signup)).Methods(("POST"))

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
}
