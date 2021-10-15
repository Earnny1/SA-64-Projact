package entity
import(
    "gorm.io/gorm"
    "time"
)

type Professor struct{
    gorm.Model
    Name            string
    Professer_id    string  `gorm: "uniqueIndex"`
    ManageCourses    []ManageCourse  `gorm: "foreignKey:ProfessorID"`
}
type Course struct{
    gorm.Model
    Name        string
    Code        string  `gorm: "uniqueIndex"`
    Credit      *uint
    ManageCourses    []ManageCourse  `gorm: "foreignKey:CourseID"`
    
}

type TA struct{
    gorm.Model
    Name        string
    TA_id       string  `gorm: "uniqueIndex"`
    ManageCourses    []ManageCourse  `gorm: "foreignKey:TaID"`
    
    
}

type Room struct{
    gorm.Model
    Number            *uint  `gorm: "uniqueIndex"`
    StudentCount      *uint
    ManageCourses    []ManageCourse  `gorm: "foreignKey:RoomID"`  
    
}
type ManageCourse struct{
    gorm.Model

	Group			string
	Term			*uint
    TeachingTime    *uint
    ManageCourseTime    time.Time

    ProfessorID *uint
    Professor   Professor

    CourseID *uint
    Course  Course

    TaID *uint
    TA   TA

    RoomID *uint
    Room    Room
}
