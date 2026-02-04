package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

const (
	host     = "db.xxypdbhtwfcokspanism.supabase.co"
	port     = 5432
	user     = "postgres"
	password = "Ninjawarrior210!"
	dbname   = "postgres"
)

type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

// albums slice to seed record album data.
var albums = []album{
	{ID: "1", Title: "Blue Traina", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

func getUser(c *gin.Context, db *sql.DB) {
	//See what the request is and any data associated with it.
	c.IndentedJSON(http.StatusOK, c.Request.RequestURI)

	err := db.QueryRow("SELECT * FROM Users")
	if err != nil {
		panic(err)
	}

}

func main() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}

	postgresConnInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	//Setup database
	db, err := sql.Open("postgres", postgresConnInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// Initialize the first connection to the database, to see if everything works correctly.
	// Make sure to check the error.
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected!")

	router.Use(cors.New(config))
	router.GET("/albums", getAlbums)
	router.GET("/user", getUser)

	router.Run("localhost:8000")
}
