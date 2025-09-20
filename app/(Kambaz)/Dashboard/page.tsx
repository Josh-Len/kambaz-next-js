import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">

                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" width={200} height={150} alt="ReactJS course thumbnail"/>
                        <div>
                            <h5>CS1234 React JS</h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack Software Developer
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link href="/Courses/2345" className="wd-dashboard-course-link">
                        <Image src="/images/nodejs.jpg" width={200} height={150} alt="NodeJS course thumbnail"/>
                        <div>
                            <h5>CS2345 Node JS</h5>
                            <p className="wd-dashboard-course-title">
                                Backend development with Node
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link href="/Courses/3456" className="wd-dashboard-course-link">
                        <Image src="/images/python.jpg" width={200} height={150} alt="Python course thumbnail"/>
                        <div>
                            <h5>CS3456 Python</h5>
                            <p className="wd-dashboard-course-title">
                                Learn Python programming basics
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link href="/Courses/4567" className="wd-dashboard-course-link">
                        <Image src="/images/java.jpg" width={200} height={150} alt="Java course thumbnail"/>
                        <div>
                            <h5>CS4567 Java</h5>
                            <p className="wd-dashboard-course-title">
                                Object-oriented programming in Java
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link href="/Courses/5678" className="wd-dashboard-course-link">
                        <Image src="/images/htmlcss.jpg" width={200} height={150} alt="HTML & CSS course thumbnail"/>
                        <div>
                            <h5>CS5678 HTML & CSS</h5>
                            <p className="wd-dashboard-course-title">
                                Building modern web pages
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link href="/Courses/6789" className="wd-dashboard-course-link">
                        <Image src="/images/sql.jpg" width={200} height={150} alt="SQL course thumbnail"/>
                        <div>
                            <h5>CS6789 SQL</h5>
                            <p className="wd-dashboard-course-title">
                                Databases and SQL queries
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                <div className="wd-dashboard-course">
                    <Link href="/Courses/7890" className="wd-dashboard-course-link">
                        <Image src="/images/ml.jpg" width={200} height={150} alt="Machine Learning course thumbnail"/>
                        <div>
                            <h5>CS7890 Machine Learning</h5>
                            <p className="wd-dashboard-course-title">
                                Intro to AI & machine learning
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
