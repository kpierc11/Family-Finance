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

type Login struct {
	Email    string
	Password string
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

		fmt.Printf("User id %v email %v \n", user.ID, user.Email)
		users = append(users, user)
	}

	c.JSON(http.StatusOK, users)

}

func registerUser(c *gin.Context) {

	var json Login
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	row := db.QueryRow(`SELECT email FROM "users" WHERE email = $1`, json.Email)

	var user User
	err := row.Scan(&user.Email)

	if err != nil {
		_, insertErr := db.Exec(`INSERT INTO "users" (email,password) VALUES ($1, $2)`, json.Email, json.Password)
		if insertErr != nil {
			log.Fatal(insertErr)
		}
		c.JSON(http.StatusOK, gin.H{"userRegistered": true})
		return
	}

	c.JSON(http.StatusOK, gin.H{"userRegistered": false})
}

func loginUser(c *gin.Context) {
	var json Login
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if json.Email == "" && json.Password == "" {
	// 	return
	// }

	row := db.QueryRow(`SELECT email, password FROM users WHERE password = $1`, json.Password)

	var user User
	switch err := row.Scan(&user.Email, &user.Password); err {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
		c.JSON(http.StatusUnauthorized, gin.H{"Could not find user.": err.Error()})
		return
	case nil:
		//create jwt
		//  token, err := createToken("authToken")
		//  if err != nil{
		// 	return
		//  }
		// c.Header("Authorization", token);
		c.JSON(http.StatusOK, gin.H{"user": user})
		// fmt.Println(user.Email, user.Password)
	default:
		panic(err)
	}
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
	router.POST("/register", registerUser)

	router.Run("localhost:8000")
}
