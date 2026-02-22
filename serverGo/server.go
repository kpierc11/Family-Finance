package main

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
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

var (
	key []byte
	t   *jwt.Token
	s   string
)

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

	row := db.QueryRow(`SELECT email, password FROM users WHERE password = $1`, json.Password)

	var user User
	switch err := row.Scan(&user.Email, &user.Password); err {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
		c.JSON(http.StatusUnauthorized, gin.H{"Could not find user.": err.Error()})
		return
	case nil:
		c.SetCookieData(&http.Cookie{
			Name:     "access_token",
			Value:    s,
			Path:     "/",
			Expires:  time.Now().Add(60 * time.Minute),
			HttpOnly: true,
			Secure:   false,
			SameSite: http.SameSiteLaxMode,
		})

		c.JSON(http.StatusOK, "ok")
	default:
		panic(err)
	}
}

func verifyToken(c *gin.Context) {
	tokenString, err := c.Cookie("access_token")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
		return
	}

	//methods := []string{"HMAC"}

	//options := jwt.WithValidMethods(methods)

	parsedToken, err := jwt.Parse(tokenString, func(t *jwt.Token) (any, error) {
		return key, nil
	})

	switch {
	case parsedToken.Valid:
		c.JSON(http.StatusOK, gin.H{"success": "Token Validated"})
	case errors.Is(err, jwt.ErrTokenMalformed):
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token Malformed"})
	case errors.Is(err, jwt.ErrTokenSignatureInvalid):
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Signature"})
	case errors.Is(err, jwt.ErrTokenExpired) || errors.Is(err, jwt.ErrTokenNotValidYet):
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token Expired"})
	default:
		c.JSON(http.StatusUnauthorized, "Un Authorized")
	}

}

func main() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Print("No .env file found")
	}

	//Create new JWT Token
	key = []byte(os.Getenv("JWT_SECRET"))

	t = jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"iss": "my-auth-server",
		"sub": "john",
		"foo": 2,
	})

	s, err = t.SignedString(key)
	if err != nil {
		log.Fatalf("Failed to sign key %v", err)
	}

	fmt.Println(s)

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
	config.AllowCredentials = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	config.MaxAge = 12 * time.Hour

	router.Use(cors.New(config))

	router.GET("/user", getUser)
	router.POST("/login", loginUser)
	router.POST("/register", registerUser)
	router.POST("/verify-token", verifyToken)

	router.Run("localhost:8000")
}
