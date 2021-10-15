package main

import (
	"github.com/Earnny/sa-64/controller"
	"github.com/Earnny/sa-64/entity"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// Professor Routes
	r.GET("/professors", controller.ListProfessors)
	r.GET("/professoruser/:id", controller.GetProfessor)
	r.POST("/professors", controller.CreateProfessor)
	r.PATCH("/professors", controller.UpdateProfessor)
	r.DELETE("/professors/:id", controller.DeleteProfessor)

	// Course Routes
	r.GET("/courses", controller.ListCourses)
	r.GET("/course/:id", controller.GetCourse)
	r.POST("/courses", controller.CreateCourse)
	r.PATCH("/courses", controller.Updatecourse)
	r.DELETE("/courses/:id", controller.DeleteCourse)

	// TA Routes
	r.GET("/tas", controller.ListTAs)
	r.GET("/ta/:id", controller.GetTA)
	r.POST("/tas", controller.CreateTA)
	r.PATCH("/tas", controller.UpdateTA)
	r.DELETE("/tas/:id", controller.DeleteTA)

	// Room Routes
	r.GET("/rooms", controller.ListRooms)
	r.GET("/room/:id", controller.GetRoom)
	r.POST("/rooms", controller.CreateRoom)
	r.PATCH("/rooms", controller.UpdateRoom)
	r.DELETE("/rooms/:id", controller.DeleteRoom)

	// ManageCourses Routes
	r.GET("/manageCourses", controller.ListManageCourses)
	r.GET("manageCourse/:id", controller.GetManageCourse)
	r.POST("/manageCourses", controller.CreateManageCourse)
	r.PATCH("/manageCourses", controller.UpdateManageCourse)
	r.DELETE("/manageCourses/:id", controller.DeleteManageCourse)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
