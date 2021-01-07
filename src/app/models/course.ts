import { CourseGoal } from "./course-goal"
import { Deserializable } from "./deserializable"
import { TableItem } from "./table-item.interface"
import { User } from "./user"

export class Course implements TableItem, Deserializable {

    id!: number
    userId!: string
    name!: string
    description!: string
    resource_place!: string
    duration_minutes!: string
    _pivot!: CourseGoal

    
    public set pivot(pivot: CourseGoal) {
        this._pivot = new CourseGoal().deserialize(pivot)
    }

    public get pivot() {
        return this._pivot
    }
    
    public static parseArray(jsonCourses: any[]) { 
        return jsonCourses.map((course: any) => {
            return new Course().deserialize(course)
        })
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
