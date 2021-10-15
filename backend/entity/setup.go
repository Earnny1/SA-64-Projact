package entity

import ( 

    //"fmt"
	//"time"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm" 
    
)

var db *gorm.DB

func DB() *gorm.DB { 
    return db
}

func SetupDatabase() {
    database, err := gorm.Open(sqlite.Open("sa-64-example-main.db"), &gorm.Config{}) 
    if err != nil {
        panic("failed to connect database") 
}

    database.AutoMigrate(
        &Professor{}, &Course{}, &TA{}, &Room{}, &ManageCourse{},
)

    db = database 
}
