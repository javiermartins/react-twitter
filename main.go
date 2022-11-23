package main

import (
	"github.com/javiermartins/react-twitter/bd"
	"github.com/javiermartins/react-twitter/handlers"
	"log"
)

func main() {
	if bd.CheckConnection() == 0 {
		log.Fatal("Can't connect with BD")
		return
	}
	handlers.Handlers()
}
