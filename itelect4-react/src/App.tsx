import { User, Course } from './types'
import { UserCard } from './components/UserCard'
import { CourseCard } from './components/CourseCard'
import './App.css'

function App() {
  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@dlsl.edu.ph', role: 'STUDENT' },
    { id: 2, name: 'Professor Bob', email: 'bob@dlsl.edu.ph', role: 'TEACHER' }
  ]

  const courses: Course[] = [
    { id: 'ITELECT4', title: 'IT Elective 4', description: '3 units - 1st Semester 2026-2027' },
    { id: 'CS101', title: 'Intro to CS', description: '4 units - Core Course' }
  ]

  return (
    <div className="App">
      <h1>DLSU IT Elective 4</h1>
      
      <section>
        <h2>Students</h2>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>

      <section>
        <h2>Courses</h2>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </div>
  )
}

export default App
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
