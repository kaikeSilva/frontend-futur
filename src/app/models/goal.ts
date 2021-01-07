import { Course } from "./course"

export class Goal {
    id!: number
    user_id!: number
    title!: string
    description!: string
    total_minutes!: number
    percentage_complete!: number
    days_limit!: number
    _courses!:  Course[]

    public static parseArray(jsonGoals: any[]) { 
        return jsonGoals.map((goal: any) => {
            return new Goal().deserialize(goal)
        })
    }

    public set courses(courses: any[]) {
        this._courses = courses.map((course: any) => {
            return new Course().deserialize(course)
        })
    }

    public get courses() {
        return this._courses
    }


    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
