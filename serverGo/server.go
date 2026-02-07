package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

type User struct {
	ID       string `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func getUser(c *gin.Context) {
	//See what the request is and any data associated with it.
	rows, err := db.Query(`SELECT id, email, password FROM "Users";`)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.ID, &user.Email, &user.Password); err != nil {
			log.Fatal(err)
		}

		fmt.Printf("User id %v email %v password %v \n", user.ID, user.Email)
		users = append(users, user)
	}

	c.JSON(http.StatusOK, users)

}

func registerUser(c *gin.Context) {
	email := c.QueryMap("email")
	password := c.PostFormMap("password")

	fmt.Printf("email: %v; password: %v", email, password)
}

func loginUser(c *gin.Context) {
	email := c.QueryMap("email")
	password := c.PostFormMap("password")

	fmt.Printf("email: %v; password: %v", email, password)

	c.JSON(http.StatusOK,
		gin.H{
			"loggedIn": "true",
		})
}

func main() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Print("No .env file found")
	}

	directory, err := os.Getwd()
	if err != nil {
		fmt.Println("Couldn't find working directory", err)
	}
	fmt.Println(directory)

	dsn, exists := os.LookupEnv("DATABASE_URL")
	if !exists {
		log.Fatalf("Couldn't find env variable")
	}

	//Setup database
	db, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")

	router := gin.Default()
	router.SetTrustedProxies([]string{"localhost:5173"})

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}

	router.Use(cors.New(config))

	router.GET("/user", getUser)
	router.POST("/login", loginUser)
	router.POST("/register")

	router.Run("localhost:8000")
}
